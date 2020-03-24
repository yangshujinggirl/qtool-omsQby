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
        let baseKey = activityType=="1"?'ctipAudit':'posAudit'
        return(
          <div className="list-handle-opreation">
            {
              record.status==1?
                <Link
                  to={`/account/${baseKey}/edit/${record.promotionId}`}>
                  审核
                </Link>
                :
                <Link
                  to={`/account/${baseKey}/info/${record.promotionId}`}>
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
