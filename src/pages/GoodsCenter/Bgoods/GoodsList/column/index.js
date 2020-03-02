import moment from "moment";
import { Link } from "react-router-dom";
const Columns = [
  { title: "SPU编码", dataIndex: "spuCode", key: "1" },
  {
    title: "商品名称",
    dataIndex: "productName",
    key: "2"
  },
  {
    title: "商品分类",
    dataIndex: "productName",
    key: "3"
  },
  {
    title: "商品类型",
    dataIndex: "productName",
    key: "4"
  },
  {
    title: "商品标签",
    dataIndex: "productName",
    key: "5"
  },
  {
    title: "在售库存",
    dataIndex: "productName",
    key: "6"
  },
  {
    title: "销售数量",
    dataIndex: "productName",
    key: "7"
  },
  {
    title: "sku数",
    dataIndex: "productName",
    key: "8"
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "",
    render: (text, record, index) => (
      <div>
        <Link
          className="link-color action-left"
          to={`/account/bgoodsInfo/${record.id}`}
        >
          查看
        </Link>
        <Link className="link-color" to={`/account/bgoodsAdd/${record.id}`}>
          编辑
        </Link>
      </div>
    )
  }
];
const Columns2 = [
  {
    title: "Sku编码",
    dataIndex: "createTime",
    key: "1"
  },
  {
    title: "商品图片",
    dataIndex: "createTime",
    key: "2"
  },
  {
    title: "规格",
    dataIndex: "createTime",
    key: "3"
  },
  {
    title: "售价",
    dataIndex: "createTime",
    key: "4"
  },
  {
    title: "在售库存",
    dataIndex: "createTime",
    key: "5"
  },
  {
    title: "销量",
    dataIndex: "createTime",
    key: "6"
  },
  {
    title: "商品状态",
    dataIndex: "createTime",
    key: "7"
  },
  {
    title: "最近上架时间",
    dataIndex: "createTime",
    key: "8"
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "",
    render: (text, record, index) => (
      <div>
        {record.bStatus == 0 || record.bStatus == 1 ? (
          <a className="link-color" onClick={record.onOperateClick.bind(this)}>
            立即上架
          </a>
        ) : (
          <a className="link-color" onClick={record.onOperateClick.bind(this)}>
            立即下架
          </a>
        )}
      </div>
    )
  }
];

export default Columns;
