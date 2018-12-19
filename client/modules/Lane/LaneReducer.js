// Import Actions
import { CREATE_LANE, UPDATE_LANE, DELETE_LANE, EDIT_LANE, CREATE_LANES, MOVE_BETWEEN_LANES, MOVE_LANES } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE, MOVE_WITHIN_LANE } from '../Note/NoteActions';

import omit from 'lodash/omit';
import keyBy from 'lodash/keyBy';

const initialState = {};

function moveNotes(array, sourceNoteId, targetNoteId) {
  const sourceIndex = array.indexOf(sourceNoteId);
  const targetIndex = array.indexOf(targetNoteId);
  const arrayCopy = [...array];
 
  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
    case UPDATE_LANE:
      return { ...state, [action.lane.id]: action.lane };

    case DELETE_LANE:
      return omit(state, action.laneId);

    case EDIT_LANE:
      const lane = { ...state[action.laneId], editing: true };
      return { ...state, [action.laneId]: lane };

    case CREATE_LANES:
      return { ...action.lanes };
    
    case CREATE_NOTE:
      const newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.concat(action.note.id);
      return { ...state, [action.laneId]: newLane };

    case DELETE_NOTE:
      const updatedLane = { ...state[action.laneId] };
      updatedLane.notes = updatedLane.notes.filter(noteId => noteId !== action.noteId);
      return { ...state, [action.laneId]: updatedLane };

    case MOVE_WITHIN_LANE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = moveNotes(newLane.notes, action.sourceId, action.targetId);
    
      return { ...state, [action.laneId]: newLane };
    }

    case MOVE_LANES: {
      console.log(state);
      const newLanes = Object.values(state);
      console.log(newLanes);
      const sourceIndex = newLanes.indexOf(newLanes.find(lane => lane.id === action.sourceLaneId));
      const targetIndex = newLanes.indexOf(newLanes.find(lane => lane.id === action.targetLaneId));
      
      const temp = newLanes[sourceIndex];
      newLanes[sourceIndex] = newLanes[targetIndex];
      newLanes[targetIndex] = temp;

      return keyBy(newLanes, 'id');
    }

    case MOVE_BETWEEN_LANES: {
      const targetLane = { ...state[action.targetLaneId] };
      targetLane.notes = [...targetLane.notes, action.noteId];
      const sourceLane = { ...state[action.sourceLaneId] };
      sourceLane.notes = sourceLane.notes.filter(noteId => noteId !== action.noteId);
      return { ...state, [action.targetLaneId]: targetLane, [action.sourceLaneId]: sourceLane };
    }

    default:
      return state;
  }
}
