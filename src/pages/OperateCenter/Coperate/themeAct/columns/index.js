const Columns = [{
     title: '主题名称',
     dataIndex: 'themeName',

   },{
    title: '主题活动ID',
    dataIndex: 'themeActivityId'
   },{
     title: '主题状态',
     dataIndex: 'themeStatusStr'
   },{
     title: '预览链接',
     dataIndex: 'previewLink',
     render:(text, record)=>{
       const currentUrl = window.location.host;
       const url = 'http://'+currentUrl+'/config.html?pdConfigureId='+record.pdConfigureId;
       return(
         <div>
           <a
             target='_blank'
             className='theme-color'
             href={url}>
             {text}
           </a>
         </div>
     )}
   },{
     title: '创建时间',
     dataIndex: 'createTime'
   },{
     title: '最后修改人',
     dataIndex: 'operator'
   },{
     title: '操作',
     dataIndex: '',
     render:(text,record,index)=>{
       return(
         <div>
          <a className='theme-color' onClick={record.onOperateClick.bind(this,'edit')}>修改</a>
          {
            record.themeStatus == '4' 
            ?
              <a className='theme-color' onClick={record.onOperateClick.bind(this,'offline')}>　下线</a>
            :
              <a className='theme-color' onClick={record.onOperateClick.bind(this,'online')}>　上线</a>
          }
         </div>
       )
     }
   }];

 export default Columns
