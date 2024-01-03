const { MongoClient, ObjectID } = require('mongodb');

class User {
  constructor(db) {
    this.collection = db.collection('users');
  }

  async findById(id) {
    return this.collection.findOne({ _id: new ObjectID(id) });
  }

  async create(username, password) {
    const newUser = {
      username,
      password,
    };

    const result = await this.collection.insertOne(newUser);
    return result.insertedId;
  }

  async findByUsername(username) {
    return this.collection.findOne({ username });
  }
}

module.exports = User;
