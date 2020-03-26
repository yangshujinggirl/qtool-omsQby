import { Table, Spin, Button } from "antd";
import { connect } from 'react-redux';
import FilterForm from "./components/FilterForm";
import { Qpagination, Qbtn, Qtable} from "common";
import { Columns, Columns1 } from "./column";
import { Link } from 'react-router-dom';

import { GetListApi } from "api/cTip/DescriptManage";
import moment from 'moment'

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodLists:[],
      total:0,
      currentPage:0,
      everyPage:15,
      inputValues: {
        attributeName: null,
        categoryCode1: null,
        categoryCode2: null,
        categoryCode3: null,
        categoryCode4: null,
        modifyBy:null
      }
    };
  }
  //初始化数据
  componentDidMount(){
    this.getList()
  };
  //搜索列表
  getList = () => {
    let params = {
      currentPage:this.state.currentPage,
      everyPage:this.state.everyPage,
      ...this.state.inputValues
    };
    GetListApi(params)
    .then((res)=> {
      const { result,currentPage, everyPage, total } =res.result;
      result&&result.map((el,index) => el.key = index);
      this.setState({ goodLists:result, currentPage, everyPage, total})
    })
  };
  changePage = (currentPage, everyPage) => {
    this.setState({
      currentPage, everyPage
    },()=> {
      this.getList()
    })
  };
  onShowSizeChange = (currentPage, everyPage) => {
    this.setState({
      currentPage, everyPage
    },()=> {
      this.getList()
    })
  };
  onSubmit = params => {
    this.setState({ inputValues:params },()=> {
      this.getList()
    })
  };

  render() {
    const { goodLists,currentPage, everyPage, total } = this.state;
    return (
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.onSubmit} />
          <div className="handle-operate-btn-action">
            <Qbtn size="free" onClick={this.addTrade}>
              <Link
                className="link-color action-left"
                to="/account/descriptAdd">
                新增属性
              </Link>
            </Qbtn>
          </div>
          <Qtable
            columns={Columns}
            dataSource={goodLists}
          />
          {
            goodLists.length>0&&
            <Qpagination
              data={{currentPage, everyPage, totalCount:total}}
              onChange={this.changePage}
              onShowSizeChange={this.onShowSizeChange}/>
          }
      </div>
    );
  }
}
export default List;
