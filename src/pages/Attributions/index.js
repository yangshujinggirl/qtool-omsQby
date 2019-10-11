import FilterForm from "./components/FilterForm";
import { connect } from "react-redux";
import { Qtable, Qpagination, Qbtn } from "common";
import Columns from "./column";

class Attributions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {}
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.props.dispatch({
      type: "attribution/fetchList",
      payload: {}
    });
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    this.props.dispatch({
      type: "attribution/fetchList",
      payload: params
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "attribution/fetchList",
      payload: { ...this.state.inputValues, currentPage, everyPage }
    });
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  //新增属性
  addAtr = () => {
    
  };
  render() {
    const { atrLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.addAtr}>
            新增属性
          </Qbtn>
        </div>
        <Qtable columns={Columns} dataSource={atrLists} />
        <Qpagination data={this.props} onChange={this.changePage} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { AttributionsReducers } = state;
  return AttributionsReducers;
}
export default connect(mapStateToProps)(Attributions);
