const {readAndAppend, readFromFile, readAndDelete } = require ('./helpers/fsUtils')
const path = require('path');
const uuid = require( './helpers/uuid')
const express = require('express');
const fs = require( 'fs');


const PORT = 3001;
//add the bit needed for heroku when it is ready
const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use('/api', api); //not needed right now

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
  );
  
  // GET Route for note page
  app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
  });
  



  // GET Route for putting the notes into JSON
  app.get('/api/notes', (req, res) => {
   //can put a console log here
   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});



// POST Route for the new note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);
  
    const { title, text, id } = req.body;
    
    if (title && text) {
    const newNote = {
        title,
        text,
        id: uuid(), //the eye of Ethan it is just pulling id
    };
    
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added 🚀`);
} else {
    res.error('Error, note not added');
}
});


// DELETE Route for a specific tip //-------------from miniproject and working with William, Damien, and Ethan
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readAndDelete(noteId);
    res.json(`shit got deleted `)    
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
