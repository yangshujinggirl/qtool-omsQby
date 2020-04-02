import { Input, Form, Select, Button, DatePicker } from "antd";
import { Link } from 'react-router-dom';

const Columns = [
  {
    title: "优惠券批次号",
    dataIndex: "couponCode"
  },
  {
    title: "优惠券名称",
    dataIndex: "couponName",
    render:(text,record,index)=> {
      return <Link
              to={`/account/coupon/info/${record.couponId}`}>
              {record.couponName}
            </Link>
    }
  },
  {
    title: "发放方式",
    dataIndex: "couponUseSceneStr"
  },
  {
    title: "优惠券金额",
    dataIndex: "couponMoney"
  },
  {
    title: "使用门槛",
    dataIndex: "couponFullAmount"
  },
  {
    title: "优惠券总数",
    dataIndex: "couponCount",
    render: (text, record) => <span> {text === -1 ? "不限制" : text}</span>
  },
  {
    title: "已经发放数量",
    dataIndex: "couponGiveCount",
    render: (text, record) => {
      return <Link to={`/account/couponRecord/${record.couponCode}`}>
              {text}
            </Link>
    }
  },
  {
    title: "已使用数",
    dataIndex: "couponUsedQty"
  },
  {
    title: "优惠券状态",
    dataIndex: "statusStr"
  },
  {
    title: "是否过期",
    dataIndex: "isExpire",
    render:(text,record,index)=>(
      <span>{text==1?'是':'否'}</span>
    )
  },
  {
    title: "创建人",
    dataIndex: "creater"
  },
  {
    title: "创建时间",
    dataIndex: "createTime"
  },
  {
    title: "操作",
    dataIndex: "",
    width: "10%",
    render: (text, record, index) => {
      return (
        <div>
          {(record.status == 1 || record.status == 2) &&
            record.couponCount != -1 && (
              <span
                className="pointerSty"
                onClick={()=>record.onOperateClick('supplyAgain')}>
                追加数量
              </span>
            )}
          &nbsp;
          {record.status !== 3 && record.fuse && (
            <span
              className="pointerSty"
              onClick={()=>record.onOperateClick('fusing')}>
              熔断
            </span>
          )}
          &nbsp;
          {record.couponUseScene == 2 && record.status !== 3 && record.inject&& (
            <span
              className="pointerSty"
              onClick={()=>record.onOperateClick('logoutTic')}>
              注券
            </span>
          )}
        </div>
      );
    }
  }
];

const ColumnCb = [
  {
    title: "活动预算",
    dataIndex: "budget",
    render: (value, row, index) => {
      const obj = {
        children: (value ? value : "") + "万元",
        props: {}
      };
      if (index === 0) {
        obj.props.rowSpan = 4;
      }
      if (index === 1) {
        obj.props.rowSpan = 0;
      }
      if (index === 2) {
        obj.props.rowSpan = 0;
      }
      if (index === 3) {
        obj.props.rowSpan = 0;
      }
      return obj;
    }
  },
  {
    title: "承担方",
    dataIndex: "bearerName"
  },
  {
    title: "承担比例",
    dataIndex: "proportion",
    render: (text, record, index) => <span>{text}%</span>
  },
  {
    title: "备注说明",
    dataIndex: "remark"
  }
];

const ColumnGoods = [
  {
    title: "商品编码",
    dataIndex: "pdCode"
  },
  {
    title: "商品名称",
    dataIndex: "name"
  },
  {
    title: "规格",
    dataIndex: "displayName"
  }
];
const ColumnsAdd = (handleBlur)=> {
  return [
    {
      title: "商品编码",
      dataIndex: "pdCode",
      render:(text,record,index)=>{
        return <Form.Item
                name={['list',index,'pdCode']}
                rules={[{required: true, message: '请输入商品编码'}]}>
                  <Input
                    onBlur={(e)=>handleBlur(e,index)}
                    placeholder="商品编码"
                    autoComplete="off"/>
               </Form.Item>
      }
    },
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "规格",
      dataIndex: "displayName"
    }
  ];
}

export { Columns, ColumnCb, ColumnGoods, ColumnsAdd };
