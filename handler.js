// const MongoClient = require("mongodb").MongoClient;

const user = require("./models/userSchema");
const connectToDatabase = require("./config/mongoose");
const { validate } = require("./utils/validation");
const { employeeId } = require("./utils/autoCreateId");
let db = null;


  (async () => 
  {
    try {

    console.log("hii");
    db = await connectToDatabase();
    console.log("bye");
    } 
    catch (error) {
     return {
      body: JSON.stringify({
        message: "connection problem."
      })
     }
    } 
    
  })();




module.exports.fetchAllEmployees = async () => {
  let employees = null;

  try {
    employees = await user.find({});
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong. " + error,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ data: employees }),
  };
};


module.exports.registerEmployees = async (event) => {
  let employee = null;

  const validationResponse = validate(event, JSON.parse(event.body));

  if (validationResponse) {
    return {
      statusCode: 406,
      body: JSON.stringify({
        message: "body is needed and values required in string only.",
      }),
    };
  }

  try {
    const maxCount = await employeeId();
    let body = JSON.parse(event.body);

    employee = await user.create(body);
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong in new employee registeration. " + error,
      }),
    };
  }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User registered successfully ", data: employee }),
    };

};


module.exports.updateEmployeeById = async (event) => {
  let employee = null;

  const validationResponse = await validate(event, JSON.parse(event.body));

  if (validationResponse) {
    return {
      statusCode: 406,
      body: JSON.stringify({
        message: "body is needed and values required in string only.",
      }),
    };
  }

  try {
    employee = await user.findByIdAndUpdate(
      event.pathParameters.id,
      JSON.parse(event.body)
    );
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong may be user doesn't exist. " + error,
      }),
    };
  }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User updated successfully. ",
      }),
    };

};


module.exports.deleteEmployeeById = async (event) => {
  let employee = null;

  try {
    employee = await user.findByIdAndDelete(event.pathParameters.id);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong may be employee already not exist! " + error,
      }),
    };
  }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Employee removed successfully.",
      }),
    };

};
