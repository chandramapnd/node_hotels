const express=require("express");
const app=express();

const db=require("./db.js");
const passport=require("./auth")


 const bodyParser=require("body-parser")
 app.use(bodyParser.json());


//Middleware
const logRequest = (req, res, next)=>{
    console.log(`[${new Date().toLocaleString()}] request made to ${req.originalUrl}`)
    next(); //move to the next phase

}
app.use(logRequest);


app.use(passport.initialize());

const localAuthMiddleWare=passport.authenticate('local',{session:false})

app.post('/', localAuthMiddleWare, function(req,res){
    res.send("Welcome to my hotel.... How can i help you? , we have list of menus")
    
})


const personRoutes=require("./routes/personRoutes")
app.use("/person",personRoutes)

const menuRoutes=require("./routes/menuRoutes")
app.use("/menu",localAuthMiddleWare,menuRoutes)

//give port to run
 app.listen(3000,()=>{
    console.log("Listening on port 3000")
})
