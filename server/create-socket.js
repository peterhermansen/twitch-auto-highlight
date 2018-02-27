async function createSocket(server, eventEmitter, highlights, channels, users) {
  const io = require('socket.io').listen(server)

  function createNamespace(token) {
    const nsp = io.of('/' + token)
    nsp.on('connection', (socket) => {

      socket.on('channelArrayUpdate', async (token) => {
        const userObject = await users.findUserToken(token)
        nsp.emit('channelArrayNew', userObject)
      })

      eventEmitter.on('channelArrayUpdate', (userObject) => {
        if (userObject.token === token) {
          nsp.emit('channelArrayNew', userObject)
        }
      })

      socket.on('highlightArrayChange', async (idObject) => {
        let channelArray = idObject.channelId
        if (!channelArray[0]) {
          channelArray = await users.findUserToken(idObject.token)
          channelArray = channelArray.channelArray
        }
        const highlightArray = await highlights.findHighlights(channelArray)
        nsp.emit('highlightArrayUpdate', highlightArray)
      })

      eventEmitter.on('highlightArrayUpdate', async (channelId) => {
        const userObject = await users.findUserToken(token)
        const channelMatch = userObject.channelArray.filter((channel) => {
          return channel === channelId
        })
        if (channelMatch.length === 1) {
          const highlightArray = await highlights.findHighlights(userObject.channelArray)
          nsp.emit('highlightArrayUpdate', highlightArray)
        }
      })
    })
  }

  const userArray = await users.findUserAll({})
  const tokenArray = userArray.map((userObject) => {
    return userObject.token
  })

  tokenArray.map((token) => {
    createNamespace(token)
  })

  eventEmitter.on('userTokenUpdate', (token) => {
    createNamespace(token)
  })
}

module.exports = { createSocket }
