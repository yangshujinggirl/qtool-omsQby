import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, Qbtn } from "common";
import AreaSearch from './components/AreaSearch'
import Columns from "./column";

class SaleOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false, 
      inputValues: {},
      shopId:[]
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.props.dispatch({
      type: "saleOrder/fetchList",
      payload: {
        ...this.state.inputValues
      }
    });
  };
  //搜索列表
  searchData = values => {
    const {time,..._values} = values;
    if(time && time[0]){
      _values.stime = moment(time[0].format('YYYY-MM-DD HH:mm:ss'));
      _values.etime = moment(time[1].format('YYYY-MM-DD HH:mm:ss'));
    };
    const params = { ...this.state.inputValues, ..._values };
    this.props.dispatch({
      type: "saleOrder/fetchList",
      payload: params
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "saleOrder/fetchList",
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
  setVisible=()=>{
    this.setState({
      visible:true
    });
  }
  onCancel=()=>{
    this.setState({
      visible:false
    });
  }
  onOk=(selectKeys)=>{
    this.setState({
      shopId:selectKeys,
      visible:false
    })
  }
  render() {
    const {visible,shopId} = this.state;
    const { tableLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} shopId={shopId}/>
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={this.setVisible}>
            区域搜索
          </Qbtn>
        </div>
        <Qtable columns={Columns} dataSource={tableLists} />
        <Qpagination data={this.props} onChange={this.changePage} />
        {visible&&<AreaSearch visible={visible} onCancel={this.onCancel} onOk={this.onOk}/>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { SaleOrderReducers } = state;
  return SaleOrderReducers;
}
export default connect(mapStateToProps)(SaleOrder);
