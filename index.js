const express=require('express');
const app = express();

app.use('/', function (req, res) {
  res.send('Hello World')
})

app.listen(4500,()=>{
    console.log("server is running")
})