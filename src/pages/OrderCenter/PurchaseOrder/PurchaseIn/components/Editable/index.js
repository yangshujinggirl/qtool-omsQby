import QuploadFileList from "common/QuploadFileList";
import { Form, Table, Button, Input } from "antd";
import moment from "moment";

const Editable = props => {
  const { dataSource, changeDataSource, getPrice } = props;
  /**
   * input输入框更改，相应修改list
   * @param {*} e 
   * @param {*} record 
   * @param {*} keyName 
   */
  const changeData = (e, record, keyName) => {
    const { value } = e.target;
    if (value) {
      const newData = [...dataSource];
      const index = newData.findIndex(item => item.key == record.key);
      const obj = { ...record, [keyName]: value };
      newData.splice(index, 1, obj);
      changeDataSource(newData);
    }
  };
  const Columns = [
    {
      width: 200,
      title: "SKU编码",
      dataIndex: "itemCode",
      render: (text, record, index) => {
        return (
          <Form.Item
            name={["goodList", index, "itemCode"]}
            rules={[{ required: true, message: "请输入SKU编码" }]}
          >
            <Input
              onBlur={e => getPrice(e, record)}
              autoComplete="off"
              placeholder="30字以内，C端展示"
            />
          </Form.Item>
        );
      }
    },
    {
      width: 100,
      title: "采购数量",
      dataIndex: "amount",
      render: (text, record, index) => {
        return (
          <Form.Item
            name={["goodList", index, "amount"]}
            rules={[
              { required: true, message: "请输入采购数量" },
              { pattern: /^([1-9][0-9]*){1,3}$/, message: "请输入＞0的整数" }
            ]}
          >
            <Input
              onBlur={e => changeData(e, record, "amount")}
              autoComplete="off"
              placeholder="采购数量"
            />
          </Form.Item>
        );
      }
    },
    {
      width: 100,
      title: "采购单价",
      dataIndex: "price",
      render: (text, record, index) => {
        return (
          <Form.Item
            name={["goodList", index, "price"]}
            rules={[
              { required: true, message: "请输入采购单价" },
              { pattern: /^\d+(\.\d{0,4})?$/, message: "请输入≥0的数字" }
            ]}
          >
            <Input
              onBlur={e => changeData(e, record, "price")}
              autoComplete="off"
              placeholder="采购单价"
            />
          </Form.Item>
        );
      }
    },
    {
      width: 100,
      title: "采购主体",
      dataIndex: "procurementTarget",
      render: (text, record, index) => {
        return <span>{text == 1 ? "淮安" : text == 2 ? "qtools" : ""}</span>;
      }
    },
    {
      width: 100,
      title: "商品规格",
      dataIndex: "salesAttributeName"
    },
    {
      width: 100,
      title: "SKU创建时间",
      dataIndex: "createTime",
      render: (text, record, index) => {
        return (
          <span>{text && moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>
        );
      }
    }
  ];
  const downLoadTemp = () => {
    window.open("src/static/purchase_in.xlsx");
  };
  return (
    <div>
      <QuploadFileList
        action="/qtoolsOms/upload/file_excel_return_list"
        dataSource={dataSource}
        Columns={Columns}
        changeDataSource={changeDataSource}
        downLoadTemp={downLoadTemp}
        footer={true}
        del={true}
      />
    </div>
  );
};

export default Editable;
