import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../Model/Auth.js";
export const me=async(req,res)=>{
    console.log(req.headers);
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],decoded;
        try {
            console.log("authorization",authorization);
            decoded = jwt.verify(authorization,"EarnPortalAPP");
            console.log("details",decoded);
        } catch (e) {
            return res.status(500).json({ error: error.message });
        }
        var userId = decoded.id;
        console.log(userId);
        // Fetch the user by id 
        UserModel.findOne({_id: userId}).then(function(user){
            console.log("user",user);
            throw new Error("User Already Exist...!");
        });
    }else{
        return res.status(500).json({error:"Autherisation header not working..."});
    }
}
