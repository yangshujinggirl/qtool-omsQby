import moment from "moment";
import { Link } from "react-router-dom";
const Columns1 = [
  {
    title: "一级类目编码",
    dataIndex: "spuCode",
    key: "1"
  },
  {
    title: "一级类目名称",
    dataIndex: "productName",
    key: "2"
  },
  {
    title: "关联商品数",
    dataIndex: "productName",
    key: "3"
  },
  {
    title: "最新修改时间",
    dataIndex: "createTime",
    key: "4",
    render: text => <span>{moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "最新修改人",
    dataIndex: "productName",
    key: "5"
  },
  {
    title: "操作",
    key: "6",
    render: (text, record, index) => (
      <div>
        <a className="link-color" onClick={() => record.onOperateClick()}>
          编辑
        </a>
      </div>
    )
  }
];
const Columns2 = [
  {
    title: "二级类目编码",
    dataIndex: "spuCode",
    key: "1"
  },
  {
    title: "一级类目名称",
    dataIndex: "productName",
    key: "2"
  },
  {
    title: "二级类目名称",
    dataIndex: "productName",
    key: "3"
  },
  {
    title: "关联商品数",
    dataIndex: "productName",
    key: "4"
  },
  {
    title: "最新修改时间",
    dataIndex: "createTime",
    key: "5",
    render: text => <span>{moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "最新修改人",
    dataIndex: "productName",
    key: "6"
  },
  {
    title: "操作",
    key: "7",
    render: (text, record, index) => (
      <div>
        <a className="link-color" onClick={() => record.onOperateClick()}>
          编辑
        </a>
      </div>
    )
  }
];
const Columns3 = [
  {
    title: "三级类目编码",
    dataIndex: "spuCode",
    key: "1"
  },
  {
    title: "一级类目名称",
    dataIndex: "productName",
    key: "2"
  },
  {
    title: "二级类目名称",
    dataIndex: "productName",
    key: "3"
  },
  {
    title: "三级类目名称",
    dataIndex: "productName",
    key: "4"
  },
  {
    title: "关联商品数",
    dataIndex: "productName",
    key: "5"
  },
  {
    title: "最新修改时间",
    dataIndex: "createTime",
    key: "6",
    render: text => <span>{moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "最新修改人",
    dataIndex: "productName",
    key: "7"
  },
  {
    title: "操作",
    key: "8",
    render: (text, record, index) => (
      <div>
        <a className="link-color" onClick={() => record.onOperateClick()}>
          编辑
        </a>
      </div>
    )
  }
];
const Columns4 = [
  {
    title: "四级类目编码",
    dataIndex: "spuCode",
    key: "1"
  },
  {
    title: "一级类目名称",
    dataIndex: "productName",
    key: "2"
  },
  {
    title: "二级类目名称",
    dataIndex: "productName",
    key: "3"
  },
  {
    title: "三级类目名称",
    dataIndex: "productName",
    key: "4"
  },
  {
    title: "四级类目名称",
    dataIndex: "productName",
    key: "5"
  },
  {
    title: "关联商品数",
    dataIndex: "productName",
    key: "6"
  },
  {
    title: "最新修改时间",
    dataIndex: "createTime",
    key: "7",
    render: text => <span>{moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "最新修改人",
    dataIndex: "productName",
    key: "8"
  },
  {
    title: "操作",
    key: "9",
    render: (text, record, index) => (
      <div>
        <a className="link-color" onClick={() => record.onOperateClick()}>
          编辑
        </a>
      </div>
    )
  }
];
export default {Columns1,Columns2,Columns3,Columns4}
