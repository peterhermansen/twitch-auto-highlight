function usersGateway(collection, eventEmitter) {
  return {

    async addUser(userId) {
      const result = await this.getUser(userId)
      console.log(result)
      if (!result) {
        console.log('Creating User')
        collection.insertOne({'id': userId})
      }
    },

    async getUser(userId) {
      const userObject = await collection.findOne({'id': userId})
      return userObject
    }
  }
}

module.exports = { usersGateway }
