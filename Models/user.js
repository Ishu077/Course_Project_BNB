const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    }
    //username and passwrord automatically stored and hashed and salted by the passport-read docs
    //therfore not defining here
})
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
