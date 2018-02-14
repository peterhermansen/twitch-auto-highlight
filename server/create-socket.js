function createSocket(server) {

  const io = require('socket.io').listen(server)

  io.on('connection', (socket) => {
    socket
      .on('updateChannelList', (channelList) => {
        io.emit('updateChannelList', channelList)
      })
  })
}
