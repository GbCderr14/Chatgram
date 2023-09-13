
const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
    senderId:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    conversationId:{
        type:String,
        required:true
    }
    ,
    text:{
        type:String,
        required:true
    },
    type:{
        type:String
    }},
    {timestamps:true}
);

const message=mongoose.model('Message',messageSchema);

module.exports=message;