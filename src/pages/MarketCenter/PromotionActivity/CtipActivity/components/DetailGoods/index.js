import { Row, Col, Table, Button } from 'antd';
import { columnsSingleDown,columnsSingleGift,columnsAreaGift,columnsAreaMinus } from './columns';
import { AppExportApi } from 'api/Export';
import './index.less';

//10.单品直降 11.单品多级满赠 20.专区多级满元赠 21.专区多级满件赠 22专区多级满元减 23.专区满件减免
function DetailGoods({...props}) {
  let { info, goodsList } =props;
  let columns;
  switch(info.promotionType) {
    case 10:
     columns = columnsSingleDown;
     break;
    case 11:
     columns = columnsSingleGift;
     break;
    case 20:
    case 21:
    case 23:
     columns = columnsAreaGift;
     break;
    case 22:
     columns = columnsAreaMinus;
     if(info.promotionRules) {
       info.promotionProducts =info.promotionProducts&&info.promotionProducts.map((el)=> {
         el.promotionRules = info.promotionRules;
         return el;
       })
     }
     info.promotionProducts
     break;
  }
  const handleExport=()=> {
    AppExportApi(null,`/promotions/product/export/${props.promotionId}`)
  }
  return <div className="detail-mode-wrap">
          {
            goodsList&&goodsList.length>0&&
            <Row className="item-row">
              <div className="export-wrap">
                共{goodsList.length}条数据
                <Button type="primary" onClick={handleExport}>导出商品明细</Button>
              </div>
            </Row>
          }
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={goodsList}/>
         </div>
}
export default DetailGoods;
