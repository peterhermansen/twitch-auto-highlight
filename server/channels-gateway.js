module.exports = function channelsGateway(collection) {
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
      const newChannelList = channelList
      newChannelList.push(channel)
      collection.updateOne({}, {$set: {'channelList': newChannelList}})
    }

  }
}
