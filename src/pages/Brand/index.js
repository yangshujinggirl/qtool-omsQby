import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import { Link } from "react-router-dom";
import Columns from "./column";

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {}
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.props.dispatch({
      type: "brand/fetchList",
      payload: {}
    });
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    this.props.dispatch({
      type: "brand/fetchList",
      payload: params
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "brand/fetchList",
      payload: { ...this.state.inputValues, currentPage, everyPage }
    });
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  render() {
    console.log(this.props);
    const { brandLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Link to={`/account/brandAdd`}>
            <Qbtn size="free">新增品牌</Qbtn>
          </Link>
        </div>
        <Qtable columns={Columns} dataSource={brandLists} />
        <Qpagination data={this.props} onChange={this.changePage} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { BrandReducers } = state;
  return BrandReducers;
}
export default connect(mapStateToProps)(Brand);
