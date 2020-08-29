const fs = require('fs');
const path = require('path');

module.exports = function( request, response ) {

  const {filename} = request.params;

  const pathFile = path.join(
    global.DIR_UPLOAD,
    global.STORAGES_NAME.PORTFOLIO_IMAGES,
    filename
  );

  if( fs.existsSync( pathFile ) ) {

    response.type('application/octet-stream');

    fs.createReadStream( pathFile ).pipe( response );

  } else {

    // @TODO: send default image

    response.json( {
      status: "bad lucky"
    } );
  }

};
