const express=require("express");
const router=express.Router();
const User=require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/users.js");

//useing router.route to combine the call request-->
router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

// router.get("/signup",userController.renderSignupForm);

// router.post("/signup",wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(
  saveRedirectUrl,  //saveing the redirecturl in res.locals!
  passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash:true
}), userController.login);

// router.get("/login",userController.renderLoginForm)

// router.post("/login",
//     saveRedirectUrl,  //saveing the redirecturl in res.locals!
//     passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash:true
//   }), userController.login);

//logout route
router.get("/logout",userController.logout);


module.exports=router;