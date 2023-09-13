

const {Server}= require('socket.io');

const io=new Server(9000,{
    cors:{
        origin:'http://localhost:5173'
    }
})

let users=[];

const addUser=(userData,socketId)=>{
   ! users.some(user=>user.sub==userData.sub) && users.push({...userData,socketId});
}

io.on('connection',(socket)=>{

    socket.on("addUsers",userData=>{
        addUser(userData,socket.id);
        io.emit("getUsers",users);
    });

    socket.on("sendMessage",(message)=>{
        const receivingUser=users.find(user=>user.sub==message.receiverId);
        const sendingUser=users.find(user=>user.sub==message.senderId);
        if(receivingUser.socketId!=null)
        io.to(receivingUser.socketId).emit("getMessage",
            message
        );
        if(sendingUser.socketId!=null)
        io.to(sendingUser.socketId).emit("getMessage",
            message
        );

    })
})