import FilterForm from "./components/FilterForm";
import { Qtable, Qpagination, QbyConnect, Qbtn } from "common";
import * as Actions from "./actions/actionsIndex";
import Columns from "./column";
import moment from "moment";

class Cgoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: {
        saleRange: "b",
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
    const {time,_values} = values;
    if(time){
      values.stime = moment(time[0]).format('YYYY-MM-DD H:mm:ss');
      values.etime = moment(time[1]).format('YYYY-MM-DD H:mm:ss');
      delete values.time
    };
    const params = { ...this.state.inputValues, ...values };
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
    const { time, ..._values } = params;
    if (time) {
      params.stime = moment(time[0]).format("YYYY-MM-DD H:mm:ss");
      params.etime = moment(time[1]).format("YYYY-MM-DD H:mm:ss");
    }
    this.searchData(params);
  };
  handleOperateClick = (record, type) => {
    switch (type) {
      case "pass":
        this.audit(record);
        break;
      case "look":
        this.look(record);
        break;
    }
  };
  //查看
  look = record => {
    this.history.push('/account/bGoodsAdd')
  };
  //编辑
  edit = record => {
    this.history.push('/account/bGoodsAdd')
  };
  render() {
    const { goodLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Qbtn size="free">商品导出</Qbtn>
        </div>
        <Qtable
          columns={Columns}
          dataSource={goodLists}
          onOperateClick={this.handleOperateClick}
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
