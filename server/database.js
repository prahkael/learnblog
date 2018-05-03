// *****************************************************************************
// Imports
// *****************************************************************************

const mongoose = require('mongoose');
const settings = require('./server.settings');

// *****************************************************************************
// Locals
// *****************************************************************************

const NODE_ENV = process.env.NODE_ENV;

// *****************************************************************************
// Connect to database
// *****************************************************************************

export function connectDatabase() {
  let dbURL  = settings.DATABASE_URL_DEVELOPMENT;
  let dbName = settings.DATABASE_NAME_DEVELOPMENT;

  if (NODE_ENV === 'production') {
    dbURL  = settings.DATABASE_URL_PRODUCTION;
    dbName = settings.DATABASE_NAME_PRODUCTION;
  }
  else if (NODE_ENV === 'test') {
    dbURL  = settings.DATABASE_URL_TEST;
    dbName = settings.DATABASE_NAME_TEST;
  }

  return mongoose.connect(dbURL + '/' + dbName, function(err) {
    if (err) {
      throw new Error(err.message);
    }
  });
}


// *****************************************************************************
