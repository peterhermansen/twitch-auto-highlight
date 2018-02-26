function createSocket(server, eventEmitter, highlights, channels, users) {
  const io = require('socket.io').listen(server)

  io.on('connection', (socket) => {

    socket.on('channelArrayUpdate', async (token) => {
      const userObject = await users.findUserToken(token)
      io.emit('channelArrayNew', userObject)
    })

    eventEmitter.on('channelArrayUpdate', (userObject) => {
      io.emit('channelArrayNew', userObject)
    })

    socket.on('highlightArrayChange', async (idObject) => {
      let channelArray = idObject.channelId
      if (!channelArray[0]) {
        channelArray = await users.findUserToken(idObject.token)
        channelArray = channelArray.channelArray
      }
      const highlightArray = await highlights.findHighlights(channelArray)
      io.emit('highlightArrayUpdate', highlightArray)
    })
  })
}

module.exports = { createSocket }
