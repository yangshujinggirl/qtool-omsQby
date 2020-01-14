import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { GetListsApi } from "api/home/Brand";
import { Qtable, Qpagination, Qbtn } from "common";
import { Link } from "react-router-dom";
import Columns from "./column";

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandLists: [],
      everyPage: 20,
      currentPage: 0,
      totalCount: 0,
      inputValues: {}
    };
  }
  //初始化数据
  componentDidMount = () => {
    // this.props.dispatch({
    //   type: "brand/fetchList",
    //   payload: {}
    // });
    this.searchData({});
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    // this.props.dispatch({
    //   type: "brand/fetchList",
    //   payload: params
    // });
    GetListsApi(params).then(res => {
      if (res.httpCode == 200) {
        let { resultList, everyPage, currentPage, totalCount } = res.result;
        const brandLists = resultList.map(item => {
          item.key = item.id;
          return item;
        });
        this.setState({
          brandLists,
          everyPage,
          currentPage,
          totalCount
        });
      }
    });

    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    // this.props.dispatch({
    //   type: "brand/fetchList",
    //   payload: { ...this.state.inputValues, currentPage, everyPage }
    // });
    const params = { currentPage, everyPage };
    this.searchData(params);
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  render() {
    console.log(this.props);
    const { brandLists, everyPage, currentPage, totalCount } = this.state;
    console.log(this.state);

    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Link to={`/account/brandAdd`}>
            <Qbtn size="free">新增品牌</Qbtn>
          </Link>
        </div>
        <Qtable columns={Columns} dataSource={brandLists} />
        <Qpagination
          data={{ everyPage, currentPage, totalCount }}
          onChange={this.changePage}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { BrandReducers } = state;
  return BrandReducers;
}
export default connect(mapStateToProps)(Brand);
