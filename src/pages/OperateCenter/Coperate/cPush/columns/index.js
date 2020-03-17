const Columns = [{
     title: '推送标题',
     dataIndex: 'title',
     render:(text, record)=>{
       return(
         <div>
           <a href="javascript:;" className="theme-color" onClick={record.onOperateClick.bind(this,'detail')}>{text}</a>
         </div>
       )
     }
   },{
     title: '推送类型',
     dataIndex: 'alertTypeStr'
   }, {
     title: '推送人群',
     dataIndex: 'pushMan'
   },{
     title: '创建人',
     dataIndex: 'creater'
   },{
     title: '推送状态',
     dataIndex: 'statusStr'
   },{
     title: '推送时间',
     dataIndex: 'pushTime'
   },{
     title: '操作',
     dataIndex: '',
     render:(text, record)=>{
       return(
         <div>
         <a href="javascript:;"
           className="theme-color"
           onClick={record.onOperateClick.bind(this,'edit')}>
           {record.status==10?'修改':null}
         </a>
         </div>
       )
     }
 }];



 export default Columns
