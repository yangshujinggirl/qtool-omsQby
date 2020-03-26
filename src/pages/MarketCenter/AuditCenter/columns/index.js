import moment from "moment";
import { Input,Form,Select } from 'antd';

import { Link } from 'react-router-dom';
let FormItem = Form.Item;
let Option = Select.Option;

const Columns =(activityType)=> {
  return [
    {
      title: "序号",
      dataIndex: "amountSum",
      render:(text,record,index)=>{
        return <span>{++index}</span>
      }
    },
    {
      title: "审核ID",
      dataIndex: "approvalNo"
    },

    {
      title: "审核状态",
      dataIndex: "statusStr"
    },
    {
      title: "审核人",
      dataIndex: "approvalUserStr"
    },
    {
      title: "活动ID",
      dataIndex: "promotionId"
    },
    {
      title: "活动名称",
      dataIndex: "name"
    },
    {
      title: "促销类型",
      dataIndex: "promotionTypeStr"
    },
    {
      title: "活动时间",
      dataIndex: "activityTime"
    },
    {
      title: "活动创建人",
      dataIndex: "createUserStr"
    },
    {
      title: "操作",
      dataIndex: "",
      render: (text, record, index) => {
        let baseKeyOne = activityType=="1"?'ctipAudit':'posAudit';
        let baseKeyTwo = activityType=="1"?'ctipActivity':'posActivity';
        return(
          <div className="list-handle-opreation">
            {
              record.status==1?
                <Link
                  to={{pathname:`/account/${baseKeyOne}/edit/${record.promotionId}/${record.approvalId}`,state:{createUser:record.createUser}}}>
                  审核
                </Link>
                :
                <Link
                  to={`/account/${baseKeyTwo}/info/${record.promotionId}`}>
                  查看
                </Link>
            }
          </div>
        )
      }
    }];
}
export {
  Columns,
 };
