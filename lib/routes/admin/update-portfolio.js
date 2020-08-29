module.exports = function( request, response ) {

  const {token} = request.query;
  const {id} = request.params;

  const {title, url} = request.body;
  const {image} = request.files;

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

      const portfolio = global.storage.getDocById(
        id,
        global.STORAGES_NAME.PORTFOLIO
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

        const state = {};

        const fields = {
          title: {
            isValid: false,
            isRequired: false,
          },
          url: {
            isValid: false,
            isRequired: false,
          },
        };

        if( !!title ) {
          state.title = title;

          fields.title.isValid = title.length > 0 && title.length <= 254;

        } if( !!url ) {

          fields.url.isValid = url.length >= 5 && url.length <= 254;

          if( !/^http(s)?\:\/\//.test(url) ) {
            url = "http://" + url;
          }

          state.url = url;

        } if( !!image ) {
          state.image = image;
        }

        fields.title.value = state.title || "";
        fields.title.url = state.url || "";

        if(
          ( !fields.title.isValid && !!state.title ) ||
          ( !fields.url.isValid && !!state.url )
        ) {

          response.statusCode = 200;

          response.json({
            "statusCode": 200,
            "statusText": "Success",
            "success": false,
            "details": "fields invalid",
            "fields": fields
          });

        } else {

          function onFinishUpload( status ) {

            if( status.isUpload ) {

              portfolio.filename = status.filename;
            }

            if( state.url ) {

              portfolio.url = state.url;
            }

            if( state.title ) {

              portfolio.title = state.title;
            }

            global.storage.updateDoc(
              portfolio,
              portfolio.id,
              global.STORAGES_NAME.PORTFOLIO
            );

            response.statusCode = 201;

            response.json( {
              "statusCode": 201,
              "statusText": "Created",
              "success": true,
              portfolio
            } );

          }

          if( state.image ) {

            global.onUpload({
              file: image,
              moveTo: path.join(
                global.DIR_UPLOAD,
                global.STORAGES_NAME.PORTFOLIO_IMAGES
              )
            })
            .then( response => onFinishUpload( {
              isUpload: true,
              ...response
            } ) )
            .catch( error => {

              console.log( error );

              global.onCrash(
                request,
                response,
                "move file during upload have fail"
              );

            } );

          } else {

            onFinishUpload({ isUpload: false });
          }
        }

      }

    }

  }

};
