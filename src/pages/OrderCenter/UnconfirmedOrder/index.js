import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import moment from 'moment';
import { Link } from "react-router-dom";
import Columns from "./column";
import { ExportApi } from "../../../api/Export";
import { GetOrderListApi, GetAmoutLimitApi } from '../../../api/home/OrderCenter/UnconfirmedOrder';
import AuditModal from './components/AuditModal'
import SetConfirmModal from './components/SetConfirmModal'

class ShopstockOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      fields:{},
      ordeList:[],
      limitAmount:{},
      confirmVisible:false,
      auditVisible:false,
      auditContent:{},
      dataPag:{
        everyPage:15,
        currentPage:1,
        totalCount:0
      }
    }
  }
  //初始化数据
  componentDidMount(){
    this.initPage()
  };
  initPage() {
    this.getList();
    this.getLimit()
  }
  getLimit(){
    GetAmoutLimitApi()
    .then((res)=> {
      let { result } = res;
      this.setState({ limitAmount:result })
    })
  }
  getList(values){
    GetOrderListApi(values)
    .then((res)=> {
      let {resultList=[],everyPage,currentPage,totalCount} = res.result;
      resultList.map((el,index)=>el.key=index)
      this.setState({
        ordeList:resultList,
        dataPag:{
          everyPage,
          currentPage,
          totalCount
        }
      })
    })
  }
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.getList({ currentPage, everyPage })
  };
  //搜索查询
  onSubmit = params => {
    let { time, ...vals } =params;
    if(time){
      vals.stime = moment(time[0]).format('YYYY-MM-DD H:mm:ss');
      vals.etime = moment(time[0]).format('YYYY-MM-DD H:mm:ss');
    };
    this.getList(vals)
    this.setState({fields: vals})
  };
  onExport=()=>{
    ExportApi({...this.state.fields,type:1})
  }
  handleOperateClick = (record,type) => {
    this.setState({ auditVisible:true, auditContent:record });
  };
  handleAuditOnCancel = () => {
    this.setState({ auditVisible:false, auditContent:{} });
  };
  handleAuditOk = () => {
    this.setState({ auditVisible:false, auditContent:{} });
  };
  setConfirmRange = (record,type) => {
    this.setState({ confirmVisible:true });
  };
  handleConfirmOnCancel = () => {
    this.setState({ confirmVisible:false });
  };
  handleConfirmOnOk = () => {
    this.setState({ confirmVisible:false });
    this.initPage();
  };
  render() {
    const { ordeList, limitAmount, confirmVisible, auditVisible, auditContent} = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.setConfirmRange}>设置人工确认范围</Qbtn>
        </div>
        <Qtable
          onOperateClick={this.handleOperateClick}
          columns={Columns}
          dataSource={ordeList} />
        <Qpagination data={this.state.dataPag} onChange={this.changePage} />
        <AuditModal
          visible={auditVisible}
          content={auditContent}
          onCancel={this.handleAuditOnCancel}
          onOk={this.handleAuditOk}/>
        <SetConfirmModal
          visible={confirmVisible}
          content={limitAmount}
          onCancel={this.handleConfirmOnCancel}
          onOk={this.handleConfirmOnOk}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(ShopstockOrder);
