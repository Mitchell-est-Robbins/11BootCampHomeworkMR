//taken from in-class assignment 26
const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// create a delete, export it  
const readAndDelete = (id) => {
  readFromFile ('./db/db.json').then((data)=> {
 
    const parsedData = JSON.parse(data);
    parsedData.forEach(objthing => {
      if (id == objthing.id) {
        const index = parsedData.indexOf(objthing);            //worked through hard with Ethan,Willian, and Damien

        parsedData.splice(index, 1);
      }
    })
    writeToFile('./db/db.json', parsedData);
  })
  
}

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete};
