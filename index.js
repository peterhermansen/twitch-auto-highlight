const tmi = require('tmi.js')
const express = require('express')
const { MongoClient } = require('mongodb')

const app = express()

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: 'hermansenph',
    password: 'oauth:eks76bpwsn8ma8kns136x9jubcaiyg'
  },
  channels: ['#shroud']
}

let chatNum = 0

const client = new tmi.Client(options)

const pushChat = () => {
  client.connect()
  client.on('chat', (channel, userstate, message, self) => {
    console.log(chatNum)
    chatNum++
  })
  setInterval(() => {
    MongoClient.connect('mongodb://localhost/twitch-auto-highlight')
      .then((db) => {
        const chat = db.collection('chat')
        chat.insertOne({chatNum})
          .then(result => {
            console.log(result)
            chatNum = 0
          })
          .then(result => {
            chat.find().toArray()
              .then(result => {
                if (result.length > 6) {
                  chat.deleteOne({})
                }
                else {
                  console.log(result)
                }
                db.close()
              })
          })
      })
  }, 10000)
}

app.get('/', (req, res) => {
  pushChat()
  res.send('Monitoring Stream!')
})

app.listen(3000, () => {
  console.log('Listening on :3000...')
})
