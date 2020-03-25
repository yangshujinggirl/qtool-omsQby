import NP from 'number-precision';
import { pdKindOption } from '../../optionMap';
const columnsSingleDown = [
  {
    title: '序号',
    dataIndex: 'key',
  },
  {
    title: '商品编码',
    dataIndex: 'pdCode',
  },
  {
    title: '商品名称',
    dataIndex: 'pdName',
  },
  {
    title: '商品规格',
    dataIndex: 'pdSpec',
  },
  {
    title: '商品种类',
    dataIndex: 'pdKind',
    render:(text,record,index)=> {
      return <span>{
        pdKindOption.map((el,index)=>(
          <span key={index}>{el.key == record.pdKind&&el.value}</span>
        ))
      }</span>
    }
  },
  {
    title: 'C端售价',
    dataIndex: 'sellPrice',
  },
  {
    title: '活动价',
    dataIndex: 'activityPrice',
  },
  {
    title: '预计毛利率',
    dataIndex: 'ml',
    render:(text,record,index)=> {
      let ml;
      if(record.pdKind == 3) {
        ml = record.shareRatio;
        ml =NP.round(ml, 2);
        ml =`${ml}%`
      } else if(!record.eventPrice){
        ml ='-';
      } else if(!record.activityPrice){
        ml = '-';
      }else {
        ml = NP.divide(NP.minus(record.activityPrice,record.eventPrice),record.activityPrice)
        ml =NP.times(ml, 100);
        ml =NP.round(ml, 2);
        ml =`${ml}%`
      }
      return <p>{ml}</p>
    }
  },
  {
    title: '活动最大可售卖数量',
    dataIndex: 'maxQty',
  },
  {
    title: '活动期间每人每单限购',
    dataIndex: 'perOrderLimit',
  },
  {
    title: '活动期间每人每天限购',
    dataIndex: 'perDayLimit',
  },
  {
    title: '活动期间每人每账号限购',
    dataIndex: 'perUserLimit',
  },
];
const columnsSingleGift = [
  {
    title: '序号',
    dataIndex: 'key'
  },
  {
    title: '商品编码',
    dataIndex: 'pdCode',
  },
  {
    title: '商品名称',
    dataIndex: 'pdName',
  },
  {
    title: '商品规格',
    dataIndex: 'pdSpec',
  },
  {
    title: '商品种类',
    dataIndex: 'pdKind',
    render:(text,record,index)=> {
      return <span>{
        pdKindOption.map((el,index)=>(
          <span key={index}>{el.key == record.pdKind&&el.value}</span>
        ))
      }</span>
    }
  },
  {
    title: '优惠内容',
    dataIndex: 'discount',
    width:'11%',
    render:(text,record,index) => {
      return <div>
      {
        record.promotionRules&&record.promotionRules.map((el,index)=> (
          <p key={index}>满{el.param.leastQty}件，送 {el.param.giftQty} 件</p>
        ))
      }
      </div>
    }
  },
  {
    title: '商品C端售价',
    dataIndex: 'sellPrice',
  },
  {
    title: '预计到手价',
    dataIndex: 'activityPrice',
    width:'12%',
    render:(text,record,index)=> {
      return <div>
      {
        record.promotionRules&&record.promotionRules.map((el,index)=> {
          let tot = NP.times(record.sellPrice, el.param.leastQty);
          let qtys = NP.plus(el.param.leastQty, el.param.giftQty);
          let dsj = NP.divide(tot,qtys);
          dsj =NP.round(dsj, 2);
          return <p key={index}>
                  {++index}级：¥{dsj}元
            </p>
        })
      }
      </div>
    }
  },
  {
    title: '预计毛利率',
    dataIndex: 'ml',
    width:'11%',
    render:(text,record,index)=> {
      return <div>
      {
        record.promotionRules&&record.promotionRules.map((el,index)=> {
          let tot = NP.times(record.sellPrice, el.param.leastQty);
          let qtys = NP.plus(el.param.leastQty, el.param.giftQty);
          let dsj = NP.divide(tot,qtys);
          dsj =NP.round(dsj, 2);
          let ml;
          if(!record.eventPrice) {
            ml = '-';
          } else {
            if(dsj == 0) {
              ml = '-';
            } else {
              ml = NP.divide(NP.minus(dsj, record.eventPrice),dsj);
              ml =NP.times(ml, 100);
              ml =NP.round(ml, 2);
              ml=`${ml}%`;
            }
          }
          return <p key={index}>
                  {++index}级：¥{ml}
            </p>
        })
      }
      </div>
    }
  },
  {
    title: '活动最大可售卖数量',
    dataIndex: 'maxQty',
  },
  {
    title: '活动期间每人每单限购',
    dataIndex: 'perOrderLimit',
  },
  {
    title: '活动期间每人每天限购',
    dataIndex: 'perDayLimit',
  },
  {
    title: '活动期间每人每账号限购',
    dataIndex: 'perUserLimit',
  },
];
const columnsAreaGift = [
  {
    title: '序号',
    dataIndex: 'key',
  },
  {
    title: '商品编码',
    dataIndex: 'pdCode',
  },
  {
    title: '商品名称',
    dataIndex: 'pdName',
  },
  {
    title: '商品规格',
    dataIndex: 'pdSpec',
  },
  {
    title: '商品种类',
    dataIndex: 'pdKind',
    render:(text,record,index)=> {
      return <span>{
        pdKindOption.map((el,index)=>(
          <span key={index}>{el.key == record.pdKind&&el.value}</span>
        ))
      }</span>
    }
  },
  {
    title: 'C端售价',
    dataIndex: 'sellPrice',
  },
  {
    title: '活动最大可售卖数量',
    dataIndex: 'maxQty',
  },
];
const columnsAreaMinus = [
  {
    title: '序号',
    dataIndex: 'key',
  },
  {
    title: '商品编码',
    dataIndex: 'pdCode',
  },
  {
    title: '商品名称',
    dataIndex: 'pdName',
  },
  {
    title: '商品规格',
    dataIndex: 'pdSpec',
  },
  {
    title: '商品种类',
    dataIndex: 'pdKind',
    render:(text,record,index)=> {
      return <span>{
        pdKindOption.map((el,index)=>(
          <span key={index}>{el.key == record.pdKind&&el.value}</span>
        ))
      }</span>
    }
  },
  {
    title: 'C端售价',
    dataIndex: 'sellPrice',
  },
  {
    title: '预计最低到手价',
    dataIndex: 'activityPrice',
    render:(text,record,index)=> {
      return <div>
      {
        record.promotionRules&&record.promotionRules.map((el,index)=> {
          let perc = NP.divide(el.param.reduceAmount, el.param.leastAmount);
          let dsj = NP.times(record.sellPrice, NP.minus(1, perc));
          dsj =NP.round(dsj, 2);
          return <p key={index}>{++index}级，{dsj}元</p>
        })
      }
      </div>
    }
  },
  {
    title: '预计最低毛利率',
    dataIndex: 'ml',
    render:(text,record,index)=> {
      return <div>
      {
        record.promotionRules&&record.promotionRules.map((el,index)=> {
          let perc = NP.divide(el.param.reduceAmount, el.param.leastAmount);
          let dsj = NP.times(record.sellPrice, NP.minus(1, perc));
          dsj =NP.round(dsj, 2);
          let ml;
          if(record.pdKind == 3) {
            ml = record.shareRatio;
            ml =NP.round(ml, 2);
            ml =`${ml}%`;
          }else if(!record.eventPrice) {
            ml='-';
          } else {
            if(dsj == 0) {
              ml='-';
            } else {
              ml = NP.divide(NP.minus(dsj, record.eventPrice),dsj);
              ml =NP.times(ml, 100);
              ml =NP.round(ml, 2);
              ml =`${ml}%`;
            }
          }
          return <p key={index}>{++index}级，{ml}</p>
        })
      }
      </div>
    }
  },
  {
    title: '活动最大可售卖数量',
    dataIndex: 'maxQty',
  },
];

export {
  columnsSingleDown,columnsSingleGift,columnsAreaGift,columnsAreaMinus
}
