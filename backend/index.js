const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT=process.env.PORT || "5000";
const fetchData=require('./db')
const app = express();
const cors = require("cors");

app.use(cors());
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

// Middleware to parse JSON requests
app.use(express.json());

// Assuming 'createUser' is a router module
app.use('/api', require('./Routes/createUser'));
app.use('/api', require('./Routes/submitSecret'));
app.use('/api', require('./Routes/displaySecret'));

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});