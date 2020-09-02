module.exports = function( request, response ) {

  const {token} = request.query;
  let {id} = request.params;

  if( token !== request.session.admin.token ) {

    global.onInvalidToken( request, response );

  } else {

    id = parseInt( id );

    if( !isNaN( id ) ) {

      const message = global.storage.getDocById(
        id,
        global.STORAGES_NAME.CONTACT
      );

      if( message ) {

        message.isRead = true;

        global.storage.updateDoc(
          message, id,
          global.STORAGES_NAME.CONTACT
        );

        response.statusCode = 201;

        response.json({
          "statusCode": 201,
          "statusText": "Created",
          "success": true,
          message
        });

      } else {

        response.statusCode = 404;

        response.json({
          "statusCode": 404,
          "statusText": "Not found",
          "success": false,
          "details": "message not exists for this params id",
          "id": id
        });
      }

    } else {

      response.statusCode = 200;

      response.json( {
        "statusText": 200,
        "statusCode": "Success",
        "success": false,
        "details": "params `id` should be a integer value"
      } );
    }

  }

};
