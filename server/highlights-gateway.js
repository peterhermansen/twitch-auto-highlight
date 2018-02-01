module.exports = function highlightsGateway(collection) {
  return {

    async create(highlightData) {
      collection.insertOne(highlightData)
    },

    async find() {
      const highlightList = await collection.find({}).toArray()
      return highlightList
    }
  }
}
