import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import { ExportApi } from "api/Export";
import { GetListsApi } from "api/home/GoodsCenter/Bgoods/GoodList";
import Columns from "./column";
import moment from "moment";
import QsubTable from "common/QsubTable";
import { message } from "antd";

class Bgoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      everyPage: 20,
      currentPage: 0,
      totalCount: 0,
      goodLists: [],
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
        const { result, everyPage, totalPage, currentPage } = res;
        this.setState({
          goodLists: result,
          everyPage,
          totalPage,
          currentPage,
          inputValues: params
        });
      }
    });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.searchData({ currentPage, everyPage, ...this.state.inputValues });
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  render() {
    const { goodLists, everyPage, totalCount, currentPage } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn onClick={this.batchOperate}>批量上新</Qbtn>
          <Qbtn onClick={this.batchOperate}>批量下新</Qbtn>
          <Qbtn onClick={this.batchOperate}>批量上畅销</Qbtn>
          <Qbtn onClick={this.batchOperate}>批量下畅销</Qbtn>
        </div>
        {goodLists.length > 0 && (
          <QsubTable columns={Columns} dataSource={goodLists} />
        )}
        <Qpagination
          data={{ everyPage, currentPage, totalCount }}
          onChange={this.changePage}
        />
      </div>
    );
  }
}

export default Bgoods;
