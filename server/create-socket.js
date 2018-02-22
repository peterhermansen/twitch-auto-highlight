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

    socket.on('highlightArrayChange', async (idObject) => {
      let channelArray = idObject.channelId
      if (!channelArray[0]) {
        channelArray = await users.findUser(idObject.userId)
        channelArray = channelArray.channelArray
      }
      const highlightArray = await highlights.findHighlights(channelArray)
      io.emit('highlightArrayUpdate', highlightArray)
    })
  })
}

module.exports = { createSocket }
