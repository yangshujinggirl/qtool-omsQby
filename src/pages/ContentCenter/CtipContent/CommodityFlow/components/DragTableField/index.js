import React, { Component } from 'react';
import { Table, Button } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragSource, DndProvider, DropTarget } from 'react-dnd';
// import MyTagControlContext from '../../../../../../components/MyTagControlContext';



let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;

    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }
    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    let dragingIndex = props['data-row-index'];
    return {
      index: dragingIndex,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props['data-row-index'];
    if (dragIndex === hoverIndex) {
      return;
    }
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};
let DragableBodyRow  = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(BodyRow);

DragableBodyRow = DragSource('row', rowSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(DragableBodyRow);


export default DragableBodyRow;
