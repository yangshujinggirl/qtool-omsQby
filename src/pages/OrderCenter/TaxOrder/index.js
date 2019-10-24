import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination } from "common";
import Columns from "./column";

class TaxOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false, 
      inputValues: {},
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.props.dispatch({
      type: "taxOrder/fetchList",
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
      type: "taxOrder/fetchList",
      payload: params
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "taxOrder/fetchList",
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
  };
  setVisible=()=>{
    this.setState({
      visible:true
    });
  }
  render() {
    const { tableLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit}/>
        <Qtable columns={Columns} dataSource={tableLists} />
        <Qpagination data={this.props} onChange={this.changePage} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { TaxOrderReducers } = state;
  return TaxOrderReducers;
}
export default connect(mapStateToProps)(TaxOrder);
