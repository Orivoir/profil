module.exports = function( request, response ) {

  let {id} = request.params;

  const {token} = request.query;

  if( token !== request.session.admin.token ) {

    global.onInvalidToken( request, response );

  } else {

    id = parseInt( id );

    if( isNaN( id ) ) {

      response.statusCode = 200;

      response.json( {
        "statusText": 200,
        "statusCode": "Success",
        "success": false,
        "details": "params `id` should be a integer value"
      } );

    } else {

      const message = global.storage.getDocBy(
        { id },
        global.STORAGES_NAME.CONTACT
      );

      if( message ) {

        global.storage.removeDoc(
          id, global.STORAGES_NAME.CONTACT
        );

        response.statusCode = 200;

        response.json({
          "statusCode": 200,
          "statusText": "Success",
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

    }

  }

};
