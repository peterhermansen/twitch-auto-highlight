require('dotenv/config')
const tmi = require('tmi.js')
const { chatAlgorithm } = require('./chat-algorithm.js')

function chatGateway(channelData, highlights) {
  let chatLog = []
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
  client.on('subscribers', (channel, enabled) => {
    if (!enabled) chatLog = []
  })
  client.on('slowmode', (channel, enabled, length) => {
    if (!enabled) chatLog = []
  })
  client.on('followersonly', (channel, enabled, length) => {
    if (!enabled) chatLog = []
  })

  setInterval(async () => {
    chatLog.push(chatInterval)
    chatInterval = []
    if (chatLog.length > 6) {
      chatLog.splice(0, 1)
    }
    const isHighlight = await chatAlgorithm(chatLog, channelData, highlights)
    if (isHighlight) chatLog = []
  }, 6000)
}

module.exports = { chatGateway }
