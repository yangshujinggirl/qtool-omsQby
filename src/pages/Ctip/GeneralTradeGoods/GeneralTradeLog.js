import { Qtable, Qbtn } from 'common';

const columns = [{
    title: '操作描述',
    dataIndex: 'operationContent',
  },
  {
    title: '操作人',
    dataIndex: 'modifyBy',
    key: 'address',
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
  }];
class GeneralTradeLog extends React.Component {
  render() {
    return(
      <div>
        <Qtable
          columns={columns}
          dataSource={[]}/>
      </div>
    )
  }
}

export default GeneralTradeLog;
