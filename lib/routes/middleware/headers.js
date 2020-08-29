module.exports = {

  value: function( request, response, next ) {

    response.removeHeader('X-Powered-By');
    next();
  },
  position: 0,
}
