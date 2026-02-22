const mongoose=require("mongoose")

// mongoDB url
const mongoURL='mongodb://localhost:27017/hotels'

//setup mongoDB connection

mongoose.connect(mongoURL)

//get the default connection
//mongoose main tain the default connection object representing the MongoDB connection

const db=mongoose.connection;


//define event listener for database connection

db.on('connected',()=>{
    console.log("Connected to MongoDB server");
});

db.on('error',(err)=>{
    console.error("mongoDB connection error : ",err);
});

db.on('disconnected',()=>{
    console.error("mongoDB disconnected");
});

//export database connection
module.exports=db;

