const
  exp = require('express');
  app = exp(),
  server = require('http').Server( app ),
  path = require('path')
;

app.get('/', (_,res) => {

  res.sendFile( path.join( __dirname, "./index.html" ) )
} )

const httpListener = server.listen( process.PORT, () => {

  const addr = httpListener.address();

  console.log( "\n\tApp running at: ", addr );

} );
