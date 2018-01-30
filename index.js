const tmi = require('tmi.js')
const express = require('express')
const app = express()
const secret = require('./secret.js')
const oauth = secret.oauth()
const bodyParser = require('body-parser')
const path = require('path')
const { MongoClient } = require('mongodb')
const fetch = require('node-fetch')

const myInit = {
  method: 'GET',
  headers: {
    'Client-ID': 'l8lprk488tfke811xasmull5ckhwbh',
    'Accept': 'application/vnd.twitchtv.v5+json'
  }
}

const pushChat = (streamer) => {
  const chatLog = []
  let chatInterval = []
  const channelRemoveSpace = streamer.display_name.replace(' ', '')
  const client = new tmi.Client({
    options: {
      debug: true
    },
    connection: {
      reconnect: true
    },
    identity: {
      username: 'hermansenph',
      password: oauth
    },
    channels: ['#' + channelRemoveSpace]
  })
  client.connect()
  client.on('chat', (channel, userstate, message, self) => {
    chatInterval.push(message)
  })
  setInterval(() => {
    chatLog.push(chatInterval)
    chatInterval = []
    if (chatLog.length > 6) {
      chatLog.splice(0, 1)
    }
    weightedAverage(chatLog, streamer.id, streamer)
  }, 5000)
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile('public/html')
})

app.post('/', (req, res) => {
  pushChat(req.body.channelData)
  res.send('Monitoring Stream!')
})

app.listen(3000, () => {
  console.log('Listening on :3000...')
})

const weightedAverage = (chatArray, channelId, channelData) => {
  let averageChat = 0
  let currentChat = 0
  for (let i = 0, e = 1; i < chatArray.length; i++, e = e + 2) {
    if (i < chatArray.length - 1) {
      averageChat += (chatArray[i].length * e)
    }
    else {
      currentChat = chatArray[i].length
    }
  }
  averageChat = (averageChat / 25)
  console.log(averageChat)
  console.log(currentChat)
  if (chatArray.length === 6 && averageChat > 3 && currentChat > averageChat * 3) {
    console.log('HIGHLIGHT HIGHLIGHT HIGHLIGHT HIGHLIGHT HIGHLIGHT!!!')
    fetch(('https://api.twitch.tv/kraken/channels/' + channelData.id + '/videos'), myInit)
      .then(response => {
        return response.json()
      })
      .then(response => {
        console.log(response)
        return response.videos[0]
      })
      .then(response => MongoClient.connect('mongodb://localhost/twitch-auto-highlight', (err, db) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        const vodId = db.collection(response._id)
        const newHighlight = {
          time: response.length,
          increase: currentChat / averageChat,
          vod: response._id
        }
        vodId.insertOne(newHighlight, (err, result) => {
          if (err) {
            console.error(err)
          }
          else {
            console.log(result)
          }
          db.close()
        })
      }))
  }
}

app.post('/highlights', (req, res) => {
  MongoClient.connect('mongodb://localhost/twitch-auto-highlight')
    .then(db => {
      const vodId = db.collection(req.body.vodData)
      vodId.find().toArray()
        .then(result => {
          db.close()
          res.send(result)
        })
    })
})
