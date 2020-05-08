import React from "react";
import { Link } from "react-router-dom";
import { QbaseList, Qpagination, Qbtn, Qtable } from "common/index";
import FilterForm from "./components/FilterForm";
import "./index.less";
import Columns from "./column";
import {
  OmsExportApi,
  EXPORT_TYPE_PURCHASE_ORDER_OUT,
  getExportData,
} from "../../../../api/Export";
import AuditModal from "./components/AuditModal";
import { GetPurchaseOutOrderListApi } from "../../../../api/home/OrderCenter/PurchaseOrder/PurchaseOut";

/**
 * 功能作用：采退订单列表界面
 * 初始注释时间： 2020/3/5 18:08
 * 注释创建人：LorenWang（王亮）
 * 方法介绍：
 * 思路：
 * 修改人：
 * 修改时间：
 * 备注：
 */
function handleOperateClick(record, _this) {
  _this.setState({
    auditModalVisible: true,
    stockingReCode: record.stockingReCode,
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
const PurchaseOutOrderList = QbaseList(
  (_this) => {
    const {
      dataList,
      everyPage,
      currentPage,
      total,
      auditModalVisible,
      stockingReCode,
      searchCriteriaList,
    } = _this.state;
    const {stime,etime,...inputValues} = searchCriteriaList;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm
          onSubmit={_this.searchDataList}
          selectTimeChange={_this.selectTimeChange}
        />
        <div className="handle-operate-btn-action">
          <Link to="/account/add_purchaseOut">
            <Qbtn size="free">新建采退单</Qbtn>
          </Link>
          <Qbtn
            size="free"
            onClick={() =>
              new OmsExportApi(
                getExportData(
                  stime,
                  etime,
                  EXPORT_TYPE_PURCHASE_ORDER_OUT,
                  inputValues
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
        />
        <Qpagination
          data={{ everyPage, currentPage, total }}
          onChange={_this.changePage}
        />
        {auditModalVisible && (
          <AuditModal
            visible={auditModalVisible}
            stockingReCode={stockingReCode}
            onClear={(type) => onClear(_this, type)}
          />
        )}
      </div>
    );
  },
  GetPurchaseOutOrderListApi,
    {
        dataListOptionsKey: "stockingReCode",
    }
);
export default PurchaseOutOrderList;
