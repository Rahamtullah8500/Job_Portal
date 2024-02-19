import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide your name"],
    minLength: [3, "name must be at least 3 characters"],
    maxLength: [30, "name cannot exceed 30 characters"],
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password should have atleast 8 characters"],
  },
  role:{
    type:String,
    required:[true, "Please provide your role"],
    enum:['Job Seeker', 'Employer']
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});


//hashiing 
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

//compare password
userSchema.methods.comparePassword = async (enteredPassword)=>{
    await  bcrypt.compare(enteredPassword, this.password)
}

//generating jwt fut authorization
userSchema.methods.getJWTToken = ()=>{
    Jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

export const User = mongoose.model('User',userSchema)