import moment from "moment";
import { Input,Form,Select } from 'antd';

import { Link } from 'react-router-dom';
let FormItem = Form.Item;
let Option = Select.Option;

const Columns=[
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    render:(text,record,index)=> {
      return ++index
    }
  },{
    title: '活动ID',
    dataIndex: 'promotionId',
    key: 'promotionId',
    render:(text,record,index)=> {
      return <Link
              className="link-color action-left"
              to={`/account/ctipActivity/info/${record.promotionId}`}>
              {record.promotionId}
            </Link>
    }
  },{
    title: '活动名称',
    dataIndex: 'name',
    key: 'name',
  },{
    title: '促销类型',
    dataIndex: 'type',
    key: 'type',
  },{
    title: '活动时间',
    dataIndex: 'activityTime',
    key: 'activityTime',
  },{
    title: '活动状态',
    dataIndex: 'statusStr',
    key: 'statusStr',
  },{
    title: '发起人',
    dataIndex: 'createUser',
    key: 'createUser',
  },{
    title: '操作',
    dataIndex: 'opreation',
    key: 'opreation',
    render:(text,record,index) => {
      return(
        <div className="list-handle-opreation">
          {
            record.status==1&&
            <span>
            <Link
              className="pointerSty"
              to={`/account/ctipActivity/add/${record.promotionId}`}>
              编辑
            </Link>
            <span
              className="pointerSty"
              onClick={()=>record.onOperateClick('delete')}>
              删除
            </span>
            </span>
          }
          {
            record.status==2&&
            <span
              className="pointerSty"
              to={null}
              onClick={()=>record.onOperateClick('cancel')}>
              撤销审核
            </span>
          }
          {
            record.status==3&&
            <span
              className="pointerSty"
              onClick={()=>record.onOperateClick('zuofei')}>
              作废
            </span>
          }
          {
            record.status==4&&
            <Link
              className="pointerSty"
              to={null}
              onClick={()=>record.onOperateClick('forcedEnd')}>
              强制结束
            </Link>
          }
        </div>
      )
    }
  },];
  //单品直降
const columnsAdd1 = [
  {
    title: "序号",
    dataIndex: "index",
    render: (text, record, index) => {
      return <span>{++index}</span>;
    },
    key: "1"
  },
  {
    title: "操作",
    dataIndex: "operate",
    render: (text, record, index) => {
      return (
        <div>
          <span onClick={() => record.onOperateClick('delete')} className="pointerSty">
            删除
          </span>
          <br />
          <span onClick={() => record.onOperateClick('edit')} className="pointerSty">
            编辑
          </span>
        </div>
      );
    },
    key: "2"
  },
  { title: "商品编码", dataIndex: "pdCode", key: "3" },
  { title: "商品名称", dataIndex: "pdName", key: "4" },
  { title: "商品规格", dataIndex: "pdName", key: "5" },
  {
    title: "商品种类",
    dataIndex: "pdKind",
    key: "6",
    render: (text, record, index) => {
      return text == 1
        ? "一般贸易商品"
        : text == 2
        ? "品牌直供商品"
        : "保税商品";
    }
  },
  {
    title: "C端售价",
    dataIndex: "sellPrice",
    key: "7",
    render: (text, record, index) => {
      return (text?<span>￥{Number(text).toFixed(2)}元</span>:'');
    }
  },
  {
    title: "活动价",
    dataIndex: "activityPrice",
    key: "8",
    render: (text, record, index) => {
      return (
        text?
        <span style={{ color: +record.profitRate < 0 ? "red" : "#35bab0" }}>
          ￥{Number(text).toFixed(2)}元
        </span>
        :''
      );
    }
  },
  {
    title: "预计毛利率",
    dataIndex: "profitRate",
    key: "9",
    render: (text, record, index) => {
      return (
        <span style={{ color: +text < 0 ? "red" : "#000000a6" }}>
          {
            text?text+'%':'-'
          }
        </span>
      );
    }
  },
  {
    title: "活动最大可售卖数量",
    dataIndex: "maxQty",
    key: "12",
    className: "green"
  },
  {
    title: "活动期间每人每单限购",
    dataIndex: "perOrderLimit",
    key: "13",
    className: "green"
  },
  {
    title: "活动期间每人每天限购",
    dataIndex: "perDayLimit",
    key: "14",
    className: "green"
  },
  {
    title: "活动期间每人每账号限购",
    dataIndex: "perUserLimit",
    key: "15",
    className: "green"
  }
];
  //单品满件赠
const columnsAdd2 = [

  {
    title: "序号",
    dataIndex: "index",
    key: "1",
    render: (text, record, index) => {
      return <span>{++index}</span>;
    }
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "2",
    render: (text, record, index) => {
      return (
        <div>
          <span onClick={() => record.onOperateClick('delete')} className="pointerSty">
            删除
          </span>
          <br />
          <span onClick={() => record.onOperateClick('edit')} className="pointerSty">
            编辑
          </span>
        </div>
      );
    }
  },
  { title: "商品编码", dataIndex: "pdCode", key: "3" },
  { title: "商品名称", dataIndex: "pdName", key: "4" },
  { title: "商品规格", dataIndex: "pdSpec", key: "5" },
  {
    title: "商品种类",
    dataIndex: "pdKind",
    key: "6",
    render: (text, record, index) => {
      return text == 1
        ? "一般贸易商品"
        : text == 2
        ? "品牌直供商品"
        : "保税商品";
    }
  },
  {
    title: "优惠内容",
    dataIndex: "promotionRules",
    key: "7",
    className: "green",
    render: (text, record, index) => {
      return (
        <div>
          {record.promotionRules &&
            record.promotionRules.length > 0 &&
            record.promotionRules.map((item, index) => (
              <p key={index} style={{ "marginBottom": "5px" }}>
                满{item.param.leastQty}件，送{item.param.giftQty}件
              </p>
            ))}
        </div>
      );
    }
  },
  {
    title: "商品C端售价",
    dataIndex: "sellPrice",
    key: "8",
    render: (text, record, index) => {
      return (text?<span>￥{Number(text).toFixed(2)}元</span>:'');
    }
  },
  {
    title: "预计到手价",
    dataIndex: "handsPrice",
    key: "9",
    render: (text, record, index) => {
      return (
        <div>
          {record.handsPrice &&
            record.handsPrice.length > 0 &&
            record.handsPrice.map((item, subIndex) => (
              <p
                key={subIndex}
                style={{ "marginBottom": "5px", color: item.color }}
              >
                {++subIndex}级：{item.price?'￥'+item.price+'元':'-'}
              </p>
            ))}
        </div>
      );
    }
  },
  {
    title: "预计毛利率",
    dataIndex: "profitRate",
    key: "10",
    render: (text, record, index) => {
      return (
        <div>
          {record.profitRate &&
            record.profitRate.length > 0 &&
            record.profitRate.map((item, subIndex) => (
              <p
                key={subIndex}
                style={{ "marginBottom": "5px", color: item.color }}
              >
                {++subIndex}级：{item.rate?item.rate+'%':'-'}
              </p>
            ))}
        </div>
      );
    }
  },
  {
    title: "活动最大可售卖数量",
    width: "5%",
    dataIndex: "maxQty",
    key: "11",
    className: "green"
  },
  {
    title: "活动期间每人每单限购",
    width: "5%",
    dataIndex: "perOrderLimit",
    key: "12",
    className: "green"
  },
  {
    title: "活动期间每人每天限购",
    width: "5%",
    dataIndex: "perDayLimit",
    key: "13",
    className: "green"
  },
  {
    title: "活动期间每人每账号限购",
    width: "5%",
    dataIndex: "perUserLimit",
    key: "14",
    className: "green"
  }
];
//专区多级满元赠+专区多级满件赠+专区多级满件减
const columnsAdd3 = [
  {
    title: "序号",
    dataIndex: "index",
    key: "1",
    render: (text, record, index) => {
      return <span>{++index}</span>;
    }
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "2",
    render: (text, record, index) => {
      return (
        <div>
          <span onClick={() => record.onOperateClick('delete')} className="pointerSty">
            删除
          </span>
          <br />
          <span onClick={() => record.onOperateClick('edit')} className="pointerSty">
            编辑
          </span>
        </div>
      );
    }
  },
  { title: "商品编码", dataIndex: "pdCode", key: "3" },
  { title: "商品名称", dataIndex: "pdName", key: "4" },
  { title: "商品规格", dataIndex: "pdSpec", key: "5" },
  {
    title: "商品种类",
    dataIndex: "pdKind",
    key: "6",
    render: (text, record, index) => {
      return text == 1
        ? "一般贸易商品"
        : text == 2
        ? "品牌直供商品"
        : "保税商品";
    }
  },
  {
    title: "C端售价",
    dataIndex: "sellPrice",
    key: "7",
    render: (text, record, index) => {
      return (text?<span>￥{Number(text).toFixed(2)}元</span>:'');
    }
  },
  {
    title: "活动最大可售卖数量",
    dataIndex: "maxQty",
    key: "8",
    className: "green"
  }
];
//专区多级满元减
const columnsAdd4 = [
  {
    title: "序号",
    dataIndex: "index",
    key: "1",
    render: (text, record, index) => {
      return <span>{++index}</span>;
    }
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "2",
    render: (text, record, index) => {
      return (
        <div>
          <span onClick={() => record.onOperateClick('delete')} className="pointerSty">
            删除
          </span>
          <br />
          <span onClick={() => record.onOperateClick('edit')} className="pointerSty">
            编辑
          </span>
        </div>
      );
    }
  },
  { title: "商品编码", dataIndex: "pdCode", key: "3" },
  { title: "商品名称", dataIndex: "pdName", key: "4" },
  { title: "商品规格", dataIndex: "pdSpec", key: "5" },
  {
    title: "商品种类",
    dataIndex: "pdKind",
    key: "6",
    render: (text, record, index) => {
      return text == 1
        ? "一般贸易商品"
        : text == 2
        ? "品牌直供商品"
        : "保税商品";
    }
  },
  {
    title: "C端售价",
    dataIndex: "sellPrice",
    key: "7",
    render: (text, record, index) => {
      return (text?<span>￥{Number(text).toFixed(2)}元</span>:'');
    }
  },
  {
    title: "预计最低到手价",
    dataIndex: "handsPrice",
    key: "8",
    render: (text, record, index) => {
      return (
        <div>
          {record.handsPrice &&
            record.handsPrice.length > 0 &&
            record.handsPrice.map((item, subIndex) => (
              <p
                key={subIndex}
                style={{ "marginBottom": "5px", color: item.color }}
              >
                {++subIndex}级：{item.price?'￥'+item.price+'元':'-'}
              </p>
            ))}
        </div>
      );
    }
  },
  {
    title: "预计最低毛利率",
    dataIndex: "profitRate",
    key: "9",
    render: (text, record, index) => {
      return (
        <div>
          {record.profitRate &&
            record.profitRate.length > 0 &&
            record.profitRate.map((item, subIndex) => (
              <p
                key={subIndex}
                style={{ "marginBottom": "5px", color: item.color }}
              >
                {++subIndex}级：{item.rate?item.rate+'%':'-'}
              </p>
            ))}
        </div>
      );
    }
  },
  {
    title: "活动最大可售卖数量",
    dataIndex: "maxQty",
    key: "10",
    className: "green"
  }
];

function InitColumns(promotionType) {
  let columns;
  switch(promotionType) {
    case 10:
     columns = columnsAdd1;
     break;
    case 11:
     columns = columnsAdd2;
     break;
    case 20:
    case 21:
    case 23:
     columns = columnsAdd3;
     break;
    case 22:
     columns = columnsAdd4;
     break;
  };
  return columns;
}
export { Columns,InitColumns}
