import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import moment from 'moment';
import { Link } from "react-router-dom";
import {columns} from "./column";
import { ExportApi } from "../../../api/Export";
import {GetListsApi } from '../../../api/home/BaseGoodsCenter/InvestmentManage';
import UploadModal from './components/UploadModal'
import AddCurstomerModal from './components/AddCurstomerModal';
import AddRecordModal from './components/AddRecordModal';
import AuditModal from './components/AuditModal';
import './index.less';

class InvestmentManage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      ordeList:[],
      fileList:[],
      auditVisible:false,
      recordVisible:false,//添加记录
      uploadVisible:false,//上传弹框
      curstomerVisible:false,//新增客户
      intentionContent:{},//客户信息
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
  };
  //按钮操作区
  handleOperateClick = (record,type) => {
    switch(type) {
      case "upload":
        this.uploadFile()
        break;
      case "editRecord":
        this.setState({ recordVisible:true, intentionContent: record })
        break;
      case "audit":
        this.setState({ auditVisible:true, intentionContent: record })
        break;
    }
  };
  uploadFile=(record)=>{
    let { intentionContractList, formalContractList } = record;
    let {fileList}=this.state;
    if(record.status==2||record.status==3) {
      fileList = intentionContractList;
    } else if(record.status==5||record.status==6) {
      fileList = formalContractList;
    }
    fileList=fileList?fileList:[];
    fileList =fileList.length>0&&fileList.map((el,index)=>{
      let item={};
      item.uid =index;
      item.name ='image.jpg';
      item.status ='done';
      item.url =el;
      return item;
    })
    this.setState({ uploadVisible:true,intentionContent: record,fileList:fileList})
  }
  //新增客户
  addCurstomer = (record,type) => {
    this.setState({ curstomerVisible:true });
  };
  curstomerHandleOnCancel = () => {
    this.setState({ curstomerVisible:false });
  };
  curstomerHandleOnOk = () => {
    this.setState({ curstomerVisible:false });
    this.initPage();
  };
  //上传文件
  uploadHandleOnCancel = () => {
    this.setState({ uploadVisible:false });
  };
  uploadHandleOnOk = (value) => {
    this.setState({ uploadVisible:false });
    this.initPage();
  };
  //添加记录
  recordHandleOnCancel = () => {
    this.setState({ recordVisible:false });
  };
  recordHandleOnOk = () => {
    this.setState({ recordVisible:false });
    this.initPage();
  };
  //审核
  auditHandleOnCancel = () => {
    this.setState({ auditVisible:false });
  };
  auditHandleOnOk = () => {
    this.setState({ auditVisible:false });
    this.initPage();
  };
  render() {
    const { ordeList,fileList,recordList,recordVisible,auditVisible,
      curstomerVisible,uploadVisible,intentionContent } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.addCurstomer}>新增客户</Qbtn>
        </div>
        <Qtable
          onOperateClick={this.handleOperateClick}
          columns={columns}
          dataSource={ordeList} />
        <Qpagination
          data={this.state.dataPag}
          onChange={this.changePage} />
        <AddCurstomerModal
          visible={curstomerVisible}
          onCancel={this.curstomerHandleOnCancel}
          onOk={this.curstomerHandleOnOk}/>
        <AddRecordModal
          content={intentionContent}
          visible={recordVisible}
          onCancel={this.recordHandleOnCancel}
          onOk={this.recordHandleOnOk}/>
        <UploadModal
          fileList={fileList}
          content={intentionContent}
          onCancel={this.uploadHandleOnCancel}
          onOk={this.uploadHandleOnOk}
          visible={uploadVisible}/>
        <AuditModal
          content={intentionContent}
          onCancel={this.auditHandleOnCancel}
          onOk={this.auditHandleOnOk}
          visible={auditVisible}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(InvestmentManage);
