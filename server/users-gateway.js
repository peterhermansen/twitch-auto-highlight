function usersGateway(collection, eventEmitter) {
  return {

    async addUser(user) {
      collection.insertOne({'id': user})
    },

    async getUser(user) {
      const userObject = await collection.findOne({'id': user})
      return userObject
    }
  }
}

module.exports = { usersGateway }
