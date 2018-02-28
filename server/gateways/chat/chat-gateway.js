require('dotenv/config')
const tmi = require('tmi.js')
const { chatAlgorithm } = require('./chat-algorithm.js')

function chatGateway(channelData, highlights) {
  return {
    monitorChat() {
      const chatLog = []
      let chatInterval = []
      const channelRemoveSpace = channelData.display_name.replace(' ', '')
      const client = new tmi.Client({
        options: { clientId: process.env.CLIENT_ID },
        connection: { reconnect: true },
        channels: ['#' + channelRemoveSpace]
      })
      client.connect()
      client.on('chat', (channel, userstate, message, self) => {
        chatInterval.push(message)
      })
      setInterval(() => {
        chatLog.push(chatInterval)
        chatInterval = []
        if (chatLog.length > 6) {
          chatLog.splice(0, 1)
        }
        chatAlgorithm(chatLog, channelData, highlights).weightedAverage()
      }, 6000)
    }
  }
}

module.exports = { chatGateway }
