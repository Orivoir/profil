const path = require('path');

module.exports = function( request, response ) {

  response.statusCode = 200;

  response.type( "text/html" );

  response.sendFile(
    path.join( global.DIR_VIEWS, "admin.html" )
  );

};
