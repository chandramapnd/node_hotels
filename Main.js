const express=require("express");
const { size } = require("lodash");
const app=express();

app.get('/greet',function(req,res){
    res.send("Hello world welcome");
})

app.get('/idli',function(req,res){
    var customizedIdli={
        name : "ravaidli",
        size : "10 cm diameter",
        isShambhar:true,
        isChutney:false
    }
    res.send(customizedIdli);
})

app.get('/chicken',function(req,res){
    res.send("Delicius Chicken is available");
})

app.get('/greet',function(req,res){
    res.send("Hello world welcome");
})

app.post('/student',(req,res)=>{
    console.log("data is saved");
    res.send("data is sent");

})

app.listen(3000);