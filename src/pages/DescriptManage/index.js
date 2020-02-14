import { Table, Spin, Button } from "antd";
import { connect } from 'react-redux';
import FilterForm from "./components/FilterForm";
import { Qpagination, Qbtn, Qtable} from "common";
import { Columns, Columns1 } from "./column";

import { GetListApi } from "../../api/cTip/DescriptManage";
import moment from 'moment'

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodLists:[],
      currentPage:0,
      everyPage:15,
      inputValues: {
        attributeName: '',
        categoryCode1: '',
        categoryCode2: '',
        categoryCode3: '',
        categoryCode4: 1,
        modifyBy:''
      }
    };
  }
  //初始化数据
  componentDidMount(){
    this.getList()
  };
  //搜索列表
  getList = values => {
    let params = {
      currentPage:this.state.currentPage,
      everyPage:this.state.everyPage,
      ...this.state.inputValues
    };
    if(values) {
      params = {...params,values}
    }
    GetListApi(params)
    .then((res)=> {
      console.log(res)
    })
  };
  changePage = (currentPage, everyPage) => {
    this.setState({
      currentPage, everyPage
    },()=> {
      this.getList(currentPage, everyPage)
    })
  };
  onShowSizeChange = (currentPage, everyPage) => {
    this.setState({
      currentPage, everyPage
    },()=> {
      this.getList(currentPage, everyPage)
    })
  };
  onSubmit = params => {
    this.getList(params);
  };
  handleOperateClick = (record,type) => {
    switch(type) {
      case 'edit':
        //去编辑
        break;
      case 'info':
        //去查看
        break;
    }
  };

  render() {
    const { goodLists } = this.state;
    return (
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.onSubmit} />
          <div className="handle-operate-btn-action">
            <Qbtn size="free" onClick={this.addTrade}>新增属性</Qbtn>
          </div>
          <Qtable
            columns={Columns}
            dataSource={goodLists}
            onOperateClick={this.handleOperateClick}
          />
          {
            goodLists.length>0&&
            <Qpagination
              data={this.props}
              onChange={this.changePage}
              onShowSizeChange={this.onShowSizeChange}/>
          }
      </div>
    );
  }
}
export default List;
