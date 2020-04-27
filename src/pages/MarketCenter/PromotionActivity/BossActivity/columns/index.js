import { Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import moment from 'moment';

const FormItem= Form.Item;

const Columns = [
  {
     title: '活动编号',
     dataIndex: 'no',
     render:(text, record)=>(
       <Link to={`/account/bossActivity/info/${record.activityId}`}>
          {text}
        </Link>
     )
   },{
     title: '活动名称',
     dataIndex: 'name'
   }, {
     title: '活动状态',
     dataIndex: 'statusStr'
   },{
     title: '最后修改人',
     dataIndex: 'lastUpdateUser'
   },{
     title: '活动时间',
     dataIndex: '',
     render:(text,record,index)=>(
       <div>{moment(record.beginTime).format('YYYY-MM-DD HH:mm')} ~ {moment(record.endTime).format('YYYY-MM-DD HH:mm')}</div>
     )
   },{
     title: '操作',
     render:(text,record,index)=>(
                <div>
                {
                  record.status == '0'&&
                  <div>
                    <Link to={`/account/bossActivity/add/${record.activityId}`}>
                       修改
                    </Link>
                    &nbsp;
                    <span className="pointerSty" onClick={() => record.onOperateClick('lose')}>
                       强制失效
                    </span>
                  </div>
                }
                </div>

     )
   }];
const ColumnsAdd =(onBlur, validatePrice)=> {
  return [
    {
      title: '商品编码',
      key:'pdCode',
      render:(text,record,index)=>{
        return(
          <FormItem name={['productList',index,'skuCode']} rules={[{required:true,message:'请输入商品编码'}]}>
            <Input
              placeholder='请输入商品编码'
              onBlur={(e)=>onBlur(e,index)}
              autoComplete='off'/>
          </FormItem>
        )
      }
    },{
      title: '商品名称',
      key:'name',
      dataIndex: 'productName',
    },{
      title: '商品规格',
      dataIndex: 'salesAttributeName',
    },{
      title: '供价',
      dataIndex: 'businessPrice',
    },{
      title: '活动供价',
      key:'activitySupplyPrice',
      dataIndex: 'activitySupplyPrice',
      render:(text,record,index)=>{
        const validatePrice=(rule,value)=> {
          if(value){
            if(Number(value) > Number( record.businessPrice ) || Number(value) == Number( record.businessPrice ) ){
                return Promise.reject('活动供价超过或等于供价，请谨慎填写');
            };
          };
          return Promise.resolve();
        };
        return(
          <FormItem
            name={['productList',index,'activitySupplyPrice']}
            rules={[
              {required:true,message:'请输入活动供价'},
              {pattern:/^[1-9]\d*\.\d{1,2}$|0\.[1-9]\d{0,1}$|0\.0[1-9]{1}$|^[1-9]\d*$/,message:'大于0的2位小数'},
              {validator:validatePrice}
            ]}>
            <Input placeholder='请输入活动供价' autoComplete='off'/>
          </FormItem>
        )
      }
    }];
}
const ColumnsGoodsInfo = [
  {
   title: '商品编码',
   dataIndex: 'skuCode',
   key:'1'
 }, {
   title: '商品名称',
   dataIndex: 'productName',
   key:'2'
 }, {
   title: '规格',
   dataIndex: 'salesAttributeName',
   key:'3'
 }, {
   title: '供价',
   dataIndex: 'businessPrice',
   key:'4'
 },{
   title: '活动供价',
   dataIndex: 'activitySupplyPrice',
   key:'6'
 }];
const ColumnsLog = [
  {
   title: '操作',
   dataIndex: 'action',
   key:'1'
 },{
   title: '操作描述',
   dataIndex: 'remark',
   key:'2'
 }, {
   title: '操作时间',
   dataIndex: 'createTime',
   key:'3'
 }, {
   title: '操作人',
   dataIndex: 'operateUser',
   key:'4'
 }];

 export  { Columns, ColumnsGoodsInfo, ColumnsLog, ColumnsAdd }
