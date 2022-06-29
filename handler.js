// const MongoClient = require("mongodb").MongoClient;

const user = require('./models/userSchema');
const connectToDatabase = require('./config/mongoose');


module.exports.fetchAllEmployees = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  let employee = null;

  employee = await user.find({});


if(employee)
{

 return ({
    statusCode: 200,
    body: JSON.stringify(employee),
  });
  
}

return JSON.stringify({
  statusCode: 200,
  body: {
    message: "Something went wrong!"
  },
});
  
};

module.exports.registerEmployees = async (event, context) => {


  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  let employee = null;

  const n = JSON.parse(event.body);

if(event && event.body)
{

  if(n.name === undefined || Number.isInteger(n.name) || n.name === null || n.name === false || n.name === true || n.name === "")
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "name field is required as string!"
      }
    });

  }

  else if(n.address === undefined || Number.isInteger(n.address) || n.address === null || n.address === false || n.address === true || n.address === "")
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "address field is required as string!"
      }
    });

  }
  else if(n.department === undefined || Number.isInteger(n.department) || n.department === null || n.department === false || n.department === true || n.department === "")
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "department field is required as string!"
      }
    });

  }
  else if(n.contactInfo === undefined || Number.isInteger(n.contactInfo) || n.contactInfo === null || n.contactInfo === false || n.contactInfo === true || n.contactInfo === "" || n.contactInfo.toString().length < 10 || n.contactInfo.toString().length > 10)
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "contact field is required and must be of 10 digit as string!"
      }
    });

  }



   console.log(JSON.parse(event.body));

   employee = await user.create(JSON.parse(event.body));

   console.log(employee.name)
}

else {
  return JSON.stringify({
    statusCode: 400,
    body: {
      message: "body must be present"
    }
  })
}


  if(employee)
  {
    return  JSON.stringify({
      statusCode: 200,
      body:({message: "User registered successfully ",  
      data: employee,
    }),
    });

  }


  return  JSON.stringify({
    statusCode: 400,
    body: JSON.stringify({message: "something went wrong in new employee registeration."}),
  });
  

};

module.exports.updateEmployeeById = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();
  let employee = null;

  const n = JSON.parse(event.body);

if(event && event.body)
{

  if(n._id === undefined || Number.isInteger(n._id) || n._id === null || n._id === false || n._id === true || n._id === "" || n._id.toString().length < 24 || n._id.toString().length > 24)
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "It seems id is not correct or not present"
      }
    });

  }
  else if(n.name === undefined || Number.isInteger(n.name) || n.name === null || n.name === false || n.name === true || n.name === "")
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "name field is required as string!"
      }
    });

  }

  else if(n.address === undefined || Number.isInteger(n.address) || n.address === null || n.address === false || n.address === true || n.address === "")
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "address field is required as string!"
      }
    });

  }
  else if(n.department === undefined || Number.isInteger(n.department) || n.department === null || n.department === false || n.department === true || n.department === "")
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "department field is required as string!"
      }
    });

  }
  else if(n.contactInfo === undefined || Number.isInteger(n.contactInfo) || n.contactInfo === null || n.contactInfo === false || n.contactInfo === true || n.contactInfo === "" || n.contactInfo.toString().length < 10 || n.contactInfo.toString().length > 10)
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "contact field is required and must be of 10 digit as string!"
      }
    });

  }



   console.log(JSON.parse(event.body));

   employee = await user.findByIdAndUpdate(n.pathParameters,JSON.parse(event.body));

   console.log(employee)
}

else {
  return JSON.stringify({
    statusCode: 400,
    body: {
      message: "body must be present"
    }
  });
}

console.log(employee);

if(employee)
{
  return JSON.stringify({
    statusCode: 200,
    body: {
      message: "User updated successfully. "
    }
  });
}


return JSON.stringify({
  statusCode: 400,
  body: {
    message: "Something went wrong may be user doesn't exist. "
  }
});




};

module.exports.deleteEmployeeById = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase();

  const n = JSON.parse(event.body);
  let employee = null;

  if(event && event.body)
{

  if(n._id === undefined || Number.isInteger(n._id) || n._id === null || n._id === false || n._id === true || n._id === "" || n._id.toString().length < 24 || n._id.toString().length > 24)
  {

    return JSON.stringify({
      statusCode: 400,
      body: {
        message: "It seems id is not correct or not present"
      }
    });

  }

  employee = await user.findByIdAndDelete(n._id);

  if(employee)
  {

    return JSON.stringify({
      statusCode: 200,
      body: {
        message: "Employee removed successfully."
      },
    });

  }


  return JSON.stringify({
    statusCode: 200,
    body: {
      message: "Something went wrong may be employee doesn't exist."
    }
  });

}
else
{
  return JSON.stringify({
    statusCode: 400,
    body: {
      message: "body must be present"
    }
  });
}
  
};