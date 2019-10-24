import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import moment from 'moment';
import { Link } from "react-router-dom";
import Columns from "./column";
import { ExportApi } from "../../../api/Export";
import {GetListsApi } from '../../../api/home/BaseGoodsCenter/InvestmentManage';
import AuditModal from './components/AuditModal'
import AddCurstomerModal from './components/AddCurstomerModal';
import './index.less';

class InvestmentManage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      fields:{},
      ordeList:[],
      limitAmount:{},
      curstomerVisible:false,//新增客户
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
  }
  getList(values){
    GetListsApi(values)
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
    let { address, ...vals } =params;
    if(address){
      vals.province = address[0];
      vals.city = address[1];
      vals.area = address[2];
    };
    this.getList(vals)
    this.setState({fields: vals})
  };
  onExport=()=>{
    ExportApi({...this.state.fields,type:1})
  }
  handleOperateClick = (record,type) => {
    switch(type) {
      case "upload":
        console.log('upload',record)
        break;
      case "editRecord":
        console.log('editRecord',record)
        break;
      case "lookRecord":
        console.log('lookRecord',record)
        break;
      case "audit":
        console.log('audit',record)
        break;
    }
  };
  //新增客户
  addCurstomer = (record,type) => {
    this.setState({ curstomerVisible:true });
  };
  handleCurstomerOnCancel = () => {
    this.setState({ curstomerVisible:false });
  };
  handleCurstomerOnOk = () => {
    this.setState({ curstomerVisible:false });
    this.initPage();
  };
  render() {
    const { ordeList, limitAmount, curstomerVisible, auditVisible, auditContent} = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.addCurstomer}>新增客户</Qbtn>
        </div>
        <Qtable
          onOperateClick={this.handleOperateClick}
          columns={Columns}
          dataSource={ordeList} />
        <Qpagination data={this.state.dataPag} onChange={this.changePage} />
        <AddCurstomerModal
          visible={curstomerVisible}
          content={limitAmount}
          onCancel={this.handleCurstomerOnCancel}
          onOk={this.handleCurstomerOnOk}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(InvestmentManage);
