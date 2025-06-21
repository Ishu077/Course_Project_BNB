const listing=require("../Models/listing");
const Review=require("../Models/review");

module.exports.createReview=async (req,res)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    let newReview=new Review(
        req.body.review
    );
    newReview.author=req.user._id;
    list.reviews.push(newReview);  //relation btw the listing and review model!

    await newReview.save();
    await list.save();  //to update the change we need to await it again!
    console.log(newReview);
    console.log("New review saved");
    // res.send("New review saved");
    req.flash("success","New Review created!");
    res.redirect(`/listings/${id}`);

};

module.exports.deleteReview=async (req,res)=>{
    console.log("reached");
    let {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});  //deleting the reviews from its corresponding listing
    await Review.findByIdAndDelete(reviewId);  //deleting the review!
  
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};