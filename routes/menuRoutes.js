const express=require("express");
const router=express.Router()
const MenuItem=require("./../models/menuItem")

router.get('/',function(req,res){
    
    res.send("check menu");
    
})


router.post("/",async(req,res)=>{
    try{
        const data=req.body;
        const newMenuItem=new MenuItem(data);
        const savedMenu=await newMenuItem.save();

        res.status(200).json({
            message:"menu saved",
            savedMenu
        })
    }catch(err){
        res.status(500).json({
            message:"Server Error",
            error
        })
    }
 })

 router.get('/:taste',async(req,res)=>{
    try{
        const taste=req.params.taste
        if(taste=='spicy' || taste=='sour' || taste=='sweet'){
            const response = await MenuItem.find({taste:taste})
            console.log("response fetched");
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Invalid Work Type'});
        }
    }catch (error) {
        res.status(500).json({
            message:"Server Error",
            error
        })
    }
})

 module.exports=router;
