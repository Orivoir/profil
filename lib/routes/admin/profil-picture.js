const path = require('path');
const fs = require('fs');

module.exports = function( request, response ) {

  const {token} = request.query;

  if( token !== request.session.admin.token ) {

    global.onInvalidToken( request, response );

  } else {

    if( !request.files ) {

      response.statusCode = 200;

      response.json( {
        "statusCode": 200,
        "statusText": "Success",
        "success": false,
        "details": "image file empty",
        "accepts": [
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/gif"
        ]
      } );

      return;
    }

    const { profil } = request.files;

    if( profil ) {

      global.onUpload({
        file: profil,
        moveTo: path.join(
          global.DIR_UPLOAD,
          global.STORAGES_NAME.PROFIL,
        )
      })
      .then( status => {

        if( status.success ) {

          response.statusCode = 201;

          global.config.admin.filename = status.filename;

          fs.readdirSync(
            path.join(
              global.DIR_UPLOAD,
              global.STORAGES_NAME.PROFIL
            ), {
              withFileTypes: true,
              encoding: "utf-8"
            }
          ).forEach( fn => {

            if( fn.name !== status.filename ) {
              // this is last profil picture file
              fs.unlinkSync( path.join(
                global.DIR_UPLOAD,
                global.STORAGES_NAME.PROFIL,
                fn.name
              ) );

            }

          } )

          global.saveConfig();

          response.json( {
            "statusCode": 201,
            "statusText": "Created",
            "success": true,
            "filename": status.filename
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
