const { getDb } = require('../data/database');

class Car {
  constructor(name, model, userId) {
    this.name = name;
    this.model = model;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db.collection('cars').insertOne(this);
  }

  static fetchAll(userId) {
    const db = getDb();
    return db.collection('cars').find({ userId: userId }).toArray();
  }

  static findById(carId) {
    const db = getDb();
    return db.collection('cars').findOne({ _id: new ObjectId(carId) });
  }
}

module.exports = Car;
