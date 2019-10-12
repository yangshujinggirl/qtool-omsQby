import moment from "moment";
const Columns1 = [
  {
    title: "一级类目编码",
    dataIndex: "categoryCode",
    key: "1"
  },
  {
    title: "一级类目名称",
    dataIndex: "categoryName",
    key: "2"
  },
  {
    title: "最新修改时间",
    dataIndex: "lastUpdateTime",
    key: "4",
    render: text => (
      <span>{text && moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
    )
  },
  {
    title: "最新修改人",
    dataIndex: "modifyBy",
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
    dataIndex: "categoryCode",
    key: "1"
  },
  {
    title: "一级类目名称",
    dataIndex: "categoryName",
    key: "2"
  },
  {
    title: "二级类目名称",
    dataIndex: "categoryName2",
    key: "3"
  },
  {
    title: "最新修改时间",
    dataIndex: "lastUpdateTime",
    key: "5",
    render: text => <span>{text && moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "最新修改人",
    dataIndex: "modifyBy",
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
    dataIndex: "categoryCode",
    key: "1"
  },
  {
    title: "一级类目名称",
    dataIndex: "categoryName",
    key: "2"
  },
  {
    title: "二级类目名称",
    dataIndex: "categoryName2",
    key: "3"
  },
  {
    title: "三级类目名称",
    dataIndex: "categoryName3",
    key: "4"
  },
  {
    title: "最新修改时间",
    dataIndex: "lastUpdateTime",
    key: "6",
    render: text => <span>{text && moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "最新修改人",
    dataIndex: "modifyBy",
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
    dataIndex: "categoryCode",
    key: "1"
  },
  {
    title: "一级类目名称",
    dataIndex: "categoryName",
    key: "2"
  },
  {
    title: "二级类目名称",
    dataIndex: "categoryName2",
    key: "3"
  },
  {
    title: "三级类目名称",
    dataIndex: "categoryName3",
    key: "4"
  },
  {
    title: "四级类目名称",
    dataIndex: "categoryName4",
    key: "5"
  },
  {
    title: "最新修改时间",
    dataIndex: "lastUpdateTime",
    key: "7",
    render: text => (
      <span>{text && moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
    )
  },
  {
    title: "最新修改人",
    dataIndex: "modifyBy",
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
export { Columns1, Columns2, Columns3, Columns4 };
