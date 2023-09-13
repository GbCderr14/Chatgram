
const User=require('../model/user.js');

const addUser=async(req,res)=>{
        try{
            let exist=await User.findOne({sub:req.body.sub});
            if(exist){
                res.status(200).json({message:"User already exists"});
                return;
            }

            const user=new User(req.body);
            user.save();
            res.status(200).json({message:"User added successfully"});
        }
        catch(err){
            return res.status(500).json({message:"Internal server error"});
        }
}

const getUsers=async(req,res)=>{
    try{
        const users=await User.find();
        return res.status(200).json(users);
    }
    catch(err){
        return res.status(500).json(err.message);
    }
}
module.exports={addUser,getUsers};