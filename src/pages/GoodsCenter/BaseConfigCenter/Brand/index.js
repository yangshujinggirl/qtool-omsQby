import FilterForm from "./components/FilterForm";
import { GetListsApi } from "api/home/Brand";
import {Spin} from 'antd'
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
      total: 0,
      loading: false,
      inputValues: {}
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.searchData({});
  };
  //搜索列表
  searchData = values => {
    this.setState({
      loading: true
    });
    const params = { ...this.state.inputValues, ...values };
    GetListsApi(params)
      .then(res => {
        this.setState({
          loading: false
        });
        if (res.httpCode == 200) {
          let { result, everyPage, currentPage, total } = res.result;
          if (result.length) {
            result.map(item => {
              item.key = item.id;
            });
          }
          this.setState({
            brandLists: result,
            everyPage,
            currentPage,
            total
          });
        }
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    const params = { currentPage, everyPage };
    this.searchData(params);
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  render() {
    const { brandLists, everyPage, currentPage, total, loading } = this.state;
    console.log(brandLists)
    return (
      <Spin spinning={loading}>
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.onSubmit} />
          <div className="handle-operate-btn-action">
            <Link to={`/account/brandAdd`}>
              <Qbtn size="free">新增品牌</Qbtn>
            </Link>
          </div>
          <Qtable columns={Columns} dataSource={brandLists} />
          <Qpagination
            data={{ everyPage, currentPage, total }}
            onChange={this.changePage}
          />
        </div>
      </Spin>
    );
  }
}
export default Brand;
