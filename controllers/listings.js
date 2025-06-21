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
module.exports.addList=async (req,res,next)=>{
  //map box geocoding to get the coordinates of the location
  let response =await geocodingClient.forwardGeocode({
    query: req.body.list.location, //location from the body
    limit: 1,
  }).send()

  // console.log(response.body.features[0].geometry.coordinates); //coordinates of the location


  let list=req.body.list; //another way to retrieve data from the body
    if(req.file){  //if the file is not uploaded then go for default, will not enter into this condn!
      let URL=req.file.path;  //for storing the cloud link to the mongodb
      let fileName=req.file.filename;
      // console.log(url,"..",filename);  //working fine!
      list.image = {
        filename: fileName, // Placeholder for filename, you can modify this logic
        url: URL,
      };
    }

    // try{
      // let{title,description,image,price,country,location}=req.body;

      //***maing the below code a function which can be used in every route to validate!!*** */
      // let result=listingSchema.validate(req.body);  //server side validation of individual fields of the list therse fore 
      // console.log(result);                         // I have commented the below if condn to throw error when the list is empty as it will be taken care by joi !
      // //here joi is detecting and identifying the error but not throwing them!!
      // if(result.error){  //if the result contains the error attribute.ie a validation error has occured
      //   throw new ExpressError(400,result.error.details[0].message);
      // }

      // console.log(list);
      // if(!list){  //if the list is empty, i.e. no data is sent!
      //   throw new ExpressError(400,"send valid data for listing");
      // }

      if(list.image==''){  //to make the default work!
          delete list.image;
      }
      let newListing=new listing(list);
      newListing.owner=req.user._id;

      newListing.geometry=response.body.features[0].geometry; //setting the geometry of the listing to the coordinates of the location
      console.log(newListing);

      await newListing.save();
      req.flash("success","New Listing Created!");
      res.redirect("/listings");
    // }catch(err){
    //   next(err);
    // }
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

module.exports.editList=async (req, res) => {
    let { id } = req.params;
    let list = req.body.list;
    // if(!list){  //if the list is empty, i.e. no data is sent!
    //   throw new ExpressError(400,"send valid data for listing");
    // }

    // console.log(list); 

    if(req.file){  //if the file is not uploaded then go for default, will not enter into this condn!
      let URL=req.file.path;  //for storing the cloud link to the mongodb
      let fileName=req.file.filename;
      // console.log(url,"..",filename);  //working fine!
      list.image = {
        filename: fileName, // Placeholder for filename, you can modify this logic
        url: URL,
      };
      await listing.findByIdAndUpdate(
        { _id: id },
        {
          title: list.title,
          description: list.description,
          image: list.image, // Correctly formatted image object
          price: list.price,
          location: list.location,
          country: list.country,
          reviews: list.reviews,
          owner: req.user._id,
        }
      );
    }

    // Check if image is a string, and if so, convert it into the proper object structure
    if(list.image==''){
        delete list.image;
        await listing.findByIdAndUpdate(
            { _id: id },
            {
              title: list.title,
              description: list.description,
            //   image: list.image, // Correctly formatted image object
              price: list.price,
              location: list.location,
              country: list.country,
              reviews: list.reviews,
              owner: req.user._id,
            }
          );
    }
    // else if (typeof list.image === 'string') {
    //   let URL=req.file.path;  //for storing the cloud link to the mongodb
    //   let fileName=req.file.filename;
    //   list.image = {
    //     filename: 'listingimage', // Placeholder for filename, you can modify this logic
    //     url: list.image,
    //   };
    //   await listing.findByIdAndUpdate(
    //     { _id: id },
    //     {
    //       title: list.title,
    //       description: list.description,
    //       image: list.image, // Correctly formatted image object
    //       price: list.price,
    //       location: list.location,
    //       country: list.country,
    //       reviews: list.reviews,
    //       owner: req.user._id,
    //     }
    //   );
    // }
    
  
    console.log(list);
  
    
    const updatedlist=await listing.findById(id);
    console.log(updatedlist);
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteList=async (req,res)=>{
    let {id}=req.params;
    let deleteListing= await listing.findByIdAndDelete(id);  //cascading to the review model i.e. the reviews correspondin to the the listing will also get deleted
    console.log(deleteListing);                            // implemented by .post middleware of the findanddelte for listingschema! see the lisitng.js in model folder!

    req.flash("success","Listing deleted!");
    res.redirect("/listings");
};