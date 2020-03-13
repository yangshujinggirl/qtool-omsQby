import React, { Component } from "react";
import { Button, Modal, message } from "antd";
import { Link } from "react-router-dom";
import { Qtable, Qpagination, Qbtn } from "common";
import FilterForm from "./components/FilterForm";
import CommonActivityIndex from "./components/CommonActivityIndex";
import { columnsIndex } from "./columns";
import {
  getListApi,
  getDeleteApi,
  getEnableApi,
  getApprovalsApi
} from "api/home/MarketCenter/PromotionAct/PosAct";
import "./index.less";

const { confirm } = Modal;

class CtipActivity extends CommonActivityIndex {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.initData();
  }
  initData(values) {
    const params = values ? { ...params, ...values } : {};
    getListApi(params).then(res => {
      if (res.httpCode == 200) {
        const { result, currentPage, everyPage, total } = res.result;
        if(result.length){
          result.map(item=>item.key = item.promotionId)
        }
        this.setState({
          dataList: result,
          currentPage,
          everyPage,
          totalCount: total
        });
      }
    });
  }
  successCallback = () => {
    //更新列表
    this.initData();
  };
  creatActivity = () => {
    const { componkey } = this.props;
    const paneitem = {
      title: "新建C端活动",
      key: `${componkey}TwoOne`,
      componkey: `${componkey}TwoOne`,
      parentKey: componkey,
      data: {
        parentKey: componkey
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  render() {
    const { dataList, everyPage, currentPage, totalCount } = this.state;
    return (
      <div className="oms-common-index-pages-wrap pos_act">
        <FilterForm
          onChange={this.handleFormChange}
          submit={this.submitSearch}
        />
        <div className="handle-operate-btn-action">
          <Link to="/account/add_pos_act">
            <Qbtn size="large" type="primary">
              新建活动
            </Qbtn>
          </Link>
        </div>
        <Qtable
          dataSource={dataList}
          columns={columnsIndex}
          onOperateClick={this.handleOperateClick}
        />
        {dataList.length > 0 && (
          <Qpagination
            sizeOptions="1"
            onShowSizeChange={this.changePageSize}
            data={{everyPage, currentPage, totalCount}}
            onChange={this.changePage}
          />
        )}
      </div>
    );
  }
}

export default CtipActivity;
