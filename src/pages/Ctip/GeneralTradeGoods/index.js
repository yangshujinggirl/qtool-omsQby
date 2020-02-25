import { Table, Spin, Button } from "antd";
import { connect } from 'react-redux';
import FilterForm from "./components/FilterForm";
import { Qpagination, Qbtn, Qtable, QsubTable} from "common";
import { ColumnsPar, ColumnsSub } from "./column";
import { Link } from 'react-router-dom';

import { GetListApi } from "api/cTip/GeneralTradeGoods";
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
      params = {...params,...values}
    }
    GetListApi(params)
    .then((res)=> {

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
      case 'sale':
        //上下架
        console.log(record)
        break;
    }
  };

  render() {
    let { goodLists } = this.state;
    goodLists = [{
          spuCode:"2323",
          key:"2323",
          productName:"小红脸",
          productType:"正常品",
          categoryStr:"宝宝辅食/果泥/瓜类果泥/熟果泥食",
          sku:"3",
          isNewStr:"是",
          saleAmount:"7897789",
          subList:[{
              skuCode:2323,
              key:2323,
              image:"商品图片",
              salesAttributeName:"红/大",
              customerPrice:"¥12.00",
              saleAmount:"7829",
              upperStatus:1,
              upperStatusStr:"上架",
            },{
                skuCode:2333,
                key:2333,
                image:"图片",
                salesAttributeName:"蓝/小",
                customerPrice:"¥11.00",
                saleAmount:"79",
                upperStatus:0,
                upperStatusStr:"下架",
              }]
        }]
    return (
        <div className="oms-common-index-pages-wrap">
          <FilterForm onSubmit={this.onSubmit} />
          <QsubTable
            parColumns={ColumnsPar}
            subColumns={ColumnsSub}
            dataSource={goodLists}
            onOperateClick={this.handleOperateClick}
          />
          {/*
            goodLists.length>0&&
            <Qpagination
              data={this.props}
              onChange={this.changePage}
              onShowSizeChange={this.onShowSizeChange}/>
          */}
      </div>
    );
  }
}
export default List;
