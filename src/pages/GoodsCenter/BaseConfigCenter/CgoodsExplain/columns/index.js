const Columns1 = [{
     title: '简称',
     dataIndex: 'name',
     render:(text,record)=>{
       return(
          text && text.length>15
         ?
          <p>{text.slice(0,15)+'...'}</p>
         :
          <p>{text}</p>
       )
     }
   },{
     title: '详细说明',
     dataIndex: 'text',
     render:(text,record)=>{
       return(
          text && text.length>100
         ?
          <p>{text.slice(0,100)+'...'}</p>
         :
          <p>{text}</p>
       )
     }
   }, {
     title:'状态',
     dataIndex:'statusStr'
   },{
     title: '权重',
     dataIndex: 'rank'
   },{
     title: '最后修改人',
     dataIndex: 'userName'
   },{
     title: '操作',
     dataIndex: '',
     render:(text, record)=>{
       return(
         <div>
          <a className="theme-color" onClick={record.onOperateClick.bind(this)}>修改</a>
         </div>
       )
     }
 }];
 const Columns2 = [{
      title: '简称',
      dataIndex: 'name',
      render:(text,record)=>{
        return(
           text && text.length>15
          ?
           <p>{text.slice(0,15)+'...'}</p>
          :
           <p>{text}</p>
        )
      }
    },{
      title: '详细说明',
      dataIndex: 'text',
      render:(text,record)=>{
        return(
           text && text.length>100
          ?
           <p>{text.slice(0,100)+'...'}</p>
          :
           <p>{text}</p>
        )
      }
    }, {
      title:'状态',
      dataIndex:'statusStr'
    },{
      title: '权重',
      dataIndex: 'rank'
    },{
      title: '最后修改人',
      dataIndex: 'userName'
    }];
 export {Columns1,Columns2}
