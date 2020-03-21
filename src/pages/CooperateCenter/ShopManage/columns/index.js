import {Link} from 'react-router-dom'
const Columns = [{
    title: '门店名称',
    dataIndex: 'name',
    render: (text, record) => {
        return (
        <Link to={`/account/shopManage_infos`}>{text}</Link>
        );
    }
}, {
    title: '门店电话',
    dataIndex: 'mobile'
},{
    title: '店主姓名',
    dataIndex: 'shopman'
},{
    title: '门店状态',
    dataIndex: 'statusStr'
},{
    title: '门店类型',
    dataIndex: 'shopTypeStr'
},{
    title: '所在城市',
    dataIndex: 'provinces'
},{
    title: '账户余额',
    dataIndex: 'amount'
},{
    title: '门店积分',
    dataIndex: 'toDeductTotalPoints'
},{
    title: '操作',
    dataIndex: 'opation',
    render: (text, record) => {
        return (
        <Link to={`/account/shopManage_edit/`}><span>修改</span></Link>
        );
    }
}]
export default Columns;
