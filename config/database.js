const mongoose=require('mongoose');

require('dotenv').config();
const URL=process.env.URL;

const dbConnect=()=>{
    
        mongoose.connect(URL)
        .then(console.log("Database connection successful"))
        .catch((err)=>{
            console.log("DB connection failed");
            console.error(err);            
        })
    
}
module.exports=dbConnect;