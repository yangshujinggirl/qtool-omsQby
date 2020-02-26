import moment from "moment";
import { Input } from 'antd';

import { Link } from 'react-router-dom';
const ColumnsPar = [
  {
    title: "Spuid",
    dataIndex: "attributeName",
  },
  {
    title: "商品名称",
    dataIndex: "lastUpdateTime",
  },
  {
    title: "商品类型",
    dataIndex: "modifyBy"
  },
  {
    title: "后台类目",
    dataIndex: "modifyBy"
  },
  {
    title: "sku数",
    dataIndex: "modifyBy"
  },
  {
    title: "是否新品",
    dataIndex: "modifyBy"
  },
  {
    title: "销量",
    dataIndex: "modifyBy"
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
          to={`/account/baseGoodsAdd/${record.spuCode}`}>
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
    dataIndex: "attributeName",
  },
  {
    title: "商品图片",
    dataIndex: "lastUpdateTime",
  },
  {
    title: "规格",
    dataIndex: "modifyBy"
  },
  {
    title: "C端售价",
    dataIndex: "modifyBy"
  },
  {
    title: "销量",
    dataIndex: "modifyBy"
  },
  {
    title: "状态",
    dataIndex: "modifyBy"
  },
  {
    title: "操作",
    render: (text,record,index) => (
      <div>
        立即下架
      </div>
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
