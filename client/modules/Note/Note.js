import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import ItemTypes from '../Kanban/itemTypes';
import styles from './Note.css';

class Note extends React.Component {
  render() {
    const {
     connectDragSource,
     connectDropTarget,
     isDragging,
     isOver,
     isOverShallow,
     editing,
     children,
    } = this.props;

    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <li
        className={styles.Note}
        style={{
          opacity: isDragging ? 0 : 1,
        }}
      >
       {children}
      </li>
   ));
  }
}

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      laneId: props.laneId,
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  },
};

const noteTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    
    if (targetProps.laneId !== sourceProps.laneId) {
      targetProps.moveBetweenLanes(
        targetProps.laneId,
        sourceProps.id,
        sourceProps.laneId,
      );
    }

    if (targetProps.id !== sourceProps.id) {
      targetProps.moveWithinLane(targetProps.laneId, targetProps.id, sourceProps.id);
    }
  },
};

Note.propTypes = {
  children: PropTypes.any,
  isDragging: PropTypes.bool,
  editing: PropTypes.func,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isOver: PropTypes.bool,
  isOverShallow: PropTypes.bool,
};

export default compose(
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverShallow: monitor.isOver({ shallow: false }),
  }))
)(Note);
