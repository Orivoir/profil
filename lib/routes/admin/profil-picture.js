const path = require('path');

module.exports = function( request, response ) {

  const {token} = request.query;

  if( token !== request.session.admin.token ) {

    global.onInvalidToken( request, response );

  } else {

    const { profil } = request.files;

    if( profil ) {

      global.onUpload({
        file: profil,
        moveTo: path.join(
          global.DIR_UPLOAD,
          global.STORAGES_NAME.PROFIL,
        )
      })
      .then( response => {

        if( response.success ) {

          response.statusCode = 201;

          response.json( {
            "statusCode": 201,
            "statusText": "Created",
            "success": true,
            "filename": response.filename
          } );

        } else {

          response.statusCode = 200;

          response.json( {
            "statusCode": 200,
            "statusText": "Success",
            "success": false,
            "details": "invalid file type",
            "accepts": [
              "image/png",
              "image/jpg",
              "image/jpeg",
              "image/gif"
            ]
          } );


        }

      } )
      .catch( error => {

        console.log( error );

        global.onCrash(
          request,
          response,
          "move file during upload have fail"
        );

      } );

    } else {

      response.statusCode = 200;

      response.json( {
        "statusCode": 200,
        "statusText": "Succcess",
        "success": false,
        "details": "fields file (profil image) missing"
      } );
    }
  }

};
