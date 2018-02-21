function channelsGateway(collection, eventEmitter) {
  return {

    async findChannels() {
      const channelArray = await collection.find({}).toArray()
      return channelArray
    },

    async addChannel(channel) {
      const channelArray = await this.findChannels()
      if (channelArray.indexOf(channel) === -1) {
        await collection.insertOne({channelId: channel})
      }
    }

  }
}

module.exports = { channelsGateway }
