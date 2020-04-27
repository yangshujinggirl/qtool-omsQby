import '@ant-design/compatible/assets/index.css';
import { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from "antd";
import { QreturnBtn, Qbtn, Qtable, Qmessage } from "common";
import { ColumnsEdit } from './column';
import AddDescModal from './components/AddDescModal';
import { GetDetailApi,GetTreeApi,GetEditApi } from 'api/cTip/DescriptManage';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 14
  }
};
const  DescriptAddF=({...props})=> {
  const [form] = Form.useForm();
  let [visible, setVisible] = useState(false);
  let [totalData, setTotal] = useState({});
  let [desclist, setDesclist] = useState([]);
  let [treeData, setTreeData] = useState([]);
  let [selectedKeys, setSelectedKeys] = useState([]);
  let attributeId = props.match.params.id;
  /*详情 */
  const getInfo=()=> {
      GetDetailApi(attributeId)
      .then((res) =>{
        let { categoryList, ...totalData} =res.result;
        categoryList&&categoryList.map((el,index) =>el.key = index);
        selectedKeys = categoryList.map((el)=> {
          let item;
          item = formatCategory(el.categoryCode1,el.categoryCode2,el.categoryCode3,el.categoryCode4);
          return item;
        })
        setTotal(totalData)
        setDesclist(categoryList)
        setSelectedKeys(selectedKeys)
      })
  }
  const formatCategory=(categoryCode1,categoryCode2,categoryCode3,categoryCode4)=> {
    if(categoryCode4) {
      return `${categoryCode1}-${categoryCode2}-${categoryCode3}-${categoryCode4}`;
    } else if(categoryCode3) {
      return `${categoryCode1}-${categoryCode2}-${categoryCode3}`
    } else{
      return `${categoryCode1}-${categoryCode2}`
    }
  }

  const formDataTree = (array,ids,itit)=> {
    return  array.map((el,index) => {
      let item={};
      item.title = el.categoryName;
      item.key = ids?`${ids}-${el.categoryCode}`:el.categoryCode;
      item.titStr=ids?`${itit}/${el.categoryName}`:el.categoryName;
      let selIndex = selectedKeys.findIndex((value)=>value == item.key);
      if(selIndex!="-1") {
        item.disableCheckbox=true;
      }
      if(el.categoryChildren&&el.categoryChildren.length>0) {
        item.children = formDataTree(el.categoryChildren,item.key,item.titStr);
      }
      return item;
    })
  }

  const onCancel=()=> {
    setVisible(false)
  }
  /*属性弹框*/
  const handleChange=()=> {
    setVisible(true)
    GetTreeApi()
    .then((res)=> {
      let { result } =res;
      result = formDataTree(result)
      setTreeData(result);
    })
  }
  const onCreate=(data)=> {
    let arrOne = [];
      data = data.map((el)=> {
        let item={};
        item.idList=el.key.split('-');
        item.titList=el.titStr.split('/');
        return item;
      })
      data.length>0&&data.map((el)=> {
        let paramsObj={};
        for(let kd in el.idList) {
          let dd = kd;
          dd++;
          paramsObj[`categoryCode${dd}`] = el.idList[kd];
        }
        for(let kd in el.titList) {
          let dd = kd;
          dd++;
          paramsObj[`categoryName${dd}`] = el.titList[kd];
        }
        arrOne.push(paramsObj)
      })
      arrOne.map((el,index) =>el.key = index)
      console.log(arrOne)
    setDesclist(arrOne)
    setVisible(false)
  }
  const goReturn=(data)=> {
    props.history.push('/account/descriptive_attribute')
  }
  /*提交 */
  const onSubmit=async ()=> {
    try {
      let  values = await form.validateFields();
      values = {...values,categoryList:desclist,attributeId }
      GetEditApi(values)
      .then((res)=> {
        Qmessage.success('保存成功')
        goReturn();
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  useEffect(()=>{
    attributeId&&getInfo()
  },[])
  useEffect(()=>{
    form.setFieldsValue(totalData);
  },[totalData])
  console.log(treeData)

  return(
    <div className="oms-common-addEdit-pages">
      <Form form={form} {...formItemLayout} name="formPar">
        <FormItem label="属性名称" name="attributeName" rules={[{ required: true, message: '请输入属性名称' }]}>
          <Input placeholder="请输入属性名称" autoComplete="off" maxLength={8}/>
        </FormItem>
        <FormItem label="关联后台类目" className="common-required-formItem">
          <Qbtn type="primary" size="free" onClick={handleChange}>
            选择后台类目
          </Qbtn>
          <Qtable
            columns={ColumnsEdit}
            dataSource={desclist}/>
        </FormItem>
        <div className="handle-operate-save-action">
          <QreturnBtn {...props} />
          <Qbtn onClick={onSubmit}>
            保存
          </Qbtn>
        </div>
      </Form>
      <AddDescModal
        defaultSelectedKeys={selectedKeys}
        treeData={treeData}
        visible={visible}
        onCreate={onCreate}
        onCancel={onCancel}/>
    </div>
  )
}
export default DescriptAddF;
