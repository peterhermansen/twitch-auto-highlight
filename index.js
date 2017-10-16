const tmi = require('tmi.js')
const express = require('express')
const app = express()
const secret = require('./secret.js')
const oauth = secret.oauth()
const bodyParser = require('body-parser')
const path = require('path')
const { MongoClient } = require('mongodb')

const channelData = []
const chatLog = []
let chatInterval = []

const pushChat = (streamer) => {
  const channelRemoveSpace = streamer[0].display_name.replace(' ', '')
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
    weightedAverage(chatLog, streamer.id)
  }, 5000)
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile('public/html')
})

app.post('/', (req, res) => {
  channelData.push(req.body.channel)
  console.log(channelData)
  pushChat(channelData[0])
  res.send('Monitoring Stream!')
})

app.listen(3000, () => {
  console.log('Listening on :3000...')
})

const weightedAverage = (chatArray, channelId) => {
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
  if (chatLog.length === 6 && currentChat > (averageChat * 2.5)) {
    console.log('HIGHLIGHT HIGHLIGHT HIGHLIGHT HIGHLIGHT HIGHLIGHT!!!')
    const vodData = channelData[0][1]
    MongoClient.connect('mongodb://localhost/twitch-auto-highlight', (err, db) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      const vodId = db.collection(vodData._id)
      const newHighlight = {
        time: vodData.length,
        increase: currentChat / averageChat,
        vod: vodData._id
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
    })
  }
}
