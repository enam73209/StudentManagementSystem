const express = require('express');
const app = new express();
const router = require('./src/routes/api');
const BodyParser = require('body-parser');
//Body Parser Implement

app.use(BodyParser.json());


//Routing Implement
app.use('/api/v1',router);

//Undefined Routing Implement
app.use('*',(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"});
})

//MongoDB Database Connection
const mongoose = require('mongoose');
let uri='mongodb://0.0.0.0:27017/Students';
let options = {user:'', pass:'',autoIndex:true}
mongoose.connect(uri,options)
    .then(() => {
        console.log('Connected to MongoDB');
        // Your code here
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });




module.exports = app