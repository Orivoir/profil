module.exports = function( request, response ) {

  [ "owner", "object", "contentText" ].forEach( dataName => {

    if( typeof request.body[ dataName ] !== "string" ) {
      request.body[ dataName ] = "";
    }

  } );

  let { owner, object, contentText } = request.body;

  response.statusCode = 200;

  owner = owner.trim();
  contentText = contentText.trim();
  object = object.trim();

  const isValidOwner = !!owner && owner.length > 0 && owner.length <= 254;
  const isValidContentText = !!contentText && contentText.length > 0 && contentText.length < 2048;
  const isValidObject = object.length >= 0 && object.length <= 254;

  if(
    !isValidOwner ||
    !isValidContentText ||
    !isValidObject
  ) {

    response.json( {
      "statusCode": 200,
      "statusText": "Success",
      "success": false,
      "details": "fields invalid",
      "fields": {
        owner: {
          value: owner,
          isRequired: true,
          isValid: isValidOwner
        },
        contentText: {
          value: contentText,
          isRequired: true,
          isValid: isValidContentText
        },
        object: {
          value: object,
          isRequired: false,
          isValid: isValidObject
        }
      }
    } );

  } else {

    if( typeof request.session.messageCount !== "number" ) {

      request.session.messageCount = 0;
    }

    if( ++request.session.messageCount >= global.MAX_MESSAGE_BY_SESSION ) {

      response.statusCode = 403;

      response.json({
        "statusCode": 403,
        "statusText": "Forbidden",
        "success": false,
        "details": "max message contact exceeded"
      });

    } else {

      request.session.save( error => {

        if( error ) {

          global.onCrash(
            request,
            response,
            "session storage have fail during upgrade"
          );

        } else {

          const message = global.storage.createDoc(
            {
              object,
              contentText,
              owner
            },
            global.STORAGES_NAME.CONTACT
          );

          response.statusCode = 201;

          response.json( {
            "statusCode": 201,
            "statusText": "Created",
            "succes": true,
            message
          } );

        }

      } );
    }

  }

};
