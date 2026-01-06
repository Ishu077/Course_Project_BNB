// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   image: {
//     type: String,
//     default:
//       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     set: (v) =>
//       v === ""
//         ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//         : v,
//   },
//   price: Number,
//   location: String,
//   country: String,
// });

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

// Sub-schema for the image object
const imageSchema = new Schema({
  filename: {
    type: String,
    // required: true, // Marked as required
    default: "listingimage",
  },
  url: {
    type: String,
    // required: true, // Marked as required
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEXx8e/09PL5+PbIyMjw8ew4OTutra/n5uV1dHaamppISUzNzc1lZ2diZGZGR0nu7ew9PkBPUFK8vLtra2xWV1nU1NPf4N14eXinp6Z9fH2goKCzs7OGhoaPj5CUlZRvcXBRVFIGBKCSAAACgUlEQVR4nO2Y3ZKiMBBG7cYBDZIfSBgV0Hn/p5xW11EcrK2lKkBtfeeCCwjkVNLpTlitAAAAAAAAAAAAAAAAAAAAAAAAgBEQmfU4iGI5cXLYjOSQcBwnCtrtbhTFv113Soc4Y8VH3WTjMI0+xpGircpHfplytYXUm8a99bYAKbMmk5e5eTRegJQ4VNZ+VDk/bswuRbVzbdq6r/refAFS3Nk9M+/t6T5UC5BaVT6T5pk//7w6odSbfqjy5ipVTS9FJhluyCe7J+LjDNNHprPNYJmVQFfdvtMqmzjQ1xR2yrtysCsKZ6fc5lGDJ5LivLBdo3w9PFZZXiaTJ09qtEuJG1XUw51NX2aIT0qVMkZ00tW7Ndh7Nb4U15+6us0bt/pghhqvew7xpTjb6XP2J5aysz4NhBWtesEWXYpLWfD8E1ymsr83lRQKlz9ZxZbixtl0tX7qXxJDf6xkAXitfHjcjSvFq9YW/ZMJB/eRPPfI9cH6slFO2pn4Ujo3B+1fk8AlMTydVSSD6SrQJWnkU5QZl3rbml9fZ+n/XlEuxccdLzKX2LvPa1Qpr7qBtETc6c+bFYdP7ZNb4qTyOoPRpV5D+udRZzeyIGXOrO7u2ULG6ks117iKGuhvnMTmrLckq0BJ8XkKr+SW+GfaeZIk0WPi9blfoFlu7Xm27TDVSiLumL0MpdiolGbbo3PuioFfK5yLKs92cKAkG3pKwckMznaaebMIOBR6G+Y/Yr28V3u3cQuTEqvCLU5KEsZueVKSEvQSpSIGemAaRbyUwKluk5G0Oo3zz5pMYT9GYneG1n/vYpRV2aTjKGM5CTyaWEYAAAAAAAAAAAAAAAAAAAAAAAD+c74BTdwqZbhy+14AAAAASUVORK5CYII=",
  },
});

const listingSchema = new Schema({
  title: {
    type: String,
    required: true, // Marked as required
  },
  description: {
    type: String,
    // required: true, // Marked as required
  },
  image: {
    type: imageSchema, // Embedded sub-schema for image
    // default: () => ({
    //   filename: "listingimage",
    //   url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEXx8e/09PL5+PbIyMjw8ew4OTutra/n5uV1dHaamppISUzNzc1lZ2diZGZGR0nu7ew9PkBPUFK8vLtra2xWV1nU1NPf4N14eXinp6Z9fH2goKCzs7OGhoaPj5CUlZRvcXBRVFIGBKCSAAACgUlEQVR4nO2Y3ZKiMBBG7cYBDZIfSBgV0Hn/p5xW11EcrK2lKkBtfeeCCwjkVNLpTlitAAAAAAAAAAAAAAAAAAAAAAAAgBEQmfU4iGI5cXLYjOSQcBwnCtrtbhTFv113Soc4Y8VH3WTjMI0+xpGircpHfplytYXUm8a99bYAKbMmk5e5eTRegJQ4VNZ+VDk/bswuRbVzbdq6r/refAFS3Nk9M+/t6T5UC5BaVT6T5pk//7w6odSbfqjy5ipVTS9FJhluyCe7J+LjDNNHprPNYJmVQFfdvtMqmzjQ1xR2yrtysCsKZ6fc5lGDJ5LivLBdo3w9PFZZXiaTJ09qtEuJG1XUw51NX2aIT0qVMkZ00tW7Ndh7Nb4U15+6us0bt/pghhqvew7xpTjb6XP2J5aysz4NhBWtesEWXYpLWfD8E1ymsr83lRQKlz9ZxZbixtl0tX7qXxJDf6xkAXitfHjcjSvFq9YW/ZMJB/eRPPfI9cH6slFO2pn4Ujo3B+1fk8AlMTydVSSD6SrQJWnkU5QZl3rbml9fZ+n/XlEuxccdLzKX2LvPa1Qpr7qBtETc6c+bFYdP7ZNb4qTyOoPRpV5D+udRZzeyIGXOrO7u2ULG6ks117iKGuhvnMTmrLckq0BJ8XkKr+SW+GfaeZIk0WPi9blfoFlu7Xm27TDVSiLumL0MpdiolGbbo3PuioFfK5yLKs92cKAkG3pKwckMznaaebMIOBR6G+Y/Yr28V3u3cQuTEqvCLU5KEsZueVKSEvQSpSIGemAaRbyUwKluk5G0Oo3zz5pMYT9GYneG1n/vYpRV2aTjKGM5CTyaWEYAAAAAAAAAAAAAAAAAAAAAAAD+c74BTdwqZbhy+14AAAAASUVORK5CYII=",
    // }),
  },
  price: {
    type: Number,
    // required: true, // Marked as required
  },
  location: {
    type: String,
    // required: true, // Marked as required
  },
  country: {
    type: String,
    // required: true, // Marked as required
  },
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User"
  },
  geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  } 
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
