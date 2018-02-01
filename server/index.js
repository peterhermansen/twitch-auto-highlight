require('dotenv/config')
const { createApp } = require('./create-app')
const { MongoClient } = require('mongodb')
const highlightsGateway = require('./highlights-gateway')

MongoClient.connect(process.env.MONGODB_URI, async (err, db) => {

  if (err) console.log(err)

  const collection = db.collection('highlights')
  const app = createApp(highlightsGateway(collection))

  app.listen(process.env.PORT, () => {
    console.log('Listening on ' + process.env.PORT)
  })

})
