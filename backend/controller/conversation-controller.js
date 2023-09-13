const Conversation=require('./../model/conversation.js');
const Message=require('./../model/message.js');
const newConversation=async(req,res)=>{
    try{
        const senderId=req.body.senderId;
        const receiverId=req.body.receiverId;
        const exist=await Conversation.findOne({members:{$all:[receiverId,senderId]}});
        if(exist){
            return res.status(200).json({message:"Conversation already exists"});
        }

        const newConversation=new Conversation({
            members:[senderId,receiverId]

    });
    await newConversation.save();
    return res.status(200).json({message:"Conversation created successfully"});
}
catch(err){
    return res.status(500).json({message:"Internal server error"});
    }

}

const getConversation=async(req,res)=>{
    try{
        const senderId=req.body.senderId;
        const receiverId=req.body.receiverId;
        const convo=await Conversation.findOne({members:{$all:[receiverId,senderId]}});
        return res.status(200).json(convo);
    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

const uploadNewMessage=async(req,res)=>{
    try{
        const newMessage=new Message(req.body);
        await newMessage.save();

        await Conversation.findByIdAndUpdate(req.body.conversationId,{messages:req.body.text});
        return res.status(200).json({message:"Message sent successfully"});

    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

const getMessages=async(req,res)=>{
    try{
        const messages=await Message.find({conversationId:req.params.id});
        return res.status(200).json(messages);

    }
    catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

module.exports={newConversation,getConversation,uploadNewMessage,getMessages};