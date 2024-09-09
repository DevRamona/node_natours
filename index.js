const express = require("express");
const { json } = express;
const fs = require("fs");
const app = express();
app.use(express.json())
// app.get("/", (request, response) => {
//     response.status(200).json({message:"Hello from the server side", app:"naptours"})
// })

// app.get("/about", (request, response) => {
//     response.status(200).json({message:"Hello from the about section", app:"test"})
// })

let tours;
try {
    tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)) 
    // console.log(`${__dirname}/dev-data/data/tours-simple.json`);
}catch(error) {
    console.log("Error faced",error.message )
}
app.get('/api/v1/tours', (request,response) => {
    response.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours 
        }

    })
})
app.post('/api/v1/tours', (request, response) => {
    const newId = tours[tours.length -1].id + 1
    const newTour = Object.assign({id:newId}, request.body)
    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        response.status(201).json({
            status: "success",
            results: tours.length,
            data: {
                tours:newTour
            }
        
    })
    
    
})
})
const port = 3000
app.listen(port, () =>{
    console.log("appp running on the port") 

})                                                                                                                                                                                                                                                                    