// import express.js
const express = require('express');
// use node fs for read/write functions
const fs = require('fs');
// import 'path' package
const path = require('path');
// import the database file
const notes = require('./db/db.json');

// Express
// initialize express
const app = express();
// port for server
const PORT = process.env.PORT || 5001;
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
    return res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// API
// fetch json data
app.get('/api/notes', (req, res) => {
    return res.status(200).json(notes);
});

// post json data
app.post('/api/notes', (req, res) => {
    // point to path where POST will write new data to database
    let jsonDataPath = path.join(__dirname, './db/db.json')

    // store body contents of json object and push content to array in database 'db.json'
    let newNote = req.body;
    notes.push(newNote);

    // BONUS assign id to notes so they can be tracked for deletion
    // id will refresh on POST so later when index is applied, number sequences should always align
    notes.forEach((item, i) => {
        item.id = i + 1;
    });
    
    // overwrite json database file with string including new object from push
    fs.writeFile(jsonDataPath, JSON.stringify(notes, null, 4), 
    (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully saved note!')
        );
    // send json response
    res.status(200).json(newNote);
});

// BONUS delete note
// include query parameter 'id' to check the route of req.body property 'id' of the "notes" object to be deleted
app.delete('/api/notes/:id', (req, res) => {
    let jsonDataPath = path.join(__dirname, './db/db.json');
    // variable to store value of the route property 'id'
    let noteID = req.params.id;

    // assigns array index to objects so the index number sequence aligns with 'id' parameter
    for (let i = 0; i < notes.length; i++) {
        // if index number matches id number, takes object at that index number and splices out of array database
        if (notes[i].id == noteID) {
            notes.splice(i, 1);
            break;
        }
    }

    // rewrites file with the newly spliced array, preserves 'id' and index sequence until new POST event
    fs.writeFileSync(jsonDataPath, JSON.stringify(notes, null, 4), 
    (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
    // sends json of new array
    res.status(200).json(notes);
});

// catchall routing back to index.html
app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'))
});

// run server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
