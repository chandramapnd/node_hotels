const mongoose=require("mongoose")
const bcrypt=require("bcrypt");

const personSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,

        
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

personSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatched = await bcrypt.compare(candidatePassword,this.password);
        return isMatched;
    }catch(error)
    {
        throw error;
    }
}

const Person=mongoose.model("Person",personSchema);

module.exports=Person;