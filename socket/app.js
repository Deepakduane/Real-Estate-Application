import {Server} from "socket.io";

const io = new Server({
    cors : {
        origin : "http://localhost:5173",
    },
});

let onlineUser = []

const addUser = (userId, socketId) =>{
    const userExists = onlineUser.find((user)=>user.userId === userId)

    if(!userExists){
        onlineUser.push({userId, socketId})
    }
};

const getUser = (userId) =>{
    return onlineUser.find((user)=>user.userId === userId)
}

const removeUser = (socketId) =>{
    onlineUser = onlineUser.filter((user)=>user.socketId !== socketId);
}

io.on("connection", (socket) =>{
//    console.log(socket.id)
   
    socket.on("newUser",(userId)=>{
        addUser(userId, socket.id);
        // console.log("online user")
        // console.log(onlineUser);
    });

    socket.on("disconnect",(userId)=>{
        removeUser(socket.id);
    });

    socket.on("sendMessage",({recieverId, data})=>{

        //console.log(recieverId +"?"+ data)
        const reciever = getUser(recieverId);
        //console.log("reciever")
       // console.log(reciever)
        io.to(reciever.socketId).emit("getMessage", data);
    });

})



io.listen("4000")