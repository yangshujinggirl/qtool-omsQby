import { Input, Table, Button, Modal, Form, message } from "antd";
import { useEffect, useState } from 'react';
import { GetComplimentaryApi } from "api/marketCenter/CtipActivity";
import EditModal from "./components/EditModal";
import lodash from 'lodash';
import "./index.less";
const FormItem = Form.Item;

const DiscountOne =({...props})=> {
  let dataSource = [...props.dataSource];
  let currentdata = props.currentdata;
  let { promotionType } =currentdata;
  let[visible,setVisible] = useState(false);
  let[currentItem,setCurrentItem] = useState({});

  const getColumns = (parentIndex) => {
    const columns = [
      {
        title: "赠品编码",
        dataIndex: "pdCode",
        key: "1"
      },
      {
        title: "赠品名称",
        dataIndex: "pdName",
        key: "2"
      },
      {
        title: "赠品B端售价",
        dataIndex: "sellPrice",
        key: "3",
        render:(text,record,index)=>{
          return(
            <span>￥{Number(text).toFixed(2)}元</span>
          )
        }
      },
      {
        title: "最多可参与活动的赠品数",
        dataIndex: "maxQty",
        key: "4"
      },
      {
        title: "赠品B端在售库存",
        dataIndex: "toBQty",
        key: "5"
      },
      {
        title: "赠品C端在售库存",
        dataIndex: "toCQty",
        key: "6"
      },
      {
        title: "赠品操作",
        key: "7",
        render: (text, record, index) => {
          return (
            <div>
              <a
                onClick={() => handleDelete(index,parentIndex)}
                className="theme-color">
                删除
              </a>
              <a
                onClick={() => this.handleEditGift(record, index, parentIndex)}
                className="theme-color">
                编辑
              </a>
            </div>
          );
        }
      }
    ];
    return columns;
  };
  //赠品删除
  const handleDelete = (sonIndex, parentIndex) => {
    Modal.confirm({
      title: '是否删除此商品?',
      content: '是否删除此商品?',
      okText:"确认删除",
      cancelText:"暂不删除",
      onOk() {
        const promotionGifts = dataSource[currentParentIndex].promotionGifts;
        promotionGifts.splice(currentChildIndex, 1);
        props.upDateList(dataSource);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  //赠品编辑
  const handleEditGift = (record, sonIndex, parentIndex) => {
    setCurrentItem({...record,parentIndex,sonIndex})
    setVisible(true)
  };
  //赠品新增
  const add = (parentIndex) => {
    setCurrentItem({...currentItem, parentIndex})
    setVisible(true);
  };
  //满赠价格变化
  const onChange = (e, index) => {
    const { value } = e.target;
    if (promotionType == 20) {//20满元赠 21满件赠
      dataSource[index].param.leastAmount = value;
    } else {
      dataSource[index].param.leastQty = value;
    }
    props.upDateList(dataSource);
    // const m = new Map();
    // m.set(`Top[${index}].price`, value);
    // props.form.setFieldsValue(m);
  };
  //新增赠品确认
  const handleOk = (values) => {
    let { parentIndex } =currentItem;
    if (!currentItem.pdCode) {
      values.pdCode = (values.pdCode).trim();
      const { promotionGifts } = dataSource[parentIndex];
      if(promotionGifts.length>0){
        const isRepeat = promotionGifts.some(item=>item.pdCode == values.pdCode);
        if(isRepeat){//if(重复了)
          message.error('此商品与此阶梯的其他商品重复');
          return
        };
      }
      GetComplimentaryApi({ pdCode: values.pdCode,platformType:2,pdKind:currentdata.pdKind})
      .then(res => {
        const product = res.product;
        let list = { ...product, maxQty: values.max };
        dataSource[parentIndex].promotionGifts.push(list);
        props.upDateList(dataSource);
      });
    } else {
      const promotionGifts = dataSource[parentIndex].promotionGifts;
      const list = promotionGifts[sonIndex];
      promotionGifts[sonIndex] = { ...list, maxQty: values.max };
      props.upDateList(dataSource);
    }
    setVisible(false)
  };
  //取消
  const handleCancel =()=> {
    setVisible(false)
  };
  //删除等级
  const  deleteParent = (index) => {
    Modal.confirm({
      title: '是否删除此级优惠?',
      content: '是否删除此级优惠?',
      okText:"确认删除",
      cancelText:"暂不删除",
      onOk() {
        dataSource.splice(index, 1);
        props.upDateList(dataSource);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  //新增等级
  const addParent  = () => {
    const list = {
      param: { leastAmount: "", leastQty: "" },
      promotionGifts: []
    };
    dataSource.push(list);
    props.upDateList(dataSource);
  };
  const validatorPrice=(rule, value, index)=> {
    if(+value){
      if (value > 99999) {
        return Promise.reject('不可超过99999');
      };
      if(dataSource[index - 1] && dataSource[index - 1].param.leastAmount){
        if(+value <= +dataSource[index - 1].param.leastAmount){
          return Promise.reject('此阶梯优惠门槛需大于上一阶梯的优惠门槛');
        };
      };
      if(dataSource[index + 1] && dataSource[index + 1].param.leastAmount){
        if(+value >= +dataSource[index + 1].param.leastAmount){
          return Promise.reject('此阶梯优惠门槛需小于下一阶梯的优惠门槛');
        };
      };
    };
    return Promise.resolve();
  }
  const validatorTwo=(rule, value, index) => {
    if(+value){
      if (+value > 99) {
        return Promise.reject('不可超过99');
      };
      if(dataSource[index - 1] && dataSource[index - 1].param.leastQty){
        if(+value <= +dataSource[index - 1].param.leastQty){
          return Promise.reject('此阶梯优惠门槛需大于上一阶梯的优惠门槛');
        };
      };
      if(dataSource[index + 1]&&dataSource[index + 1].param.leastQty){
        if(+value >= +dataSource[index + 1].param.leastQty){
          return Promise.reject('此阶梯优惠门槛需小于下一阶梯的优惠门槛');
        };
      };
    };
    return Promise.resolve();
  }
  //头部渲染
  const initTitle=(index)=> {
    return<div className="discount_title">
            <div>
              {promotionType&&promotionType == 20 && (
                <FormItem>
                  阶梯{index + 1}：<span style={{color:'red'}}>*</span>单笔订单满　
                  <FormItem
                    name={`Top[${index}].price`}
                    getValueFromEvent={(event)=>{
                      return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                    }}
                    rules={[{required: true, message: "请填写优惠内容" },{ validator:(rule, value)=>validatorPrice(rule, value, index) }]}
                    noStyle>
                      <Input
                        onChange={(e)=> onChange(e, index)}
                        autoComplete="off"
                        style={{ width: "100px" }}/>
                  </FormItem>
                  元，送以下商品
                </FormItem>
              )}
              {promotionType == 21 && (
                <FormItem>
                  阶梯{index + 1}：*单笔订单满　
                  <FormItem
                    name={`Top[${index}].price`}
                    getValueFromEvent={(event)=>{
                      return event.target.value.replace(/\D/g,'').replace(/^[0]+/,'')
                    }}
                    rules={[{ required: true, message: "请填写优惠内容" },{ validator: (rule, value)=>validatorTwo(rule, value,index)}]}
                    noStyle>
                    <Input
                      onChange={(e)=> this.onChange(e, index)}
                      autoComplete="off"
                      style={{ width: "100px" }}/>
                  </FormItem>
                  件，送以下商品
                </FormItem>
              )}
            </div>
            {dataSource.length > 1 &&
              <a onClick={() => deleteParent(index)} className="theme-color">
                删除此级
              </a>
            }
        </div>
  }
  return (
    <div className="discount-good">
      <div>*赠送方式: 每种赠品均送</div>
      <div className="content">
        {dataSource.length>0 && dataSource.map((item, index) => (
          <div key={index}>
            <Table
              className="discount_table"
              title={() => initTitle(index)}
              footer={() => (
                <div className="discount_footer">
                  <Button
                    disabled={item.promotionGifts.length == 20}
                    onClick={() => add(index, "add")}
                    type="primary">
                    +赠品
                  </Button>
                </div>
              )}
              pagination={false}
              bordered
              dataSource={item.promotionGifts? item.promotionGifts:[]}
              columns={getColumns(index)}
              size="middle"
            />
          </div>
        ))}
        <div className="discount_addLevel">
          <Button
            disabled={dataSource.length == 8}
            type="primary"
            onClick={addParent}>
            继续新增优惠等级
          </Button>
        </div>
      </div>
      <EditModal
        form={props.form}
        visible={visible}
        record={currentItem}
        handleCancel={handleCancel}
        handleOk={handleOk}/>
    </div>
  );
}

export default DiscountOne;
