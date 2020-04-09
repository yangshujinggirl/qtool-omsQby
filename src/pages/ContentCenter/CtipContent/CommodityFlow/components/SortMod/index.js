import { DatePicker, Form, Select, Row, Input, Button, Radio, message } from 'antd';
import { useState, useEffect } from 'react';
import lodash from 'lodash';
import DragTabSort from '../DragTabSort';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
const Option = Select.Option;
let dateForm = 'YYYY-MM-DD';

const SortMod=({...props})=>{
  let { sortObjArray, totalData } =props;
  let newList = lodash.cloneDeep(sortObjArray);

  const moveRow = (dragIndex, hoverIndex) => {
    let tempHover = sortObjArray[dragIndex];
    let tempDrag = sortObjArray[hoverIndex];
    newList.splice(hoverIndex, 1, tempHover);
    newList.splice(dragIndex, 1, tempDrag);
    props.upDateList(newList);
  };

  useEffect(()=>{ props.form.current.setFieldsValue(totalData) },[totalData])
  return (
    <div className="part-two part-same">
      <p className="part-head">商品排序规则</p>
      <FormItem label="优先顺序">
        <FormItem name="sortType">
          <Radio.Group>
            <Radio style={radioStyle} value={10}> 按上架时间倒序排列 </Radio>
            <Radio style={radioStyle} value={20}> 按销量排序</Radio>
            <Radio style={radioStyle} value={30}> 自定义排序 </Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.sortType !== currentValues.sortType}>
          {({ getFieldValue }) => {
            let sortType= getFieldValue('sortType')
            return sortType ==20 ?
            <FormItem>
              <FormItem name="ruleType" noStyle>
                <Select placeholder="请选择销量类型" autoComplete="off" style={{"width":"160px"}}>
                  <Option value={0} key={0}>固定天数销量</Option>
                  <Option value={2} key={2}>固定时间段销量</Option>
                  <Option value={1} key={1}>累计销量</Option>
                </Select>
              </FormItem>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.ruleType !== currentValues.ruleType}>
                {({ getFieldValue }) => {
                  let ruleType = getFieldValue('ruleType')
                  return ruleType ==1 ?null:
                    (
                      ruleType ==0?
                      <FormItem noStyle>
                        &nbsp;&nbsp;
                        最近
                        &nbsp;&nbsp;
                        <FormItem noStyle name="day"  rules={[{ required:true,message:'请输入'}]}>
                          <Input placeholder="请输入" style={{"width":"80px"}} autoComplete="off"/>
                        </FormItem>
                        &nbsp;&nbsp;
                        天
                      </FormItem>
                      :
                      <FormItem name="time" noStyle rules={[{ required:true,message:'请选择时间'}]}>
                        <RangePicker format={dateForm} style={{"width":"200px"}}/>
                      </FormItem>
                    )
                }}
              </Form.Item>
            </FormItem>
            :
            (
              sortType==30?
              <div className="sort-row">
                <p className="sort-tips">按顺序拖拽你要排列的属性商品，若存在一个商品有多个属性，则具有多重属性的商品排名靠前，属性越多排名越靠前。</p>
                <DragTabSort
                  moveRow={moveRow}
                  sortArr={newList}/>
              </div>
              :null
            )
          }}
        </FormItem>
      </FormItem>
    </div>
  )
}
export default SortMod;
