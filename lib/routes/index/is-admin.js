module.exports = function( request, response ) {

  response.statusCode = 200;

  response.json({
    "statusCode": 200,
    "statusText": "Success",
    "success": true,
    "isAdmin": !!request.isAdmin
  });

};
