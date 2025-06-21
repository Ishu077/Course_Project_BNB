const express=require("express");
const router=express.Router({mergeParams:true});

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/expressError.js")
const {listingSchema,reviewSchema}= require("../schema.js");
const Review=require("../Models/review");
const{isLoggedIn,isReviewAuthor}=require("../middleware.js");
const listing=require("../Models/listing");

//requireing controllers
const reviewControllers=require("../controllers/reviews.js");

const validateReveiw=(req,res,next)=>{
  let result=reviewSchema.validate(req.body);
  console.log(result);     
  if(result.error){  //if the result contains the error attribute.ie a validation error has occured
    throw new ExpressError(400,result.error.details[0].message);
    }else{
      next();
    }
}


//index route is already taken care by show.ejs route 
//post route
router.post("/",isLoggedIn, validateReveiw,wrapAsync(reviewControllers.createReview));

//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.deleteReview));

module.exports=router;