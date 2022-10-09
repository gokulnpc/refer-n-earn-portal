import mongoose from "mongoose";
//require("dotenv").config()

try {
    mongoose.connect(process.env.API, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Database Connected...");
} catch (error) {
    console.log("Database Not Connected...");
}
export const db = mongoose.connection;
