// *****************************************************************************
// Imports
// *****************************************************************************

const mongoose = require('mongoose');
const settings = require('./server.settings');


// *****************************************************************************
// Connect to database
// *****************************************************************************

module.exports = function connectDatabase() {
  var dbURL  = settings.DATABASE_URL_PROD;
  var dbName = settings.DATABASE_NAME_PROD;

  return mongoose.connect(`${dbURL}/${dbName}`, function(err) {
    if (err) {
      throw new Error(err.message);
    }
  });
};


// *****************************************************************************
