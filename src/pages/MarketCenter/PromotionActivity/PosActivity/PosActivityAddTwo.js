import { Spin, Card, Form } from 'antd';
import { useEffect, useState } from 'react';
import { Qmessage, Qbtn } from 'common';
import { Sessions } from 'utils';
import { GetAuditApi, GetSaveGoodsApi, GetGoodsInfoApi } from 'api/marketCenter/PosActivity';
import ExportFile from "./components/ExportFile";
import GoodsTable from "./components/GoodsTable";
import StepMod from '../components/StepMod';

const CtipActivityAddTwo=({...props})=> {
  const [form] = Form.useForm();
  let [products,setProducts] = useState([]);
  let [currentdata,setCurrentdata] = useState({});
  let promotionId = props.match.params.id;

  const staticPar =()=> {
    let { state } = props.location;
    if(state) {
      Sessions.set("currentdata",JSON.stringify(state));
    }
  }
  const initPage=()=>{
    GetGoodsInfoApi(promotionId)
    .then((res)=> {
      let { promotionProducts } =res.result;
      setProducts(promotionProducts);
      setCurrentdata(JSON.parse(Sessions.get("currentdata")))
    })
  }
  const upDateProductList=(array)=> {
    setProducts(array)
  }
  const goback=()=> {
    props.history.push(`/account/ctipActivity/add/${promotionId}`)
  }
  //保存并预览
  const handSubmit = async(type) => {
    try {
      let values = await form.validateFields();
      sendQequest(type);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  //发送请求
  const sendQequest = type => {
    const { promotionId, promotionType,pdScope } = currentdata;
    const { goodLists } = this.props;
    if (products.length == 0) {
      Qmessage.error("请至少添加一个活动商品");
      return
    };
    let values = { promotionId, promotionType, promotionProducts: products };
    values.promotionRules = products;
    GetSaveGoodsApi(values)
    .then(res => {
      if (type == "audit") {
        Qmessage.success("提交审核成功");
        GetAuditApi({promotionId})
        .then(res=>{
          props.history.push(`/account/pos_preferential_promotion`) //回到列表页
        });
      };
      if (type == "save") {//回到查看页
        props.history.push(`/account/posActivity/info/${promotionId}`)
      };
    });
  };

  useEffect(()=>{ initPage() },[promotionId]);
  useEffect(()=>{
    staticPar();
    return ()=>{ Sessions.remove('currentdata') }
  },[]);
  const { pdScope, promotionType, beginTime, endTime, pdKind } = currentdata;
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages ctipActivity-addEdit-pages">
        <StepMod step={1}/>
        <Form form={form}>
          <Card title="选择商品">
            <div>
              <ExportFile
                upDateList={upDateProductList}
                currentdata={currentdata}
                promotionId={promotionId}/>
              <GoodsTable dataSource={products} currentdata={currentdata}/>
            </div>
          </Card>
        </Form>
        <div className="handle-operate-save-action">
          <Qbtn onClick={goback}> 上一步 </Qbtn>
          <Qbtn size="free" onClick={()=>handSubmit('save')}>保存并预览</Qbtn>
          <Qbtn size="free" onClick={()=>handSubmit('audit')}>保存并提交审核</Qbtn>
        </div>
      </div>
    </Spin>
  );
}

export default CtipActivityAddTwo;
