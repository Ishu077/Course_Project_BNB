const listing=require("../Models/listing");

const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding'); // map box -sdk
const mapToken=process.env.MAP_TOKEN; //mapbox token from the env file
const geocodingClient = mbxGeocoding({ accessToken: mapToken }); //creating a client to access the mapbox api

module.exports.index=async (req,res)=>{
    let allListings=await listing.find({});
    res.render("./listings/index.ejs",{alllist:allListings});
}
module.exports.renderAddList=(req,res)=>{
  //shifting the authentication condition to the middleware file!
  // if(!req.isAuthenticated()){  //checking whether the user is logged in or not!
  //   req.flash("error","you must be logged in to create a listing");
  //   res.redirect("/login");
  // }

    res.render("listings/new.ejs");
};
module.exports.addList = async (req, res, next) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.list.location,
    limit: 1,
  }).send();

  let list = req.body.list;
  
  // Handle image
  if (req.file) {
    console.log(req.file);
    list.image = {
      filename: req.file.filename,
      url: req.file.path,
    };
  } else if (list.image === '') {
    delete list.image; // Use default from schema
  }
  console.log(list);
  let newListing = new listing(list);
  newListing.owner = req.user._id;
  newListing.geometry = response.body.features[0].geometry;
  console.log(newListing);
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};
module.exports.renderShowList=async (req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id)
                            .populate({    //nested population!! as We also need author of the review!!
                              path:"reviews",
                              populate:{
                                path:"author",
                              },
                            })
                            .populate("owner");

    console.log(list);
    if(!list){   //for failure flash message!!
      req.flash("error","Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
};
module.exports.renderEditList=async (req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id);
    if(!list){   //for failure flash message!!
      req.flash("error","Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    console.log(list);

    //for image preview  We are doing it!
    let originalImageUrl=list.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250"); //see cloudinary docs
    res.render("listings/edit.ejs",{l:list,originalImageUrl});
};

module.exports.editList = async (req, res) => {
  let { id } = req.params;
  let list = req.body.list;

  // Prepare the update object
  let updateData = {
    title: list.title,
    description: list.description,
    price: list.price,
    location: list.location,
    country: list.country,
  };

  // Handle image updates
  if (req.file) {
    // New file uploaded
    updateData.image = {
      filename: req.file.filename,
      url: req.file.path,
    };
  } else if (list.image === '') {
    // Empty image field - delete to use default
    updateData.image = undefined;
  }
  // If neither condition is true, don't update the image field (keep existing)

  // Single update call
  await listing.findByIdAndUpdate(
    { _id: id },
    updateData,
    { new: true }
  );

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteList=async (req,res)=>{
    let {id}=req.params;
    let deleteListing= await listing.findByIdAndDelete(id);  //cascading to the review model i.e. the reviews correspondin to the the listing will also get deleted
    console.log(deleteListing);                            // implemented by .post middleware of the findanddelte for listingschema! see the lisitng.js in model folder!

    req.flash("success","Listing deleted!");
    res.redirect("/listings");
};