const req = require("express/lib/request");


//import express
const express = require('express')

//import router
const router = require('./routes')

const listEndpoints = require('express-list-endpoints');
const bodyParser = require('body-parser');

const cors = require('cors');

//init app
const app = express()
//use cors
app.use(cors())

//define port
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));    
app.use(bodyParser.json());

//route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//define routes
app.use('/api', router)

//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})


console.log(listEndpoints(app));