function usersGateway(collection, eventEmitter) {
  return {

    async addUser(userId) {
      const result = await this.findUser(userId)
      if (!result) {
        collection.insertOne({
          id: userId,
          channelArray: []
        })
      }
    },

    async findUser(userId) {
      const userObject = await collection.findOne({id: userId})
      return userObject
    }
  }
}

module.exports = { usersGateway }
