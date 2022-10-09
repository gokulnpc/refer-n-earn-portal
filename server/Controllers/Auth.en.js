import express from "express";
import otp_generator from "otp-generator";
import { UserModel } from "../Model/Auth.js";
import { validationSignin, validationSignup, twofactorauthentication, otpgeneration } from "../validations/auth.js";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
const Router = express.Router();
let OTP_GENERATOR = "";
/**
 * Router       /signup
 * Des          Register new user
 * Params       none
 * Access       Public
 * Method       POST
 */
Router.post("/signup", async (req, res) => {
  try {
    await validationSignup(req.body);
    console.log(req);
    await UserModel.findByEmailAndPhone(req.body);
    const newUser = await UserModel.create(req.body);
    const token = newUser.generateJwtToken();
    return res.status(200).json({message:"successfully registered"});
  } catch (error) {
    console.log(error.details[0].message);
    return res.status(400).json({ error:error.details[0].message});
  }
});

/**
 * Router       /signin
 * Des          Sign-in with email and password
 * Params       none
 * Access       Public
 * Method       get
 */
Router.post("/signin", async (req, res) => {
  try {
    console.log("insides");
    console.log(req.body.data);
    await validationSignin(req.body);
    console.log("inside");
    const user = await UserModel.findByEmailAndPassword(req.body);
    const token = user.generateJwtToken(user.id);
    console.log(token);
    return res.status(200).json({ message: token,port:8080});
    /*return res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" });*/
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});
/**
 * Router       /otpgeneration
 * Des          OTP genration 
 * Params       none
 * Access       Public
 * Method       get

 */
Router.post("/otpgeneration", async (req, res) => {
  const {
    email
  } = req.body;
  try {
    let opt_generate = otpgeneration("generate", email);
    await twofactorauthentication(opt_generate, email);
    return res.status(200).json({ opt_generate, status: "success" })
  } catch (error) {
    console.log(error);
  }
})
/**
   * Router       /emailauth
   * Des          2-factor authentication and otp validation
   * Params       none
   * Access       Public
   * Method       get

   */
Router.post("/emailauth", async (req, res) => {
  const {
    otp
  } = req.body;
  try {
    //let opt_generate=otpgeneration("verify",email);
    console.log(typeof (otp));
    if (otpgeneration("verify", otp)) {
      return res.status(200).json({ otp, status: "success" });
    } else {
      return res.status(404).json({ otp, status: "failure" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})
/**
 * 
 */
Router.post("/jwt", async (req, res) => {
  console.log("jwt verification");
  const token = req.body.token;
  console.log("frontenf token ", token);
  /*if (!token) {
    console.log("token already there");
    return res.sendStatus(403);
  }*/
  try {
    const data = jwt.verify(token, "EarnPortalAPP");
    req.userId = data.id;
    console.log(req.userId);
    let userDetail = "hi";
    UserModel.findById(req.userId, function (err, docs) {
      if (err) {
        console.log(err);
      }
      else {
        userDetail = docs;
        console.log("Result : ", docs);
        return res.status(200).json({ response:docs});
      }
    })
  } catch (error) {
    console.log("token expred....");
    console.log(error);
    return res.status(401).json({ error: error });
  }
});



export default Router;