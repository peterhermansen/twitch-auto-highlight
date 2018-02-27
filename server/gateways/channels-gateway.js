function channelsGateway(collection, eventEmitter) {
  return {

    async findChannels() {
      const channelArray = await collection.find({}).toArray()
      return channelArray
    },

    async addChannel(channelData) {
      const channelArray = await this.findChannels()
      const match = channelArray.filter((channel) => {
        return channel.id === channelData.id
      })
      if (match.length !== 1) {
        await collection.insertOne({
          id: channelData.id,
          display_name: channelData.display_name
        })
        return true
      }
      return false
    }

  }
}

module.exports = { channelsGateway }
