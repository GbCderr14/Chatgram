const express=require('express');
const Connection=require('./databse/db');
const cors=require('cors');
const bodyParser=require('body-parser');
const Route=require('./routes/routes.js');

const PORT=8000;
const app=express();

Connection();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Route);
app.listen(PORT,()=>console.log(`SERVER IS LISTENING ON PORT ${PORT}`));