import '@ant-design/compatible/assets/index.css';
import { Spin,Form, Card } from 'antd';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Qtable, Qbtn, Qmessage, QbaseInfo } from 'common';
import { GetDetailApi } from 'api/home/SupplierManage';
import { cooperationStatus, accountsType } from './options';

const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    };

const SupplierManageInfo=({...props})=> {
  const supplierId = props.match.params.id;
  const [totalData, setTotal] = useState({cooperationStatus:1});
  useEffect(()=>{
      GetDetailApi({supplierId})
      .then((res)=> {
        const { result } =res;
        setTotal(result)
      })
  },[supplierId])
  let cooperationVal=cooperationStatus.map((el) =>{
    if(el.key == totalData.cooperationStatus) {
      return el.value
    }
  })
  let accountsTypeVal=accountsType.map((el) =>{
    if(el.key == totalData.accountsType) {
      return el.value
    }
  })
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages">
        <Card title="基础信息">
          <QbaseInfo
            colSpan={24}
            dataInfo={[
              {key:'供应商名称',value:totalData.name},
              {key:'供应商简称',value:totalData.shortName},
              {key:'联系人',value:totalData.edName},
              {key:'联系电话',value:totalData.tel},
              {key:'开户银行',value:totalData.bank},
              {key:'银行卡号',value:totalData.bankCard},
              {key:'开户名',value:totalData.bankUserName},
              {key:'账期类型',value:`${accountsTypeVal}${accountsType!=1?`${totalData.accountsDay}个工作日`:null}`},
              {key:'合作状态',value:cooperationVal},
              {key:'供应商备注',value:totalData.remark},
            ]}/>
        </Card>
      </div>
    </Spin>
  );
}

export default SupplierManageInfo;
