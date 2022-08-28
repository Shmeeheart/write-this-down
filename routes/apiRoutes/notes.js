const router = require('express').Router();
const fs = require('fs');
const generateUniqueId = require('generate-unique-id');
const path = require('path');

const { findById } = require('../../lib/notes');
const { notes } = require('../../data/notes');

router.get('/notes', (req, res) => {
  let results = JSON.parse(fs.readFileSync('db/db.json'));
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  let results = JSON.parse(fs.readFileSync('db/db.json'));

  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: generateUniqueId(),
  };
  results.push(newNote);

  fs.writeFileSync(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify(results)
  );
  res.json(results);
});

router.delete('./notes/:id', (req, res) => {
  let results = JSON.parse(fs.readFileSync('db/db.json'));
  let newNoteArray = results.filter((note) => note.id !== req.params.id);

  fs.writeFileSync(
    path.join(__dirname, './../db/db.json'),
    JSON.stringify(newNoteArray)
  );
  res.json(newNoteArray);
});

module.exports = router;
