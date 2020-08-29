require('./config');

const
  app = global.exp(),
  server = require('http').Server( app ),
  routes = require('./lib/routes/autoload'),
  middlewares = Array( Object.keys( routes.middleware ).length ),
  path = require('path')
;

Object.keys( routes.middleware ).forEach( name => {

  const midw = routes.middleware[ name ];

  const position = midw.position;

  middlewares[ position ] = midw.value;

} );

middlewares.forEach( middleware => (
  middleware instanceof Array ? app.use( ...middleware ): app.use( middleware )
) );


app
  .get('/', routes.index.home )
  .post('/api/contact', routes.index.contact )
  .get('/api/portfolios', routes.index.portfolios )

  .get('/api/is-admin', routes.index['is-admin'] )

  .get('/portfolio/image/:filename', routes.index['image-portfolio'] )

  .get('/admin', routes.admin.home )
  .post('/api/admin/login', routes.admin.login )
  .get('/api/admin/logout', routes.admin.logout )
  .get('/api/admin/messages', routes.admin.messages )
  .delete('/api/admin/messages/:id', routes.admin["delete-message"] )
  .put('/api/admin/profil-picture', routes.admin["profil-picture"] )
  .post('/api/admin/portfolio', routes.admin["add-portfolio"] )
  .put('/api/admin/portfolio/:id', routes.admin["update-portfolio"] )
  .delete('/api/admin/portfolio/:id', routes.admin["delete-portfolio"] )
;

app.use( function( request, response ) {

  response.statusCode = 404;

  response.type('text/html');

  response.sendFile(
    path.join(
      global.DIR_VIEWS,
      "./not-found.html"
    )
  );

} );

const httpListener = server.listen(
  global.config.env === "dev" ? 3001: process.env.PORT,
  () => {

    const addr = httpListener.address();

    console.log( "\n\tApp running at: ", addr , "\n" );

  }
);
