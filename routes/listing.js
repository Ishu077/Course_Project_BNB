const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}= require("../schema.js");
const ExpressError=require("../utils/expressError.js")
const listing=require("../Models/listing.js");
const Review=require("../Models/review");

const {isLoggedIn,isOwner}=require("../middleware.js");

//image uplaod vala!
const {storage}=require("../cloudConfig.js");
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const upload = multer({storage }) // now multer will store the uplaoded image in cloudinary storage!


//requireing controlers!
const listingController=require("../controllers/listings.js");

const validateListing=(req,res,next)=>{
  let result=listingSchema.validate(req.body);  //server side validation of individual fields of the list therse fore 
      console.log(result);                         // I have commented the below if condn to throw error when the list is empty as it will be taken care by joi !
      //here joi is detecting and identifying the error but not throwing them!!
      if(result.error){  //if the result contains the error attribute.ie a validation error has occured
        throw new ExpressError(400,result.error.details[0].message);
      }else{
        next();
      }
};

//also now require all those objects and function that were being used in app.js to execute these routes like wrapasync, validatefunction etc
//and also change the "route" i.e. remove the remove "/listing" from teh routes!

//making use of router.route--> (refer to docs on how to use)
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
  upload.single('list[image]'),
  validateListing,
  wrapAsync(listingController.addList));
// .post(upload.single('list[image]'),(req,res)=>{
//   res.send(req.file);
// })



//index route
// router.get("/",wrapAsync(listingController.index));

//Create: new and create route

router.get("/new",isLoggedIn,listingController.renderAddList);  //should be above "/:id" coz it may o/w may interpretet it as id

// router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.addList));

//*** */
router.route("/:id")
.get(wrapAsync(listingController.renderShowList))
.put(isLoggedIn,upload.single('list[image]'),isOwner,validateListing,wrapAsync( listingController.editList))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteList));
//*** */

//read:show route

// router.get("/:id",wrapAsync(listingController.renderShowList));

//edit and update route

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditList));

// router.put("/listings/:id",async(req,res)=>{
//     let {id}=req.params;
//     let list=req.body.list;
//     console.log(list);
//     await listing.findByIdAndUpdate({_id:id},{title:list.title,description:list.description,image:list.image,price:list.price,location:list.location,country:list.country}); //deconstructing the object and setting its data to the object of the databse whose id matches!
//     // console.log(val);
//     res.redirect("/listings");
// })

// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync( listingController.editList));

//delete route

// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteList));

module.exports=router;
