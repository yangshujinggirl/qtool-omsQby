import {Link} from 'react-router-dom'
const Columns = [{
    title: '门店名称',
    dataIndex: 'channelName',
    render: (text, record) => {
        return (
        <Link to={`/account/shopManage_infos/${record.id}`}>{text}</Link>
        );
    }
}, {
    title: '门店店主',
    dataIndex: 'channelPhone'
},{
    title: '门店联系电话',
    dataIndex: 'person'
},{
    title: '门店类型',
    dataIndex: 'channelType',
    render:(text,record,index)=>(
        <span>{text==1?'直营店':(text==2?'联营店':(text==3?'加盟店':(text==4?'APP':'小程序')))}</span>
    )
},{
    title: '营业状态',
    dataIndex: 'channelStatus',
    render:(text,record,index)=>(
        <span>{text==1?'开业中':(text==2?'待开业':'关业中')}</span>
    )
},{
    title: '所在地区',
    dataIndex: 'provinces',
    render:(text,record,index)=>(
    <span>{record.shProvince}{record.shCity}{record.shArea}</span>
    )
},{
    title: '账户余额',
    dataIndex: 'amount'
},{
    title: '门店积分',
    dataIndex: 'score'
},{
    title: '创建人',
    dataIndex: 'toDeductTotalPoints'
},{
    title: '最后修改人',
    dataIndex: 'toDeductTotalPoints'
},{
    title: '操作',
    dataIndex: 'opation',
    render: (text, record) => {
        return (
        <Link to={`/account/shopManage_edit/${record.id}`}><span>修改</span></Link>
        );
    }
}]
export default Columns;
