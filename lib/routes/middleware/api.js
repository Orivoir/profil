module.exports = {

  value: [
    /^\/api/,
    function( request, response, next ) {

      response.type( "application/json" );

      next();
    }
  ],
  position: 6
};
