const fs = require('fs');
const path = require('path');

module.exports = function( request, response ) {

  const {filename} = request.params;

  const pathFile = path.join(
    global.DIR_UPLOAD,
    global.STORAGES_NAME.PORTFOLIO_IMAGES,
    filename
  );

  response.type('application/octet-stream');

  if( fs.existsSync( pathFile ) ) {

    fs.createReadStream( pathFile ).pipe( response );

  } else {

    fs.createReadStream(
      path.join(
        global.DIR_IMAGES,
        "default.png"
      )
    ).pipe( response );
  }

};
