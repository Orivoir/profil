module.exports = {

  value: [ /^\/api\/admin\//, function( request, response, next ) {

    if( request.isAdmin || request.path === "/api/admin/login" ) {

      next();

    } else {

      response.statusCode = 401;
      response.json( {
        "statusCode": 401,
        "statusText": "Unauthorized",
        "success": false,
        "@next": "/admin"
      } );

    }

  } ],

  position: 4
};
