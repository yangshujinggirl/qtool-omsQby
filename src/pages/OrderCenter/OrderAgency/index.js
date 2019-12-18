import { Qtable, Qpagination, Qbtn } from "common";
import FilterForm from "./components/FilterForm";
import { GetListApi } from "api/home/OrderCenter/OrderAgency";
import Columns from "./column";
import ExportApi from "api/Export";
import AgencyOrder from './components/AgencyOrder'
class OrderAgency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      everyPage: 20,
      currentPage: 1,
      totalCount: 0,
      tableList: [],
      inputValues: {},
      selectedRows:[],
      visible:false,
      rowSelection: {
        selectedRowKeys:[],
        onChange: this.onChange,
      }
    };
  }
  onChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      rowSelection: { ...this.state.rowSelection, selectedRowKeys},
      selectedRows,
    });
  };
  //初始化数据
  componentDidMount = () => {
    this.searchData({});
  };

  //搜索列表
  searchData = values => {
    const { time, ..._values } = values;
    if (time && time[0]) {
      _values.stime = moment(time[0].format("YYYY-MM-DD HH:mm:ss"));
      _values.etime = moment(time[1].format("YYYY-MM-DD HH:mm:ss"));
    }
    const params = { ...this.state.inputValues, ..._values };
    GetListApi(params).then(res => {
      const { everyPage, currentPage, totalCount, resultList } = res.result;
      resultList.map(item => {
        item.key = item.id;
      });
      this.setState({
        everyPage,
        currentPage,
        totalCount,
        tableList: resultList,
        inputValues: params
      });
    });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.searchData({ currentPage, everyPage });
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
  export = () => {
    ExportApi({ ...this.state.inputValues, exportType: 6 });
  };
  //生成采购单
  getOrder=()=>{
    this.setState({
      visible:true
    }); 
  }
  onCancel=()=>{
    this.setState({
      visible:false
    })
  }
  render() {
    const {
      tableList,
      everyPage,
      totalCount,
      currentPage,
      selectedRows,
      rowSelection,
      visible
    } = this.state;
    const PagesParams = { everyPage, totalCount, currentPage };
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.export}>
            全部导出
          </Qbtn>
          <Qbtn size="free" onClick={this.getOrder}>
            生成代发采购单
          </Qbtn>
        </div>
        <Qtable
          rowSelection={rowSelection}
          select={true}
          columns={Columns}
          dataSource={tableList}
        />
        <Qpagination data={PagesParams} onChange={this.changePage} />
        {
          visible&&
            <AgencyOrder visible={visible} onCancel={this.onCancel} selectedRows={selectedRows}/>
          
        }
        
      </div>
    );
  }
}
export default OrderAgency;
