function highlightsGateway(collection, eventEmitter) {
  return {

    async findChannel(channelId) {
      const channelObject = await collection.findOne({channelId: channelId})
      return channelObject
    },

    async addChannel(channelId) {
      const channelObject = {
        channelId: channelId,
        highlightArray: []
      }
      await collection.insertOne(channelObject)
    },

    async createHighlight(highlightData, channelId) {
      const channelObject = await this.findChannel(channelId)
      channelObject.highlightArray.push(highlightData)
      await collection.updateOne(
        {channelId: channelId},
        {$set: {highlightArray: channelObject.highlightArray}}
      )
    },

    async findHighlights(channelArray) {
      let totalHighlightArray = await Promise.all(channelArray.map(this.findChannel))

      function extractHighlightArray(channelObject) {
        return channelObject.highlightArray
      }
      totalHighlightArray = totalHighlightArray.map(extractHighlightArray)

      return totalHighlightArray
    }

  }
}

module.exports = { highlightsGateway }
