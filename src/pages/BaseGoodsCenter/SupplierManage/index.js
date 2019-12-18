import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import {Link} from 'react-router-dom'
import {AuditApi} from 'api/home/BaseGoodsCenter/SupplierManage'
import Columns from "./column";

class SupplierManage  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {}
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.initPage()
  };
  initPage=()=>{
    this.props.dispatch({
      type: "supplierManage/fetchList",
      payload: {
        ...this.state.inputValues
      }
    });
  }
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    this.props.dispatch({
      type: "supplierManage/fetchList",
      payload: params
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "supplierManage/fetchList",
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
  //审核、停止合作
  handleOperation=(record,type)=>{
    AuditApi({id:record.id,cooperationStatus:type}).then(res=>{
      this.initPage() 
    })
  }
  render() {
    const { tableLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Link to="/account/AddSupplier">
            <Qbtn size="free">
              新增供应商
            </Qbtn>
          </Link>
        </div>
        <Qtable columns={Columns} onOperateClick={this.handleOperation} dataSource={tableLists} />
        <Qpagination data={this.props} onOperateClick={this.changePage} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state)
  const { SupplierManageReducers } = state;
  return SupplierManageReducers;
}
export default connect(mapStateToProps)(SupplierManage);
