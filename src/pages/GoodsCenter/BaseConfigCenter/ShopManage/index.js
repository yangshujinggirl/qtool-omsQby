import { connect } from "react-redux";
import FilterForm from "./components/FilterForm";
import { Link } from "react-router-dom";
import { ChannelShopStatuApi } from "api/home/BaseConfigCenter/ShopManage";
import { Qtable, Qpagination, Qbtn } from "common";
import Columns from "./column";

class ShopManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      inputValues: {}
    };
  }
  //初始化数据
  componentDidMount = () => {
    this.initPage();
  };
  initPage = () => {
    this.props.dispatch({
      type: "shopManage/fetchList",
      payload: {
        ...this.state.inputValues
      }
    });
  };
  //搜索列表
  searchData = values => {
    const params = { ...this.state.inputValues, ...values };
    this.props.dispatch({
      type: "shopManage/fetchList",
      payload: params
    });
    this.setState({ inputValues: params });
  };
  //更改分页
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type: "shopManage/fetchList",
      payload: {
        ...this.state.inputValues,
        currentPage,
        everyPage
      }
    });
  };
  //搜索查询
  onSubmit = params => {
    let { address, ...vals } = params;
    if (address) {
      vals.province = address[0];
      vals.city = address[1];
      vals.area = address[2];
    }
    this.searchData(vals);
  };
  setVisible = () => {
    this.setState({
      visible: true
    });
  };
  //开店/关店
  handleOperateClick = (record, type) => {
    //1开店3关店
    const params = {
      id: record.id,
      channelStatus: type == "open" ? 1 : 3
    };
    ChannelShopStatuApi(params).then(res => {
      this.initPage();
    });
  };
  render() {
    console.log(this.props);
    const { tableLists } = this.props;
    return (
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={this.onSubmit} />
        <div className="handle-operate-btn-action">
          <Link to="/account/addShop">
            <Qbtn size="free">新增门店</Qbtn>
          </Link>
        </div>
        <Qtable
          onOperateClick={this.handleOperateClick}
          columns={Columns}
          dataSource={tableLists}
        />
        <Qpagination data={this.props} onChange={this.changePage} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { ShopManageReducers } = state;
  return ShopManageReducers;
}
export default connect(mapStateToProps)(ShopManage);
