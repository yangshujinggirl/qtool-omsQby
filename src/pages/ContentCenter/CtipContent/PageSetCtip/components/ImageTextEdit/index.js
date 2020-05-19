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
  let [loading,setLoad] = useState(false);
  let [visible,setVisible] = useState(false);
  let [currentItem,setCurrentItem] = useState({text:[],type:1,fileList:[]});
  let fileDomain=Sessions.get("fileDomain");

  const handleEdit=(record,index)=> {
    setVisible(true);
    setCurrentItem({...record,currentIndex:index});
  }
  const handlAdd=(type)=> {
    deKey++;
    setDeKey(deKey);
    setVisible(true);
    setCurrentItem({type, text:type==1?[]:'', fileList:[], key: deKey});
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
    props.upDateList(newArray);
  }
  const handleDown=(index)=> {
    let hoverIndex = index;
    hoverIndex++;
    let item = newArray[index];
    newArray.splice(index,1);
    newArray.splice(hoverIndex,0,item);
    props.upDateList(newArray);
  }
  const handleChange = (e,index) => {
    let value = e.target.value;
    newArray[index] = {...newArray[index],content: value };
    props.upDateList(newArray);
  };
  const onOk=(items)=> {
    console.log(items)
    if(currentItem.currentIndex!=undefined&&currentItem.currentIndex == items.currentIndex) {
      newArray[currentItem.currentIndex]=items;
    } else {
      newArray.push(items);
    }
    // if(currentItem.pdConfigureConfigId) {
    //   newArray[currentItem.currentIndex]=items;
    // } else {
    //   newArray.push(items);
    // }
    props.upDateList(newArray);
    setVisible(false);
  }
  const onCancel=()=> {
    setVisible(false);
    setCurrentItem({fileList:[]});
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
                    <div className="img-l"><img src={`${fileDomain}/${el.pdSpu.url}`} /></div>
                    <div className="text-con">
                      <p className="title">{el.pdSpu.name}</p>
                      <div className="row-bottom">
                        <p className="">¥{el.pdSpu.price}</p>
                        <p className="goBuy">立即购买</p>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="multipleCol">
                  <div className="item-gods">
                    <div className="img-l"><img src={`${fileDomain}/${el.pdSpu.url}`} /></div>
                    <div className="text-con">
                      <p className="title">{el.pdSpu.name}</p>
                      <div className="row-bottom">
                        <p className="">¥{el.pdSpu.price}</p>
                        <p className="goBuy">立即购买</p>
                      </div>
                    </div>
                  </div>
                  <div className="item-gods">
                    <div className="img-l"><img src={`${fileDomain}/${el.rowPdSpu.url}`} /></div>
                    <div className="text-con">
                      <p className="title">{el.rowPdSpu.name}</p>
                      <div className="row-bottom">
                        <p className="">¥{el.rowPdSpu.price}</p>
                        <p className="goBuy">立即购买</p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
        break;
      case 3:
        mod= <Input.TextArea defaultValue={el.text} disabled/>
        break;
      case 4:
        mod= <div className="rule-content">
              <div className="img-wrap"><img src={ruleTitle}/></div>
              <Input.TextArea defaultValue={el.text} disabled/>
            </div>
        break;
      default:
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
          <AddModal
            form={props.form}
            currentItem={currentItem}
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}/>
        </div>
}
export default ImageTextEdit;
