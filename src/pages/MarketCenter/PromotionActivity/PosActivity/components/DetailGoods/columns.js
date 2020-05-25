import NP from 'number-precision';
import { pdKindOption } from '../../../components/optionMap';
const columnsSingleDown = [
  {
    title: '序号',
    dataIndex: 'key',
    render:(text,record,index)=> {
      return index++;
    }
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
  }];

export {
  columnsSingleDown
}
