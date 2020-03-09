import { Form, Table, Button, Input } from "antd";
import NP from "number-precision";

const EditTable = props => {
  const Columns = [
    {
      title: "SKU编码",
      dataIndex: "itemCode",
      width: 100
    },
    {
      title: "商品名称",
      dataIndex: "itemName",
      width: 100
    },
    {
      title: "商品规格",
      dataIndex: "salesAttributeName",
      width: 100
    },
    {
      title: "可退数量",
      dataIndex: "returnableNum",
      width: 100,
    },
    {
      title: "采退数量",
      dataIndex: "amount",
      width: 100,
      render: (text, record, index) => (
        <Form.Item
          name={['goodList',index,'amount']}
          rules={[
            { required: true, message: "请输入" },
            { pattern: /^([1-9][0-9]*){1,3}$/, message: "请输入＞0的整数" },
            {validator:(rule,value,callback)=>{
              if(value > record.returnableNum){
                callback('需小于可退数量')
              }
              callback();
            }},
          ]}
        >
          <Input placeholder="采购数量" onChange={(e)=>onChange(e,record,'price')}/>
        </Form.Item>
      )
    },
    {
      title: "采退单价",
      dataIndex: "price",
      width: 100,
      render: (text, record, index) => (
        <Form.Item
          name={['goodList',index,'price']}
          rules={[
            { required: true, message: "请输入" },
            { pattern: /^\d+(\.\d{0,4})?$/, message: "请输入≥0的数字" }
          ]}
        >
          <Input placeholder="采购单价" onChange={(e)=>onChange(e,record,'price')} />
        </Form.Item>
      )
    },
    {
      title: "金额小计",
      dataIndex: "total",
      width: 100,
    }
  ];
  /**数量或者单价变化时
   *  @param {*} e
   *  @param {object} record
   *  @param {string} type
   */
  const onChange=(e,record,type)=>{
    const {value} = e.target;
    const newData = [...props.dataSource]
    if(value.trim()){
      const index = newData.findIndex(item=>item.key == record.key);
      const item = newData[index];
      if(type=='price'){
        item.total = NP.times(Number(item.amount) * Number(value)).toFixed(2)
      }
      if(type=='amount'){
        item.total = NP.times(Number(value) * Number(item.price)).toFixed(2)
      };
      newData.splice(index,1,item)
      changeDataSource(newData)     
    }
  }
  return (
    <Table
      dataSource={props.dataSource}
      rowKey={record => record.key}
      columns={Columns}
      pagination={false}
      bordered={true}
    />
  );
};
export default EditTable;
