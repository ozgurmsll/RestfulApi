const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi =require('@hapi/joi')
const createError = require("http-errors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const boolean = require("@hapi/joi/lib/types/boolean");



const userShchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxlength: 30,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin:{
      type:Boolean,
      default:false

    }
  },
  { collection: 'Users', timestamps: true }
  );



  
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim().messages({
        'string.base': 'username string olmalı',
        'string.empty': 'username boş olamaz!!',
        'string.min' : 'username en az 3 karakter olmalı !!!',
        'string.max' : 'username en fazla 50 karakter olmalı',
    }),
    email: Joi.string().trim().email().messages({
        'string.email' : 'yazdıgınız geçerli bir mail değil'
    }),
    password: Joi.string().min(6).trim(),
  });
userShchema.methods.generateToken=  function (){
  const girisYapanUser=this;
  const token = jwt.sign({_id:girisYapanUser._id},'secretkey',{expiresIn:'1h'})
  return token;
}




//yeni bir user için bukullanılır
userShchema.methods.joiValidation = function (userObject) { 
  schema.required();
  return schema.validate(userObject,{abortEarly:false});
} 

userShchema.statics.joiValidationForUpdate = function (userObject) { 
  return schema.validate(userObject);
 
} 
userShchema.methods.toJSON = function(){
  const user=this.toObject();
  delete user._id;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  delete user.password;

  /// kullanıcıya dönerken bu kısımlar gözükmesin dedik
  return user;
}
userShchema.statics.loading=async (email,password)=>{


  const {error,value}=schema.validate({email,password})
  if(error){
    throw createError(400,error);
  }
 
  const userControl=await User.findOne({email})
  if(!userControl){
    throw createError(400,"Girilen email/şifre hatalı")
  }
  const passwordControl=await bcrypt.compare(password,userControl.password)
  if(!passwordControl){throw createError(400,"Girilen email/şifre hatalı")}

  return userControl;
}

const User = mongoose.model("User", userShchema);

module.exports = User;
