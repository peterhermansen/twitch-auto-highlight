function createSocket(server, eventEmitter, highlights, channels) {

  const io = require('socket.io').listen(server)

  io.on('connection', (socket) => {

    async function emitInitialChannelList() {
      const initialChannelList = await channels.findChannels()
      io.emit('updateChannelList', initialChannelList)
    }

    emitInitialChannelList()

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
