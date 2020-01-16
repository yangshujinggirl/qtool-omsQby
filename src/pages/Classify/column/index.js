import moment from "moment";
const Columns1 = [
  {
    title: "一级类目",
    dataIndex: "categoryName",
    key: "1"
  },
  {
    title: "一级类目状态",
    dataIndex: "status",
    key: "2",
    render: (text, record, index) => (
      <span>{text && text == 1 ? "启用" : "禁用"}</span>
    )
  },
  {
    title: "最后修改人",
    dataIndex: "modifyBy",
    key: "3",
    render: (text, record, index) => (
      <span>
        {record.modifyBy}
        <br />
        {record.lastUpdateTime &&
          moment(record.lastUpdateTime).format("YYYY-MM-DD HH:mm:ss")}
      </span>
    )
  },
  {
    title: "操作",
    key: "5",
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
    title: "一级类目",
    dataIndex: "categoryName",
    key: "1"
  },
  {
    title: "二级类目",
    dataIndex: "categoryName2",
    key: "2"
  },
  {
    title: "二级类目状态",
    dataIndex: "status",
    key: "3",
    render: (text, record, index) => (
      <span>{text && text == 1 ? "启用" : "禁用"}</span>
    )
  },
  {
    title: "最后修改人",
    dataIndex: "modifyBy",
    key: "5",
    render: (text, record, index) => (
      <span>
        {record.modifyBy}
        <br />
        {record.lastUpdateTime &&
          moment(record.lastUpdateTime).format("YYYY-MM-DD HH:mm:ss")}
      </span>
    )
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
const Columns3 = [
  {
    title: "一级类目",
    dataIndex: "categoryName",
    key: "1"
  },
  {
    title: "二级类目",
    dataIndex: "categoryName2",
    key: "2"
  },
  {
    title: "三级类目",
    dataIndex: "categoryName3",
    key: "3"
  },
  {
    title: "三级类目状态",
    dataIndex: "status",
    key: "4",
    render: (text, record, index) => (
      <span>{text && text == 1 ? "启用" : "禁用"}</span>
    )
  },
  {
    title: "最后修改人",
    dataIndex: "modifyBy",
    key: "5",
    render: (text, record, index) => (
      <span>
        {record.modifyBy}
        <br />
        {record.lastUpdateTime &&
          moment(record.lastUpdateTime).format("YYYY-MM-DD HH:mm:ss")}
      </span>
    )
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
const Columns4 = [
  {
    title: "一级类目",
    dataIndex: "categoryName",
    key: "1"
  },
  {
    title: "二级类目",
    dataIndex: "categoryName2",
    key: "2"
  },
  {
    title: "三级类目",
    dataIndex: "categoryName3",
    key: "3"
  },
  {
    title: "四级类目",
    dataIndex: "categoryName4",
    key: "4"
  },
  {
    title: "四级类目状态",
    dataIndex: "status",
    key: "5",
    render:(text, record, index) => (
      <span>{text && text == 1 ? "启用" : "禁用"}</span>
    )
  },
  {
    title: "最后修改人",
    dataIndex: "modifyBy",
    key: "6",
    render: (text, record, index) => (
      <span>
        {record.modifyBy}
        <br />
        {record.lastUpdateTime &&
          moment(record.lastUpdateTime).format("YYYY-MM-DD HH:mm:ss")}
      </span>
    )
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
export { Columns1, Columns2, Columns3, Columns4 };
