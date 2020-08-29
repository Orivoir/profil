const session = require('express-session');

const MemoryStore = require('memorystore')( session );

const configSession = {

  cookie: {
    sameSite: true,
    httpOnly: true,
    secure:  ( global.config.env === "prod" ),
    maxAge: ( 1e3 * 60 * 60 * 12 ) // 12hours
  },
  store: new MemoryStore( {
    maxAge: ( 1e3 * 60 * 60 * 12 ) // 12hours
  } ),
  resave: false,
  saveUninitialized: true,
  secret: "http-app-"
};

module.exports = {
  value: session( configSession ),
  position: 1
};
