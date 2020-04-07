
const Columns = [{
    title: '用户id',
    dataIndex: 'userId',
  },{
    title: 'Qtools昵称',
    dataIndex: 'name'
  },{
    title: '手机号',
    dataIndex: 'mobile',
  },{
   title: '用户等级',
   dataIndex: 'memberLevel',
   render:(text,record,index)=>(
   <span>Lv{text}</span>
   )
 },{
   title: '当前成长值',
   dataIndex: 'growthValue',
 },{
    title: '注册时间',
    dataIndex: 'createTime',
  },{
    title: '首次绑定手机号时间',
    dataIndex: 'bindingMobileTime'
  },{
    title: '最近一次消费时间',
    dataIndex: 'latelyOrderTime'
  },{
    title: '累积消费金额',
    dataIndex: 'amountSum'
  },{
    title: '累计购买次数',
    dataIndex: 'purchaseTimes'
  }];
  export  default Columns
