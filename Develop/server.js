// import express.js
const express = require('express');
// import 'path' package
const path = require('path');
// notes database
const notes = require('./db/db.json')

// initialize express
const app = express();
// port for server
const PORT = process.env.PORT || 3001;

// point to folder with code
app.use(express.static('public'));

// default routing for landing page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
    );

// route for notes page using terms '/api/notes' provided in index.js starter code
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// run server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
