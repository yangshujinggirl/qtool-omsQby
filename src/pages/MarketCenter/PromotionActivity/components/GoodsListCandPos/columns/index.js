import moment from "moment";
import { Input,Form,Select } from 'antd';

import { Link } from 'react-router-dom';
let FormItem = Form.Item;
let Option = Select.Option;

const Columns=(activityType)=> {
  return [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      render:(text,record,index)=> {
        return ++index
      }
    },{
      title: '活动ID',
      dataIndex: 'promotionId',
      key: 'promotionId',
      render:(text,record,index)=> {
        return <Link
                to={`/account/${activityType=="POS"?'posActivity':'ctipActivity'}/info/${record.promotionId}`}>
                {record.promotionId}
              </Link>
      }
    },{
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '促销类型',
      dataIndex: 'type',
      key: 'type',
    },{
      title: '活动时间',
      dataIndex: 'activityTime',
      key: 'activityTime',
    },{
      title: '活动状态',
      dataIndex: 'statusStr',
      key: 'statusStr',
    },{
      title: '发起人',
      dataIndex: 'createUser',
      key: 'createUser',
    },{
      title: '操作',
      dataIndex: 'opreation',
      key: 'opreation',
      render:(text,record,index) => {
        return(
          <div className="list-handle-opreation">
            {
              record.status==1&&
              <span>
                <Link
                  to={`/account/${activityType=="POS"?'posActivity':'ctipActivity'}/add/${record.promotionId}`}>
                  编辑
                </Link>
                &nbsp;
                <span
                  className="pointerSty"
                  onClick={()=>record.onOperateClick('delete')}>
                  删除
                </span>
              </span>
            }
            {
              record.status==2&&
              <span
                className="pointerSty"
                to={null}
                onClick={()=>record.onOperateClick('cancel')}>
                撤销审核
                &nbsp;
              </span>
            }
            {
              record.status==3&&
              <span
                className="pointerSty"
                onClick={()=>record.onOperateClick('zuofei')}>
                作废
                &nbsp;
              </span>
            }
            {
              record.status==4&&
              <span
                className="pointerSty"
                onClick={()=>record.onOperateClick('forcedEnd')}>
                强制结束
              </span>
            }
          </div>
        )
      }
    }];
}
export {
  Columns,
 };
