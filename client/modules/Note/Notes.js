import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Edit from '../../components/Edit';

import styles from './Notes.css';

const Notes = (props) => {
  const { notes, laneId, editNote, updateNote, deleteNote, moveWithinLane } = props;
  return (<ul className={styles.notes}>{notes.map((note) =>
    <Note
      id={note.id}
      key={note.id}
      laneId={laneId}
      moveWithinLane={moveWithinLane}
    >
      <Edit
        editing={note.editing}
        value={note.task}
        onValueClick={() => editNote(note.id)}
        onUpdate={(task) => updateNote({
          ...note,
          task,
          editing: false,
        }, laneId
        )}
        onDelete={() => deleteNote(note.id, laneId)}
      />
    </Note>
  )}</ul>);
};

Notes.propTypes = {
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
  moveWithinLane: PropTypes.func,
};

export default Notes;
