const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const chatGateway = require('./chat-gateway')

function createApp(gateway) {

  const app = express()
  const highlights = gateway

  app
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())

    .post('/', (req, res) => {
      chatGateway(req.body.channelData, highlights).monitorChat()
      res.send('Monitoring Stream!')
    })

    .post('/highlights', async (req, res) => {
      const highlightList = await highlights.find()
      res.send(highlightList)
    })

  return app
}

module.exports = { createApp }
