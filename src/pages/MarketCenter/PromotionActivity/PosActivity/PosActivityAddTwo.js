import { Spin, Modal, Card, Form } from 'antd';
import { useEffect, useState } from 'react';
import { QupLoadAndDownLoad, Qmessage, Qbtn, Qtable } from 'common';
import { Sessions } from 'utils';
import { GetAuditApi, GetSaveGoodsApi, GetGoodsInfoApi } from 'api/marketCenter/PosActivity';
import StepMod from '../components/StepMod';
import EditModal from './components/EditModal';
import columnsAdd from './columns';

const CtipActivityAddTwo=({...props})=> {
  const [form] = Form.useForm();
  let [products,setProducts] = useState([]);
  let [currentdata,setCurrentdata] = useState({});
  let [visible, setVisible] = useState(false);
  let [currentItem, setCurrentItem] = useState({});
  let promotionId = props.match.params.id;

  const staticPar =()=> {
    let { state } = props.location;
    if(state) {
      Sessions.set("currentdata",JSON.stringify(state));
    }
  }
  //获取商品信息
  const initPage=()=>{
    GetGoodsInfoApi(promotionId)
    .then((res)=> {
      let { promotionProducts } =res.result;
      promotionProducts&&promotionProducts.map((el,index)=>el.key=index);
      countProfitRate(promotionProducts);
      setCurrentdata(JSON.parse(Sessions.get("currentdata")))
    })
  }
  const countProfitRate=(promotionProducts)=> {
    promotionProducts&&promotionProducts.map(item=>{
      //一般贸易商品（包括品牌直供商品）：C端活动单品毛利率=（活动价-B端活动售价）/ 活动价
      if(item.pdKind == 1||item.pdKind == 2){ //一般贸易和直供
        if(Number(item.eventPrice) && Number(item.activityPrice)){
          item.profitRate = (((item.activityPrice-item.eventPrice)/item.activityPrice)*100).toFixed(2);
        }else{
          item.profitRate = '';
        };
      };
      if(item.pdKind == 3){//保税商品：C端毛利率=分成比例
        item.profitRate = item.shareRatio;
      };
    });
    setProducts(promotionProducts);
  }
  //上传文件
  const upDateFieList=(response)=> {
    let {
      promotionProducts,successSize,
      noPro,priceGapWrong,
      huchiWrong,requiredWrong,repeatWrong
    } = response.result;
    Modal.success({
      title: "",
      content: (
        <div>
          <p className='import_error'>共成功导入商品  {successSize}  条</p>
          {noPro.length>0 && (
            <p  className='import_error'>
              {noPro.map(
                (item, index) =>`${item}${index == noPro.length - 1 ? "" : "/ "}`
              )} 商品不存在
            </p>
          )}
          {priceGapWrong.length>0 && (
            <p className='import_error'>
              {priceGapWrong.map(
                (item, index) =>`${item}${index == priceGapWrong.length - 1 ? "" : "/ "}`
              )} 商品填写格式错误
            </p>
          )}
           {huchiWrong.length>0 && (
            <p className='import_error'>
              {huchiWrong.map(
                (item, index) =>`${item}${index == huchiWrong.length - 1 ? "" : "/ "}`
              )}
              商品已参加其他和此活动互斥的活动
            </p>
          )}
          {requiredWrong.length>0 && (
            <p className='import_error'>
              {requiredWrong.map(
                (item, index) =>`${item}${index == requiredWrong.length - 1 ? "" : "/ "}`
              )} 必填项未填写完整
            </p>
          )}
          {repeatWrong.length>0 && (
            <p className='import_error'>
              {repeatWrong.map(
                (item, index) =>`${item}${index == repeatWrong.length - 1 ? "" : "/ "}`
              )} 商品重复
            </p>
          )}
        </div>
      ),
      footer: null
    });
    promotionProducts=promotionProducts?promotionProducts:[]
    promotionProducts.map((el,index)=>el.key=index);
    setProducts(promotionProducts);
  }
  //更新商品列表
  const upDateProductList=(array)=> {
    setProducts(array)
  }
  const goback=()=> {
    props.history.push(`/account/posActivity/add/${promotionId}`)
  }
  const onOperateClick=(record,type)=> {
    let handIndex = products.findIndex((el)=>el.pdCode==record.pdCode);
    switch(type){
      case "delete":
        handleDelete(handIndex);
        break;
      case "edit":
        handleEdit(record,handIndex);
        break;
    }
  }
  //编辑
  const handleEdit = (record,index) => {
    record = {...record,index};
    setCurrentItem(record);
    setVisible(true);
  };
  //删除
  const handleDelete = (index) => {
    Modal.confirm({
      title: '是否删除此商品?',
      content: '是否删除此商品?',
      okText:"确认删除",
      cancelText:"暂不删除",
      onOk() {
        products.splice(index, 1);
        products=[...products]
        setProducts(products);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const onCancel = () => { setVisible(false)};
  //保存
  const handSubmit = async(type) => {
    const { promotionType } = currentdata;
    if (products.length == 0) {
      Qmessage.error("请至少添加一个活动商品");
      return
    };
    let values = { promotionId, promotionType, promotionProducts: products };
    values.promotionRules = products;
    GetSaveGoodsApi(values)
    .then(res => {
      let {result} =res;
      if (type == "audit") {
        Qmessage.success("提交审核成功");
        GetAuditApi({promotionId})
        .then(res=>{
          props.history.push({pathname:`/account/posAudit/edit/${promotionId}/${res.result}`})
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
  const { promotionType,...paramsVal } = currentdata;
  const dataParams={ ...paramsVal, type:promotionType, promotionId }
  return (
    <Spin tip="加载中..." spinning={false}>
      <div className="oms-common-addEdit-pages ctipActivity-addEdit-pages">
        <StepMod step={1}/>
        <Form form={form}>
          <Card title="选择商品">
            <div>
              <QupLoadAndDownLoad
                data={dataParams}
                fileName="activityPos"
                action="/qtoolsErp/import/excel"
                upDateList={upDateFieList}>
                <span>注：导入为覆盖导入，即第二次导入的商品将覆盖前一次导入的所有商品</span>
              </QupLoadAndDownLoad>
              <Qtable
                scroll={{ x: 140 }}
                columns={columnsAdd}
                onOperateClick={onOperateClick}
                dataSource={products}/>
              <EditModal
                upDateList={upDateProductList}
                dataSource={products}
                form={form}
                visible={visible}
                record={currentItem}
                onCancel={onCancel}/>
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
