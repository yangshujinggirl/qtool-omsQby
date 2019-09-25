import React, { Component } from "react";
import { Table } from "antd";
import './index.less';

class Index extends Component {
  //绑定方法
  processData(data) {
    if (!this.props.onOperateClick) {
      return data;
    }
    data &&
      data.map(item => {
        item.onOperateClick = type => {
          this.props.onOperateClick(item, type);
        };
        item[this.props.subList].map(subItem => {
          subItem.onOperateClick = type => {
            this.props.onOperateClick(subItem, type);
          };
        });
      });
    return data;
  }
  render() {
    const { parColumns, subColumns, subList } = this.props;
    const parList = this.processData(this.props.parList);
    return (
      <Table
        className="tree-Table-wrap"
        bordered
        columns={parColumns}
        expandedRowRender={record => (
          <Table
            className="sub-two-Table-wrap"
            bordered
            pagination={false}
            columns={subColumns}
            dataSource={record[subList]}
          />
        )}
        dataSource={parList}
        pagination={false}
      />
    );
  }
}

export default Index;
