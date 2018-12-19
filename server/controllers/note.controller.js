import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
  if (!req.body.laneId) {
    res.status(400).end();
  }

  console.log('request', req);  
  Note.findOneAndRemove({ id: req.params.noteId })
  .then(() => {
    Lane.findOne({ id: req.body.laneId })
  })
  .then(lane => {
    console.log('lane notes', lane.notes);
    lane.update({ notes: lane.notes.filter(note => note.id !== req.params.noteId) }).exec();
    // lane.update({ $pull: { notes: { id: req.params.noteId } }}).exec(); // CastError: Cast to ObjectId failed for value "8fcd4827-d3c6-426e-81f6-28e5606e06d4" at path "notes"
  });

  res.status(200).end();
}

export function editNote(req, res) {
  if (!req.body.task) {
    res.status(400).end();
  }

  Note.findOneAndUpdate({ id: req.params.noteId }, { task: req.body.task }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(note);
  });
}
