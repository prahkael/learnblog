// *****************************************************************************
// Imports
// *****************************************************************************

const express         = require('express');
const bodyParser      = require('body-parser');
const connectDatabase = require('./database');
// *****************************************************************************
// Locals
// *****************************************************************************

const app  = express();
const PORT = process.env.PORT || '4201';

// *****************************************************************************
// Settings
// *****************************************************************************

// Get port from environment and store in Express.
app.set('port', PORT);

// Body parser for JSON
app.use(bodyParser.json());

connectDatabase();


// Catch all error routes
app.use((err, req, res, next) => {
  console.log('\n********** An error occurred:');
  console.log(err);
  console.log('**********\n');

  if (err && err.status) {
    return res.status(err.status).json({ err });
  } else {
    return res.status(500).send('Server error occured. Please contact admin');
  }
});

// *****************************************************************************
// Server
// *****************************************************************************

app.listen(PORT, () => {
  console.log(`Server is running under port ${PORT}.`);
});

// *****************************************************************************
