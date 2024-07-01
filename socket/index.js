const io = require('socket.io')(8800, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    // Add new User
    socket.on('new-user-add', (newUserId) => {
      console.log(`New user added: ${newUserId}`);
      // If user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({
          userId: newUserId,
          socketId: socket.id
        });
      }
      console.log("Connected Users", activeUsers);
      io.emit('get-users', activeUsers);
    });

    // send message
    socket.on("send-message",(data)=>{
        const {receiverId} =data;
        console.log("beaualh receiverid "+ receiverId)
        const user =activeUsers.find((user)=>user.userId === receiverId )
        console.log("sending from socket to :" ,receiverId)
        console.log("Data", data)

        if(user){
           io.to(user.socketId).emit("receive-message",data)
        }
    })
  
    // Handle user disconnect
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      io.emit('get-users', activeUsers);
    });
  });
  
  console.log("Socket.IO server running on port 8800");
  