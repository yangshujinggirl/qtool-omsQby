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
        item['subList']&&item['subList'].map(subItem => {
          subItem.onOperateClick = type => {
            this.props.onOperateClick(subItem, type);
          };
        });
      });
    return data;
  }
  render() {
    const { parColumns, subColumns } = this.props;
    let dataSource = this.processData(this.props.dataSource);
    return (
      <Table
        className="tree-Table-wrap"
        columns={parColumns}
        expandedRowRender={record => (
          <Table
            className="sub-two-Table-wrap"
            bordered
            pagination={false}
            columns={subColumns}
            dataSource={record['subList']?record['subList']:[]}
          />
        )}
        dataSource={dataSource}
        pagination={false}
      />
    );
  }
}

export default Index;
