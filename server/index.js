require('dotenv/config')
const { createApp } = require('./create-app')
const { createSocket } = require('./create-socket')
const { MongoClient } = require('mongodb')
const highlightsGateway = require('./highlights-gateway')
const channelsGateway = require('./channels-gateway')
const EventEmitter = require('events').EventEmitter
const eventEmitter = EventEmitter()

MongoClient.connect(process.env.MONGODB_URI, async (err, db) => {

  if (err) console.log(err)

  const highlights = db.collection('highlights')
  const channels = db.collection('channels')

  const app = createApp(
    highlightsGateway(highlights),
    channelsGateway(channels),
    eventEmitter
  )

  const server = app.listen(process.env.PORT, () => {
    console.log('Listening on ' + process.env.PORT)
  })

  createSocket(server, eventEmitter)

})
