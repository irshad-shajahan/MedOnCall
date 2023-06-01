const { adduser, user, getReceiver, RemoveUser } = require("./EmitterChat");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    
    socket.on("disconnect", () => {
      console.log('user disconneted')
      RemoveUser(socket.id)
    });

    socket.on("adduser", (userid) => {
      adduser(userid, socket.id)
        io.emit('getuser',user)
      });
    
    socket.on('sendMessage', ({ receiverid }) => {
      const receiver = getReceiver(receiverid)
      if (receiver) {
        io.to(receiver?.socketid).emit('getMessage')
      }
    })
    socket.on('requestVideoCall', ({ receiverid }) => {
      const receiver = getReceiver(receiverid)
      if (receiver) {
        io.to(receiver?.socketid).emit('getVideoCall')
      }
    })
    socket.on('videoCallRejected', ({ receiverid }) => {
      const receiver = getReceiver(receiverid)
      if (receiver) {
        io.to(receiver?.socketid).emit('getvideoCallRejected')
      }
    })
    socket.on('videoCallAccepted', ({ receiverid }) => {
      const receiver = getReceiver(receiverid)
      if (receiver) {
        io.to(receiver?.socketid).emit('getvideoCallAccepted')
      }
    })
    socket.on('endSession', ({ receiverid }) => {
      const receiver = getReceiver(receiverid)
      if (receiver) {
        io.to(receiver?.socketid).emit('getEndSession')
      }
    })
    socket.on('prescription-done', ({ receiverid }) => {
      console.log(receiverid);
      const receiver = getReceiver(receiverid)
      console.log(receiver);
      if (receiver) {
        io.to(receiver?.socketid).emit('getPrescriptionDone')
      }
    })
  }); 
};



