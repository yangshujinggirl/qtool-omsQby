import { Input, Form, Select, Button, DatePicker } from "antd";
import { Link } from 'react-router-dom';

const Columns = [{
     title: '优惠券批次号',
     dataIndex: 'couponCode',
   },{
     title: '优惠券名称',
     dataIndex: 'couponName'
   }, {
     title: '优惠券场景',
     dataIndex: 'couponUseSceneStr'
   },{
     title: '优惠券金额',
     dataIndex: 'couponMoney'
   },{
     title: '使用门槛',
     dataIndex: 'couponFullAmount'
   },{
     title: '用户手机',
     dataIndex: 'userMobile'
   },{
     title: '注券人',
     dataIndex: 'voucher'
   },{
     title: '注券状态',
     dataIndex: 'voucherStatusStr'
   },{
     title: '注券时间',
     dataIndex: 'createTime'
   }
 ];


export { Columns };
