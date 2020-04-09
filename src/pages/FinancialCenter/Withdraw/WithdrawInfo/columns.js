import moment from 'moment'
const Columns = [
  {
    title: "操作",
    dataIndex: "operateName",
    key: "1"
  },
  {
    title: "操作时间",
    dataIndex: "operateTime",
    render:(text)=>(
    <span>{text&&moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
    ),
    key: "2"
  },
  {
    title: "操作人",
    dataIndex: "operateUser",
    key: "3"
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "4"
  }
];
export default Columns;
