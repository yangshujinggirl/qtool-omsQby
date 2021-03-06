import React, {useEffect, useState} from "react";
import {Card} from "antd";
import {QbaseInfo, Qtable} from "common/index";
import moment from "moment";
import {OrderLogsColumns, GoodsColumns} from "./column";
import { GetInfoApi, GetLogInfoApi } from "api/home/OrderCenter/Border/ShopReturnOrder";

const ShopReturnOrderDetail = (props) => {
    const [goodsList, setGoodsList] = useState([]);
    const [logList, setLogList] = useState([]);
    const [dataInfo, setDataInfo] = useState({});
    const {id} = props.match.params;
    const getInfo=()=> {
      GetInfoApi({reOrderNo:id})
      .then((res)=> {
        let { detailList, ...values} =res.result;
        detailList=detailList?detailList:[];
        detailList.map((el,index)=>el.key=index);
        setDataInfo(values)
        setGoodsList(detailList)
      })
      GetLogInfoApi({no:id})
      .then((res)=> {
        let { result } =res;
        setLogList(result)
      })
    }
    useEffect(() => { getInfo() }, []);
    let baseData = [
      {key:"退货单号", value:dataInfo.reOrderNo},
      {key:"关联门店订单", value:dataInfo.channelOrderNo},
      {key:"退货门店", value:dataInfo.channelName},
      {key:"退货原因", value:dataInfo.reason},
      {key:"订单状态", value:dataInfo.statusStr},
      {key:"退单类型", value:dataInfo.typeStr},
      {key:"申请数量", value:dataInfo.returnQty},
      {key:"到货数量", value:dataInfo.itemCount},
      {key:"到货商品金额", value:dataInfo.reArriveAmount},
      {key:"实退金额", value:dataInfo.reArriveAmount},
      {key:"订单创建人", value:dataInfo.createBy},
      {key:"创建时间", value:moment(dataInfo.createTime).format("YYYY-MM-DD HH:mm:ss")},
      {key:"订单备注", value:dataInfo.remarkes},
    ];
    if(dataInfo.type == 1) {
      let sra = [
        {key:"收货仓库", value:dataInfo.warehouseName},
        {key:"发货快递", value:dataInfo.courierCompany},
        {key:"快递单号", value:dataInfo.expressNo},
        {key:"快递费用", value:dataInfo.rePostage},
      ]
      baseData = [...baseData,...sra]
    }

    return (
        <div className="oms-common-addEdit-pages bgood_add">
            <Card title="门店退单信息">
                <QbaseInfo dataInfo={baseData}/>
            </Card>
            <Card title="退货商品">
                <Qtable columns={GoodsColumns} dataSource={goodsList}/>
            </Card>
            <Card title="退单日志">
                <Qtable columns={OrderLogsColumns} dataSource={logList}/>
            </Card>
        </div>
    )
};
export default ShopReturnOrderDetail
