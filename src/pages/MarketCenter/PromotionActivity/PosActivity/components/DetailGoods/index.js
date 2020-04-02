import { Row, Col, Table, Button } from 'antd';
import { columnsSingleDown } from './columns';
import './index.less';

//10.单品直降
function DetailGoods({...props}) {
  let { info } =props;
  return <div className="detail-mode-wrap">
          {
            info&&info.length>0&&
            <Row className="item-row">
              <div className="export-wrap">
                共{info.length}条数据
                <Button type="primary" onClick={props.exportData}>导出商品明细</Button>
              </div>
            </Row>
          }
          <Table
            bordered
            pagination={false}
            columns={columnsSingleDown}
            dataSource={info}/>
         </div>
}
export default DetailGoods;
