import {Link} from "react-router-dom";
import moment from 'moment'
const Columns = [{
    title: '会员姓名',
    dataIndex: 'name'
}, {
    title: '会员电话',
    dataIndex: 'mobile'
},{
    title: '会员卡号',
    dataIndex: 'cardNo'
},{
    title: '会员门店',
    dataIndex: 'spShopName'
},{
    title: '会员级别',
    dataIndex: 'levelStr'
}, {
    title: '账户余额',
    dataIndex: 'amount'
},
{
    title: '会员积分',
    dataIndex: 'point'
},
{
    title: '最近使用时间',
    dataIndex: 'lastActiveTime',
    render: (text, record, index) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
},{
    title: '消费记录',
    dataIndex: 'opation',
    render: (text, record) => {
        return (
            <Link to={`/account/posDetail/${record.mbCardId}`}/>
        );
    }
}
];
export default Columns;
