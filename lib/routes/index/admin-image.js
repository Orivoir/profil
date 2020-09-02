const fs = require('fs');
const path = require('path');

module.exports = function( request, response ) {

  let pathFile = path.join(
    global.DIR_UPLOAD,
    global.STORAGES_NAME.PROFIL,
    global.config.admin.filename || ""
  );


  if( !fs.existsSync( pathFile ) ) {

    pathFile = path.join(
      global.DIR_IMAGES,
      "default.png"
    );

  } else {

    const stat = fs.statSync( pathFile );

    if( !stat.isFile() ) {

      pathFile = path.join(
        global.DIR_IMAGES,
        "default.png"
      );
    }

  }

  response.type('application/octet-stream');

  fs.createReadStream( pathFile ).pipe( response );

};
