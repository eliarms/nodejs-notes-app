const fs = require('fs');

var fetchNotes = () => {

  // Try catch to verify if the file exist in the system and convert to JSON OBJECT
   try {
     var notesString = fs.readFileSync('notes-data.json');
     return  JSON.parse(notesString);
   } catch(e){
     return [];
   }
};
//SAVE Note to a file
var saveNotes = (notes) => {
fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

//Add note
var addNote = (title, body) =>
 {
   // create array of empty notes
  var notes = fetchNotes ();
  //OBJECT OF A note
  var note ={
    title,
    body
  };


// CHECk FOR DUPLICATE NOTES
 var duplicateNotes = notes.filter((note) => note.title === title);
 //SAVE Note to a file
 if (duplicateNotes.length === 0)
 {
   notes.push(note);
   saveNotes(notes);
   return note;
 }

 };

// List all note
var getAll = () =>
 {

   return fetchNotes ();
 };

 // List note
 var getNote = (title) =>
  {
  var notes = fetchNotes ();
  var FilteredNotes = notes.filter((note) => note.title === title);
  return FilteredNotes[0];
  };

 // remove a note
 var removeNote = (title) =>
  {
      var notes = fetchNotes ();
      var FilteredNotes = notes.filter((note) => note.title !== title);
      saveNotes(FilteredNotes);
      return notes.length !== FilteredNotes.length;
  };


var logNote = (note) =>{
  console.log("----");
  console.log(`Title: ${note.title} `);
  console.log(`Body: ${note.body} `);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
