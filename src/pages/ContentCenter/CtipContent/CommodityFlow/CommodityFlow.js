import React, { Component } from 'react';
import { Tabs, Button } from 'antd';
import { connect } from 'dva';
import Mod from './components/Mod';
import TabsMod from './components/TabsMod';
import './CommodityFlow.less';

const { TabPane } = Tabs;

class CommodityFlow extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type:'commodityFlow/resetPage',
      payload:{}
    })
    this.getList()
  }
  getList() {
    const { homepageModuleId } =this.props.data;
    this.props.dispatch({
      type:'commodityFlow/fetchTabList',
      payload:{
        homePageModuleId:homepageModuleId
      }
    })
  }
  onOkCallback=(value,index)=> {
    this.props.dispatch({
      type:'commodityFlow/getSelectkey',
      payload:index
    })
    this.getList();
  }
  onOkToggle=(value,index)=> {
    this.modDom.submit(()=>this.onOkCallback(value,index));
  }
  onCancel=(value,index)=> {
    const { tabId, key } =value;
    this.props.dispatch({
      type:'commodityFlow/fetchGoodsList',
      payload:{tabId,selectkey:key}
    })
  }
  render() {
    const { tabs } =this.props;
    return(
      <div className="commodity-flow-pages common-modal-set-component">
        <div className="main-content-action">
          <TabsMod
            onCancel={this.onCancel}
            onOk={this.onOkToggle}/>
          {
            tabs.length>0&&
            <Mod onRef={(mod)=>{this.modDom = mod}}/>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
export default connect(mapStateToProps)(CommodityFlow);
