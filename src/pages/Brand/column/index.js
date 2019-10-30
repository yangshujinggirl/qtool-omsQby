import moment from "moment";
import { Link } from "react-router-dom";
const Columns = [
  {
    title: "品牌logo",
    dataIndex: "logo",
    key: "1",
    render: text => <img src={text} style={{ width: "90px", height: "90px" }}/>
  },
  { title: "品牌中文名", dataIndex: "brandNameCn", key: "2" },
  {
    title: "品牌英文名",
    dataIndex: "brandNameEn",
    key: "3"
  },
  {
    title: "品牌授权",
    dataIndex: "isSq",
    key: "4",
    render: (text, record, index) => (text == 1 ? "有" : "无")
  },
  {
    title: "品牌状态",
    dataIndex: "status",
    key: "5",
    render: text => (text == 1 ? "启用" : "不启用")
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "6",
    render: text => <span>{text&&moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "最新修改时间",
    dataIndex: "lastUpdateTime",
    key: "7",
    render: text => <span>{text&&moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "操作",
    key: "8",
    render: (text, record, index) => (
      <div>
        <Link
          className="link-color action-left"
          to={`/account/brandInfo/${record.id}`}
        >
          查看
        </Link>
        <Link className="link-color" to={`/account/brandAdd/${record.id}`}>
          编辑
        </Link>
      </div>
    )
  }
];

export default Columns;
