const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { chatGateway } = require('./gateways/chat/chat-gateway')
const { monitorChannels } = require('./gateways/chat/monitor-channels')
const { validateToken } = require('./twitch/twitch-validate.js')

function createApp(highlights, channels, users) {

  monitorChannels(channels, chatGateway)

  const app = express()

  app
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())

    .post('/channels', async (req, res) => {
      const newChannel = await channels.addChannel(req.body.channelData)
      if (newChannel) chatGateway(req.body.channelData, highlights).monitorChat()
      await users.addChannel(req.body.token, req.body.channelData.id)
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
      else res.send(false)

    })

  return app
}

module.exports = { createApp }
