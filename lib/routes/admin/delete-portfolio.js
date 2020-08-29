const path = require('path');
const fs = require('fs');

module.exports = function( request, response ) {

  const {id} = request.params;
  const {token} = request.query;

  if( token !== request.session.admin.token ) {

    global.onInvalidToken( request, response );

  } else {

    id = parseInt( id );

    if( isNaN(id) ) {

      response.statusCode = 200;

      response.json( {
        "statusText": 200,
        "statusCode": "Success",
        "success": false,
        "details": "params `id` should be a integer value"
      } );

    } else {

      const portfolio = global.storage.removeDoc(
        id, global.STORAGES_NAME.PORTFOLIO
      );

      if( !portfolio ) {

        response.statusCode = 404;

        response.json({
          "statusCode": 404,
          "statusText": "Not found",
          "success": false,
          "details": "portfolio not exists for this params id",
          "id": id
        });

      } else {

        global.storage.removeDoc(
          id, global.STORAGES_NAME.PORTFOLIO
        );

        const pathImage = path.join(
          global.DIR_UPLOAD,
          global.STORAGES_NAME.PORTFOLIO_IMAGES,
          portfolio.filename
        );

        if( fs.existsSync( pathImage ) ) {

          fs.unlinkSync( pathImage );
        }

        response.statusCode = 200;

        response.json({
          "statusCode": 200,
          "statusText": "Success",
          "success": true,
          portfolio
        });

      }

    }

  }

};
