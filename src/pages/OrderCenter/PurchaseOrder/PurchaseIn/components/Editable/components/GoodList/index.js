import { Form, Table, Button, Input } from "antd";
import moment from "moment";
let keyIndex = 100;

const EditTable = props => {
  const { dataSource } = props;
  //新增
  const add = () => {
    keyIndex++;
    const newData = [...dataSource, { key: keyIndex }];
    props.changeDataSource(newData);
  };
  
  //删除
  const del = record => {
    let newData = [...dataSource];
    const index = newData.findIndex(item => record.key == item.key);
    newData.splice(index, 1);
    props.changeDataSource(newData);
  };
  const renderSkuCode = (text, record, index) => {
    return (
      <Form.Item
        name={["goodList", index, "itemCode"]}
        rules={[{ required: true, message: "请输入SKU编码" }]}
      >
        <Input
          onBlur={e => props.getPrice(e, record)}
          autoComplete="off"
          placeholder="30字以内，C端展示"
        />
      </Form.Item>
    );
  };
  const renderAmount = (text, record, index) => {
    return (
      <Form.Item
        name={["goodList", index, "amount"]}
        rules={[
          { required: true, message: "请输入采购数量" },
          { pattern: /^([1-9][0-9]*){1,3}$/, message: "请输入＞0的整数" }
        ]}
      >
        <Input autoComplete="off" placeholder="采购数量" />
      </Form.Item>
    );
  };
  const renderPrice = (text, record, index) => {
    return (
      <Form.Item
        name={["goodList", index, "price"]}
        rules={[
          { required: true, message: "请输入采购单价" },
          { pattern: /^\d+(\.\d{0,4})?$/, message: "请输入≥0的数字" }
        ]}
      >
        <Input autoComplete="off" placeholder="采购单价" />
      </Form.Item>
    );
  };
  const renderTarget = (text, record, index) => {
    return <span>{text == 1 ? "淮安" : text == 2 ? "qtools" : ""}</span>;
  };
  const renderCreateTime = (text, record, index) => {
    return <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>;
  };
  const renderOperate = (text, record, index) => {
    return <a onClick={() => del(record)}>删除</a>;
  };
  return (
    <Table
      dataSource={dataSource}
      rowKey={record => record.key}
      pagination={false}
      bordered={true}
      footer={() => <Button onClick={add}>+商品</Button>}
    >
      <Table.Column
        width={200}
        title="SKU编码"
        dataIndex="itemCode"
        render={renderSkuCode}
      />
      <Table.Column
        width={100}
        title="采购数量"
        dataIndex="amount"
        render={renderAmount}
      />
      <Table.Column
        width={100}
        title="采购单价"
        dataIndex="price"
        render={renderPrice}
      />
      <Table.Column
        width={100}
        title="采购主体"
        dataIndex="procurementTarget"
        render={renderTarget}
      />
      <Table.Column width={100} title="商品名称" dataIndex="itemName" />
      <Table.Column
        width={100}
        title="商品规格"
        dataIndex="salesAttributeName"
      />
      <Table.Column
        width={100}
        title="SKU创建时间"
        dataIndex="createTime"
        render={renderCreateTime}
      />
      <Table.Column width={100} title="操作" render={renderOperate} />
    </Table>
  );
};
export default EditTable;
