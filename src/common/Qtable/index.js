import React ,{ Component } from 'react';
import { Table } from 'antd';
import './index.less';

class QTable extends Component {
  constructor(props) {
    super(props);
  }
  //绑定方法
  processData(data) {
    if(!this.props.onOperateClick) {
      return data;
    }
    data && data.map((item, i) => {
        item.onOperateClick = (type) => { this.props.onOperateClick(item, type) };
    })
    return data;
  }
  render() {
    const dataSource = this.processData(this.props.dataSource);
    const { select, columns,scroll } = this.props;
    return(
      <Table
        loading={this.props.loading}
        pagination={false}
        bordered={true}
        dataSource={dataSource}
        columns = {this.props.columns}
        rowKey={this.props.rowKey?this.props.rowKey:(record)=>record.key}
        rowSelection={select?this.props.rowSelection:null}
        scroll={scroll&&this.props.scroll}/>
    )
  }
}
export default QTable;
