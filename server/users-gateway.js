function usersGateway(collection, eventEmitter) {
  return {

    async addUser(user) {
      collection.insertOne({'id': user})
    }
  }
}
