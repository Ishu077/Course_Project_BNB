if(process.env.NODE_ENV!="production"){
    require('dotenv').config();//we dont upload our .env file on github coz it contain important credentials!
}
//u will later undersatnd in the production phase 
// console.log(process.env.SECRET);

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./Models/listing");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/expressError.js")
const {listingSchema,reviewSchema}= require("./schema.js");
const Review=require("./Models/review");
const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

const session=require("express-session");
const MongoStore = require('connect-mongo');  // to store session in mongoDB earlier the session was stored in local memory
const flash=require("connect-flash");
const passport=require("passport");
const LocalStratergy=require("passport-local").Strategy;   //prev here stratery was not there
const User=require("./Models/user.js");

//const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"; //for local db
const MONGO_URL=process.env.ATLASDB_URL; //for atlas db

const sessionOptions={
    secret:process.env.SECRET, //secret key to sign the session ID cookie
    resave:false,
    saveUnitialized:true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,  //expire after 7 days
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    },
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        touchAfter: 24 * 3600, // time period in seconds after which the session will be updated
        crypto: {
            secret:process.env.SECRET
        }
    }).on("error", function(e) {
        console.log("Session store error or error in Mongodb session store!", e);
    })
};


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate); //use of ejsmate
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    // console.log()
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user; //for login,siignupand logout opt visibility condition -check
    next();
});




main().then(()=>{
    console.log("connect to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.listen(8080,()=>{
    console.log("server is listening at the port 8080");
    
});



// app.get("/",(req,res)=>{
//     console.log("Hi,I am ro");
//     res.send("hi, I'm root")
// })

//testing by creating the user
// app.get("/demouser", async (req,res)=>{
//     let fakeUser=new User({
//         email:"ishu@gmail.com",
//         username:"ishu"
//     })
//     let registeredUser=await User.register(fakeUser,"helloWorld");  //register is the static method os the user model 
//     res.send(registeredUser);
// })

//reitialising the databse:
// app.get("/testlisting",async (req,res)=>{
//     let sampleListing =new listing({
//         title:"My new Villa",
//         descripting:"By the beach",
//         price:1200,
//         location:"Calanute,Goa",
//         country:"India"
//     });
//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("successful testing");
// });


//validating schema and the server side functions used as middlewares!

//also shifted with the route to routes folder


//listing routes-->

//shifted to route folder
app.use("/listings",listingsRouter); //jhan pr listings se route aya vo use 'listings' ko use krega

//reviews route-->

//sifter to routes folder
app.use("/listings/:id/reviews",reviewsRouter);

//user route-->
app.use("/",userRouter);

//middle wares for error
app.all("*",(req,res,next)=>{  //for when no path matched with the routes
  next(new ExpressError(404,"Page not found"));
})

app.use((err,req,res,next)=>{   
  let {status=500,message="something went wrong" }=err;
  console.log("error : ",err);
  res.status(status).render("error.ejs",{err});
  // res.status(status).send(message);
  // res.send("Something went wrong!");
});



