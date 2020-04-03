import React from "react";
import { Form,Input } from 'antd';
import { TableItemShowTime } from "common/QdisabledDateTime";
import moment from "moment";
import {Link} from "react-router-dom";

const Columns = [
    {title: "成长值类型", dataIndex: "growthType", key: "1"},
    {title: "任务项", dataIndex: "name", key: "2"},
    {title: "成长值任务标题", dataIndex: "title", key: "3"},
    {
        title: "最后修改时间", dataIndex: "updateTime", key: "4",
        render: (text) => (<TableItemShowTime showTime={text}/>)
    },
    {title: "最后修改人", dataIndex: "updateUser", key: "5"},
    {
      title: "操作", key: "6",
      render: (text, record) => (
          <div>
              <Link to={`/account/growth_task_configuration/detail/${record.growthTaskId}`}>
                  查看
              </Link>
              <Link to={`/account/taskGrowth/edit/${record.growthTaskId}`}>
                  编辑
              </Link>
          </div>
      )
    }
];


/**
 * 副标题字段
 */
const SubheadingColumns = [
    {title: "副标题字段1", dataIndex: "subTitleField1", key: "1"},
    {title: "副标题字段2", dataIndex: "subTitleField2", key: "2"},
    {title: "副标题字段3", dataIndex: "subTitleField3", key: "3"}
];
const SubAddColumns = [{
      title: "副标题字段1",
      dataIndex: "subTitleField1",
      render:(text,record,index)=>{
        return <Form.Item name={['list',index,'subTitleField1']}>
                <Input  autoComplete="off"/>
              </Form.Item>
      }
    },{
      title: "副标题字段2",
      dataIndex: "subTitleField2",
      render:(text,record,index)=>{
        return <Form.Item name={['list',index,'subTitleField2']}>
                <Input  autoComplete="off"/>
              </Form.Item>
      }
    },{
      title: "副标题字段3",
      dataIndex: "subTitleField3",
      render:(text,record,index)=>{
        return <Form.Item name={['list',index,'subTitleField3']}>
                <Input  autoComplete="off"/>
              </Form.Item>
      }
    }];
/**
 * 日志字段
 */
const LogColumns = [
    {title: "操作类型", dataIndex: "logType", key: 1},
    {title: "操作描述", dataIndex: "content", key: 2},
    {title: "操作时间", dataIndex: "createTime", key: 3},
    {title: "操作人", dataIndex: "operateUser", key: 4}
];
export {Columns, SubheadingColumns,LogColumns, SubAddColumns};
