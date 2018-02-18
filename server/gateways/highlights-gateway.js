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
