module.exports = function highlightsGateway(collection) {
  return {

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
    },

    async findChannels() {
      const channelList = await collection.findOne({channelList: []})
      if (!channelList) {
        await collection.insertOne({channelList: []})
        return {channelList: []}
      }
      return channelList
    }
  }
}
