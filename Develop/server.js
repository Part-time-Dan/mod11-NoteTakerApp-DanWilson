// import express.js
const express = require('express');
// use node fs for read/write functions
const fs = require('fs');
// import 'path' package
const path = require('path');
// notes database
const notes = require('./db/db.json');


// Express
// initialize express
const app = express();
// port for server
const PORT = process.env.PORT || 3001;
// middleware parsing for JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// point to folder with code
app.use(express.static('public'));


// html ROUTES
// default routing for landing page
app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'))
});
// route for notes page
app.get('/notes', (req, res) => {
    console.log("Notes");
    return res.sendFile(path.join(__dirname, '/public/notes.html'))
});


// API
// fetch json data
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    return res.status(200).json(notes);
});
// post json data
app.post('/api/notes', (req, res) => {
    res.json(`${req.method} request received`);
    console.info(`${req.method} request received`);

    let jsonDataPath = path.join(__dirname, './db/db.json')

    const newNote = req.body;
    // console.log(note);

    notes.push(newNote);
    // console.log(notes);

    fs.writeFile(jsonDataPath, JSON.stringify(notes), 
    (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully saved note!')
        );

    res.status(200).json(newNote);

});


// BONUS delete POST


// catchall routing back to home
app.get('*', (req, res) => {
    console.log("FALLBACK");
    return res.sendFile(path.join(__dirname, '/public/index.html'))
});

// run server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
