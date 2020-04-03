import moment from 'moment'
const Columns = [
  {
    title: "标签名称",
    dataIndex: "tabName"
  },
  {
    title: "标签状态",
    dataIndex: "tabStatus",
    render:(text)=>(
    <span>{text==0?'禁用':'启用'}</span>
    )
  },
  {
    title: "最后修改时间",
    dataIndex: "lastUpdateTime",
    render:(text)=>(
      <span>{text?moment(text).format('YYYY-MM-DD HH:mm:ss'):''}</span>
    )
  },
  {
    title: "最后修改人",
    dataIndex: "modifyBy"
  },
  {
    title: "操作",
    dataIndex: "",
    render: (text, record) => {
      return (
        <div>
          <a
            className="theme-color"
            onClick={() => record.onOperateClick("edit")}
          >
            编辑
          </a>　
          {record.tabStatus == 1 && (
            <a className="theme-color" onClick={() => record.onOperateClick(0)}>
              禁用
            </a>
          )}
          {record.tabStatus == 0 && (
            <a className="theme-color" onClick={() => record.onOperateClick(1)}>
              启用
            </a>
          )}
        </div>
      );
    }
  }
];

export default Columns;
