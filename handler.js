// const MongoClient = require("mongodb").MongoClient;

const user = require('./models/userSchema');
const connectToDatabase = require('./config/mongoose');
const { validate } = require('./utils/validation');
const {employeeId} = require('./utils/autoCreateId');
let db = null;


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



module.exports.fetchAllEmployees = async () => {

  let employee = null;

  try {

    employee = await user.find({});

  } catch (error) {

    return JSON.stringify({
      statusCode:500,
      body: {
        message: "Error " + error
      }
    })
    
  }
 

if(employee)
{

 return ({
    statusCode: 200,
    body: JSON.stringify(employee),
  });
  
}
else{

return JSON.stringify({
  statusCode: 500,
  body: {
    message: "Something went wrong!"
  },
});

}
  
};


module.exports.registerEmployees = async (event) => {
  
  let employee = null;

  const validationResponse = await validate(event,JSON.parse(event.body));

  
    if(validationResponse.statusCode !== 200)
    {
      return JSON.stringify({
        statusCode: validationResponse.statusCode,
        body: {
          message: validationResponse.body.message
        }
      });
    }

    
   try {
    const maxCount = await employeeId();
    let body = JSON.parse(event.body);


    employee = await user.create(body);

        } catch (error) {

      return JSON.stringify({
        statusCode:500,
        body: {
          message: "Error " + error
        }
      });
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


module.exports.updateEmployeeById = async (event) => {


  let employee = null;
  const validationResponse = await validate(event,JSON.parse(event.body));

  
    if(validationResponse.statusCode !== 200)
    {
      return JSON.stringify({
        statusCode: validationResponse.statusCode,
        body: {
          message: validationResponse.body.message
        }
      });
    }

try {

  employee = await user.findByIdAndUpdate(event.pathParameters.id,JSON.parse(event.body));
  
} catch (error) {

  return JSON.stringify({
    statusCode:500,
    body: {
      message: "Error " + error
    }
  });
  
}
   


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
  statusCode: 500,
  body: {
    message: "Something went wrong may be user doesn't exist. "
  }
});




};


module.exports.deleteEmployeeById = async (event) => {

  let employee = null;

  const validationResponse = await validate(event,JSON.parse(event.body));

  
    if(validationResponse.statusCode !== 200)
    {
      return JSON.stringify({
        statusCode: validationResponse.statusCode,
        body: {
          message: validationResponse.body.message
        }
      });
    }

try {

  employee = await user.findByIdAndDelete(event.pathParameters.id);

} catch (error) {

  return JSON.stringify({
    statusCode: 500,
    body: {
      message: "error " + error
    }
  });
  
}

  if(employee)
  {

    return JSON.stringify({
      statusCode: 200,
      body: {
        message: "Employee removed successfully."
      },
    });

  }
  else
  {

  return JSON.stringify({
    statusCode: 500,
    body: {
      message: "Something went wrong may be employee doesn't exist."
    }
  });

}

  
};