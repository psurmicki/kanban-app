import callApi from '../../util/apiCaller';
import { lanes } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE LANE'; 
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const EDIT_LANE = 'EDIT_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const MOVE_BETWEEN_LANES = 'MOVE_BETWEEN_LANES';
export const MOVE_LANES = 'MOVE_LANES';

export function moveBetweenLanes(targetLaneId, noteId, sourceLaneId) { 
  debugger;
  return {
    type: MOVE_BETWEEN_LANES,
    targetLaneId,
    noteId,
    sourceLaneId,
  };
}

export function moveLanes(targetLaneId, sourceLaneId) {
  return {
    type: MOVE_LANES,
    targetLaneId,
    sourceLaneId,
  };
}

export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: {
      notes: [],
      ...lane,
    },
  };
}

export function updateLane(lane) {
  console.log('lane updated');
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function deleteLane(laneId) {
  return {
    type: DELETE_LANE,
    laneId,
  };
}

export function editLane(laneId) {
  return {
    type: EDIT_LANE,
    laneId,
  };
}

export function createLanes(lanesData) {
  return {
    type: CREATE_LANES,
    lanes: lanesData,
  };
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanes);
      const { lanes: normalizedLanes, notes } = normalized.entities; 
      dispatch(createLanes(normalizedLanes));
      dispatch(createNotes(notes));
    });
  };
}

export function createLaneRequest(lane) {
  return dispatch => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res));
    });
  };
}

export function deleteLaneRequest(laneId) {
  return dispatch => {
    return callApi(`lanes/${laneId}`, 'delete').then(() => {
      dispatch(deleteLane(laneId));
    });
  };
}

export function updateLaneRequest(lane) {
  return dispatch => {
    console.log('PASSED LANE', lane);
    console.log('LANE ID', lane.id);
    return callApi(`lanes/${lane.id}`, 'put', { name: lane.name }).then(() => {
      dispatch(updateLane(lane));
    });
  };
}
