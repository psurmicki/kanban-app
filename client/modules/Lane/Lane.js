import React from 'react';
import PropTypes from 'prop-types';
import NotesContainer from '../Note/NotesContainer';
import Edit from '../../components/Edit';
import { DragSource } from 'react-dnd';

// Import Style
import styles from './Lane.css';

const Lane = props => {
  const { connectDragSource, connectDropTarget, editing, lane, laneNotes, updateLane, editLane, addNote, deleteLane } = props;
  const laneId = lane.id;

  const dragSource = editing ? a => a : connectDragSource;

  return dragSource(connectDropTarget(
    <div className={styles.Lane}>
      <div className={styles.LaneHeader}>
        <div className={styles.LaneAddNote}>
          <button onClick={() => addNote({ task: 'New Note' }, laneId)}>Add Note</button>
        </div>
        <Edit
          className={styles.LaneName}
          editing={lane.editing}
          value={lane.name}
          onValueClick={() => editLane(lane.id)}

          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
        <div className={styles.LaneDelete}>
          <button onClick={() => deleteLane(laneId)}>Remove Lane</button>
        </div>
      </div>
      <NotesContainer
        notes={laneNotes}
        laneId={laneId}
      />
    </div>
  ));
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  addNote: PropTypes.func,
  updateLane: PropTypes.func,
  deleteLane: PropTypes.func,
  connectDropTarget: PropTypes.func,
  connectDragSource: PropTypes.func,
  editing: PropTypes.func,
};

export default Lane;
