import { Spin, Card, Form } from 'antd';
import { useEffect, useState } from 'react';
import { Qbtn, Qtable, Qmessage } from 'common';
import { Sessions } from 'utils';
import { GetSaveActivApi, GetDiscountInfoApi } from 'api/marketCenter/CtipActivity';
import SetTitle from './components/SetGoods/Title';
import ExportFile from "./components/SetGoods/ExportFile";
// import SetGoods from "./components/SetGoods/GoodsTable";
import DiscountOne from "./components/SetGoods/DiscountOne";
import DiscountTwo from "./components/SetGoods/DiscountTwo";
import StepMod from '../components/StepMod';
import EditModal from "./components/SetGoods/EditModal";
import {InitColumns} from './columns';

const CtipActivityAddTwo=({...props})=> {
  const [form] = Form.useForm();
  let [proRules,setRules] = useState([]);
  let [products,setProducts] = useState([]);
  let [currentdata,setCurrentdata] = useState({});
  let [singleRules,setSingleRules] = useState([]);//单行满件赠规则
  let [visible, setVisible] = useState(false);
  let [currentItem, setCurrentItem] = useState({});
  let promotionId = props.match.params.id;

  const staticPar =()=> {
    let { state } = props.location;
    if(state) {
      Sessions.set("currentdata",JSON.stringify(state));
    }
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
  const initPage=()=>{
    GetDiscountInfoApi(promotionId)
    .then((res)=> {
      let { promotionRules, promotionType, promotionProducts} = res.result;
      if(promotionRules.length == 0){
        switch(promotionType){
          case 20:
            promotionRules =[{param:{leastAmount:''},promotionGifts:[]}];
            break;
          case 21:
            promotionRules =[{param:{leastQty:''},promotionGifts:[]}];
            break;
          case 22:
            promotionRules =[{param:{leastAmount:'',reduceAmount:''}}];
            break;
          case 23:
            promotionRules =[{param:{leastQty:'',reduceQty:''}}];
            break;
        };
      };
      switch(promotionType) {
        case 10://单品直降
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
          break;
        case 11://单品满件赠
          promotionProducts&&promotionProducts.map(item=>{
            let [arr1,arr2] = [[],[]];
            item.promotionRules&&item.promotionRules.map(subItem=>{
              //预计到手价=C端售价*优惠门槛/（优惠门槛+赠品数量）
              const price = (Number(item.sellPrice)*(Number(subItem.param.leastQty))/(Number(subItem.param.leastQty)+Number(subItem.param.giftQty))).toFixed(2);
              //毛利率=（到手价-B端活动售价）/ 到手价
              let rate = '';
              if(Number(item.eventPrice) && Number(price)){
                rate = (((Number(price)-Number(item.eventPrice))/Number(price))*100).toFixed(2);
              }else{
                rate = ''
              };
              let obj = {color:'#000000a6'}
              if(rate< 0){
                obj={color:'red'}
              };
              arr1.push({price,...obj});
              arr2.push({rate,...obj});
            });
            item.handsPrice = arr1;
            item.profitRate = arr2
          });
          break;
        case 22://专区满元减
          promotionProducts && promotionProducts.length>0&& promotionProducts.map(item=>{
            let [arr1,arr2] = [[],[]];
            state.dataSource && state.dataSource.length>0 && state.dataSource.map(subItem=>{
              //预计到手价=C端售价*（1-减钱/优惠门槛 ）
              let price = '';
              if(subItem.param.leastAmount && subItem.param.reduceAmount){
                price = (Number(item.sellPrice)*(1-Number(subItem.param.reduceAmount)/Number(subItem.param.leastAmount))).toFixed(2);
              };
              //一般贸易品：C端毛利率=（到手价-B端售价）/到手价
              //保税商品：C端毛利=分成比率
              let rate = '';
              if(item.pdKind == 1||item.pdKind == 2){//一般贸易和直供
                if(Number(item.eventPrice) && Number(price)){
                  rate = (((Number(price)-Number(item.eventPrice))/Number(price))*100).toFixed(2);
                }else{
                  rate = '';
                };
              };
              if(item.pdKind == 3){ //保税
                rate = Number(item.shareRatio);
              };
              let obj = {color:'#000000a6'}
              if(rate< 0){
                obj={color:'red'}
              };
              arr1.push({price,...obj});
              arr2.push({rate,...obj});
            });
            item.handsPrice = arr1;
            item.profitRate = arr2
          });
          break;

      }
      promotionRules && promotionRules.map((item,index)=>item.key = index);
      promotionProducts &&promotionProducts.map((item,index)=>item.key = index);
      setCurrentdata(JSON.parse(Sessions.get("currentdata")))
      setRules(promotionRules);
      setProducts(promotionProducts);
    })
  }
  const goback=()=> {
    props.history.push(`/account/ctipActivity/add/${promotionId}`)
  }
  //保存并预览
  const handSubmit = async(type) => {
    const { promotionId, promotionType,pdScope } = currentdata;
    if(pdScope!=1){
      if (products.length == 0) {
        Qmessage.error("请至少添加一个活动商品");
        return
      };
    };
    let values = { promotionId, promotionType, promotionProducts: products };
    if (!(promotionType == 10 || promotionType == 11)) {//非单品
      values.promotionRules = proRules;
    }
    if (promotionType == 20 || promotionType == 21) {//满元或者满件赠
      const isNoValue = values.promotionRules.some(item => {
        return item.promotionGifts.length == 0;
      });
      if (isNoValue) {
        Qmessage.error("存在某级阶梯没有赠品，请至少上传一个赠品");
        return ;
      };
    };
    values={...values,type}
    GetSaveActivApi(values)
    .then(res => {
      if (type == "2") {
        Qmessage.success("提交审核成功");
        let datas={ createUser:currentdata.createUser}
        props.history.push({pathname:`/account/ctipAudit/edit/${promotionId}/${result.approvalId}`,state:datas})
      };
      if (type == "1") {//回到查看页
        props.history.push(`/account/ctipActivity/info/${promotionId}`)
      };
    });
  };
  //更新规则
  const upDateRuleList=(array)=> {
    setRules(array)
  }
  const upDateProductList=(array)=> {
    setProducts(array)
  }
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
          {promotionType != 10&&promotionType != 11&& (
            <Card title="优惠内容">
                <div className="set_title">
                  <SetTitle type={promotionType} />
                </div>
                {(promotionType == 20 || promotionType == 21) ?
                  <DiscountOne
                    upDateList={upDateRuleList}
                    dataSource={proRules}
                    form={form}
                    currentdata={currentdata}/>
                  :
                  <DiscountTwo
                    upDateList={upDateRuleList}
                    currentdata={currentdata}
                    dataSource={proRules}
                    form={form}/>
                }
              </Card>
          )}
          <Card title="选择商品">
            {
              pdScope == 1 ?
              <div className='all_field'>
                您选择的促销级别为全场级，全部商品都参与活动，此处无需添加商品
              </div>
              :
              <div>
                <div className="set_title">
                  {promotionType == 11 && (
                    <SetTitle type={promotionType}/>
                  )}
                </div>
                <ExportFile
                  upDateList={upDateProductList}
                  currentdata={currentdata}
                  promotionId={promotionId}/>
                <div className="act_setGoods">
                  <div className="batch_set_box">
                    共{products.length}条数据
                  </div>
                  <Qtable
                    scroll={{ x: (promotionType == 10 || promotionType == 11) ? "140%" : ""}}
                    columns={InitColumns(promotionType)}
                    onOperateClick={onOperateClick}
                    dataSource={products}/>
                </div>
              </div>
             }
          </Card>
          <EditModal
            updateList={upDateProductList}
            proRules={proRules}
            dataSource={products}
            form={form}
            promotionType={promotionType}
            visible={visible}
            record={currentItem}
            onVisible={onCancel}
          />
        </Form>
        <div className="handle-operate-save-action">
          <Qbtn onClick={goback}> 上一步 </Qbtn>
          <Qbtn size="free" onClick={()=>handSubmit('1')}>保存并预览</Qbtn>
          <Qbtn size="free" onClick={()=>handSubmit('2')}>保存并提交审核</Qbtn>
        </div>
      </div>
    </Spin>
  );
}

export default CtipActivityAddTwo;
