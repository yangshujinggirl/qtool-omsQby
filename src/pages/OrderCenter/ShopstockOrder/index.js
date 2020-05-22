import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import moment from 'moment';
import { Link } from "react-router-dom";
import Columns from "./column";
import { ExportApi } from "../../../api/Export";
import { GetOrderListApi } from '../../../api/home/OrderCenter/ShopstockOrder'

class ShopstockOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      fields:{},
      ordeList:[],
      dataPag:{
        everyPage:15,
        currentPage:1,
        total:0
      }
    }
  }
  //初始化数据
  componentDidMount(){
    this.getlist()
  };
  getlist(values){
    GetOrderListApi(values)
    .then((res)=> {
      let {resultList=[],everyPage,currentPage,total} = res.result;
      resultList.map((el,index)=>el.key=index)
      this.setState({
        ordeList:resultList,
        dataPag:{
          everyPage,
          currentPage,
          total
        }
      })
    })
  }
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.getlist({ currentPage, everyPage })
  };
  //搜索查询
  onSubmit = params => {
    let { time, ...vals } =params;
    if(time){
      vals.stime = moment(time[0]).format('YYYY-MM-DD H:mm:ss');
      vals.etime = moment(time[0]).format('YYYY-MM-DD H:mm:ss');
    };
    this.getlist(vals)
    this.setState({fields: vals})
  };
  onExport=()=>{
    ExportApi({...this.state.fields,type:1})
  }
  render() {
    const { ordeList } = this.state;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.onExport}>导出</Qbtn>
        </div>
        <Qtable columns={Columns} dataSource={ordeList} />
        <Qpagination data={this.state.dataPag} onChange={this.changePage} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(ShopstockOrder);
