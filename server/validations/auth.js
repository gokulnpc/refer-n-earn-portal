import joi from 'joi';
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
//var secrets = speakeasy.generateSecret({length: 20});
let global_api = "";
export const validationSignup = (userData) => {
  const Schema = joi.object({
    fullname: joi.string().required().min(5).max(30),
    email: joi.string().email().required(),
    password: joi.string().min(5),
    phoneNumber: joi.number(),
    coins:joi.string().allow(null),
    ip_visited:joi.allow(null)
  });
  //Validate the data asynchronisly
  //console.log("success validation");
  return Schema.validateAsync(userData);
}

export const validationSignin = (userData) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  })
  console.log("here");
  return Schema.validateAsync(userData);
}
//otp generation  : 
export const otpgeneration = (codeword, user) => {
  try {
    if (codeword === "generate") {
      console.log("inside generate");
      const temp_secret = speakeasy.generateSecret();
      global_api = temp_secret.base32;
      var token = speakeasy.totp({
        secret: global_api,
        encoding: "base32"
      });
      var remain = (300 - Math.floor((new Date()).getTime() / 1000.0 % 30));
      console.log('OTP', token, remain);
      twofactorauthentication(token,user);
      //console.log(token,user,secrets);
      return token;
    } else {
      console.log("verification", user);
      var tokens = speakeasy.totp.verify({
        secret: global_api,
        encoding: 'base32',
        token: user,
        window: 0
      });
      console.log(tokens);
      return true;
    }
  } catch (error) {
    console.log("error is : ",error);
    return false;
  }
}
//sending otp mail address to the concern mail
export const twofactorauthentication = (OTP_GENERATOR, userData) => {
  console.log(userData);
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'riddhishs75@gmail.com',
      pass: 'ndobcbdbwcxuqrut'
    }
  });

  var mailOptions = {
    from: 'riddhishs75@gmail.com',
    to: userData,
    subject: 'two factor authnetication',
    text: OTP_GENERATOR
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  return true;
}