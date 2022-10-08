import mongoose from "mongoose";
//require("dotenv").config()
const api="mongodb://riddhishwar:Mayurie@cluster0-shard-00-00.son3w.mongodb.net:27017,cluster0-shard-00-01.son3w.mongodb.net:27017,cluster0-shard-00-02.son3w.mongodb.net:27017/Coupon?ssl=true&replicaSet=atlas-3jnyc4-shard-0&authSource=admin&retryWrites=true&w=majority";
try{
    mongoose.connect(api,{
        useUnifiedTopology: true, 
        useNewUrlParser: true
    });
    console.log("Database Connected...");
}catch(error){
    console.log("Database Not Connected...");
}
export const db=mongoose.connection;
