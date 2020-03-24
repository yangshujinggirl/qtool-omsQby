import { Row, Col, Table } from 'antd';
import './index.less';

const columns = [
  {
    title: '赠品编码',
    dataIndex: 'pdCode',
  },
  {
    title: '赠品名称',
    dataIndex: 'pdName',
  },
  {
    title: '赠品B端售价',
    dataIndex: 'sellPrice',
  },
  {
    title: '最多可参与活动的赠品数',
    dataIndex: 'maxQty',
  },
  {
    title: '赠品B端在售库存',
    dataIndex: 'toBQty',
  },
  {
    title: '赠品C端在售库存',
    dataIndex: 'toCQty',
  },
];
function YHModTwo({...props}){
  const { list, promotionType } =props;
  return <div>
    {
      list.length>0&&list.map((el,index) => (
        <Table
          key={index}
          pagination={false}
          columns={columns}
          dataSource={el.promotionGifts}
          bordered
          rowKey={(record,index)=>index}
          title={() => `阶梯${++index}：*单笔订单满${
            promotionType==20?el.param.leastAmount:el.param.leastQty}
            ${promotionType==20?"元":"件"}，送以下商品`}/>
      ))
    }
  </div>
}
function YHModOne({...props}){
  const { list, promotionType } =props;
  return <div className="yh-mod-one-wrap">
    {
      list.length>0&&list.map((el,index) => {
        index++;
        if(promotionType==22) {
          return <div className="item-yh" key={index}>阶梯{index}：*单笔订单满{el.param.leastAmount}元，减免{el.param.reduceAmount}元</div>
        }else {
          return <div className="item-yh" key={index}>阶梯{index}：*单笔订单满{el.param.leastQty}件，减免{el.param.reduceQty}件</div>
        }
      })
    }
  </div>
}
//20.专区多级满元赠 21.专区多级满件赠 22专区多级满元减 23.专区满件减免
function DetailDiscount({...props}) {
  const { labelCol, wrapperCol, info } =props;
  let Mod,TipsMod;
  let promotionType = info.promotionType;
  switch(promotionType) {
    case 22:
    case 23:
      TipsMod =<Row className="item-row">
                  每阶梯的优惠力度需大于上一阶梯的优惠力度。例：满X送Y，每阶梯的Y/X需大于上一阶梯的Y/X。
                </Row>
      Mod = YHModOne;
      break;
    case 20:
    case 21:
      TipsMod =<Row className="item-row">
                  <Col span={labelCol}>赠送方式：</Col>
                  <Col span={wrapperCol}>每种赠品均送</Col>
                </Row>
      Mod = YHModTwo;
      break;
  }
  return <div className="detail-mode-wrap">
          {info.promotionRules.length>0&&TipsMod}
          <Mod list={info.promotionRules} promotionType={info.promotionType}/>
         </div>
}
export default DetailDiscount;
