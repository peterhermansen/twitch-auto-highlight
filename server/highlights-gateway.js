module.exports = function highlightsGateway(collection) {
  return {

    async create(highlightData) {
      collection.insertOne(highlightData)
    },

    async find(channelName) {
      if (channelName) {
        const highlightList = await collection.find({channel: channelName}).toArray()
        return highlightList
      }

      else {
        const highlightList = await collection.find({}).toArray()
        return highlightList
      }
    }
  }
}
