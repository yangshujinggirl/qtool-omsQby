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
    const params = { ...this.state.inputValues, ...values };
    this.props.dispatch({
      type: "saleOrder/fetchList",
      payload: params
    });
    
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
    const {channelCode,..._values} = params;
    _values.channelCode = channelCode.join(',');
    this.searchData(_values);
    this.setState({ inputValues: _values });
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
    });
  }
  shopIdChange=(value)=>{
    this.setState({
      shopId:value
    });
  }
  render() {
    const {visible,shopId} = this.state;
    const { tableLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} shopId={shopId} shopIdChange={this.shopIdChange}/>
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
