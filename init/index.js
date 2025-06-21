const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../Models/listing.js");

main().then(()=>{
    console.log("connect to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

const initDb=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({  //insitialising the owner to every listing!
        ...obj,
        owner:'67dd2e4490eebac9064db4e7',
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}
initDb();
