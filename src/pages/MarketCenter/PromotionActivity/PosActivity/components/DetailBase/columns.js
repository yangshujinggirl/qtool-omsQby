const columnsCreatInfo =(dataSource)=>{
  return [{
      title: '活动预算',
      dataIndex: 'budget',
      width:'20%',
      render:(text,record,index) => {
        let chldrnDom = <span> {record.budget?`${record.budget}万元`:''} </span>
        const obj = {
          children: chldrnDom,
          props: {},
        };
        if (index === 0) {
          obj.props.rowSpan = dataSource.length;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    },{
      title: '承担方',
      dataIndex: 'bearerStr',
      width:'10%',
    },{
      title: '*承担比例',
      dataIndex: 'proportion',
      width:'30%',
      render:(text,record,index) => {
        return <span>{record.proportion}%</span>
      }
    },{
      title: '备注说明',
      dataIndex: 'remark',
      width:'40%',
    },
  ]
}
export  {columnsCreatInfo};
