module.exports = function( request, response ) {

  const { token } = request.query;

  if( token !== request.session.admin.token ) {

    global.onInvalidToken( request, response );

  } else {

    request.session.destroy( error => {

      if( error ) {

        delete request.session.admin;

        global.onCrash(
          request,
          response,
          "session storage have fail during destroy"
        );

      } else {

        response.statusCode = 200;

        response.json( {
          "statusCode": 200,
          "statusText": "Success",
          "success": true
        } );

      }

    } );

  }

};