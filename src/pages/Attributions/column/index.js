import moment from "moment";
import { Link } from "react-router-dom";
const Columns = [
  { title: "属性名称", dataIndex: "attributeName", key: "1" },
  {
    title: "属性值",
    dataIndex: "attributeValue",
    key: "2"
  },
  {
    title: "关联四级类目",
    dataIndex: "categoryNameList",
    key: "3",
    render:(text,record,index)=>(
      <span>{text.join('|')}</span>
    )
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "4",
    render: text => <span>{moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "最新修改时间",
    dataIndex: "lastUpdateTime",
    key: "5",
    render: text => <span>{moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "最新修改人",
    dataIndex: "modifyBy",
    key: "6",
    render: text => <span>{moment(text).format("YYYY-MM-DD H:mm:ss")}</span>
  },
  {
    title: "操作",
    key: "action",
    render: (text, record, index) => (
      <div>
        <Link
          className="link-color action-left"
          to={`/account/attrAdd/${record.attributeId}`}
        >
          编辑
        </Link>
        <Link className="link-color" to={`/account/AttrBind/${record.attributeId}`}>
          绑定分类
        </Link>
      </div>
    )
  }
];

export default Columns;
