import express from "express";
import ip from "ip";
import { UserModel } from "../Model/Auth.js";
const Router = express.Router();
Router.get("/:id",async(req,res)=>{
    let device_ip = ip.address();
    let referral_code = req.params.id;
    console.log(referral_code);
    try {
        UserModel.findOne({_id:referral_code}, function (err, data) {
            if (err) {
                console.log("USER OWN id");
                res.status(400).json({message:"USER OWN id"});
            }else{
                if(data.ip_visited.includes(device_ip)){
                    res.send("Already used this referral address");
                }else{
                    data.ip_visited.push(device_ip);
                    data.coins+=10;
                    data.save();
                    res.send("successfully referral added");
                }
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error:"Same referrral link given"});
    }
})
Router.post("/:id", async (req, res) => {
    let device_ip = ip.address();
    let referral_code = req.params.id;
    console.log(referral_code);
    //db.demo414.aggregate([{$unwind: "$details"}, {$match:{"details.StudentMarks" :56}}] )
    //db.users.findOne({"_id": id},{awards: {$elemMatch: {award:'Turing Award', year:1977}}})
    try {
        UserModel.findOne({_id:referral_code}, function (err, data) {
            if (err) {
                console.log("USER OWN id");
                res.status(400).json({message:"USER OWN id"});
            }else{
                if(data.ip_visited.includes(device_ip)){
                    res.send("Already used this referral address");
                }else{
                    console.log(data);
                    //data.ip_visited.push(device_ip);
                    data.coins+=10;
                    data.save();
                    res.send("successfully referral added");
                }
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error:"Same referrral link given"});
    }
});


export default Router;