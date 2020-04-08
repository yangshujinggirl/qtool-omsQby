import React, { Component } from 'react';
import { Tabs, Button, Form, Input, Icon } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'dva';
import update from 'immutability-helper';
import MyTagControlContext from '../../../../../../components/MyTagControlContext';
import './index.less';


const FormItem = Form.Item;
const rowSource = {
  beginDrag(props) {
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    props.moveRow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};
class Card extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget } = this.props;
    let { index, item } =this.props;
    index++
    return connectDragSource(
      connectDropTarget(
        <div key={index} className="item-sort">
          {item.title}
          <span className="icon-idx">{index}</span>
        </div>
      ),
    );
  }
}

let DragableCard  = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(Card);

DragableCard = DragSource('row', rowSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(DragableCard);


class Sort extends Component {
  render() {
    const { sortArr } =this.props;
    return(
      <div className="sort-arr-action">
        {
          sortArr.map((el,index)=> (
            <DragableCard
              key={index}
              item={el}
              index={index}
              moveRow={this.props.moveRow}/>
          ))
        }
      </div>
    )
  }
}
Sort = MyTagControlContext(Sort);

export default Sort;
