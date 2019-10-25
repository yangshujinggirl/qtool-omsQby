import { a } from "antd";
import { Link } from "react-router-dom";

const Columns = [
  {
    title: "门店名称",
    dataIndex: "channelName",
    key: "1"
  },
  {
    title: "门店类型",
    dataIndex: "channelType",
    key: "2",
    render: text => (text == 1 ? "直营店" : text == 2 ? "联营店" : "加盟店")
  },
  {
    title: "地址（省市区地址）",
    dataIndex: "shAddress",
    key: "3"
  },
  {
    title: "营业状态",
    dataIndex: "channelStatus",
    key: "4",
    render: text => (text == 1 ? "开业中" : text == 2 ? "待开业" : "关业中")
  },
  {
    title: "账户余额",
    dataIndex: "quota",
    key: "5"
  },
  {
    title: "门店积分",
    dataIndex: "score",
    key: "6"
  },
  {
    title: "操作",
    dataIndex: "channelStatus",
    key: "7", //1开业中2待开业3关店
    render: (text, record, index) => (
      <div>
        <Link to={`/account/addShop/${record.id}`}>
          <span className="theme-color">修改</span>
        </Link>
        {text == 1 ? (
          <div>
            <Link to={`/account/shopSet/${record.id}`}>
              <a className="theme-color">调整营业规则</a>
            </Link>
            　
            <a
              className="theme-color"
              onClick={() => record.onOperateClick("close")}
            >
              关店
            </a>
          </div>
        ) : text == 2 ? (
          <Link to="/account/shopSet">
            <a className="theme-color">开店</a>
          </Link>
        ) : (
          <a
            className="theme-color"
            onClick={() => record.onOperateClick("open")}
          >
            开店
          </a>
        )}
      </div>
    )
  }
];
export default Columns;
