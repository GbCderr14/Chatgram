const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
const dotenv=require('dotenv');
dotenv.config();
const Username=process.env.DB_USERNAME;
const Password=process.env.DB_PASSWORD;
// const DefaultData=require('./../default');
const  Connection=async ()=>{
    try{
          const conn=await mongoose.connect(`mongodb+srv://${Username}:${Password}@cluster0.lzpkgz9.mongodb.net/`);
            console.log("Database connected successfully");
            // DefaultData();
    } 
    catch(err){
        console.log("Error in connecting with database"+err.message);
    }
}
module.exports=Connection;