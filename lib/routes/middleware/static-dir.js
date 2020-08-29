const path = require('path');

module.exports = {

  value: [ "/assets/", global.exp.static(
    path.resolve( global.__ROOT__, "public" )
  ) ],

  position: 5
};
