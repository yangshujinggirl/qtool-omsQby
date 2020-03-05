import { Table, Spin, Button } from "antd";
import { connect } from 'react-redux';
import FilterForm from "../components/FilterForm";
import { QsubTable, Qpagination, QbyConnect, Qbtn, Qtable} from "common";
import { Columns, Columns1 } from "./column";
import PassModal from "../components/PassModal";
import { GoAuditApi } from "api/home/BaseGoods";
import { ExportApi } from "api/Export";
import moment from 'moment'

class BaseGoods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      status: 0,
      everyPage:15,
      currentPage: 1,
      inputValues: {
        productName:null,
        spuCode:null,
        skuCode:null,
        brandId:null,
        categoryCode1:null,
        categoryCode2:null,
        productType:null,
        time:[moment('2015/01/01', this.formatType), moment('2015/01/01', this.formatType)],
      }
    };
  }
  //初始化数据
  componentDidMount (){
    this.props.dispatch({
      type:'baseGoods/fetchList',
      payload:{
        everyPage:15,
        currentPage: 1,
      }
    })
  };
  //审核取消
  onCancel = resetFields => {
    this.setState({
      visible: false
    });
    resetFields();
  };
  //审核确认
  onOk = (values,resetFields) => {
    const { status, skuCode } = this.state;
    const params = { status, skuCode };
    if (status == 3) {params.remark = values.remark;}
    GoAuditApi(params).then(res => {
      resetFields();
      this.searchData(this.state.inputValues);
      this.setState({visible: false});
    });
  };
  //搜索列表
  searchData = values => {
    const {time,..._value} = values;
    if(time){
      _value.stime = moment(time[0]).format('YYYY-MM-DD H:mm:ss');
      _value.etime = moment(time[1]).format('YYYY-MM-DD H:mm:ss');
    };
    const { currentPage,everyPage } = this.state;
    const params = { everyPage, currentPage,..._value}
    this.props.dispatch({
      type:'baseGoods/fetchList',
      payload:params
    })
    this.setState({inputValues: values});
  };
  changePage = (currentPage, everyPage) => {
    this.props.dispatch({
      type:'baseGoods/fetchList',
      payload:{
        ...this.state.inputValues,
        currentPage,
        everyPage
      }
    })
  };
  onShowSizeChange = (currentPage, everyPage) => {
    this.props.dispatch({
      type:'baseGoods/fetchList',
      payload:{
        ...this.state.inputValues,
        currentPage,
        everyPage
      }
    })
  };
  onSubmit = params => {
    this.searchData(params);
  };
  handleOperateClick = (record,type) => {
    this.audit(record);
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
    ExportApi({...this.state.inputValues,type:1})
  }
  render() {
    const { visible, status } = this.state;
    const { goodLists } = this.props;

    return (
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.onSubmit} inputValues={this.state.inputValues}/>
          <div className="handle-operate-btn-action">
            <Qbtn size="free" onClick={this.addTrade}>新建一般贸易品</Qbtn>
            <Qbtn size="free">新建跨境品</Qbtn>
            <Qbtn size="free" onClick={this.export}>商品导出</Qbtn>
          </div>
          <Qtable
            columns={Columns}
            dataSource={goodLists}
            onOperateClick={this.handleOperateClick}
          />
          <Qpagination
            data={this.props}
            onChange={this.changePage}
            onShowSizeChange={this.onShowSizeChange}/>
          {(status==3||status==4)&&
            <PassModal
              onOk={this.onOk}
              onCancel={this.onCancel}
              status={status}
              visible={visible}
            />
          }
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { BaseGoodsReducers } =state;
  return BaseGoodsReducers;
}
export default connect(mapStateToProps)(BaseGoods);
