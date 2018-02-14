require('dotenv/config')
const { createApp } = require('./create-app')
const { createSocket } = require('./create-socket')
const { MongoClient } = require('mongodb')
const highlightsGateway = require('./highlights-gateway')
const channelsGateway = require('./channels-gateway')

MongoClient.connect(process.env.MONGODB_URI, async (err, db) => {

  if (err) console.log(err)

  const highlights = db.collection('highlights')
  const channels = db.collection('channels')

  const app = createApp(highlightsGateway(highlights), channelsGateway(channels))

  const server = app.listen(process.env.PORT, () => {
    console.log('Listening on ' + process.env.PORT)
  })

  createSocket(server)

})
