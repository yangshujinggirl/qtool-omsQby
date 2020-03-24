import { Row, Col, Table, Button } from 'antd';

const columns = [
  {
    title: '操作类型',
    dataIndex: 'operateTypeStr',
  },
  {
    title: '操作描述',
    dataIndex: 'operateContent',
  },
  {
    title: '操作时间',
    dataIndex: 'operateTime',
  },
  {
    title: '操作人',
    dataIndex: 'operateUser',
  },
];

function DetailLog({...props}) {
  const { list } =props;
  return <div className="detail-mode-wrap">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={list}/>
         </div>
}
export default DetailLog;
