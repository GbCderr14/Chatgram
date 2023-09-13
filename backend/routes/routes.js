const express=require('express');
const {addUser,getUsers}=require('./../controller/user-controller.js');
const {newConversation,getConversation,uploadNewMessage,getMessages}=require('./../controller/conversation-controller.js');
const {uploadFile,getImage}=require('./../controller/image-controller.js');
const {upload}=require('./../utils/upload.js');
const route=express.Router();

route.post('/addUser',addUser);
route.get('/getUsers',getUsers);
route.post('/conversation/add/',newConversation); 
route.post('/conversation/get/',getConversation); 
route.post('/new-message/',uploadNewMessage); 
route.get(`/get-messages/:id`,getMessages); 
route.post(`/upload/`,upload.single('file'),uploadFile); 
route.get('/file/:filename',getImage);

module.exports=route;