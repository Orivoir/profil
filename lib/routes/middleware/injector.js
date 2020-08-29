module.exports = {

  value: function( request, response, next ) {

    request.isAdmin = !!request.session.admin;
    next();
  },
  position: 3
}
