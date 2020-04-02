import { Table, Spin, Button } from "antd";
import FilterForm from "./components/FilterForm";
import { QsubTable, Qpagination, QbyConnect, Qbtn, Qtable} from "common";
import { Columns } from "./column";
import { GetListApi } from "api/home/SupplierManage";
import { OmsExportApi } from "api/Export";
import moment from 'moment'

class SupplierManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      everyPage:15,
      currentPage: 0,
      totalCount:0,
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
      let { resultList, totalCount, everyPage, currentPage } =res.result;
      resultList&&resultList.map((el)=>el.key = el.id)
      this.setState({ list:resultList, totalCount, everyPage, currentPage})
    })
  };
  changePage = (currentPage) => {
    currentPage--;
    this.setState({currentPage},()=> {
      this.searchData()
    })
  };
  onShowSizeChange = (currentPage, everyPage) => {
    this.setState({currentPage,everyPage},()=> {
      this.searchData()
    })
  };
  onSubmit = params => {
    this.searchData(params);
  };
  handleOperateClick = (record,type) => {
    // debugger
    // console.log(record)
    // switch(type){
    //   case "edit":
    //     this.props.history.push(`/account/supplierManage/${record.id}`)
    //     break;
    //   case "info":
    //     this.props.history.push(`/account/supplierManage/${record.id}`)
    //     break;
    // }
  };
  //审核
  audit = (record, type) => {
    console.log(typeof record.skuCode);
    this.setState({ status: type, skuCode: record.skuCode }, () => {
      this.setState({
        visible: true
      });
    });
  };
  addTrade=()=> {
    this.props.history.push('/account/baseGoodsAdd')
  }
  export =()=> {
    OmsExportApi({...this.state.inputValues,type:1})
  }
  render() {
    const { list, totalCount, everyPage, currentPage } = this.state;

    return (
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.onSubmit} inputValues={this.state.inputValues}/>
          <div className="handle-operate-btn-action">
            <Qbtn size="free" onClick={this.addTrade}>新建供应商</Qbtn>
            <Qbtn size="free">批量审核</Qbtn>
          </div>
          <Qtable
            columns={Columns}
            dataSource={list}
            onOperateClick={this.handleOperateClick}
          />
          {list.length>0&&
            <Qpagination
              data={{ totalCount, everyPage, currentPage }}
              onChange={this.changePage}
              onShowSizeChange={this.onShowSizeChange}/>}
      </div>
    );
  }
}

export default SupplierManage;
