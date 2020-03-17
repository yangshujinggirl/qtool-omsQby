import moment from 'moment'
const Columns = [{
  title: '提现单号',
  dataIndex: 'carryCashNo',
  render:(text, record)=>{
    return(
      <div>
        <a
          href="javascript:;"
          className="theme-color"
          onClick={record.onOperateClick.bind(this,'detail')}>
          {text}
        </a>
      </div>
    )
  }
},{
  title: '门店名称',
  dataIndex: 'shopName',
}, {
  title: '提现金额',
  dataIndex: 'amount'
},{
  title: '提现时间',
  dataIndex: 'createTime',
  render:(text)=>(
    <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
  )
},{
  title: '审核状态',
  dataIndex: 'statusStr',
  render:(text, record)=>{
    return(
      record.status == 0
      ?
        <div>
          <a
            href="javascript:;"
            className="theme-color"
            onClick={record.onOperateClick.bind(this,'edit')}>
            {text}
          </a>
        </div>
      :<div>{text}</div>
   )
  }
},{
  title: '付款状态',
  dataIndex: 'payStatusStr'
}
];
export default Columns
