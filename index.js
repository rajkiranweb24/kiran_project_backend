const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
dotenv.config();



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    });
    console.log("MONGODB: Default Connection Established");
    console.log("MONGODB: Default Connection Established");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

connectDB();




app.use(express.json());
app.use(bodyParser.json())
//create data
app.use('/vendor', vendorRoutes)
app.use('/firm', firmRoutes)

app.listen(4800, () => console.log("gg server is running"));
















// const express=require('express');
// const dotenv=require('dotenv');
// const mongoose=require('mongoose')
// const app = express();

// dotenv.config()
// console.log(process.env.MONGOURI)
// mongoose.connect(process.env.MONGOURI,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(()=>{
//   console.log("database connected")
// })
// .catch((err)=>{
//   console.log("database error",err)
// })

// app.use('/', function (req, res) {
//   res.send('Hello World')
// })

// app.listen(4500,()=>{
//     console.log("server is running")
// })






