import moment from "moment";
import { Button } from 'antd';
import { Link } from "react-router-dom";
import { Qbtn } from 'common';

const Columns = [
  {
    title: "客户姓名",
    dataIndex: "name",
  },
  {
    title: "联系电话",
    dataIndex: "phone",
  },
  {
    title: "省市区",
    dataIndex: "address",
  },
  {
    title: "招商状态",
    dataIndex: "status",
  },
  {
    title: "操作",
    dataIndex: "action",
    render:(text,record,index)=>{
      return <div className="handle-action">
          <span className="handle-btn-item" type="primary" onClick={()=>record.onOperateClick('upload')}>上传合同</span>
          <span className="handle-btn-item" type="primary" onClick={()=>record.onOperateClick('editRecord')}>添加记录</span>
          <span className="handle-btn-item" type="primary" onClick={()=>record.onOperateClick('lookRecord')}>查看记录</span>
          <span className="handle-btn-item" type="primary" onClick={()=>record.onOperateClick('audit')}>审核</span>
        </div>
    }
  }
];

export default Columns;
