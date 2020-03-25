import { Link } from 'react-router-dom';
const Columns = [{
     title: '活动编号',
     dataIndex: 'no',
     render:(text, record)=>(
       <Link to={`/account/bossActivity/info/${record.promotionId}`}>
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
       <div>{record.beginTime} ~ {record.endTime}</div>
     )
   },{
     title: '操作',
     render:(text,record,index)=>(
       (record.status == '0' && record.addbActPrice)&&
              <Link
                 className="link-color action-left"
                 to={`/account/bossActivity/edit/${record.promotionId}`}>
                 修改
               </Link>
     )
   }];
const ColumnsAdd = [{
     title: '活动编号',
     dataIndex: 'no',
     render:(text, record)=>(
       <Link to={`/account/bossActivity/info/${record.promotionId}`}>
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
       <div>{record.beginTime} ~ {record.endTime}</div>
     )
   },{
     title: '操作',
     render:(text,record,index)=>(
       (record.status == '0' && record.addbActPrice)&&
              <Link
                 className="link-color action-left"
                 to={`/account/bossActivity/edit/${record.promotionId}`}>
                 修改
               </Link>
     )
   }];

 export  { Columns, ColumnsAdd }
