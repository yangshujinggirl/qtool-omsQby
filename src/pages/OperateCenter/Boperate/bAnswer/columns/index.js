import {Link} from 'react-router-dom'
import moment from 'moment'
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
     dataIndex: 'updateTime',
     render:(text)=>(
       <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
     )
   },{
     title: '操作',
     dataIndex: 'name',
     render:(text, record)=>{
       return(
         <div>
         {
           <Link
             to={`/account/add_b_answer/${record.pdAnswerId}`}>
             修改
           </Link>
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
