const mongoose = require('mongoose');
require("dotenv").config();

const dbConnection = mongoose.connect(process.env.MongoDB_Connection, {
    useNewUrlParser: true});

async function connectToDatabase() {



    return dbConnection;
    
  
  }

  module.exports = connectToDatabase;