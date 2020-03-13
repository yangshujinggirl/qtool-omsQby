import { Link } from "react-router-dom";
const columnsIndex = [
  {
    title: "序号",
    dataIndex: "key",
    key: "key"
  },
  {
    title: "活动ID",
    dataIndex: "promotionId",
    key: "promotionId"
  },
  {
    title: "活动名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "促销类型",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "活动时间",
    dataIndex: "activityTime",
    key: "activityTime"
  },
  {
    title: "活动状态",
    dataIndex: "statusStr",
    key: "statusStr"
  },
  {
    title: "发起人",
    dataIndex: "createUser",
    key: "createUser"
  },
  {
    title: "操作",
    dataIndex: "opreation",
    key: "opreation",
    render: (text, record, index) => {
      return (
        <div className="list-handle-opreation">
          <Link
            to={`account/pos_act_info/${record.promotionId}`}
            className="brandColor table-btn-item"
          >
            查看
          </Link>
          {record.status == 1 && (
            <span>
              <Link
                to={`/account/add_pos_act/${record.promotionId}`}
                className="brandColor table-btn-item"
              >
                编辑
              </Link>
              <span
                className="brandColor table-btn-item"
                onClick={() => record.onOperateClick("delete")}
              >
                删除
              </span>
            </span>
          )}
          {record.status == 2 && (
            <span
              className="brandColor table-btn-item"
              onClick={() => record.onOperateClick("cancel")}
            >
              撤销审核
            </span>
          )}
          {record.status == 3 && (
            <span
              className="brandColor table-btn-item"
              onClick={() => record.onOperateClick("zuofei")}
            >
              作废
            </span>
          )}
          {record.status == 4 && (
            <span
              className="brandColor table-btn-item"
              onClick={() => record.onOperateClick("forcedEnd")}
            >
              强制结束
            </span>
          )}
        </div>
      );
    }
  }
];

export { columnsIndex };
