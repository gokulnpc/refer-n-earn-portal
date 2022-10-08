//packages
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "./DB/index.js";
import Auth from"./Controllers/Auth.en.js";
import Referral from "./Controllers/Referral.js";
const portal = express();
portal.use(express.json());
portal.use(cors());
portal.use(express.json());
portal.use(helmet());
portal.use(cookieParser());
portal.use(express.static("public"));
//Routing part
portal.use("/auth",Auth);
portal.use("/invite",Referral);

const port = process.env.PORT || 8080
portal.listen(port,()=>{
    console.log("Server is connected to the port 8080");
})
