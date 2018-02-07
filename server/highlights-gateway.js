module.exports = function highlightsGateway(collection) {
  return {

    async create(highlightData) {
      collection.insertOne(highlightData)
    },

    async find(channelName) {
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
