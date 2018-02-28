const fetch = require('node-fetch')

const myInit = {
  method: 'GET',
  headers: {
    'Client-ID': 'l8lprk488tfke811xasmull5ckhwbh',
    'Accept': 'application/vnd.twitchtv.v5+json'
  }
}

async function chatAlgorithm(chatArray, channelData, highlights) {
  let averageChat = 0
  let currentChat = 0
  for (let i = 0, e = 1; i < chatArray.length; i++, e = e + 2) {
    if (i < chatArray.length - 1) averageChat += (chatArray[i].length * e)
    else currentChat = chatArray[i].length
  }
  averageChat = (averageChat / 25)

  if (chatArray.length === 6 && averageChat > 2 && currentChat > (averageChat * 5)) {

    let highlightData = await fetch(('https://api.twitch.tv/kraken/channels/' + channelData.id + '/videos'), myInit)
    highlightData = await highlightData.json()
    highlightData = highlightData.videos[0]

    const calculateTime = (createdAt) => {
      const createdDate = new Date(createdAt).getTime()
      const nowDate = new Date().getTime()
      return Math.floor(((nowDate - createdDate) / 1000) - 25)
    }

    const newHighlight = {
      channel: highlightData.channel.name,
      vod: highlightData._id,
      time: calculateTime(highlightData.created_at),
      date: new Date(highlightData.created_at),
      increase: currentChat / averageChat
    }
    console.log('Highlight Captured', newHighlight)
    highlights.createHighlight(newHighlight, channelData.id)
    return true
  }
}

module.exports = { chatAlgorithm }
