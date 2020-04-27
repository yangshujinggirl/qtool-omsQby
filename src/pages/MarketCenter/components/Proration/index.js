import { Input, Tag, Form, Checkbox, AutoComplete, Table } from 'antd';
import { useState, useEffect } from 'react';
import lodash from 'lodash';

const FormItem = Form.Item;
const bearMap={
  'A':'Qtools',
  'B':'门店',
  'C':'供应商',
}
const ColumnsCreat =(validator,dataSource)=>{
  return [{
      title: '活动预算',
      dataIndex: 'budget',
      width:'20%',
      render:(text,record,index) => {
        let chldrnDom = <Form.Item name={['bearers',index,'budget']} rules={[{pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字'}]}>
                          <Input
                            suffix="万元"
                            maxLength='15'
                            placeholder="请输入活动预算"
                            autoComplete="off"/>
                        </Form.Item>
        const obj = {
          children: chldrnDom,
          props: {},
        };
        if (index === 0) {
          obj.props.rowSpan = dataSource.length;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    },{
      title: '承担方',
      dataIndex: 'bearerStr',
      width:'10%',
    },{
      title: '*承担比例',
      dataIndex: 'ratio',
      width:'30%',
      render:(text,record,index) => {
        return <Form.Item
                name={['bearers',index,'proportion']}
                rules={[{ required: true, message: '请输入承担比例'},
                        { pattern:/^\d+$/,message:'请输入正整数' },
                        { validator:validator }
                      ]}>
                  <Input
                    suffix="%"
                    maxLength='15'
                    placeholder="请输入承担比例"
                    autoComplete="off"/>
              </Form.Item>
      }
    },{
      title: '备注说明',
      dataIndex: 'remark',
      width:'40%',
      render:(text,record,index) => {
        return <Form.Item name={['bearers',index,'remark']}>
                <Input
                  maxLength='30'
                  placeholder="请输入备注说明"
                  autoComplete="off"/>
              </Form.Item>
      }
    },
  ]
}

const Proration=({...props})=> {
  let { form, supplierApi } =props;
  const [supplierList,setSupplier]=useState([]);
  let ratioList = lodash.cloneDeep(props.ratioList);
  let tagsList = lodash.cloneDeep(props.tagsList);
  //分成校验
  const validatorRatio=(rule, value)=> {
    let { bearers } =form.getFieldsValue(['bearers']);
    let total =0;
    bearers.forEach((el)=> {
      if(el.proportion) {
        total+=Number(el.proportion);
      }
    })
    if (total <= 100) {
      return Promise.resolve();
    }
    return Promise.reject('承担比例总和不能超过100');
  }
  const formatList=(array)=> {
    let tagArray = array.filter(el => el.bearerType=='C');
    props.upDateRatioList(array);
    props.upDateTagList(tagArray)
  }
  const onSelect=(value, option)=> {
    let keyValue = `C${option.key}`;
    let idx = ratioList.findIndex(el => el.key == keyValue);
    if(idx =='-1') {
      ratioList.push({
        key:keyValue,
        bearerType:'C',
        bearerStr:value,
        bearer:option.key
      });
      formatList(ratioList);
    }
  }
  const handleClose=(removedTag)=> {
    let tags = ratioList.filter(tag => tag.key !== removedTag.key);
    formatList(tags);
  }
  //供应商
  const handleSearch=(value)=> {
    supplierApi({name:value})
    .then((res) => {
      const { result } =res;
      let options=[];
      options = result&&result.map((el,index)=>{
        let item={};
        item.key = el.id;
        item.value = el.name;
        return item;
      });
      setSupplier(options)
    })
  }
  const changeBearActi=(value)=>{
    let newArr=[];
    let tagsList = ratioList.filter(el => el.bearerType=='C');
    let fixedList = ratioList.filter(el => el.bearerType!='C');
    let valMap={};
    fixedList.map((el) => {
      if(!valMap[el.bearerType]) {
        valMap[el.bearerType]=el;
      }
    })
    let isIdx = value.findIndex((el) =>el=='C');
    if(isIdx=='-1') {
      tagsList = [];
    }
    value&&value.map((el,index) => {
      if(el!='C') {
        if(valMap[el]) {
          newArr.push(valMap[el])
        } else {
          let item={}
          item.bearer = el;
          item.bearerType = el;
          item.bearerStr =  bearMap[el];
          item.key = `${el}${index}`;
          newArr.push(item)
        }
      }
     });
    ratioList=[...newArr,...tagsList];
    props.upDateRatioList(ratioList);
  }
  let blColumns = ColumnsCreat(validatorRatio,ratioList);
  console.log(ratioList)
  return <div>
            <FormItem label='活动成本承担方' className="common-required-formItem">
              <FormItem name="costApportion" rules={[{ required: true, message: '请选择活动成本承担方'}]} noStyle>
                <Checkbox.Group onChange={changeBearActi}>
                   <Checkbox value="A">Qtools</Checkbox>
                   <Checkbox value="B">门店</Checkbox>
                   <Checkbox value="C">供应商</Checkbox>
                </Checkbox.Group>
              </FormItem>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.costApportion !== currentValues.costApportion}>
                {({ getFieldValue }) => {
                  return getFieldValue('costApportion')&&getFieldValue('costApportion').indexOf("C")!='-1'&&
                  <FormItem name="autoComplete" noStyle>
                      <AutoComplete
                        options={supplierList}
                        onSelect={onSelect}
                        onSearch={handleSearch}/>
                  </FormItem>
                }}
              </Form.Item>
              {
                tagsList.length>0&&
                <FormItem>
                  {
                    tagsList.map((el)=> (
                      <Tag
                        closable
                        key={el.key}
                        onClose={()=>handleClose(el)}>
                        {el.bearerStr}
                      </Tag>
                    ))
                  }
                </FormItem>
              }
            </FormItem>
            <FormItem label='活动成本分摊比例'>
              <Table
                onRow={record => {
                  return {
                    "data-row-key":record.key,
                  };
                }}
                className="bl-table-wrap"
                bordered
                pagination={false}
                columns={blColumns}
                dataSource={ratioList}/>
            </FormItem>
  </div>
}

export default Proration;
