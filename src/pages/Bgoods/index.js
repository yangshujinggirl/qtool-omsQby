import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import { ExportApi } from "api/Export";
import Columns from "./column";
import moment from "moment";

class Bgoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {
        saleRange: "b",
        currentPage: 1
      }
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.props.dispatch({
      type: "bgoods/fetchList",
      payload: {
        ...this.state.inputValues
      }
    });
  };
  //搜索列表
  searchData = values => {
    const { time, ..._values } = values;
    if (time && time[0]) {
      _values.stime = moment(time[0]).format("YYYY-MM-DD H:mm:ss");
      _values.etime = moment(time[1]).format("YYYY-MM-DD H:mm:ss");
    } else {
      _values.stime = "";
      _values.etime = "";
    }
    const params = { ...this.state.inputValues, ..._values };
    this.props.dispatch({
      type: "bgoods/fetchList",
      payload: params
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "bgoods/fetchList",
      payload: {
        ...this.state.inputValues,
        currentPage,
        everyPage
      }
    });
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  //导出
  export = () => {
    ExportApi({ ...this.state.inputValues, type: 2 });
  };
  render() {
    console.log(this.props);
    const { goodLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.export}>
            商品导出
          </Qbtn>
        </div>
        <Qtable columns={Columns} dataSource={goodLists} />
        <Qpagination data={this.props} onChange={this.changePage} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { BgoodsReducers } = state;
  return BgoodsReducers;
}

export default connect(mapStateToProps)(Bgoods);
