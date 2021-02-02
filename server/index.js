const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const path = require('path');
global.appRoot = path.resolve(__dirname);

const tasks=require('./routes/tasks');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    ()=>{
        console.log('connected to db');
        mongoose.set('useFindAndModify', false);
    }
);


app.use(express.json());

app.use('/api',tasks);


app.listen(3000, ()=>console.log('Server is running'));

