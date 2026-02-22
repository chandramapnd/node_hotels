const express=require("express");
const router=express.Router()
const Person=require("./../models/person")
router.get('/',async(req,res)=>{
    try{
        
        const data = await Person.find()
        console.log("response fetched");
        res.status(200).json(data);

    }catch (error) {
        res.status(500).json({
            message:"Server Error",
            error
        })
    }
})

router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType
        if(workType=='chef' || workType=='waiter' || workType=='manager'){
            const response = await Person.find({work:workType})
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
router.post('/', async(req,res)=>{

    try {

        const data = req.body;
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();

        res.status(200).json({
            message:"Person saved",
            savedPerson
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Server Error",
            error
        })
    }

 });

router.put("/:id",async(req,res)=>
{
    try{
        const personId=req.params.id;
        const updatedData=req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedData,{
            new :true,
            runValidators: true
        });

        if(!response)
        {
            res.status(404).json({error:"Person not found"})
        }

        console.log("data updated");
        res.status(200).json(response)
        
    }catch(error){ 
        res.status(500).json({
            message:"Server Error",
            error
        })
    }
})

router.delete('/:id',async(req,res)=>{
    console.log(req.params.id);
    
    try{
        const id=req.params.id;
        const response=await Person.findByIdAndDelete(id);

        if(!response)
        {
            res.status(404).json({error:"Person not found"})
        }

        console.log("deleted deleted successfully");
        res.status(200).json(response)
    }catch(error){
        console.log(error);
        
        res.status(500).json({
            message:"Server Error",
            error
        })
    }

})

 module.exports=router;