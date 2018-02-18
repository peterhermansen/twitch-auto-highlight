function createSocket(server, eventEmitter, highlights, channels, users) {
  const io = require('socket.io').listen(server)

  io.on('connection', (socket) => {

    socket.on('channelArrayUpdate', async (userId) => {
      const userObject = await users.findUser(userId)
      io.emit('channelArrayNew', userObject)
    })

    eventEmitter.on('channelArrayUpdate', (userObject) => {
      io.emit('channelArrayNew', userObject)
    })

    socket.on('highlightArrayChange', async (channel) => {
      const highlightArray = await highlights.findHighlights(channel)
      io.emit('highlightArrayUpdate', highlightArray)
    })
  })
}

module.exports = { createSocket }
