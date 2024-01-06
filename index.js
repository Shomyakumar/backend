const express=require('express');
const app=express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT=process.env.PORT||4000;


app.use(express.json());

const dbConnect=require('./config/database');
dbConnect();

const user=require("./routes/user");
app.use("/api/v1",user);



app.listen(PORT,()=>{
    console.log(`App is running successfully on the port ${PORT}`)
})