import moment from "moment";
import { Input,Form,Select } from 'antd';

import { Link } from 'react-router-dom';
let FormItem = Form.Item;
let Option = Select.Option;

const Columns = [
  {
    title: "版本名称",
    dataIndex: "versionName"
  },
  {
    title: "版本编号",
    dataIndex: "versionCode",
    width: "15%"
  },
  {
    title: "发布时间",
    dataIndex: "releaseTime"
  },
  {
    title: "最后修改时间",
    dataIndex: "updateTime"
  },
  {
    title: "最后修改人",
    dataIndex: "lastUpdateUser"
  },
  {
    title:"当前版本状态",
    dataIndex: "statusStr"
  },
  {
    title: "操作",
    dataIndex: "action",
    render: (text, record, index) => {
      return (
        <div>
          {true &&
            <Link to={`/account/ctipContent/info/${record.homepageId}/2`}>查看</Link>
          }
          { record.status == 1&&
            <Link to={`/account/ctipContent/add/${record.homepageId}`}>编辑</Link>
          }
          {(record.status == 1 || record.status == 2)&&
            <span
              className="pointerSty"
              onClick={() => record.onOperateClick("ban")}
            >
              禁用
            </span>
          }
          <Link to={`/account/ctipContent/log/${record.homepageId}`}>日志</Link>
        </div>
      );
    }
  }
];
const ColumnsLog = [
  {
    title: "操作类型",
    dataIndex: "operateTypeStr"
  },{
    title: "操作描述",
    dataIndex: "operateContent",
    width: "15%"
  },{
    title: "操作时间",
    dataIndex: "operateTime"
  },{
    title: "操作人",
    dataIndex: "operateUser"
  }];
export { Columns,ColumnsLog };
