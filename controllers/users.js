const  User=require("../Models/user");

module.exports.renderSignupForm= (req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.renderLoginForm= (req,res)=>{
    res.render("users/login.ejs");
};
module.exports.signup=async (req,res)=>{
    try{   //why using try-catch methro of error when we already using wrapAsync cozhere
            //we donot want to make the user stay at the error page, we want to just flash the error message and
            //go to the signup page again!!
        let {username,password,email}=req.body;
    let newUser=new User({
        email:email,
        username:username,
    })
    const regUser=await User.register(newUser,password);
    console.log(regUser);
    req.login(regUser,(err)=>{  //automatically login after signup!
        if(err){
            return next(err);
        }
        req.flash("success","you are logged in now");
        res.redirect("/listings");
    })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.login=(req, res) => {
    // console.log("Login successful");
    req.flash("success", "Welcome to Wanderlust, you are logged in!");
    let redirectUrl=res.locals.redirectUrl|| "/listings";

    res.redirect(redirectUrl);  //but the prb here is the session gets reset when the login gets authenticated so we need to find someother way!
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out now");
        res.redirect("/listings");
    });
}
