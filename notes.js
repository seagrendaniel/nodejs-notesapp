const fs = require('fs');
const chalk = require('chalk');


const getNotes = () => {
  return 'Your notes...'
}

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title)

  if (notesToKeep.length === notes.length) {
    console.log(chalk.red.inverse('No note found!'))
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note removed!'));
  }
}

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse('Your Notes'))
  notes.forEach(note => console.log(chalk.green.inverse('- ' + note.title)));
}

const readNote = (title) => {
  const notes = loadNotes();
  const myNote = notes.find(note => note.title === title);

  if(myNote) {
    console.log(chalk.inverse(myNote.title));
    console.log(myNote.body);
  } else {
    console.log(chalk.red('No note found'));
  }
}

// Helper Functions
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}


// Exports
module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNotes,
  readNote
};