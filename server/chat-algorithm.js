const fetch = require('node-fetch')

const myInit = {
  method: 'GET',
  headers: {
    'Client-ID': 'l8lprk488tfke811xasmull5ckhwbh',
    'Accept': 'application/vnd.twitchtv.v5+json'
  }
}

module.exports = function chatAlgorithm(chatArray, channelData, highlights) {
  return {
    async weightedAverage() {
      let averageChat = 0
      let currentChat = 0
      for (let i = 0, e = 1; i < chatArray.length; i++, e = e + 2) {
        if (i < chatArray.length - 1) averageChat += (chatArray[i].length * e)
        else currentChat = chatArray[i].length
      }
      averageChat = (averageChat / 25)
      console.log(averageChat)
      console.log(currentChat)
      if (chatArray.length === 6 && averageChat > 2 && currentChat > (averageChat * 5)) {

        let highlightResponse = await fetch(('https://api.twitch.tv/kraken/channels/' + channelData.id + '/videos'), myInit)
        highlightResponse = await highlightResponse.json()
        const highlightData = highlightResponse.videos[0]

        const calculateTime = (createdAt) => {
          const createdDate = new Date(createdAt).getTime()
          const nowDate = new Date().getTime()
          return Math.floor(((nowDate - createdDate) / 1000) - 25)
        }

        const newHighlight = {
          channel: highlightData.channel.name,
          vod: highlightData._id,
          time: calculateTime(highlightData.created_at),
          date: highlightResponse.created_at,
          increase: currentChat / averageChat
        }

        highlights.create(newHighlight)

      }
    }
  }
}
