module.exports.validate = (rawEvent,body)=>
{


    if(body && body !== {})
{
   

  if(typeof body.name !== "string" || body.name === "")
  {

    return true;

  }

  else if(typeof body.address !== "string" || body.address === "")
  {

    return true;
    

  }
  else if(typeof body.department !== "string"  || body.department === "")
  {

   return true;

  }
  else if (typeof body.contactInfo !== "string"  || body.contactInfo === "" || body.contactInfo.length < 10 || body.contactInfo.length > 10)
 {
    return true;
 }
 else{
  return false;
 }
 
  }

else {

return true;
  
}

}