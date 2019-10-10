import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, QbyConnect, Qbtn } from "common";
import * as Actions from "./actions/actionsIndex";
import {ExportApi} from 'api/Export'
import Columns from "./column";
import moment from "moment";

class Cgoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {
        saleRange: "c",
        currentPage: 1
      }
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.props.actions.getGoodsList({ ...this.state.inputValues });
  };
  //搜索列表
  searchData = values => {
    const {time,..._values} = values;
    if(time&&time[0]){
      _values.stime = moment(time[0]).format('YYYY-MM-DD H:mm:ss');
      _values.etime = moment(time[1]).format('YYYY-MM-DD H:mm:ss');
    }else{
      _values.stime = '';
      _values.etime = ''
    };
    const params = { ...this.state.inputValues, ..._values }; 
    this.props.actions.getGoodsList(params);
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.actions.getGoodsList({
      ...this.state.inputValues,
      currentPage,
      everyPage
    });
  };
  //搜索查询
  onSubmit = params => {
    this.searchData(params);
  };
   //导出
  export =()=> {
    ExportApi({...this.state.inputValues,type:2})
  }
  render() {
    const { goodLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.export}>商品导出</Qbtn>
        </div>
        <Qtable
          columns={Columns}
          dataSource={goodLists}
        />
        <Qpagination
          data={this.props}
          onChange={this.changePage}
        />
      </div>
    );
  }
}

export default QbyConnect(Cgoods, Actions, "CgoodsReducers");
