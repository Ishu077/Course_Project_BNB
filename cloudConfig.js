const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({  //this is not given in the docs of npm but in cloudinary docs me yes given h!
    cloud_name: process.env.CLOUD_NAME,  //this is how we access variables from .env file!!
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})
const storage = new CloudinaryStorage({  //to tell cloudinary pe konse folder pr jaakr save krna h!
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_dev',
      allowedFormats: ["png","jpg","jpeg"],
    },
  });

module.exports={
    cloudinary,
    storage
}