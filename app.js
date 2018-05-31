
const fs = require('fs');
const _ = require('lodash');
const notes = require('./note.js');
const yargs = require('yargs');

const titleOptions = {
  describe:'Title of the note',
  demand: true,
  alias:'t'
};
const bodyOptions = {

    describe:'Body of the note',
    demand: true,
    alias:'b'
  };

const argv = yargs
  .command('Add','Add a new note',{
    title:titleOptions,
    body: bodyOptions
  })
  .command ('list','list all notes')
  .command('read','Read a note',{
    title:titleOptions

  })
  .command('remove','Remove a note',{
    title:titleOptions

  })
  .help()
  .argv;

var command = argv._[0];

if(command == 'Add')
{
  var note = notes.addNote(argv.title , argv.body);
  if (note)
  {
    console.log("Note created");
    notes.logNote(note);
  }
  else {
    console.log("Note title taken");
  }

}
else if (command === 'list') {
  var allNotes = notes.getAll();


  if(allNotes.length !== 0)
  {
    console.log(`Printing ${allNotes.length} note(s)`);

    allNotes.forEach((note) => notes.logNote(note));
  }
  else {
      console.log("Empty Note List");
  }

}
else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note)
  {
    console.log("Note Found");
    notes.logNote(note);
  }
  else {
    console.log("Note not found");
  }
}
else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed':'Note not found';
  console.log(message);
}
else {
  console.log('Command not recognised');
}
