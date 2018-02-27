function usersGateway(collection, eventEmitter) {
  return {

    async addUser(userData) {
      let userObject = await this.findUserToken(userData.token)
      if (!userObject) userObject = await this.findUserId(userData.channelId)
      if (!userObject) {
        collection.insertOne({
          channelId: userData.channelId,
          token: userData.token,
          channelArray: []
        })
      }
      else if (userObject.token !== userData.token) {
        collection.updateOne(
          {channelId: userData.channelId},
          {$set: {token: userData.token}}
        )
      }
      eventEmitter.emit('userTokenUpdate', userData.token)
    },

    async findUserToken(token) {
      const userObject = await collection.findOne({token: token})
      return userObject
    },

    async findUserId(channelId) {
      const userObject = await collection.findOne({channelId: channelId})
      return userObject
    },

    async findUserAll() {
      const userArray = await collection.find({}).toArray()
      return userArray
    },

    async addChannel(token, channel) {
      const userObject = await this.findUserToken(token)
      if (userObject.channelArray.indexOf(channel) === -1) {
        userObject.channelArray.push(channel)
        await collection.updateOne(
          {token: token},
          {$set: {channelArray: userObject.channelArray}}
        )
        eventEmitter.emit('channelArrayUpdate', userObject)
      }
    }

  }
}

module.exports = { usersGateway }
