const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    iss:{
        type:String
    },
    nbf:{
        type:Number
    },
    aud:{
        type:String
    },
    sub:{
        type:String,
        requrired:true,
    },
    email:{
        type:String
    },
    email_verified:{
        type:Boolean
    },
    azp:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    given_name:{
        type:String
    },
    family_name:{
        type:String
    },
    iat:{
        type:Number
    },
    exp:{
        type:Number
    },
    jti:{
        type:String
    },
});

mongoose.model('user',userSchema);

module.exports=mongoose.model('user');