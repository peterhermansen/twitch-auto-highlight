function highlightsGateway(collection, eventEmitter) {
  return {

    async findChannel(channelId) {
      const channelObject = await collection.findOne({channelId: channelId})
      return channelObject
    },

    async createHighlight(highlightData) {
      collection.insertOne(highlightData)
    },

    async findHighlights(channelName) {
      if (channelName) {
        const highlightList = await collection.find({channel: channelName}).sort({date: -1}).toArray()
        return highlightList
      }

      else {
        const highlightList = await collection.find({}).sort({date: -1}).toArray()
        return highlightList
      }
    }

  }
}

module.exports = { highlightsGateway }
