const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { chatGateway } = require('./gateways/chat/chat-gateway')
const { validateToken } = require('./twitch/twitch-validate.js')

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
      const channel = req.body.channel
      const token = req.body.token
      await channels.addChannel(channel)
      await users.addChannel(token, channel)
    })

    .post('/users', async (req, res) => {
      const userId = req.body.userId
      await users.addUser(userId)
    })

    .post('/validation', async (req, res) => {
      const token = req.body.token
      const validated = await validateToken(token)

      if (validated.sub) {
        const userData = {
          token: token,
          channelId: validated.sub
        }
        await users.addUser(userData)
        res.send(true)
      }
      res.send(false)

    })

  return app
}

module.exports = { createApp }
