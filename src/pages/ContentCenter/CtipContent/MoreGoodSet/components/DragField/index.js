import { Table, Button } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import './index.less';


let dragingIndex = -1;


class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow,  ...restProps } = this.props;
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
    let dragingParent = props['data-row-parent'];
    return {
      index: dragingIndex,
      parent:dragingParent
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props['data-row-index'];
    const hoverParent = props['data-row-parent'];
    const dragParent = monitor.getItem().parent;
    // Don't replace items with themselves
    if(!hoverParent&&!hoverIndex) {
      return;
    }
    if (dragIndex === hoverIndex&&dragParent===hoverParent) {
      return;
    }
    props.moveRow(dragParent, hoverParent, dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
    monitor.getItem().parent = hoverParent;
  },
};
let DragableBodyRow  = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(BodyRow);

DragableBodyRow = DragSource('row', rowSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(DragableBodyRow);

// class Field extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   components = {
//     body: {
//       row: DragableBodyRow,
//     },
//   };
//   //绑定方法
//   processData(data) {
//     if(!this.props.onOperateClick) {
//       return data;
//     }
//     data && data.map((item, i) => {
//         item.onOperateClick = (type) => { this.props.onOperateClick(item,type) };
//     })
//     return data;
//   }
//   render() {
//     const { goods, columnsTwo, columnsOne } =this.props;
//     let listTwo = this.processData(goods.listTwo)
//     let listOne = this.processData(goods.listOne)
//     let len = [...listOne,...listTwo].length;
//     return (
//       <DndProvider backend={HTML5Backend}>
//         <div className="drag-tables-component">
//           <Table
//             bordered
//             rowClassName={(record,index)=>(
//               record.isLine==20||record.isPresell||record.pdSpuInv==0?'haveBackColor':null
//             )}
//             pagination={false}
//             columns={columnsOne}
//             dataSource={listOne}
//             components={this.components}
//             onRow={(record, index) => ({
//               'data-row-key':record.key,
//               'data-row-parent':'listOne',
//               'data-row-index':index,
//               'moveRow': this.props.moveRow,
//             })}/>
//           <Table
//             bordered
//             rowClassName={(record,index)=>(
//               record.isLine==20||record.isPresell||record.pdSpuInv==0?'haveBackColor':null
//             )}
//             pagination={false}
//             columns={columnsTwo}
//             dataSource={listTwo}
//             components={this.components}
//             footer={()=><Button type="default" disabled={len>=100?true:false} onClick={this.props.handleAdd}>+新增</Button>}
//             onRow={(record, index) => ({
//               'data-row-key':record.key,
//               'data-row-index':index,
//               'data-row-parent':'listTwo',
//               'moveRow': this.props.moveRow,
//             })}/>
//         </div>
//       </DndProvider>
//     );
//   }
// }

export default DragableBodyRow;
