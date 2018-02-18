const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { chatGateway } = require('./chat-gateway')

function createApp(highlights, channels, users) {

  const app = express()

  app
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())

    .post('/monitor', (req, res) => {
      chatGateway(req.body.channelData, highlights).monitorChat()
      res.send('Monitoring Stream!')
    })

    .post('/channels', async (req, res) => {
      const channel = req.body.channelData.display_name.toLowerCase()
      await channels.addChannel(channel)
    })

    .post('/users', async (req, res) => {
      const userId = req.body.userId
      await users.addUser(userId)
    })

  return app
}

module.exports = { createApp }
