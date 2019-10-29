import moment from "moment";
import { Button } from 'antd';
import { Link } from "react-router-dom";
import { Qbtn } from 'common';
import { statusOption } from '../optionMap';

const columns = [
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
    render:(text, record,index)=>{
      return<div>{record.province}{record.city}{record.area}</div>
    }
  },
  {
    title: "招商状态",
    dataIndex: "status",
    render:(text,record,index)=> {
      return <div>{
        statusOption.map((el,index)=> (
          <span key={index}>{el.key==record.status&&el.value}</span>
        ))
      }</div>
    }
  },
  {
    title: "操作",
    dataIndex: "action",
    render:(text,record,index)=>{
      return <div className="handle-action">
          {
            (record.status!=4&&record.status!=7)&&
            <span className="handle-btn-item" type="primary" onClick={()=>record.onOperateClick('upload')}>上传合同</span>
          }
          {
            record.status!=7&&
            <span className="handle-btn-item" type="primary" onClick={()=>record.onOperateClick('editRecord')}>添加记录</span>
          }
          <Link className="handle-btn-item" to={`/account/investmentInfo/${record.id}`}>查看</Link>
          {
            (record.status==3||record.status==6)&&
            <span className="handle-btn-item" type="primary" onClick={()=>record.onOperateClick('audit')}>审核</span>
          }
        </div>
    }
  }
];
const columnsInfo=[
  {
    title: "时间",
    dataIndex: "approachDate",
    render:(text,record,index)=>{
      return<span>{moment(record.approachDate).format('YYYY-MM-DD')}</span>
    }
  },{
    title: "人员",
    dataIndex: "approachPeople",
  },{
    title: "地点",
    dataIndex: "approachAddress",
  },{
    title: "招商状态",
    dataIndex: "updateStatus",
    render:(text,record,index)=>{
      return <div>{
        statusOption.map((el,index)=> (
          <span key={index}>{el.key==record.updateStatus&&el.value}</span>
        ))
      }</div>
    }
  },{
    title: "备注",
    dataIndex: "approachMemo",
  }]
export  {
  columns,
  columnsInfo
};
