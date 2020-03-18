import moment from "moment";
import { Input,Form,Select } from 'antd';

import { Link } from 'react-router-dom';
let FormItem = Form.Item;
let Option = Select.Option;

const Columns=[
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
              className="link-color action-left"
              to={`/account/ctipActivity/info/${record.promotionId}`}>
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
              className="link-color action-left"
              to={`/account/ctipActivity/add/${record.promotionId}`}>
              编辑
            </Link>
            <span
              className="link-color action-left"
              onClick={()=>record.onOperateClick('delete')}>
              删除
            </span>
            </span>
          }
          {
            record.status==2&&
            <span
              className="link-color action-left"
              to={null}
              onClick={()=>record.onOperateClick('cancel')}>
              撤销审核
            </span>
          }
          {
            record.status==3&&
            <span
              className="link-color action-left"
              onClick={()=>record.onOperateClick('zuofei')}>
              作废
            </span>
          }
          {
            record.status==4&&
            <Link
              className="link-color action-left"
              to={null}
              onClick={()=>record.onOperateClick('forcedEnd')}>
              强制结束
            </Link>
          }
        </div>
      )
    }
  },];
const ColumnsCreat =(validator,dataSource)=>{
  return [{
      title: '活动预算',
      dataIndex: 'budget',
      width:'20%',
      render:(text,record,index) => {
        let chldrnDom = <Form.Item name={['bearers',index,'budget']} rules={[{pattern:/^\d+(\.\d{1,2})?$/,message:'请输入数字'}]}>
                          <Input
                            suffix="万元"
                            maxLength='15'
                            placeholder="请输入活动预算"
                            autoComplete="off"/>
                        </Form.Item>
        const obj = {
          children: chldrnDom,
          props: {},
        };
        if (index === 0) {
          obj.props.rowSpan = dataSource.length;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    },{
      title: '承担方',
      dataIndex: 'bearerStr',
      width:'10%',
    },{
      title: '*承担比例',
      dataIndex: 'ratio',
      width:'30%',
      render:(text,record,index) => {
        return <Form.Item
                name={['bearers',index,'proportion']}
                rules={[{ required: true, message: '请输入承担比例'},
                        { pattern:/^\d+$/,message:'请输入正整数' },
                        { validator:validator }
                      ]}>
                  <Input
                    suffix="%"
                    maxLength='15'
                    placeholder="请输入承担比例"
                    autoComplete="off"/>
              </Form.Item>
      }
    },{
      title: '备注说明',
      dataIndex: 'remark',
      width:'40%',
      render:(text,record,index) => {
        return <Form.Item name={['bearers',index,'remark']}>
                <Input
                  maxLength='30'
                  placeholder="请输入备注说明"
                  autoComplete="off"/>
              </Form.Item>
      }
    },
  ]
}
export {
  Columns,
  ColumnsCreat
  // ColumnsAdd,
  // ColumnsInfo
 };
