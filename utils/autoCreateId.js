const user = require('../models/userSchema');
const connectToDatabase = require('../config/mongoose');

try {

    ( async ()=> {
    
      db = await connectToDatabase();
   
    })();
  
  } catch (error) {
    
    return {
      statusCode:500,
      body: {
        message: "Error "+ error
      }
    }
  }

module.exports.employeeId = async ()=>{

    const max =  await user.countDocuments({});
    return max;

}