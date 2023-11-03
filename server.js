// const express = require('express')

// const colors = require('colors')
import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan  from 'morgan';
import connectDB from './config/db.js';


dotenv.config();

//connect db
connectDB();
//rest object: to use api
const app = express();

//middleware
app.use(express.json())
app.use(morgan('dev'));

//rest api
app.get('/', (req,res) => {
    res.send({
        message: 'Welcome to E-commerce app'
    })
})

//PORT
const PORT = process.env.PORT || 8080;

//run the app
app.listen(PORT, ()=>{
    console.log(`Server is running ${PORT}`.bgGreen.white);
})