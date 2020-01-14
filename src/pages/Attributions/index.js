import FilterForm from "./components/FilterForm";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Qtable, Qpagination, Qbtn } from "common";
import Columns from "./column";
import AddAtrModal from "./components/AddAtr";

class Attributions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {},
      visible: false,
      attributeId: "",
      attributeName: "",
      attributeState: undefined
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.initPage();
  };
  initPage = () => {
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
    this.setState({
      visible: true
    });
  };
  //编辑
  handleOperateClick = record => {
    const { attributeId, attributeName, attributeState } = record;
    this.setState({
      attributeId,
      attributeName,
      attributeState,
      visible: true
    });
  };
  onOk = clearForm => {
    this.onCancel(clearForm);
    this.initPage();
  };
  onCancel = clearForm => {
    this.setState({
      visible: false,
      attributeId: "",
      attributeState: undefined,
      attributeName: ""
    });
    clearForm();
  };
  render() {
    const { atrLists } = this.props;
    const { visible, attributeId, attributeState, attributeName } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.addAtr}>
            新增规格
          </Qbtn>
        </div>
        <Qtable
          onOperateClick={this.handleOperateClick}
          columns={Columns}
          dataSource={atrLists}
        />
        <Qpagination data={this.props} onChange={this.changePage} />
        <AddAtrModal
          {...{ visible, attributeId, attributeName, attributeState }}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { AttributionsReducers } = state;
  return AttributionsReducers;
}
export default connect(mapStateToProps)(Attributions);
