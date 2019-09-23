import React, { Component } from 'react';
import { Table } from 'antd';
import './index.less';
// class QcardTable extends Component {
//   render() {
//     return(
//       <div>
//         <Table
//           columns={columnLog}
//           dataSource={logList}
//           bordered
//           pagination={false}
//           title={() => '订单日志'}/>
//       </div>
//     )
//   }
// }
function QcardTable({ columns, data, title }){
  return(
    <Table
      columns={columns}
      dataSource={data}
      bordered
      pagination={false}
      title={title}/>
  )
}

export default QcardTable;
