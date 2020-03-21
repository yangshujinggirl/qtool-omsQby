import { Form, Checkbox, AutoComplete, Table } from 'antd';
import { useState, useEffect } from 'react';

const FormItem = Form.Item;

const Proration=({...props})=> {
  const [supplierList,setSupplier]=useState([]);

  const changeBearActi=(value)=>{
    let { ratioList } =this.props;
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
    props.upDateList(ratioList);
    props.form.resetFields(['bearers'])
  }

  return <div>
            <FormItem label='活动成本承担方' {...props.formItemLayout}>
              <FormItem name="costApportion" rules={[{ required: true, message: '请选择活动成本承担方'}]} noStyle>
                <Checkbox.Group onChange={changeBearActi}>
                   <Checkbox value="A">Qtools</Checkbox>
                   <Checkbox value="B">门店</Checkbox>
                   <Checkbox value="C">供应商</Checkbox>
                </Checkbox.Group>
              </FormItem>
              {providerIndex != undefined && providerIndex != "-1" &&
                <FormItem name="autoComplete" noStyle>
                    <AutoComplete
                      onSelect={this.onSelect}
                      onSearch={this.handleSearch}>
                      {supplierList.map(el => (
                        <AutoComplete.Option key={el.pdSupplierId}>
                          {el.name}
                        </AutoComplete.Option>
                      ))}
                  </AutoComplete>
                </FormItem>
              }
            </FormItem>
            <div className="supplier-tags-wrap">
              {
                tagsList.map((el)=> (
                  <Tag
                    closable
                    key={el.key}
                    onClose={()=>this.handleClose(el)}>
                    {el.bearerStr}
                  </Tag>
                ))
              }
            </div>
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
