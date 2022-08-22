const fs = require('fs');
const path = require('path');

function filterByQuery(query, notes) {
  let filteredResults = notes;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (notes) => notes.title === query.title
    );
  }
  if (query.noteText) {
    filteredResults = filteredResults.filter(
      (notes) => notes.noteText === query.noteText
    );
  }
  return filteredResults;
}

function findById(id, notes) {
  const result = notes.filter((notes) => notes.id === id)[0];
  return result;
}

function createNewNotes(body, notes) {
  const note = body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../data/notes.json'),
    JSON.stringify({ notes }, null, 2)
  );
  return note;
}

function validateNotes(notes) {
  if (!notes.title || typeof notes.title !== 'string') {
    return false;
  }
  if (!notes.noteText || typeof notes.noteText !== 'string') {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewNotes,
  validateNotes,
};
