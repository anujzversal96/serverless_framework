module.exports.validate = (rawEvent,body)=>
{

    if(rawEvent.requestContext.http.method == "DELETE")
    {
        if(rawEvent.pathParameters.id.length < 24 ||rawEvent.pathParameters.id.length > 24)
    {
  
      return {
        statusCode: 500,
        body: {
          message: "It seems id is not correct or not present"
        }
      };
  
    }

    return {
        statusCode: 200,
        body: {
          message: "Good to go."
        }
      };


    }




    if(body && body !== {})
{
    console.log(rawEvent.requestContext.http.method)
  
  if(rawEvent.requestContext.http.method.toString() == "PUT")
  {

    if(rawEvent.pathParameters.id.length < 24 ||rawEvent.pathParameters.id.length > 24)
    {
  
      return {
        statusCode: 500,
        body: {
          message: "It seems id is not correct or not present"
        }
      };
  
    }

  }
  
  if(typeof body.name !== "string" || body.name === "")
  {

    return {
      statusCode: 500,
      body: {
        message: "name field is required as string!"
      }
    };

  }

  else if(typeof body.address !== "string" || body.address === "")
  {

    return {
      statusCode: 500,
      body: {
        message: "address field is required as string!"
      }
    };

  }
  else if(typeof body.department !== "string"  || body.department === "")
  {

    return {
      statusCode: 500,
      body: {
        message: "department field is required as string!"
      }
    };

  }
  else if (typeof body.contactInfo !== "string"  || body.contactInfo === "" || body.contactInfo.length < 10 || body.contactInfo.length > 10)
 {
    return {
      statusCode: 500,
      body: {
        message: "contact field is required and must be of 10 digit as string!"
      }
    };
 }
 
  }

else {

  return {
    statusCode: 500,
    body: {
      message: "body must be present"
    }
  }

}


return {
    statusCode: 200,
    body: {
      message: "Good to go."
    }
  };

}