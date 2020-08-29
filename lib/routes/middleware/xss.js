module.exports = {

  value: function( request, response, next ) {

    if( typeof request.body !== "object" ) {
      next();
    } else {

      const keys = Object.keys( request.body );

      let isAttempInject = false;

      keys.forEach( keyName => {

        const val = request.body[ keyName ];

        if(
          typeof val === "string" &&
          /\<(script|iframe|object|img)/.test( val )
        ) {

          isAttempInject = true;
        }

      } );

      if( isAttempInject ) {

        response.statusCode = 418;

        response.json( {
          "statusCode": 418,
          "statusText": "I’m a teapot", // :p
          "details": "XSS attemps detect inside POST data"
        } );

      } else {

        next();
      }
    }

  },

  position: 8,

};