import moment from "moment";
import { Input } from 'antd';

import { Link } from 'react-router-dom';
const Columns = [
  {
    title: "属性名称",
    dataIndex: "attributeName",
  },
  {
    title: "最后修改时间",
    dataIndex: "lastUpdateTime",
  },
  {
    title: "最后修改人",
    dataIndex: "modifyBy"
  },
  {
    title: "操作",
    render: (text,record,index) => (
      <div>
        <Link
          className="link-color action-left"
          to={`/account/baseGoodsInfo/${record.spuCode}`}>
          查看
        </Link>
        <Link
          className="link-color"
          to={`/account/baseGoodsAdd/${record.spuCode}`}>
          编辑
        </Link>
      </div>
    )
  }
];
const ColumnsEdit = [
  {
    title: "后台一级类目",
    dataIndex: "categoryName1",
  },
  {
    title: "后台二级类目",
    dataIndex: "categoryName2",
  },
  {
    title: "后台三级类目",
    dataIndex: "categoryName3"
  },
  {
    title: "后台四级类目",
    dataIndex: "categoryName4"
  }
];

export { Columns, ColumnsEdit };
