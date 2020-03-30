import { Form, Input } from "antd";
const getColumns = (props) => {
  const Columns = [
    {
      title: "商品编码",
      dataIndex: "skuCode"
    },
    {
      title: "商品名称",
      dataIndex: "productName",
      render: (text, record, index) => (
        <div>
          <span>
            {record.isGift ? (
              <label style={{ color: "green" }}>【赠品】</label>
            ) : null}
            {text}
          </span>
          <p>
            {record.canReturn == 0 ? (
              <span style={{ color: "red" }}>(退款中)</span>
            ) : null}
          </p>
        </div>
      )
    },
    {
      title: "商品规格",
      dataIndex: "salesAttributeName"
    },
    {
      title: "发货信息",
      dataIndex: "expressStatusStr"
    },
    {
      title: "购买数量/已退数量",
      render: (text, record, index) => (
        <span>
          {record.buyNum}/{record.alreadyReturnNum}
        </span>
      )
    },
    {
      title: "实付金额/已退金额",
      render: (text, record, index) => (
        <span>
          {record.actualPayAmount}/{record.alreadyReturnAmount}
        </span>
      )
    },
    {
      title: "可退金额",
      dataIndex: "canReturnAmount"
    },
    {
      title: "退货数量",
      dataIndex: "num",
      render: (text, record, index) => (
        <Form.Item
          name={[`goodList${record.parIndex}`, index, "num"]}
          rules={[
            { required: true, message: "请填写退款数量" },
            { validator: (rule, value) => validatorNum(rule, value, record) }
          ]}
        >
          <Input
            disabled={!(record.isDelivery == 1 && record.expressStatus == 1 && record.isGift==0)}
            style={{ width: "100px" }}
            placeholder="退款数量"
            autoComplete="off"
            onBlur={(e) => props.changeDataSource(e, record)}
          />
        </Form.Item>
      )
    },
    {
      title: "退款金额",
      dataIndex: "returnPrice",
      render: (text, record, index) => (
        <Form.Item name={[`goodList${record.parIndex}`, index, "returnPrice"]}>
          <Input
            disabled
            style={{ width: "100px" }}
            placeholder="退款金额"
            autoComplete="off"
          />
        </Form.Item>
      )
    }
  ];
  //校验退款数量
  const validatorNum = (rule, value, record) => {
    const canReturnNum = record.buyNum - record.alreadyReturnNum;
    if (value) {
      if (/^([1-9][0-9]*){1,3}$/.test(Number(value))) {
        if (Number(value) > 0 && Number(value) <= canReturnNum) {
          return Promise.resolve();
        } else {
          return Promise.reject("只能填1到可退数量之间的数字");
        }
      } else {
        return Promise.reject("只能填1到可退数量之间的数字");
      }
    }
    return Promise.resolve();
  };
  return Columns;
};
export default getColumns
