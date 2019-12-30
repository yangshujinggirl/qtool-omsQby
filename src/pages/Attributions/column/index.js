import moment from "moment";
const Columns = [
  { title: "规格名称", dataIndex: "attributeName", key: "1" },
  {
    title: "状态",
    dataIndex: "attributeState",
    key: "2",
    render: (text, record, index) => <span>{text == 0 ? "禁用" : "启用"}</span>
  },
  {
    title: "创建人",
    dataIndex: "modifyBy",
    key: "3",
    render: (text, record, index) => (
      <div>
        <span>{record.modifyBy}</span>
        <br />
        <span>
          {record.createTime &&
            moment(record.createTime).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      </div>
    )
  },
  {
    title: "最后修改人",
    dataIndex: "modifyBy",
    key: "4",
    render: (text, record, index) => (
      <div>
        <span>{record.modifyBy}</span>
        <br />
        <span>
          {record.lastUpdateTime &&
            moment(record.lastUpdateTime).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      </div>
    )
  },
  {
    title: "操作",
    key: "action",
    render: (text, record, index) => (
      <div>
        <a className='theme-color' onClick={record.onOperateClick.bind(this)}>编辑</a>
      </div>
    )
  }
];

export default Columns;
