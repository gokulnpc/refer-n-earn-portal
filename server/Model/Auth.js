import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ip from "ip";
import referralCodeGenerator from 'referral-code-generator';
const UserSchema = new mongoose.Schema(
    {
      fullname: { type: String,required:true},
      email: { type: String, required: true },
      password: { type: String, required: true},
      phoneNumber:{ type: Number, required: true},
      coins:{ type: Number,default:0},
      ip_visited:[String],
    },
    {
      timestamps: true,
    }
  );
  /**
   * 
   var token = jwt.sign({id: user._id}, secret.secretToken, { expiresIn: tokenManager.TOKEN_EXPIRATION_SEC });
            return res.json({token:token});
    jwt.sign({ user: this._id.toString() }, "EarnPortalAPP",{expiresIn: '10m'})
   */
  UserSchema.methods.generateJwtToken = function (user_detail) {
    console.log(user_detail);
    return jwt.sign({id:user_detail},"EarnPortalAPP", { expiresIn:'1h'});
  };


  UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
    // check whether email exist
    console.log("before findByEmailAndPhone");
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });
    console.log("after findByEmailAndPhone");
    if (checkUserByEmail || checkUserByPhone) {
      throw new Error("User Already Exist...!");throw new Error("User Already Exist...!");
    }
    return false;
  };
  
  UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    // check whether email exist
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does no exist!!!");
  
    // Compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
  
    if (!doesPasswordMatch) throw new Error("invalid Password!!!");
  
    return user;
  };
  
  UserSchema.pre("save", function (next) {
    const user = this;
  
    // password is modified
    if (!user.isModified("password")) return next();
  
    // generate bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
      if (error) return next(error);
  
      // hash the password
      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error);
  
        // assigning hashed password
        user.password = hash;
        user.ip_visited.push(ip.address());
        return next();
      });
    });
    //generating refrral code  : 
    //user.referral_code=user.fullname+referralCodeGenerator.custom('lowercase', 6, 6, 'temitope');;
    //console.log("genrated...");
  });
  
  export const UserModel = mongoose.model("Users", UserSchema);