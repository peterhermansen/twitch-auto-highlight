const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { chatGateway } = require('./chat-gateway')

function createApp(highlights, channels) {

  const app = express()

  app
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())

    .post('/', (req, res) => {
      chatGateway(req.body.channelData, highlights).monitorChat()
      res.send('Monitoring Stream!')
    })

    .get('/channels', async (req, res) => {
      const channelList = await channels.findChannels()
      res.send(channelList)
    })

    .post('/channels', async (req, res) => {
      const channel = req.body.channelData.display_name.toLowerCase()
      await channels.addChannel(channel)
    })

  return app
}

module.exports = { createApp }
