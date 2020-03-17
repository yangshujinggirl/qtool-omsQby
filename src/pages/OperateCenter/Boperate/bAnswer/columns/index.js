const Columns = [{
     title: '问答标题',
     dataIndex: 'title',
     render:(text,record)=>{
       return(
         text.length>15
         ?
          <p>{text.slice(0,15)+'...'}</p>
         :
          <p>{text}</p>
       )
     }
   },{
     title: '问题类型',
     dataIndex: 'typeStr',
   }, {
     title: '问答状态',
     dataIndex: 'statusStr'
   },{
     title: '最后修改人',
     dataIndex: 'userName'
   },{
     title: '最后修改时间',
     dataIndex: 'updateTime'
   },{
     title: '操作',
     dataIndex: 'name',
     render:(text, record)=>{
       return(
         <div>
         {
           <a
             href="javascript:;"
             className="theme-color"
             onClick={record.onOperateClick.bind(this)}>
             修改
           </a>
         }
         </div>
       )
     }
   }];
   const Columns2 = [{
        title: '问答标题',
        dataIndex: 'title',
        render:(text,record)=>{
          return(
            text.length>15
            ?
             <p>{text.slice(0,15)+'...'}</p>
            :
             <p>{text}</p>
          )
        }
      },{
        title: '问题类型',
        dataIndex: 'typeStr',
      }, {
        title: '问答状态',
        dataIndex: 'statusStr'
      },{
        title: '最后修改人',
        dataIndex: 'userName'
      },{
        title: '最后修改时间',
        dataIndex: 'updateTime'
      }];
export { Columns,Columns2 }
