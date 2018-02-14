function channelsGateway(collection, eventEmitter) {
  return {

    async findChannels() {
      const channelList = await collection.findOne({})
      if (!channelList) {
        await collection.insertOne({'channelList': []})
        return {'channelList': []}
      }
      return channelList.channelList
    },

    async addChannel(channel) {
      const channelList = await this.findChannels()
      if (channelList.indexOf(channel) === -1) {
        const newChannelList = channelList
        newChannelList.push(channel)
        collection.updateOne({}, {$set: {'channelList': newChannelList}})
      }
    }

  }
}

module.exports = { channelsGateway }
