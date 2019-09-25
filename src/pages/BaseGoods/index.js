import React, { Component } from "react";
import { Table, Spin } from "antd";
import FilterForm from "./components/FilterForm";
import * as Actions from "./actions";
import { QbyConnect } from "common";
import { Columns, Columns1 } from "./column";
import PassModal from "./components/PassModal";

class BaseGoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      status: 3,
      inputValues: {
        productNature: -1,
        productType: -1,
        sendType: -1,
        status: -1,
        currentPage: 1
      }
    };
  }
  componentDidMount = () => {
    this.props.actions.getGoodsList({ ...this.state.inputValues });
  };
  onCancel = () => {};
  onOk = () => {};

  onSubmit = params => {
    console.log(params);
  };
  render() {
    const { visible, status } = this.state;
    const { goodLists } = this.props;
    console.log(goodLists);
    return (
      <Spin tip="加载中..." spinning={this.props.loading}>
        <div>
          <FilterForm onSubmit={this.onSubmit} />
          <div>
            <Table
              columns={Columns}
              expandedRowRender={record => {
                console.log(record);
                return <Table columns={Columns1} dataSource={record.list} />;
              }}
              dataSource={goodLists}
            />
          </div>
        </div>
      </Spin>
    );
  }
}

export default QbyConnect(BaseGoods, Actions, "BaseGoodsReducers");
