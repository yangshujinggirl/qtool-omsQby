import React, { Component } from "react";
import { Table } from "antd";
import "./index.less";

class Index extends Component {
  //绑定方法
  processData(data) {
    if (!this.props.onOperateClick) {
      return data;
    }
    data &&
      data.map(item => {
        item.key = item.id;
        item.onOperateClick = type => {
          this.props.onOperateClick(item, type);
        };
        item["subList"] &&
          item["subList"].map(subItem => {
            subItem.key = subItem.id;
            item.totalStockQty += Number(subItem.stockQty);
            item.totalSaleQty += Number(subItem.saleQty);
            subItem.onOperateClick = type => {
              this.props.onOperateClick(subItem, type);
            };
            return subItem
          });
          return item
      });
    return data;
  }
  render() {
    const { parColumns, subColumns } = this.props;
    let dataSource = this.processData(this.props.dataSource);
    return (
      <Table
        pagination={false}
        bordered={true}
        dataSource={dataSource}
        columns={parColumns}
        expandable={{
          expandedRowRender: record => (
            <Table
              columns={subColumns}
              dataSource={record["subList"]}
              pagination={false}
            />
          )
        }}
      />
    );
  }
}

export default Index;
