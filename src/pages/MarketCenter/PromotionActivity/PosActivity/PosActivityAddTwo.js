import { Spin, Modal, Card, Form } from 'antd';
import { useEffect, useState } from 'react';
import { Qmessage, Qbtn, Qtable } from 'common';
import { Sessions } from 'utils';
import { GetAuditApi, GetSaveGoodsApi, GetGoodsInfoApi } from 'api/marketCenter/PosActivity';
import ExportFile from "./components/ExportFile";
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
      setProducts(promotionProducts);
      setCurrentdata(JSON.parse(Sessions.get("currentdata")))
    })
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
    const { promotionId, promotionType } = currentdata;
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
        GetAuditApi({promotionId,createUser:currentdata.createUser})
        .then(res=>{
          let datas={ createUser:currentdata.createUser}
          props.history.push({pathname:`/account/posAudit/edit/${promotionId}/${result.approvalId}`,state:datas})
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
  const { promotionType } = currentdata;
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
