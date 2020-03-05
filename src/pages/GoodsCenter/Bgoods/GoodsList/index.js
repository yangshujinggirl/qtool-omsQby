import { connect } from "react-redux";
import { Qpagination, Qbtn } from "common";
import {
  GetListsApi,
  changeStatusApi
} from "api/home/GoodsCenter/Bgoods/GoodList";
import { parColumns, subColumns } from "./column";
import QsubTable from "common/QsubTable";
import FilterForm from "./components/FilterForm";
import { message } from "antd";

const tipsText = {
  1: "操作后商品将在Q掌柜-每日上新栏目展示售卖，是否确认操作？",
  2: "操作后商品将不能在Q掌柜-每日上新栏目搜索查看，是否确认操作？",
  3: "操作后商品将在Q掌柜-畅销尖货栏目展示售卖，是否确认操作？",
  4: "操作后商品将不能在Q掌柜-畅销尖货栏目搜索查看，是否确认操作？"
};
class Bgoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      everyPage: 20,
      currentPage: 0,
      totalCount: 0,
      goodLists: [],
      visible: false,
      type: "",
      inputValues: {}
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.searchData();
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    GetListsApi(params).then(res => {
      if (res.httpCode == 200) {
        const { result, everyPage, total, currentPage } = res.result;
        this.setState({
          goodLists: result,
          everyPage,
          totalCount: total,
          currentPage,
          inputValues: params
        });
      }
    });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.searchData({ ...this.state.inputValues, currentPage, everyPage });
  };
  //搜索查询
  onSubmit = params => {
    console.log(params)
    this.searchData(params);
  };
  //批量操作
  batchOperate = type => {
    this.setState({
      visible: true,
      type
    });
  };
  //批量操作弹窗确认
  onOk = () => {};
  //上下架操作
  handleOperateClick = (record, type) => {
    //type(1:'上架' 0:下架)
    const { id } = record;
    changeStatusApi({ id, upperStatus: type }).then(res => {
      if (res.httpCode == 200) {
        const text = type == 1 ? "上架成功" : "下架成功";
        message.success(text, 0.8);
        this.searchData()
      };
    });
  };
  formatList = data => {
    data &&
      data.map(item => {
        item.key = item.id;
        item["subList"] &&
          item["subList"].map(subItem => {
            subItem.key = subItem.id;
            let [totalStockQty, totalSaleQty] = [0, 0];
            totalStockQty += Number(subItem.stockQty);
            totalSaleQty += Number(subItem.saleQty);
            item.totalStockQty = totalStockQty;
            item.totalSaleQty = totalSaleQty;
            return subItem;
          });
        return item;
      });
    return data;
  };
  render() {
    const {
      goodLists,
      everyPage,
      totalCount,
      currentPage,
      type,
      visible
    } = this.state;
    const dataSource = this.formatList(goodLists);
    console.log(dataSource);
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn onClick={() => this.batchOperate(1)}>批量上新</Qbtn>
          <Qbtn onClick={() => this.batchOperate(2)}>批量下新</Qbtn>
          <Qbtn onClick={() => this.batchOperate(3)}>批量上畅销</Qbtn>
          <Qbtn onClick={() => this.batchOperate(4)}>批量下畅销</Qbtn>
        </div>
        {goodLists.length > 0 && (
          <QsubTable
            subColumns={subColumns}
            parColumns={parColumns}
            dataSource={dataSource}
            onOperateClick={this.handleOperateClick}
          />
        )}
        <Qpagination
          data={{ everyPage, currentPage, totalCount }}
          onChange={this.changePage}
        />
        {visible && (
          <Modal
            visible={visible}
            onOK={this.onOk}
            onCancel={this.onCancel}
            okText="确认"
            onCancel="取消"
          >
            <div className="tips"> {tipsText[type]} </div>
          </Modal>
        )}
      </div>
    );
  }
}

export default Bgoods;
