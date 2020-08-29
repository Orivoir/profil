module.exports = function( request, response ) {

  if( request.isAdmin ) {

    response.status = 403;

    response.json( {
      "statusCode": 403,
      "statusText": "Forbidden",
      "success": false,
      "details": "you'r already logged as admin"
    } );

    return;
  }

  const {login, password} = request.body;

  const {admin} = global.config;

  const isAuthenticationSuccess = ( login === admin.login && password === admin.password );

  response.statusCode  = 200;

  if( isAuthenticationSuccess ) {

    request.session.admin = {
      login,
      password,
      token: `token-${Date.now()}-${Math.random().toString().replace('.','-')}`
    };

    request.session.save( error => {

      if( error ) {

        global.onCrash(
          request,
          response,
          "session storage have fail during upgrade"
        );
      } else {

        response.json({
          "statusCode": 200,
          "statusText": "Success",
          "success": true,
          "token": request.session.admin.token
        });

      }

    } );

  } else {

    response.json({
      "statusCode": 200,
      "statusText": "Success",
      "success": false,
      "details": "credentials error",
      "credentials": {
        login,
        password
      }
    });
  }

};
