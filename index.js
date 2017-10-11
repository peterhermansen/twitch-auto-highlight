const tmi = require('tmi.js')
const express = require('express')
const { MongoClient } = require('mongodb')

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
client.connect()
client.on('chat', (channel, userstate, message, self) => {
  console.log(chatNum)
  chatNum++
})

const pushChat = () => {
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
}

setInterval(pushChat, 10000)
