const mongoose = require('mongoose');
require("dotenv").config();


let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
      return cachedDb;
    }
  

  const db = await mongoose.connect(process.env.MongoDB_Connection, {
      useNewUrlParser: true}
  );
  
  cachedDb = db;
  return db;
  
  }

  module.exports = connectToDatabase;