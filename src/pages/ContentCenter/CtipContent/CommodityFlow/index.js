import { Tabs, Button, Col, Form } from 'antd';
import NP from 'number-precision';
import moment from 'moment';
import lodash from 'lodash';
import { Qbtn, Qmessage } from 'common';
import ClassifyMod from './components/ClassifyMod';
import TabsMod from './components/TabsMod';
import SortMod from './components/SortMod';
import GoodsTable from './components/GoodsTable';
import { GetSaveApi, GetTabListApi, GetProListApi } from 'api/contentCenter/CommodityFlow';
import './index.less';

const { TabPane } = Tabs;

class CommodityFlow extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state={
      selectkey:0,
      tabs:[{key:0, tabId:"-1" }],
      goodsList:[],
      sortObjArray:[
        {
          title:'新品',
          key:'a'
        },{
          title:'热卖商品',
          key:'b'
        },{
          title:'促销商品',
          key:'c'
        },{
          title:'普通商品',
          key:'d'
        }],
      totalData:{
        sortType:20,
        ruleType:0,
        day:30,
      }
    }
  }
  componentDidMount() {
    this.getTabsList()
  }
  //查询tabs
  getTabsList(selectkey) {
    const { id } =this.props.match.params;
    selectkey = selectkey?selectkey:0;
    this.setState({ selectkey })
    // const { selectkey } =this.state;
    GetTabListApi({homepageModuleId:id})
    .then((res)=> {
      let { result } =res;
      if(result&&result.length>0) {
        result.map((el,index)=> el.key = index);
        let currentItem = result.find((el) => el.key == selectkey);
        this.setState({ tabs:result })
        this.getProductList(currentItem.tabId);
      }
    })
  }
  //查询商品list
  getProductList=(tabId)=> {
    GetProListApi(tabId)
    .then((res)=> {
      let { result } =res;
      if(!result) {
        this.resetPage();
        return;
      }
      let { spuList, sortRule, ...vals} = result;
      spuList=spuList?spuList:[];
      spuList.map((el,index)=>el.key=index);
      vals={...vals, ...sortRule };
      if(vals.time) {
        vals.time = [moment(vals.time[0]),moment(vals.time[1])]
      }
      this.setState({ totalData: vals, goodsList:spuList });
    })
  }
  resetPage=()=> {
    this.setState({
      goodsList:[],
      sortObjArray:[
        {
          title:'新品',
          key:'a'
        },{
          title:'热卖商品',
          key:'b'
        },{
          title:'促销商品',
          key:'c'
        },{
          title:'普通商品',
          key:'d'
        }],
      totalData:{
        sortType:20,
        ruleType:0,
        day:30,
      }
    })
  }
  //更新tabs
  upDateSort=(array)=> {
    this.setState({ sortObjArray: array });
  }
  //更新tabs
  upDateTabs=(array)=> {
    this.setState({ tabs:array });
  }
  //更新商品
  upDateProductList=(array)=> {
    this.setState({ goodsList:array });
  }
  //切换保存
  onOkToggle=(value,index)=> {
    const { tabId, key } =value;
    this.onSubmit(()=>this.getTabsList(key))
  }
  //切换不保存
  onCancel=(value,index)=> {
    const { tabId, key } =value;
    this.setState({ selectkey:key },()=> {
      this.getProductList(tabId);
    })
  }
  //提交
  onSubmit= async(func)=> {
    try {
      let  values = await this.formRef.current.validateFields();
      let { goodsList, tabs,  selectkey} =this.state;
      let isEmpty;
      tabs.map((el,index) => {
        if(!el.tabName) {
          isEmpty = true;
        }
      })
      if(isEmpty) {
        Qmessage.error('tab名称不能为空');
        return;
      }
      if(goodsList.length< 20) {
        Qmessage.error('商品数量至少20个');
        return;
      }
      let  params = this.formatData(values);
      GetSaveApi(params)
      .then((res) => {
        Qmessage.success('保存成功',1);
        func&&typeof func == 'function'?func():this.getTabsList(selectkey);
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  //表单change
  formatData=(values)=> {
    let sortRule;
    const { sortType, ruleType } =values;
    const { goodsList, selectkey, tabs, totalData, sortObjArray } =this.state;
    let homePageModuleId =this.props.match.params.id;
    if(sortType==20) {
      sortRule={
        ruleType:values.ruleType,
      };
      if(ruleType==0) {
        sortRule = { ...sortRule,day:values.day}
      } else if(ruleType==2) {
        let time = values.time.map((el) =>{
          el = moment(el).format('YYYY-MM-DD HH:mm:ss')
          return el;
        })
        sortRule = { ...sortRule,time:time}
      }
    } else if(sortType == 30) {
        sortRule= { sortObjArray }
    }
    if(values.spuList) {
      values.spuList =values.spuList.map((item) => {
        goodsList.map((el) => {
          if(item.pdSpuId == el.pdSpuId&&el.isFixed) {
            item.fixPosition = el.fixPosition;
            item.fixDay = el.fixDay;
          }
        })
        return item;
      })
    }
    let selectItem = tabs.find((el) => el.key== selectkey);
    values.spuList.map((el,index) => {
      for(var key in el) {
        if(el[key]&&typeof el[key] == 'string') {
          el[key] = lodash.trim(el[key]);
        }
      }
    })
    let params={
          homePageModuleId,
          tabName:selectItem.tabName,
          tabId:selectItem.tabId,
          sortType:values.sortType,
          tabList:tabs,
          sortRule:sortRule,
          spuList:values.spuList
        }
    return params
  }
  onValuesChange=(changedValues, allValues)=> {
    let currentKey = Object.keys(changedValues)[0];
    let { tabsField, spuList } =allValues;
    let { tabs, goodsList } =this.state;
    if(currentKey == 'tabsField') {
      tabs =tabs.map((el,index) => {
          tabsField.map((item,idx) => {
            if(index == idx) {
              el={...el,...item}
            }
          })
          return el;
        })
      this.setState({ tabs });
    }
    if(currentKey == 'spuList') {
      goodsList =goodsList.map((el,index) => {
          spuList.map((item,idx) => {
            if(index == idx) {
              el={...el,...item}
            }
          })
          return el;
        })
      this.setState({ goodsList });
    }
  }
  render() {
    const { tabs, goodsList } =this.state;
    return(
      <div className="commodity-flow-pages">
        <div className="main-content-action">
          <Form ref={this.formRef} onValuesChange={this.onValuesChange}>
            <TabsMod
              {...this.state}
              form={this.formRef}
              onCancel={this.onCancel}
              onOk={this.onOkToggle}
              upDateList={this.upDateTabs}/>
            {
              tabs.length>0&&
              <div className="commodity-main-mod">
                <ClassifyMod form={this.formRef} {...this.state} upDateList={this.upDateProductList}/>
                <SortMod form={this.formRef} {...this.state} upDateList={this.upDateSort}/>
                <div className="part-thr part-same">
                  <div className="tables-info-desc">
                    {
                      goodsList.length>40?
                      <p>已添加{goodsList.length}件商品，每个tab固定展示40件商品，41及以后的商品为替补商品。</p>
                      :
                      <p>已添加{goodsList.length}件商品，每个tab固定展示40件商品，请再添加{NP.minus(40,goodsList.length)}个商品</p>
                    }
                    <p>已选 {goodsList.length}/100</p>
                  </div>
                  <GoodsTable
                    upDateList={this.upDateProductList}
                    form={this.formRef}
                    {...this.state}/>
                </div>
                <Col offset={11}>
                  <Qbtn onClick={this.onSubmit}>保存</Qbtn>
                </Col>
              </div>
            }
          </Form>
        </div>
      </div>
    )
  }
}
export default CommodityFlow;
