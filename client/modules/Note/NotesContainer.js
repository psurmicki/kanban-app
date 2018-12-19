import { connect } from 'react-redux';
import Notes from './Notes';
import { updateNoteRequest, deleteNoteRequest, editNote, moveWithinLane } from '../Note/NoteActions';
import { moveBetweenLanes } from '../Lane/LaneActions';

const mapDispatchToProps = {
  updateNote: updateNoteRequest,
  deleteNote: deleteNoteRequest,
  editNote,
  moveWithinLane,
  moveBetweenLanes
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
