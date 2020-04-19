import { Form, Input } from "antd";
import NP from "number-precision";
const getColumns = props => {
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
      render: (text, record, index) => {
        return (
          <Form.Item
            name={[`goodList${record.parentId}`, index, "num"]}
            rules={[
              { required: isRequired(record)?true:false, message: "请填写退款数量" },
              { validator: (rule, value) => validatorNum(rule, value, record) }
            ]}
          >
            <Input
              disabled={disabledCase(record)||record.disabled}
              style={{ width: "100px" }}
              placeholder="退款数量"
              autoComplete="off"
              onBlur={e => changeList(e, record)}
              onPressEnter={e => changeList(e, record)}
            />
          </Form.Item>
        );
      }
    },
    {
      title: "退款金额",
      dataIndex: "returnPrice",
      render: (text, record, index) => (
        <Form.Item name={[`goodList${record.parentId}`, index, "returnPrice"]}>
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
//退款数量是否必填
  const isRequired=(record)=>{
    console.log(props.selectedRowKeys.find(e=>e==record.key))
    return !record.disabled&&props.selectedRowKeys.find(e=>e==record.key)
  }
  //计算退款金额
  const changeList = (e, record) => {
    const { value } = e.target;
    const canReturnNum = record.buyNum - record.alreadyReturnNum;
    if (value &&/^[0-9]*$/.test(Number(value)) &&Number(value) > 0 &&Number(value) <= canReturnNum) {
      const arr = [...props.deliveryList];
      const list = arr[record.parentId]["details"];
      const index = list.findIndex(item => item.key == record.key);
      const item = list[index];
      const returnPrice = NP.times(record.actualPayPrice, Number(value));
      list.splice(index, 1, { ...item, num: Number(value), returnPrice });
      props.changeDataSource(arr);
      if(props.selectedRows.length>0){//当已勾选，又更改数量的时候，同时更新合计退款
        props.getTotalAmount(list)
      };
      const name = "goodList" + record.parentId;
      props.form.setFieldsValue({ [name]: list });
    }
  };
  //退款数量置灰的几种情况
  const disabledCase = record => {
    if(!(record.isGift==0&&record.canReturn==1&&record.expressStatus==1)){
      return true
    }
    return false;
  };
  //校验退款数量
  const validatorNum = (rule, value, record) => {
    const canReturnNum = record.buyNum - record.alreadyReturnNum;
    if (value) {
      if (/^[0-9]*$/.test(Number(value))) {
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
export default getColumns;
