const path = require('path');

module.exports = function( request, response ) {

  const {token} = request.query;

  let {title, url} = request.body;

  let image = null;

  if( !!request.files ) {
    image = request.files.image;
  } else {

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

  if( token !== request.session.admin.token ) {

    global.onInvalidToken( request, response );

  } else {

    if( !title ) {
      title = "";
    } if( !url ) {
      url = "";
    }

    title = title.trim();
    url = url.trim();

    const isValidTitle = title.length > 0 && title.length <= 254;
    const isValidUrl = url.length >= 5 && url.length <= 254;

    if( !/^http(s)?\:\/\//.test(url) ) {
      url = "http://" + url;
    }

    if( !isValidTitle || !isValidUrl ) {

      response.statusCode = 200;

      response.json({
        "statusCode": 200,
        "statusText": 200,
        "details": "fields invalid",
        "fields": {
          title: {
            value: title,
            isRequired: true,
            isValid: isValidTitle
          },
          url: {
            value: url,
            isRequired: true,
            isValid: isValidUrl
          }
        }
      });

      return;
    }

    global.onUpload({
      file: image,
      moveTo: path.join(
        global.DIR_UPLOAD,
        global.STORAGES_NAME.PORTFOLIO_IMAGES
      )
    })
    .then( status => {

      if(status.success) {

        let portfolio = {
          filename: status.filename,
          title,
          url
        };

        portfolio = global.storage.createDoc(
          portfolio,
          global.STORAGES_NAME.PORTFOLIO
        );

        response.statusCode = 201;

        response.json({
          "statusCode": 201,
          "statusText": "Created",
          "success": true,
          "portfolio": portfolio
        });

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

  }

};
