import { connect } from 'react-redux';
import { compose } from 'redux';
import { DropTarget, DragSource } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import * as laneActions from './LaneActions';
import Lane from './Lane';
import { deleteLaneRequest, updateLaneRequest, editLane, moveBetweenLanes } from './LaneActions';
import { createNoteRequest } from '../Note/NoteActions';

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const typeDragged = monitor.getItemType();        
    console.log('over', monitor.isOver({
      shallow: false
    }));

    if (typeDragged === 'note') {
      const { id: noteId, laneId: sourceLaneId } = sourceProps;
    
      if (!monitor.didDrop()) {        
        targetProps.moveBetweenLanes(
          targetProps.lane.id,
          noteId,
          sourceLaneId,
        );
      }
    } else {
      console.log('propsy kolumny', sourceProps);
      if (targetProps.lane.id !== sourceProps.id) {
        targetProps.moveLanes(targetProps.lane.id, sourceProps.id);
      }
    }
  },
};

const mapStateToProps = (state, ownProps) => ({
  laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
});

const mapDispatchToProps = {
  ...laneActions,
  editLane,
  deleteLane: deleteLaneRequest,
  updateLane: updateLaneRequest,
  addNote: createNoteRequest,
  moveBetweenLanes
};

const laneSource = {
  beginDrag(props) {
    return {
      id: props.lane.id,
    };
  },
  isDragging(props, monitor) {
    return props.lane.id === monitor.getItem().id;
  },
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragSource(ItemTypes.LANE, laneSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget([ItemTypes.NOTE, ItemTypes.LANE], noteTarget, dragConnect => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
