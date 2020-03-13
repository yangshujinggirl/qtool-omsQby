import React, { Component } from "react";
import moment from "moment";

class CommonActivityIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      everyPag: 0,
      currentPage: 0,
      totalCount: 0,
      dataList:[],
      inputValues:{}
    };
  }
  handleOperateClick = (record, type) => {
    switch (type) {
      case "info":
        this.goInfo(record);
        break;
      case "edit":
        this.goEdit(record);
        break;
      case "delete":
        this.goDelete(record);
        break;
      case "cancel":
        this.goCancel(record);
        break;
      case "zuofei":
        this.goZuofei(record);
        break;
      case "forcedEnd":
        this.goForcedEnd(record);
        break;
    }
  };
  goInfo = record => {
    const { componkey } = this.props;
    const paneitem = {
      title: "C端活动详情",
      key: `${componkey}TwoInfo${record.promotionId}`,
      componkey: `${componkey}TwoInfo`,
      parentKey: componkey,
      data: {
        promotionId: record.promotionId
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  goEdit = record => {
    const { componkey } = this.props;
    const paneitem = {
      title: "编辑C端活动",
      key: `${componkey}TwoOne${record.promotionId}`,
      componkey: `${componkey}TwoOne`,
      parentKey: componkey,
      data: {
        parentKey: componkey,
        promotionId: record.promotionId,
        promotionType: record.promotionType
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  };
  goDelete = record => {
    confirm({
      content: "是否确认删除活动",
      onOk: () => {
        getDeleteApi({ promotionId: record.promotionId }).then(res => {
          if (res.code == "0") {
            this.successCallback();
            message.success("删除成功");
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  goCancel = record => {
    let that = this;
    confirm({
      content: "是否确认撤销审核",
      onOk: () => {
        getApprovalsApi({ promotionId: record.promotionId }).then(res => {
          if (res.code == "0") {
            that.successCallback();
            message.success("撤销审核成功");
          }
        });
      },
      onCancel: () => {
        console.log("Cancel");
      }
    });
  };
  goZuofei = record => {
    let that = this;
    confirm({
      title: "作废后，此活动将不会出现在C端App和小程序",
      content: "是否确认作废？",
      onOk() {
        getEnableApi({
          promotionId: record.promotionId,
          operationType: 1
        }).then(res => {
          if (res.code == "0") {
            that.successCallback();
            message.success("作废成功");
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  goForcedEnd = record => {
    let that = this;
    confirm({
      title:
        "强制结束后，C端App和小程序活动即停止，所有活动商品都将不享受此活动优惠。",
      content: "是否确认强制结束？",
      onOk() {
        getEnableApi({
          promotionId: record.promotionId,
          operationType: 2
        }).then(res => {
          if (res.code == "0") {
            that.successCallback();
            message.success("强制结束成功");
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };
  formatParams = values => {
    let { time, ...paramsVal } = values;
    if (time && time.length > 0) {
      paramsVal.activityStrTime = moment(time[0]).format("YYYY-MM-DD HH:mm:ss");
      paramsVal.activityEndTime = moment(time[1]).format("YYYY-MM-DD HH:mm:ss");
    }
    return paramsVal;
  };
  //分页
  changePage = currentPage => {
    const { fields } = this.state;
    currentPage--;
    this.initData({ ...fields, currentPage });
  };
  //修改pageSize
  changePageSize = values => {
    const { fields } = this.state;
    values = { ...values, ...fields };
    this.initData(values);
  };
  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
  };
  submitSearch = values => {
    values = this.formatParams(values);
    this.initData(values);
  };
}
export default CommonActivityIndex;
