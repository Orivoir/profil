const
  path = require('path'),
  fs = require('fs'),
  ROUTES_DIRNAME = [ "index", "admin", "middleware" ],
  routes = {}
;

fs.readdirSync( __dirname, {
  withFileTypes: true,
  encoding: "utf-8"
} )
.map( dirent => (
  typeof dirent === "object" ? dirent.name: dirent
) )
.forEach( dirname => {

  const dirPath = path.join( __dirname, dirname );

  const statDir = fs.statSync( dirPath );

  if( !statDir.isDirectory() || !ROUTES_DIRNAME.includes(dirname) ) {
    return;
  }

  fs.readdirSync( dirPath , {
    withFileTypes: true,
    encoding: "utf-8"
  } ).map( dirent => (
    typeof dirent === "object" ? dirent.name: dirent
  ) )
  .filter( filename => {

    const [routeName,ext] = filename.split('.');

    if( !ext || ext !== "js" ) {
      return;
    }

    if( !routes[ dirname ] ) {
      routes[ dirname ] = {};
    }

    routes[ dirname ][ routeName ] = require( path.join( __dirname, dirname, filename ) );


  } );

} );

module.exports = routes;
