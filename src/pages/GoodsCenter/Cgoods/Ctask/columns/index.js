const Columns = [
  {
    title: "任务编码",
    dataIndex: "taskCode"
  },
  {
    title: "任务名称",
    dataIndex: "taskName"
  },
  {
    title: "定时操作",
    dataIndex: "taskTypeStr"
  },
  {
    title: "任务状态",
    dataIndex: "taskStatusStr"
  },
  {
    title: "最后修改人",
    dataIndex: "taskOperateUser"
  },
  {
    title: "定时时间",
    dataIndex: "taskOperateStartTime"
  },
  {
    title: "操作",
    dataIndex: "",
    render: (text, record) => {
      return (
        <div>
          <a
            className="theme-color"
            onClick={() => record.onOperateClick("info")}
          >
            查看
          </a>
          {record.taskStatus == 0 && (
            <div>
              <a
                className="theme-color"
                onClick={() => record.onOperateClick("edit")}
              >
                编辑
              </a>
              　
              <a
                className="theme-color"
                onClick={() => record.onOperateClick("invalid")}
              >
                强制无效
              </a>
            </div>
          )}
          　
        </div>
      );
    }
  }
];
export default Columns;
