const { getDb } = require('../data/database');

class ServiceEntry {
  constructor(date, workDone, mileage, carId) {
    this.date = date;
    this.workDone = workDone;
    this.mileage = mileage;
    this.carId = carId;
  }

  save() {
    const db = getDb();
    return db.collection('serviceEntries').insertOne(this);
  }

  static fetchAll(carId) {
    const db = getDb();
    return db.collection('serviceEntries').find({ carId: carId }).toArray();
  }
}

module.exports = ServiceEntry;
