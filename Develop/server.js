// import express.js
const express = require('express');
// use node fs for read/write functions
const fs = require('fs');
// import 'path' package
const path = require('path');
// notes database
const notes = require('./db/db.json');
// include util in case promisify needed to read json data
const util = require('util');


// Express
// initialize express
const app = express();
// port for server
const PORT = process.env.PORT || 3001;
// point to folder with code
app.use(express.static('public'));
// middleware parsing for JSON
app.use(express.json());



// ROUTES
// default routing for landing page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html'))
);
// route for notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// API
// fetch json data
app.get('/api/notes', (req, res) => res.json(notes));

// post json data


// BONUS delete POST


// run server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
