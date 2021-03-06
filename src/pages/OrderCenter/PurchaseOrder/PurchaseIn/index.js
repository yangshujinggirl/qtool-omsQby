import React from "react";
import { Modal, message } from "antd";
import { Link } from "react-router-dom";
import {
  QbaseList,
  Qbtn,
  Qmessage,
  Qpagination,
  Qtable,
  ConfirmModal,
} from "common/index";
import FilterForm from "./components/FilterForm";
import AuditModal from "./components/AuditModal";
import Columns from "./column";
import "./index.less";
import {
  GetPurchaseInOrderListApi,
  PushPurchaseInOrderForceComplete,
  getPrintPage,
  getPrintHtml,
} from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseIn";
// import { PrintOneURL } from "./components/PrintOrder/print";
import {
  OmsExportApi,
  EXPORT_TYPE_PURCHASE_ORDER_IN,
  getExportData,
} from "../../../../api/Export";

/**
 * 弹窗确定点击
 */
function showForceCompleteModalClick(_this) {
  _this.showLoading();
  PushPurchaseInOrderForceComplete(_this.state.selectedRowKeys)
    .then((res) => {
      if (res.httpCode == 200) {
        console.log(111);

        _this.refreshDataList();
        _this.setState({
          selectedRowKeys: [],
        });
        message.success("强制完成", 0.8);
      }
      _this.hideLoading();
    })
    .catch((e) => {
      _this.hideLoading();
    });
}

/**
 * 显示弹窗
 */
function showModalClick(_this) {
  //判断是否有选择
  if (_this.state.selectedRowKeys.length === 0) {
    message.warning("请至少选择一个采购单", 0.8);
  } else {
    _this.setState({
      showModal: true,
    });
  }
}

/**
 * 弹窗取消按钮点击
 */
function onModalCancelClick(_this) {
  _this.setState({
    showModal: false,
  });
}
function handleOperateClick(record, _this) {
  _this.setState({
    auditModalVisible: true,
    stockingCode: record.stockingCode,
  });
}
function onClear(_this, type) {
  _this.setState({
    auditModalVisible: false,
  });
  if (type != "cancel") {
    _this.refreshDataList();
  }
}
// //打印采购单
// function printCgorder(_this) {
//   const { selectedRowKeys, selectedRows } = _this.state;
//   if (selectedRowKeys.length < 1) {
//     message.error("请选择采购单", 0.8);
//     return;
//   }
//   const { stockingCode } = selectedRows[0];
//   getPrintPage({ stockingCode }).then((res) => {
//     if (res.httpCode == 200) {
//       const page = res.result; //获取到打印几页
//       for (var i = 0; i < page; i++) {
//         getPrintHtml({ stockingCode, page: i + 1 }).then((res) => {
//           if (res.httpCode == 200) {
//             PrintOneURL(res.result, stockingCode);
//           }
//         });
//       }
//     }
//   });

//   _this.setState({
//     selectedRowKeys: [],
//     selectedRows: [],
//   });
// }

/**
 * 功能作用：采购订单列表界面
 * 初始注释时间： 2020/3/5 18:08
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
const PurchaseInOrderList = QbaseList(
  (_this) => {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
      searchCriteriaList,
      auditModalVisible,
      stockingCode,
      showLoadingStatus,
    } = _this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm
          onSubmit={_this.searchDataList}
          selectTimeChange={_this.selectTimeChange}
        />
        <div className="handle-operate-btn-action">
          <Link to="/account/add_purchasein">
            <Qbtn size="free">新建采购单</Qbtn>
          </Link>
          <Qbtn size="free" onClick={() => showModalClick(_this)}>
            强制完成
          </Qbtn>
          <Qbtn
            size="free"
            onClick={() =>
              OmsExportApi(
                getExportData(
                  searchCriteriaList.stime,
                  searchCriteriaList.etime,
                  EXPORT_TYPE_PURCHASE_ORDER_IN,
                  searchCriteriaList
                )
              )
            }
          >
            导出数据
          </Qbtn>
        </div>
        <Qtable
          columns={Columns}
          select={true}
          dataSource={dataList}
          onOperateClick={(record) => handleOperateClick(record, _this)}
          rowSelection={_this.getTableRowSelection({
            type: "radio",
          })}
        />
        <Qpagination
          data={{ everyPage, currentPage, total }}
          onChange={_this.changePage}
        />
        {_this.state.showModal && (
          <ConfirmModal
            visible={_this.state.showModal}
            title="强制完成"
            onOk={() => showForceCompleteModalClick(_this)}
            onCancel={() => onModalCancelClick(_this)}
            confirmLoading={showLoadingStatus}
            okText="确认"
            cancelText="取消"
          >
            <div className="tips">
              强制完成后，所选采购单状态将变更成“已收货”，是否确定强制完成？
            </div>
          </ConfirmModal>
        )}
        {auditModalVisible && (
          <AuditModal
            visible={auditModalVisible}
            stockingCode={stockingCode}
            onClear={(type) => onClear(_this, type)}
          />
        )}
      </div>
    );
  },
  GetPurchaseInOrderListApi,
    {
      dataListOptionsKey: "stockingCode",
      childStateParams:{ forceCompleteHaveFail: [] },
      onModalCancelClick:onModalCancelClick
    }
);
export default PurchaseInOrderList;
