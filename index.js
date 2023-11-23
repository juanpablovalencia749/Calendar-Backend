const express = require('express');  // import Express  from 'express';
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

console.log( process.env );
 
//Creation of service express
const app = express();

//Database
dbConnection();

//cors
app.use(cors())


//File Public
app.use( express.static('public'));

//read and parseo of body
app.use( express.json() );

//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//listen request
app.listen( process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
});