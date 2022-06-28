require("dotenv").config();
const mongoose = require('mongoose');

// require("dotenv").config();

// mongoose.connect("mongodb+srv://ranaanuj290:anuj84710%40@cluster0.2icgk.mongodb.net/employeeDB", {
//     useNewUrlParser: true}
// );


// module.exports.db = mongoose.connection;

// db.on('error', console.error.bind('console', 'Error in connecting with DB'));

// db.once('open', ()=> {
//     console.log("Connected to database");
// })



let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
      return cachedDb;
    }
  

  const db = await mongoose.connect("mongodb+srv://ranaanuj290:anuj84710%40@cluster0.2icgk.mongodb.net/employeeDB", {
      useNewUrlParser: true}
  );
  
  cachedDb = db;
  return db;
  
  }

  module.exports = connectToDatabase;