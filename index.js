require('./config');

const
  app = global.exp(),
  server = require('http').Server( app ),
  routes = require('./lib/routes/autoload'),
  middlewares = Array( Object.keys( routes.middleware ).length )
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

  .get('/admin', routes.admin.home )
  .post('/api/admin/login', routes.admin.login )
  .get('/api/admin/logout', routes.admin.logout )
  .get('/api/admin/messages', routes.admin.messages )
  .put('/api/admin/profil-picture', routes.admin["profil-picture"] )
  .post('/api/admin/portfolio', routes.admin["add-portfolio"] )
  .put('/api/admin/portfolio/:id', routes.admin["update-portfolio"] )
  .delete('/api/admin/portfolio/:id', routes.admin["delete-portfolio"] )
;

const httpListener = server.listen(
  global.config.env === "dev" ? 3001: process.env.PORT,
  () => {

    const addr = httpListener.address();

    console.log( "\n\tApp running at: ", addr , "\n" );

  }
);
