import moment from "moment";
import { Input,Form } from 'antd';

import { Link } from 'react-router-dom';

const Columns = [
  {
    title: "供应商名称",
    dataIndex: "name",
  },
  {
    title: "供应商简称",
    dataIndex: "shortName"
  },
  {
    title: "审核状态",
    dataIndex: "status"
  },
  {
    title: "合作状态",
    dataIndex: "cooperationStatus",
  },
  {
    title: "账期类型",
    dataIndex: "accountsType",
  },
  {
    title: "创建人",
    dataIndex: "createBy",
  },
  {
    title: "最后操作人",
    dataIndex: "modifyBy",
  },
  {
    title: "操作",
    render: (text,record,index) => (
      <div>
        <Link
          className="link-color action-left"
          to={`/account/supplierManage/info/${record.id}`}>
          查看
        </Link>
        <Link
          className="link-color"
          to={`/account/supplierManage/add/${record.id}`}>
          编辑
        </Link>
      </div>
    )
  }
];

export { Columns };
