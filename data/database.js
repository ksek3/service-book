const { MongoClient } = require('mongodb');

let db;

async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb://127.0.0.1:27017');

  try {
    await client.connect();
    db = client.db('service-book');
    console.log('Connected to the database');
  } catch (error) {
    console.log('Error connecting to the database:', error);
    throw error;
  }
}

function getDb() {
  if (!db) {
    throw 'Database not connected!';
  }
  return db;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
