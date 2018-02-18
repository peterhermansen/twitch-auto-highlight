function usersGateway(collection, eventEmitter) {
  return {

    async addUser(userId) {
      const userObject = await this.findUser(userId)
      if (!userObject) {
        collection.insertOne({
          id: userId,
          channelArray: []
        })
      }
    },

    async findUser(userId) {
      const userObject = await collection.findOne({id: userId})
      return userObject
    },

    async addChannel(userId, channel) {
      const userObject = await this.findUser(userId)
      if (userObject.channelArray.indexOf(channel) === -1) {
        userObject.channelArray.push(channel)
        await collection.updateOne(
          {id: userId},
          {$set: {channelArray: userObject.channelArray}}
        )
        eventEmitter.emit('channelArrayUpdate', userObject)
      }
    }

  }
}

module.exports = { usersGateway }
