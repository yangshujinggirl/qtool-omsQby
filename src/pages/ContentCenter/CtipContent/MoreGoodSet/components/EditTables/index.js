import { Table } from 'antd';
import { useState } from 'react';
import { Qbtn } from 'common';
import lodash from 'lodash';
// import './index.less';

const BaseEditTable=({...props})=> {
  let { dataSource, columns } =props;
  let newDataSource = lodash.cloneDeep(dataSource);
  let [key,setKey] = useState(newDataSource.length);
  const handleAdd=()=> {
    key++;
    setKey(key)
    newDataSource.push({ key });
    props.upDateList(newDataSource)
  }
  //删除
  const handleDelete=(index)=> {
    newDataSource.splice(index,1);
    props.upDateList(newDataSource)
  }
  //初始化删除columns
  const initColumns=()=> {
    let index = columns.findIndex((value,index) => {
      return value.key == 'delete';
    })
    if(newDataSource.length>1) {
      if(index == -1) {
        columns.push({
          title:'操作',
          key:'delete',
          width:'10%',
          align:'center',
          render:(text,record,index)=> {
            return <span
                    className="brandColor handle-delete"
                    onClick={()=>handleDelete(index)}>
                      删除
                   </span>
          }
        })
      }
    } else if(index !== -1){
      columns.splice(index,1);
    }
    return columns;
  }
  return <Table
          className="edit-table-component"
          footer={()=>{
            if(props.isAdd) {
              return  <Qbtn type="default" onClick={()=>handleAdd()}>+{props.btnText?props.btnText:'新增'}</Qbtn>
            } else {
              return null;
            }
          }}
          bordered
          pagination={false}
          columns={initColumns()}
          dataSource={newDataSource}/>
}

export default BaseEditTable;
