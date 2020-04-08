import React, { Component } from 'react';
import { DatePicker, Form, Select, Col, Row, Input, Button, Radio, message } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import NP from 'number-precision';
import GoodsTable from '../GoodsTable';
import ClassifyMod from '../ClassifyMod';
import DragTabSort from '../DragTabSort';
import { getSaveApi } from '../../../../../../services/cConfig/homeConfiguration/commodityFlow';
import './index.less';

const RangePicker = DatePicker.RangePicker;
const formItemLayout = {
      labelCol: { span: 2},
      wrapperCol: { span: 16 },
    };
const FormItem = Form.Item;
const Option = Select.Option;
const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
let dateForm = 'YYYY-MM-DD';
class ModForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    }
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  //排序类型
  changeRadio=(e)=> {
    // let value = e.target.value;
    // let { totalData } =this.props;
    // totalData = { ...totalData, sortType: value }
    // this.props.dispatch({
    //   type:'commodityFlow/getTotalData',
    //   payload:totalData
    // })
  }
  //天数排数
  selectSaleSort=(e)=> {
    // let { totalData } =this.props;
    // totalData = { ...totalData, ruleType: e }
    // this.props.dispatch({
    //   type:'commodityFlow/getTotalData',
    //   payload:totalData
    // })
  }
  changeDay=(type,e)=> {
    // let { totalData } =this.props;
    // totalData = { ...totalData, type: e }
    // this.props.dispatch({
    //   type:'commodityFlow/getTotalData',
    //   payload:totalData
    // })
  }
  //提交
  submit=(func)=> {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { selectkey, tabs } =this.props;
        let isEmpty;
        tabs.map((el,index) => {
          if(!el.tabName) {
            isEmpty = true;
          }
        })
        if(isEmpty) {
          message.error('tab名称不能为空');
          return;
        }
        if(this.props.goodsList.length<20) {
          message.error('商品数量至少20个');
          return;
        }
        let  params = this.formatData(values);
        this.props.dispatch({type:'tab/loding',payload:true})
        this.setState({ loading:true })
        getSaveApi(params)
        .then((res) => {
          if(res.code == 0) {
            message.success('保存成功',1);
            func&&typeof func == 'function'?func():this.successCallback();
          }
          this.setState({ loading:false });
          this.props.dispatch({type:'tab/loding',payload:false})
        })
      }
    });
  }
  successCallback() {
    const { homePageModuleId } =this.props;
    this.props.dispatch({
      type:'commodityFlow/fetchTabList',
      payload:{
        homePageModuleId:homePageModuleId
      }
    })
  }
  formatData(values) {
    let sortRule;
    const { sortType, ruleType } =values;
    let { selectkey, tabs, homePageModuleId, totalData } =this.props;
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
        sortRule= {
           sortObjArray:totalData.sortObjArray
        }
    }
    const { goodsList }=this.props;
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
          homePageModuleId:homePageModuleId,
          tabName:selectItem.tabName,
          tabId:selectItem.tabId,
          sortType:values.sortType,
          tabList:tabs,
          sortRule:sortRule,
          spuList:values.spuList
        }
    return params
  }
  moveRow = (dragIndex, hoverIndex) => {
    let { totalData } =this.props;
    let { sortObjArray } =totalData;
    let tempHover = sortObjArray[dragIndex];
    let tempDrag = sortObjArray[hoverIndex];
    sortObjArray.splice(hoverIndex, 1, tempHover);
    sortObjArray.splice(dragIndex, 1, tempDrag);
    totalData = {...totalData,sortObjArray}
    this.props.dispatch({
      type:'commodityFlow/getTotalData',
      payload:totalData
    })
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryData, goodsList, totalData, sortArr } =this.props;

    return(
      <div className="commodity-main-mod">
        <Form>
          <ClassifyMod form={this.props.form}/>
          <div className="part-two part-same">
            <p className="part-head">商品排序规则</p>
            <FormItem label="优先顺序" className="sort-formItem-wrap">
            {
              getFieldDecorator('sortType',{
                initialValue:totalData.sortType,
                onChange:this.changeRadio
              })(
                <Radio.Group>
                  <Radio style={radioStyle} value={10}>
                    按上架时间倒序排列
                  </Radio>
                  <Radio style={radioStyle} value={20}>
                    按销量排序
                  </Radio>
                  <Radio style={radioStyle} value={30}>
                    自定义排序
                  </Radio>
                </Radio.Group>
              )
            }
            </FormItem>
            {
              totalData.sortType==20&&
              <Row className="sort-row">
                <Col span={6}>
                  <FormItem>
                  {
                    getFieldDecorator('ruleType',{
                      initialValue:totalData.ruleType?totalData.ruleType:0,
                      onChange:(select)=>this.selectSaleSort(select)
                    })(
                      <Select
                        className="sale-type-select"
                        placeholder="请选择销量类型"
                        autoComplete="off">
                        <Option
                          value={0}
                          key={0}>固定天数销量</Option>
                        <Option
                          value={2}
                          key={2}>固定时间段销量</Option>
                        <Option
                          value={1}
                          key={1}>累计销量</Option>
                      </Select>
                    )
                  }
                  </FormItem>
                </Col>
                <Col span={8} >
                {
                  totalData.ruleType==0&&
                  <FormItem className="fixed-days-formItem">
                    最近
                    {
                      getFieldDecorator('day',{
                        initialValue:totalData.day,
                        rules:[{
                          required:true,message:'请输入'
                        }],
                        onChange:(e)=>this.changeDay('day',e)
                      })(
                        <Input placeholder="请输入" autoComplete="off"/>
                      )
                    }
                    天
                  </FormItem>
                }
                {
                  totalData.ruleType==2&&
                  <FormItem className="fixed-dateTime-formItem">
                    {
                      getFieldDecorator('time',{
                        initialValue:totalData.time?[moment(totalData.time[0],dateForm),moment(totalData.time[1],dateForm)]:null,
                        rules:[{
                          required:true,message:'请选择时间'
                        }],
                        onChange:(e)=>this.changeDay('time',e)
                      })(
                        <RangePicker
                          format={dateForm}/>
                      )
                    }
                  </FormItem>
                }
                </Col>
              </Row>
            }
            {
              totalData.sortType==30&&
              <div className="sort-row">
                <p className="sort-tips">按顺序拖拽你要排列的属性商品，若存在一个商品有多个属性，则具有多重属性的商品排名靠前，属性越多排名越靠前。</p>
                <DragTabSort
                  moveRow={this.moveRow}
                  sortArr={totalData.sortObjArray}/>
              </div>
            }
          </div>
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
            <GoodsTable form={this.props.form}/>
          </div>
          <div className="handle-btn-footer">
            <Button
              loading={this.state.loading}
              onClick={this.submit}
              size="large"
              type="primary">
                保存
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}
const Mod = Form.create({
  onValuesChange(props, changedFields, allFields) {
    let { time, day=30, ruleType=0, sortType, spuList } =allFields;
    let { totalData, goodsList } =props;
    // ruleType = ruleType?ruleType:0;
    totalData = {...totalData,time, day, ruleType, sortType};
    goodsList = goodsList.map((el,index) => {
      spuList.map((item,idx) => {
        if(index == idx) {
          el = {...el,...item}
        }
      })
      return el;
    })
    props.dispatch({
      type:'commodityFlow/getTotalData',
      payload:totalData
    })
    props.dispatch({
      type:'commodityFlow/getGoodsList',
      payload:goodsList
    })
  },
  mapPropsToFields(props) {
    return {
      pdCategory1Id: Form.createFormField(props.categoryIdList.pdCategory1Id),
      pdCategory2Id: Form.createFormField(props.categoryIdList.pdCategory2Id),
      pdCategory3Id: Form.createFormField(props.categoryIdList.pdCategory3Id),
      pdCategory4Id: Form.createFormField(props.categoryIdList.pdCategory4Id),
      spuList: Form.createFormField(props.goodsList),
      day: Form.createFormField(props.totalData.day),
      time: Form.createFormField(props.totalData.time),
      ruleType: Form.createFormField(props.totalData.ruleType),
      sortType:Form.createFormField(props.totalData.sortType),
    };
  }
})(ModForm);
function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
// export default BannerMod;
export default connect(mapStateToProps)(Mod);
