import moment from "moment";
import { Input } from 'antd';

import { Link } from 'react-router-dom';

const ColumnsPar = [
  {
    title: "Spu编码",
    dataIndex: "spuCode",
  },
  {
    title: "商品名称",
    dataIndex: "productName",
  },
  {
    title: "商品类型",
    dataIndex: "productType"
  },
  {
    title: "后台类目",
    dataIndex: "categoryStr"
  },
  {
    title: "sku数",
    dataIndex: "skuNums"
  },
  {
    title: "是否新品",
    dataIndex: "isNewStr"
  },
  {
    title: "销量",
    dataIndex: "saleAmount"
  },
  {
    title: "操作",
    render: (text,record,index) => (
      <div>
        <Link
          className="link-color action-left"
          to={`/account/baseGoodsInfo/${record.spuCode}`}>
          查看
        </Link>
        <Link
          className="link-color"
          to={`/account/generalTradeEdit/${record.spuCode}`}>
          编辑
        </Link>
        <Link
          className="link-color"
          to={`/account/baseGoodsAdd/${record.spuCode}`}>
          日志
        </Link>
      </div>
    )
  }
];
const ColumnsSub = [
  {
    title: "Sku编码",
    dataIndex: "skuCode",
  },
  {
    title: "商品图片",
    dataIndex: "image",
  },
  {
    title: "规格",
    dataIndex: "salesAttributeName"
  },
  {
    title: "C端售价",
    dataIndex: "customerPrice"
  },
  {
    title: "销量",
    dataIndex: "saleAmount"
  },
  {
    title: "状态",
    dataIndex: "upperStatusStr"
  },
  {
    title: "操作",
    render: (text,record,index) => (
      <span>
      {
        record.upperStatus?
        <span className="pointerSty" onClick={()=>record.onOperateClick('sale')}>立即下架</span>
        :
        <span className="pointerSty" onClick={()=>record.onOperateClick('sale')}>立即上架</span>
      }

      </span>
    )
  }
];
const ColumnsEdit = [
  {
    title: "后台一级类目",
    dataIndex: "categoryName1",
  },
  {
    title: "后台二级类目",
    dataIndex: "categoryName2",
  },
  {
    title: "后台三级类目",
    dataIndex: "categoryName3"
  },
  {
    title: "后台四级类目",
    dataIndex: "categoryName4"
  }
];

export { ColumnsPar, ColumnsSub, ColumnsEdit };
