import { connect } from 'react-redux';
import Notes from './Notes';
import { editNote, createNoteRequest, updateNoteRequest, deleteNoteRequest, moveWithinLane } from './NoteActions';

const mapDispatchToProps = {
  editNote,
  createNote: createNoteRequest,
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  moveWithinLane,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
