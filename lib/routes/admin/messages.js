module.exports = function( request, response ) {

  const {token} = request.query;

  if( token !== request.session.admin.token ) {

    global.onInvalidToken( request, response );

  } else {

    const messages = global.storage.getAllDoc( global.STORAGES_NAME.CONTACT );

    response.statusCode = 200;

    response.json( {
      "statusCode": 200,
      "statusText": "Success",
      "success": true,
      "messages": messages || []
    } );

  }

};
