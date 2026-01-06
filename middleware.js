const listing=require("./Models/listing");
const Review=require("./Models/review");

module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.path,"...",req.originalUrl);
    if(!req.isAuthenticated()){  //checking whether the user is logged in or not!
        //redirect url save
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create a listing/give or delete a listing");
        return res.redirect("/login");  //here return is necessary o/w it will call next and other middleware will execute nd they may give error it the user is not logged in !
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;//res.locals can be accessed anywhere so problem solved!
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
    let { id } = req.params;
    let l=await listing.findById(id);
    if(!l.owner.equals(res.locals.curruser._id)){
      req.flash("error","you are not the Owner of this Listing")
      return res.redirect(`/listings/${id}`);
    }
    next(); //coz it is middleware
}


module.exports.isReviewAuthor=async (req,res,next)=>{
    let { id,reviewId } = req.params;
    let l=await Review.findById(reviewId);
    if(!l.author._id.equals(res.locals.curruser._id)){
      req.flash("error","you are not the author of this review")
      return res.redirect(`/listings/${id}`);
    }
    next(); //coz it is middleware
}