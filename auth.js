const Person=require("./models/person")
const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;

passport.use(new LocalStrategy(async (username, password, done)=>{
    try{
        console.log("Recieved crediential",username,password)
        const user= await Person.findOne({username:username});

        if(!user)
            return done(null,false,{message:"Incorrect username"})//  done(error,user,info)
        const isMatchPassword=user.password===password?true:false;
        
        if(isMatchPassword)
        {
            return  done(null,user);
        }
        else{
            return done(null,false,{message:"Incorrect password"});
        }

    }catch(error)
    {
        return done(error);
    }
}))

module.exports=passport;