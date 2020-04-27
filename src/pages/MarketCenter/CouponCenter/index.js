
import { Table, Modal, Form, Spin, Button } from "antd";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Columns } from './columns';
import { Qmessage, Qpagination, Qbtn, Qtable} from "common";
import FilterForm from './components/FilterForm'
import { GetListApi, GetInjectApi, GetAddNumApi, GetBreakApi } from "api/marketCenter/CouponCenter";
import AddModal from './components/AddModal';
import InjectModal from './components/InjectModal';

const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };

const CouponCenter=({...props})=> {
  const [form] = Form.useForm();
  let [dataSource,setDataSource] =useState([]);
  const [fields,setFields]=useState({});
  const [loading,setLoading] =useState([]);
  const [visible,setVisible] =useState(false);
  const [visibleInject,setVisibleInject] =useState(false);
  const [currentItem,setCurrentItem] =useState({});
  const [dataPagation,setDataPagation] =useState({everyPage:15, currentPage:1, total:0});
  //查询列表
  const searchList=(values)=> {
    setLoading(true)
    let params={...fields,everyPage:dataPagation.everyPage,currentPage:dataPagation.currentPage};
    if(values) {
      params = {...params,...values};
    }
    GetListApi(params)
    .then((res)=> {
      let { result, everyPage, currentPage, total } =res.result;
      result = result?result:[];
      result.map((el,index)=>el.key = index);
      setDataSource(result);
      setDataPagation({everyPage,currentPage,total});
      setLoading(false)
    },(err)=> {
      setLoading(false)
    })
  }
  const successCallback=()=> {
    searchList()
  }
  const changePage = (currentPage, everyPage) => {
    searchList(currentPage, everyPage)
  };
  const onShowSizeChange = (currentPage, everyPage) => {
    searchList(currentPage, everyPage)
  };
  const onSubmit = params => {
    setFields(params)
  };
  const goAdd=()=> {
    props.history.push('/account/coupon/add')
  }
  //操作区
  const handleOperateClick=(record, type)=> {
    switch (type) {
      case "supplyAgain":
        goSupply(record);
        break;
      case "fusing":
        goFus(record);
        break;
      case "logoutTic":
        setCurrentItem(record);
        setVisibleInject(true)
        break;
    }
  }
  //熔断
  const goFus = record => {
    Modal.confirm({
      content: '你正在熔断代金券',
      okText:"确认熔断",
      cancelText:"暂不熔断",
      onOk() {
        GetBreakApi(record.couponId)
        .then(res => {
          Qmessage.success("熔断成功");
          searchList();
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  //追加
  const goSupply = record => {
    setCurrentItem(record);
    setVisible(true)
  };
  //确认追加
  const onOkSupply=(value)=> {
    GetAddNumApi({srcCouponId:currentItem.couponId,...value})
    .then((res)=> {
      Qmessage.success('追加成功');
      onCancelSupply()
    })
  }
  const onCancelSupply=()=> {
    form.resetFields(['couponCount']);
    setCurrentItem({})
    setVisible(false)
  }
  //注券
  const onOkInject=(value)=> {
    let params={
      ...value,
      couponCode:currentItem.couponCode
    }
    GetInjectApi(params)
    .then((res)=> {
      Qmessage.success('注券成功');
      onCancelInject()
    })
  }
  const onCancelInject=()=> {
    form.resetFields(['userMobiles','resonance'])
    setCurrentItem({})
    setVisibleInject(false)
  }
  useEffect(()=>{searchList()},[fields]);

  return(
    <Spin tip="加载中..." spinning={loading}>
      <div className="oms-common-index-pages-wrap">
        <FilterForm onSubmit={onSubmit}/>
        <div className="handle-operate-btn-action">
          <Qbtn size="free" onClick={goAdd}>创建优惠券</Qbtn>
          <Qbtn size="free"><Link to="/account/couponRecord">注券记录</Link></Qbtn>
        </div>
        <Qtable
          columns={Columns}
          dataSource={dataSource}
          onOperateClick={handleOperateClick}
        />
        {
          dataSource.length>0&&
          <Qpagination
            data={dataPagation}
            onChange={changePage}
            onShowSizeChange={onShowSizeChange}/>
        }
    </div>
    <Form form={form} {...formItemLayout}>
      <AddModal
        form={form}
        visible={visible}
        onOk={onOkSupply}
        onCancel={onCancelSupply}/>
      <InjectModal
        form={form}
        record={currentItem}
        visible={visibleInject}
        onOk={onOkInject}
        onCancel={onCancelInject}/>
    </Form>
  </Spin>
  )
}
export default CouponCenter;
