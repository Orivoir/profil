module.exports = function( request, response ) {

  const portfolios = global.storage.getAllDoc(
    global.STORAGES_NAME.PORTFOLIO
  ) || [];

  response.statusCode = 200;

  response.json({
    "statusCode": 200,
    "statusText": "Success",
    "success": true,
    portfolios
  });

};
