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
    dataIndex: 'operateUserId',
  },
];

function DetailLog({...props}) {
  const { info } =props;
  return <div className="detail-mode-wrap">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={info}/>
         </div>
}
export default DetailLog;
