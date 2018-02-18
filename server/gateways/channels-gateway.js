function channelsGateway(collection, eventEmitter) {
  return {

    async findChannels() {
      const channelArray = await collection.findOne({})
      if (!channelArray) {
        await collection.insertOne({channelArray: []})
        return {channelArray: []}
      }
      return channelArray.channelArray
    },

    async addChannel(channel) {
      let channelArray = await this.findChannels()
      if (channelArray.indexOf(channel) === -1) {
        channelArray.push(channel)
        await collection.updateOne({}, {$set: {channelArray: channelArray}})
      }
    }

  }
}

module.exports = { channelsGateway }
