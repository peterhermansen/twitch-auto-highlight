function createSocket(server, eventEmitter, highlights) {

  const io = require('socket.io').listen(server)

  io.on('connection', (socket) => {

    eventEmitter.on('updateChannelList', (channelList) => {
      io.emit('updateChannelList', channelList)
    })

    socket.on('highlightArrayChange', async (channel) => {
      const highlightArray = await highlights.findHighlights(channel)
      io.emit('highlightArrayUpdate', highlightArray)
    })
  })
}

module.exports = { createSocket }
