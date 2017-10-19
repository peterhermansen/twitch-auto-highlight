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
  }, 6000)
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
  if (chatArray.length === 6) {
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
        const highlights = db.collection('highlights')
        const newHighlight = {
          channel: response.channel.name,
          increase: currentChat / averageChat,
          vod: response._id,
          time: calculateTime(response.created_at),
          date: response.created_at
        }
        highlights.insertOne(newHighlight, (err, result) => {
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
  const vodId = req.body
  MongoClient.connect('mongodb://localhost/twitch-auto-highlight')
    .then(db => {
      const highlights = db.collection('highlights')
      highlights.find(vodId).toArray()
        .then(result => {
          db.close()
          res.send(result)
        })
    })
})

const calculateTime = (created) => {
  const createdDate = new Date(created).getTime()
  const nowDate = new Date().getTime()
  return Math.floor(((nowDate - createdDate) / 1000) - 25)
}

app.post('/past-highlights', (req, res) => {
  const channelName = req.body
  MongoClient.connect('mongodb://localhost/twitch-auto-highlight')
    .then(db => {
      const highlights = db.collection('highlights')
      if (channelName.channel === '') {
        highlights.find({}).toArray()
          .then(result => {
            db.close()
            res.send(result)
          })
      }
      else {
        highlights.find(channelName).toArray()
          .then(result => {
            db.close()
            res.send(result)
          })
      }
    })
})

MongoClient.connect('mongodb://localhost/twitch-auto-highlight')
  .then(db => {
    const highlights = db.collection('highlights')
    highlights.find({}).toArray()
      .then(result => {
        db.close()
        console.log(result)
      })
  })
