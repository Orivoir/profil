const config = require('./config.json');
const path = require('path');
const Storage = require('./lib/storage/storage');
const fs = require('fs');

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

if( !fs.existsSync( path.join( __dirname, "uploads" ) ) ) {

  fs.mkdirSync( path.join( __dirname, "uploads" ) );
}

Object.keys(global.STORAGES_NAME).forEach( attribute => (
  global.storage.createDir( global.STORAGES_NAME[attribute] )
) );

global.__ROOT__ = __dirname;

global.exp = require('express');

global.DIR_UPLOAD = path.join( __dirname, "uploads" );
global.DIR_VIEWS = path.join( __dirname, "views" );
global.DIR_IMAGES = path.join( global.__ROOT__, "./public/images" )

global.saveConfig = function() {

  fs.writeFileSync(
    path.join(
      __dirname, "./config.json"
    ),
    JSON.stringify( global.config ),
    {
      encoding: "utf-8"
    }
  );

};

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
  moveTo,
  name=null
}) => {

  const phisycalName = file.name;
  const ext = phisycalName.split('.').slice( -1 )[0];

  const type = file.mimetype;

  return new Promise( (resolve,reject) => {

    if( /^(image)\/(png|jpe?g|gif)$/.test( type ) ) {

      const filename = ( name || file.md5 ) + "." + ext;

      file.mv(
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
