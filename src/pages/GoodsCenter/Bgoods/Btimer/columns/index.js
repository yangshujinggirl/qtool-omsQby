const Columns = [
  {
    title: "定时名称",
    dataIndex: "taskName"
  },
  {
    title: "定时操作",
    dataIndex: "opstatusStr"
  },
  {
    title: "定时状态",
    dataIndex: "statusStr"
  },
  {
    title: "最后修改人",
    dataIndex: "updateUserName"
  },
  {
    title: "定时时间",
    dataIndex: "taskTime"
  },
  {
    title: "操作",
    dataIndex: "",
    render: (text, record) => {
      return (
        <div>
          <a className="theme-color" onClick={()=>record.onOperateClick('info')}>
            查看
          </a>　
          <a className="theme-color" onClick={()=>record.onOperateClick('edit')}>
            编辑
          </a>　
          <a className="theme-color" onClick={()=>record.onOperateClick('invalid')}>
            强制无效
          </a>
        </div>
      );
    }
  }
];
export default Columns;
