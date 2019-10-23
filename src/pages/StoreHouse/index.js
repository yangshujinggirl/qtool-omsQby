import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import {Link} from 'react-router-dom'
import { ExportApi } from "api/Export";
import Columns from "./column";

class StoreHouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {}
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.props.dispatch({
      type: "storeHouse/fetchList",
      payload: {
        ...this.state.inputValues
      }
    });
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    this.props.dispatch({
      type: "storeHouse/fetchList",
      payload: params
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "storeHouse/fetchList",
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
    const { tableLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Link to="/account/storeAdd">
            <Qbtn size="free" onClick={this.export}>
              新增仓库
            </Qbtn>
          </Link>
        </div>
        <Qtable columns={Columns} dataSource={tableLists} />
        <Qpagination data={this.props} onChange={this.changePage} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { StoreHouseReducers } = state;
  return StoreHouseReducers;
}
export default connect(mapStateToProps)(StoreHouse);
