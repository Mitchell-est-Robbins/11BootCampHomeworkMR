const express = require('express');
const path = require('path');
// const api = require('./routes/index.js');
const uuid = require( './helpers/uuid')
const fs = require( 'fs');
const {readAndAppend, writeToFile, readFromFile, } = require ('./helpers/fsUtils')

const PORT = 3001;
//add the bit needed for heroku when it is ready
const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api); //not needed right now

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for putting the notes into JSON
app.get('/api/notes', (req, res) => {
   //can put a console log here
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  
// POST Route for the new note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a tip`);
    console.log(req.body);
  
    const { title, text, noteId } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        noteId: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added 🚀`);
    } else {
      res.error('Error, note not added');
    }
  });
  

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
