const fileUpload = require('express-fileupload');

module.exports = {
  value: fileUpload( {
    limits: {
      fileSize: 1e7
    }
  } ),
  position: 7
};
