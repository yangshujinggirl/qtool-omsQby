import { Table, Spin, Button } from "antd";
import FilterForm from "./components/FilterForm";
import { Qmessage, QsubTable, Qpagination, QbyConnect, Qbtn, Qtable} from "common";
import { Columns } from "./column";
import { GetListApi } from "api/home/SupplierManage";
import { OmsExportApi } from "api/Export";
import AuditModal from './components/AuditModal';
import moment from 'moment'

class SupplierManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      everyPage:15,
      currentPage: 0,
      total:0,
      selectedRowKeys:[],
      visible:false,
      inputValues: {
        name:null,
        status:null,
        cooperationStatus:null,
        accountsType:null
      }
    };
  }
  //初始化数据
  componentDidMount (){
    this.searchData();
  };
  //搜索列表
  searchData = () => {
    let { everyPage, currentPage, inputValues } =this.state;
    let params = { everyPage, currentPage, ...inputValues };
    GetListApi(params)
    .then((res)=> {
      let { result, total, everyPage, currentPage } =res.result;
      result&&result.map((el)=>el.key = el.id)
      this.setState({ list:result, total, everyPage, currentPage})
    })
  };
  changePage = (currentPage,everyPage) => {
    this.setState({currentPage,everyPage},()=> {
      this.searchData()
    })
  };
  // onShowSizeChange = (currentPage, everyPage) => {
  //   debugger
  //   this.setState({currentPage,everyPage},()=> {
  //     this.searchData()
  //   })
  // };
  onSubmit = params => {
    this.setState({ inputValues: params },()=> {
      this.searchData();
    })
  };
  addTrade=()=> {
    this.props.history.push('/account/supplierManage/add/')
  }
  export =()=> {
    OmsExportApi({...this.state.inputValues,type:1})
  }
  goAudit=()=> {
    if(this.state.selectedRowKeys.length==0) {
      Qmessage.error('请选择供应商')
      return;
    }
    this.setState({ visible:true });
  }
  onOk=()=> {
    this.onCancel();
    this.searchData();
  }
  onCancel=()=> {
    this.setState({ visible:false, selectedRowKeys:[] });
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  render() {
    const { visible, list, total, everyPage, currentPage, selectedRowKeys } = this.state;
    const rowSelection = {
     selectedRowKeys,
     onChange: this.onSelectChange,
   };
    return (
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.onSubmit}/>
          <div className="handle-operate-btn-action">
            <Qbtn size="free" onClick={this.addTrade}>新建供应商</Qbtn>
            <Qbtn size="free" onClick={this.goAudit}>批量审核</Qbtn>
          </div>
          <Qtable
            columns={Columns}
            dataSource={list}
            select={true}
            rowSelection={rowSelection}/>
          {list.length>0&&
            <Qpagination
              data={{ total, everyPage, currentPage }}
              onChange={this.changePage}/>
            }
              <AuditModal
                selectedRowKeys={selectedRowKeys}
                visible={visible}
                onOk={this.onOk}
                onCancel={this.onCancel}/>
      </div>
    );
  }
}

export default SupplierManage;
