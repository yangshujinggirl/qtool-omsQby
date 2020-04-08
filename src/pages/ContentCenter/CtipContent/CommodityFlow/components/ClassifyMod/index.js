import React, { Component } from 'react';
import { Form, Select, Col, Row, Input, Button, Radio, message } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { getAddApi } from '../../../../../../services/cConfig/homeConfiguration/commodityFlow';

import ImportBtn from '../ImportBtn';

const FormItem = Form.Item;
const Option = Select.Option;

class ClassifyMod extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(props) {
    this.props.dispatch({
      type:'commodityFlow/fetchCategory',
      payload:{
        level:1,
        parentId:null
			}
    })
  }
  //分类change事件
  handleChangeLevel (level,selected) {
    const { categoryIdList } =this.props;
    if(level == 4) {
      this.props.dispatch({
        type:'commodityFlow/getCategoryIdList',
        payload:{
          ...categoryIdList,
          pdCategory4Id:selected
        }
      })
      return;
    }
    level++;
    this.props.dispatch({
      type:'commodityFlow/fetchCategory',
      payload:{
        level,
        parentId:selected
      }
    })
  }
  //添加
  handleAdd=()=> {
    let { goodsList } =this.props;
    const { pdCategory1Id, pdCategory2Id, pdCategory3Id, pdCategory4Id } =this.props.form.getFieldsValue();
    let pdCategory = {
      pdCategory1Id, pdCategory2Id, pdCategory3Id, pdCategory4Id
    }
    let paramsStr=null;
    for( let key in pdCategory) {
      if(pdCategory[key]) {
        paramsStr = paramsStr?`${paramsStr}-`:'';
        paramsStr+= pdCategory[key];
      }
    }
    if(!paramsStr) {
      return;
    }
    if(goodsList.length==100) {
      message.error('商品数量已满100，请删除后再添加');
      return;
    }
    this.props.dispatch({ type: 'tab/loding', payload:true});
    getAddApi({catalogListStr:paramsStr})
    .then((res) => {
      let { spuList, code } =res;
      if(code == 0) {
        let differenceLen = Number(100)-Number(goodsList.length);
        for(var i=0;i<goodsList.length;i++){
            for(var j = 0;j<spuList.length;j++){
              if(goodsList[i].pdSpuId == spuList[j].pdSpuId) {
                spuList.splice(j,1);
              }
            }
        }
        if(spuList.length>differenceLen) {
          message.error('表格仅支持添加100个商品，超出的商品添加失败',4);
          spuList = spuList.slice(0,differenceLen)
        }
        goodsList =[...goodsList,...spuList]
        goodsList.map((el,index) => {
          el.FixedPdSpuId = el.pdSpuId;
          el.key = index;
        })
        this.props.dispatch({
          type:'commodityFlow/getGoodsList',
          payload:goodsList
        })
        this.props.dispatch({
          type:'commodityFlow/getGdAddKey',
          payload:goodsList.length
        })
      }
      this.props.dispatch({ type: 'tab/loding', payload:false});
    })
  }
  //下载
  downLoad=()=> {
    window.open('../../../../../../static/pdSpuFlow.xls');
  }
  callback=(goodsList)=> {
    this.props.dispatch({
      type:'commodityFlow/getGoodsList',
      payload:goodsList
    })
    this.props.dispatch({
      type:'commodityFlow/getGdAddKey',
      payload:goodsList.length
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryData, categoryIdList } =this.props;
    const { categoryLevelOne, categoryLevelTwo, categoryLevelThr, categoryLevelFour} =categoryData;
    const {
      isLevelTwo,isLevelThr,isLevelFour,
      pdCategory1Id, pdCategory2Id, pdCategory3Id, pdCategory4Id
     } =categoryIdList;
    return(
      <div className="part-one part-same">
        <p className="part-head">选择商品</p>
        <Row gutter={24}>
          <Col span={6}>
            <FormItem label='一级分类'>
            {
              getFieldDecorator('pdCategory1Id',{
                initialValue:pdCategory1Id?pdCategory1Id:undefined,
                onChange:(select)=>this.handleChangeLevel(1,select)
              })(
               <Select placeholder="请选择一级分类">
                 {
                   categoryLevelOne.map((ele,index) => (
                     <Option
                       value={ele.pdCategoryId}
                       key={ele.pdCategoryId}>{ele.name}</Option>
                   ))
                 }
               </Select>
              )
            }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='二级分类'>
            {
              getFieldDecorator('pdCategory2Id',{
                initialValue:pdCategory2Id?pdCategory2Id:undefined,
                onChange:(select)=>this.handleChangeLevel(2,select)
              })(
                <Select
                  placeholder="请选择二级分类"
                  disabled={isLevelTwo}
                  autoComplete="off">
                  {
                    categoryLevelTwo.map((ele,index) => (
                      <Option
                        value={ele.pdCategoryId}
                        key={ele.pdCategoryId}>{ele.name}</Option>
                    ))
                  }
                </Select>
              )
            }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='三级分类'>
            {
              getFieldDecorator('pdCategory3Id',{
                initialValue:pdCategory3Id?pdCategory3Id:undefined,
                onChange:(select)=>this.handleChangeLevel(3,select)
              })(
                <Select
                  placeholder="请选择三级分类"
                  disabled={isLevelThr}
                  autoComplete="off">
                  {
                    categoryLevelThr.map((ele,index) => (
                      <Option
                        value={ele.pdCategoryId}
                        key={ele.pdCategoryId}>{ele.name}</Option>
                    ))
                  }
                </Select>
              )
            }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label='四级分类'>
            {
              getFieldDecorator('pdCategory4Id',{
                initialValue:pdCategory4Id?pdCategory4Id:undefined,
                onChange:(select)=>this.handleChangeLevel(4,select)
              })(
                <Select
                  placeholder="请选择四级分类"
                  disabled={isLevelFour}
                  autoComplete="off">
                  {
                    categoryLevelFour.map((ele,index) => (
                      <Option
                        value={ele.pdCategoryId}
                        key={ele.pdCategoryId}>{ele.name}</Option>
                    ))
                  }
                </Select>
              )
            }
            </FormItem>
          </Col>
        </Row>
        <div className="handle-add-btn-list">
          <Button
            size="large"
            type="primary"
            className="btn-item"
            onClick={this.handleAdd}>
              确定添加
          </Button>
          <ImportBtn
            dispatch={this.props.dispatch}
            callback={this.callback}/>
          <Button
            size="large"
            type="primary"
            className="btn-item"
            onClick={this.downLoad}>
              下载导入模板
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}
// export default BannerMod;
export default connect(mapStateToProps)(ClassifyMod);
