import { Link } from "react-router-dom";
const Columns = [
  {
    title: "门店名称",
    dataIndex: "channelName",
    render: (text, record) => {
      return <Link to={`/account/shopManage_infos/${record.id}`}>{text}</Link>;
    },
  },
  {
    title: "门店店主",
    dataIndex: "person",
  },
  {
    title: "门店联系电话",
    dataIndex: "channelPhone",
  },
  {
    title: "门店类型",
    dataIndex: "channelTypeStr",
  },
  {
    title: "营业状态",
    dataIndex: "channelStatusStr",
  },
  {
    title: "所在地区",
    dataIndex: "addressPrefix",
  },
  {
    title: "创建人",
    dataIndex: "createBy",
  },
  {
    title: "最后修改人",
    dataIndex: "modifyBy",
  },
  {
    title: "操作",
    dataIndex: "opation",
    render: (text, record) => {
      return (
        <Link to={`/account/shopManage_edit/${record.id}`}>
          <span>修改</span>
        </Link>
      );
    },
  },
];
export default Columns;
