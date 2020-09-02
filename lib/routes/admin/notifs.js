module.exports = function( request, response ) {

  const {token} = request.query;

  if( token !== request.session.admin.token ) {

    global.onInvalidToken( request, response );

  } else {

    const messages = global.storage
      .getAllDoc( global.STORAGES_NAME.CONTACT )
      .filter( message => (
        !message.isRead
      ) )
    ;

    response.json( {
      "statusCode": 200,
      "statusText": "Success",
      "success": true,
      "new-messages": messages || []
    } );
  }

};
