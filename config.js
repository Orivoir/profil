const config = require('./config.json');
const path = require('path');
const Storage = require('./lib/storage/storage')

global.config = config;

global.storage = new Storage(
  path.join( __dirname, "uploads" )
);

global.MAX_MESSAGE_BY_SESSION = config.maxMessageBySession;

global.STORAGES_NAME = {

  get CONTACT() {
    return "contacts"
  },

  get PROFIL() {

    return "profil-picture";
  },

  get PORTFOLIO() {

    return "portfolio";
  },

  get PORTFOLIO_IMAGES() {
    return "portfolio-images";
  }
};

config["uploads-dir"].forEach( dirname => (
  global.storage.createDir( dirname )
) );

global.__ROOT__ = __dirname;

global.exp = require('express');

global.DIR_UPLOAD = path.join( __dirname, "uploads" );
global.DIR_VIEWS = path.join( __dirname, "views" );

global.onCrash = ( request, response, devMessage ) => {

  response.statusCode = 500;

  let message = "";

  if(
    config.env === "dev" ||
    request.isAdmin
  ) {

    message = devMessage;

  } else {

    message = "Oops internal error, try again later.";
  }

  response.json( {
    "statusCode": 500,
    "statusText": "Internal server error",
    "success": false,
    "details": message
  } );

};

global.onInvalidToken = ( request, response ) => {

  response.statusCode = 401;

  response.json( {
    "statusCode": 401,
    "statusText": "Unauthorized",
    "success": false,
    "details": "token invalid"
  } );

};

global.onUpload = ({
  file,
  moveTo
}) => {

  const phisycalName = profil.name;
  const ext = phisycalName.split('.').slice( -1 )[0];

  const type = profil.mimeType;

  return new Promise( (resolve,reject) => {

    if( /^(image)\/(png|jpe?g|gif)$/.test( type ) ) {

      const filename = file.md5 + "." + ext;

      profil.mv(
        path.join(
          moveTo,
          filename
        ),
        error => (
          error ?
            reject( {file, error} ):
            resolve( {
              filename,
              success: true,
              ext,
              file
            } )
        )
      );

    } else {

      resolve( {
        file,
        success: false,
        details: "invalid type mime"
      } );
    }

  } );

};
