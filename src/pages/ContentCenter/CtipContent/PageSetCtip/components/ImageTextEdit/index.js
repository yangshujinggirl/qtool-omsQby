import { Input, Radio, Form, Upload }from 'antd';
import { useState } from 'react';
import { Sessions } from 'utils';
import { PlusOutlined, LoadingOutlined, DownOutlined,UpOutlined, CloseOutlined } from '@ant-design/icons';
import { QupLoadImgLimt, Qbtn } from 'common';
import { GetSearchApi } from 'api/contentCenter/PageSetCtip';
import AddModal from  '../AddModal';
import ruleTitle from '../../img/rule_title.png';
import './index.less';

const ImageTextEdit=({...props})=> {
  let { detailImg } =props;
  let newArray = [...detailImg];
  let [deKey,setDeKey] = useState(newArray.length);
  let [funcType,setFuncType] = useState(1);
  let [fileList,setFileList] = useState([]);
  let [loading,setLoad] = useState(false);
  let [visible,setVisible] = useState(false);
  let [currentItem,setCurrentItem] = useState({text:[],type:1});
  let fileDomain=Sessions.get("fileDomain");

  const handleEdit=(record,index)=> {
    setVisible(true);
    setCurrentItem(record);
  }
  const handlAdd=(type)=> {
    deKey++;
    // let item = { type, content:type==1?[]:'', key: deKey };
    // newArray.push(item);
    // upDateList(newArray);
    setDeKey(deKey);
    // setFuncType(type)
    setVisible(true);
    setCurrentItem({type, text:type==1?[]:'', key: deKey});
  }
  const handleDelete=(index)=> {
    newArray.splice(index,1);
    props.upDateList(newArray);
  }
  const handleUp=(index)=> {
    let item = newArray[index];
    let hoverIndex = index;
    hoverIndex--;
    hoverIndex = hoverIndex <= 0?0:hoverIndex;
    newArray.splice(index,1);
    newArray.splice(hoverIndex,0,item);
    upDateList(newArray);
  }
  const handleDown=(index)=> {
    let hoverIndex = index;
    hoverIndex++;
    let item = newArray[index];
    newArray.splice(index,1);
    newArray.splice(hoverIndex,0,item);
    upDateList(newArray);
  }
  const handleChange = (e,index) => {
    let value = e.target.value;
    newArray[index] = {...newArray[index],content: value };
    props.upDateList(newArray);
  };
  const handleChangeFile = (newArray) => {
    console.log("newArray",newArray)
    setFileList(newArray);
  };
  const onOk=(items)=> {
    newArray.push(items);
    props.upDateList(newArray);
    setVisible(false);
  }
  const onCancel=()=> {
    setVisible(false);
  }
  //格式化参数
  const formatVal=(val)=> {
    if(val&&val[0].response) {
      let urlPath = val[0].response.result;
      val = urlPath;
    } else {
      val = val.path;
    }
    return val;
  }
  const onSubmit=async()=> {
    try{
      const values = await props.form.validateFields(['text','template','pdCode','rowcode']);
      let { text, pdCode } =values;
      let items;
      switch (funcType) {
        case 1:
          text = formatVal(text);
          items = { type:funcType, text }
          break;
        case 2:
          GetSearchApi({codes:[pdCode,rowcode]})
          .then((res)=> {
            items = { type:funcType, pdCode, rowcode }
          })
          break;
        case 3:
        case 4:
          items = { type:funcType, text }
          break;
        default:
      }
      console.log(items)
      newArray.push(items);
      props.upDateList(newArray);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }
  const itemMod=(el,index)=> {
    let mod;
    switch (el.type) {
      case 1:
        mod= <div className="uploadImg-content">
              <img src={`${fileDomain}/${el.text}`}/>
            </div>
        break;
      case 2:
        mod= <div className="goods-content">
              {
                el.template==1?
                <div className="single">
                  <div className="item-gods">
                    <div className="img-l"><img src="" /></div>
                    <div className="text-con">
                      <p className="title">示例商品</p>
                      <div className="row-bottom">
                        <p className="">¥317</p>
                        <p className="goBuy">立即购买</p>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="multipleCol">
                  <div className="item-gods">
                    <div className="img-l"><img src="" /></div>
                    <div className="text-con">
                      <p className="title">示例商品</p>
                      <div className="row-bottom">
                        <p className="">¥317</p>
                        <p className="goBuy">立即购买</p>
                      </div>
                    </div>
                  </div>
                  <div className="item-gods">
                    <div className="img-l"><img src="" /></div>
                    <div className="text-con">
                      <p className="title">示例商品</p>
                      <div className="row-bottom">
                        <p className="">¥317</p>
                        <p className="goBuy">立即购买</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
        break;
      case 3:
        mod= <Form.Item name={['productDetailImgList',index,'content']} rules={[{ required: true, message: '请输入文本' } ]}>
              <Input.TextArea/>
            </Form.Item>
        break;
      case 4:
        mod= <div className="rule-content">
              <div className="img-wrap"><img src={ruleTitle}/></div>
              <Form.Item name={['productDetailImgList',index,'content']} rules={[{ required: true, message: '请输入文本' } ]}>
                <Input.TextArea/>
              </Form.Item>
            </div>
        break;
      default:
    }
    return mod;
  }
  const funcEdit=()=> {
    let mod;
    switch(funcType) {
      case 1:
        mod = <div>
                <QupLoadImgLimt
                  label="图片"
                  name="text"
                  fileList={fileList}
                  limit="1"
                  upDateList={(fileList)=>handleChangeFile(fileList)}
                  rules={[{ required: true, message: '请上传图片' } ]}/>
                <Form.Item label="链接商品1" name="pdCode">
                  <Input autoComplete="off" placeholder='请输入商品编码'/>
                </Form.Item>
              </div>
        break;
      case 2:
        mod = <div>
                <Form.Item label="商品模板" name="template" rules={[{ required: true, message: '请输入分享标题，30字以内'}]}>
                  <Radio.Group>
                    <Radio value={1}>单列展示</Radio>
                    <Radio value={2}>双列展示</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="链接商品1" name="pdCode" rules={[{ required: true, message: '请输入商品编码'}]}>
                  <Input autoComplete="off" placeholder='请输入商品编码'/>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) => prevValues.template !== currentValues.template}>
                  {({ getFieldValue }) => {
                    return getFieldValue('template') == 2 ? (
                      <Form.Item label="链接商品2" name="rowcode" rules={[{ required: true, message: '请输入商品编码'}]}>
                        <Input autoComplete="off" placeholder='请输入商品编码'/>
                      </Form.Item>
                    ) : null;
                  }}
                </Form.Item>
              </div>
        break;
      case 3:
      case 4:
        mod = <Form.Item label="文本" name="text" rules={[{ required: true, message: '请输入商品编码'}]}>
                <Input autoComplete="off" placeholder='请输入商品编码'/>
              </Form.Item>
        break;
    }
    return mod;
  }
  return <div className="pageSetimage-text-function-are">
          <div className="left-are">
            <p className="tit-par">功能组件</p>
            <div className="content-par">
              <p className="fuc-btn" onClick={()=>handlAdd(1)}>新增图片</p>
              <p className="fuc-btn" onClick={()=>handlAdd(2)}>新增商品</p>
              <p className="fuc-btn" onClick={()=>handlAdd(3)}>新增文本</p>
              <p className="fuc-btn" onClick={()=>handlAdd(4)}>新增规则</p>
            </div>
          </div>
          <div className="middle-are">
            <p className="tit-par">预览区</p>
            <div className="content-par">
              {
                newArray.length>0&&newArray.map((el,idx) => {
                  return <div className="par-item text-item" key={idx}>
                          <div className="wrap-item">
                            { itemMod(el,idx) }
                            <div className="btns-action">
                              <span className="icon-wrap" onClick={()=>handleDown(idx)}><DownOutlined /></span>
                              <span className="icon-wrap" onClick={()=>handleUp(idx)}><UpOutlined /></span>
                              <span className="icon-wrap" onClick={()=>handleEdit(el,idx)}>编辑</span>
                              <span className="icon-wrap" onClick={()=>handleDelete(idx)}><CloseOutlined /></span>
                            </div>
                          </div>
                        </div>
                })
              }
            </div>
          </div>
          {/*<div className="right-are">
            <p className="tit-par">商品编辑区</p>
            <div className="content-par">
              {funcEdit()}
              <Qbtn onClick={onSubmit}>确定</Qbtn>
            </div>
          </div>*/}
          <AddModal
            form={props.form}
            currentItem={currentItem}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}/>
        </div>
}
export default ImageTextEdit;
