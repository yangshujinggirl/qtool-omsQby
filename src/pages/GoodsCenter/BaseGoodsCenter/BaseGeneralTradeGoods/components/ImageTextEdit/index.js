import { Input, Form, Upload }from 'antd';
import { useState } from 'react';
import { PlusOutlined, LoadingOutlined, DownOutlined,UpOutlined, CloseOutlined } from '@ant-design/icons';
// import { QupLoadImgLimt } from 'common';
import QupLoadImgLimt from '../QupLoadImgLimt';
import './index.less';

const ImageTextEdit=({...props})=> {
  let { detailImg, upDateList } =props;
  let newArray = [...detailImg];
  let [deKey,setDeKey] = useState(newArray.length);
  let [loading,setLoad] = useState(false);

  const handlAdd=(type)=> {
    deKey++;
    let item = { type, content:type==1?'':[], key: deKey };
    newArray.push(item);
    upDateList(newArray);
    setDeKey(deKey);
  }
  const handleDelete=(index)=> {
    newArray.splice(index,1);
    upDateList(newArray);
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
  const beforeUpload=(file)=> {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  const handleChange = (e,index) => {
    let value = e.target.value;
    newArray[index] = {...newArray[index],content: value };
    upDateList(newArray);
  };
  const handleChangeFile = (imageUrl,index) => {
    newArray[index] = {...newArray[index],content: imageUrl}
    upDateList(newArray);
  };

  return <div className="image-text-function-are">
          <div className="left-are">
            <p className="tit-par">功能组件</p>
            <div className="content-par">
              <p className="fuc-btn" onClick={()=>handlAdd(2)}>新增图片</p>
              <p className="fuc-btn" onClick={()=>handlAdd(1)}>新增文本</p>
            </div>
          </div>
          <div className="middle-are">
            <p className="tit-par">预览区</p>
            <div className="content-par">
              {
                newArray.map((el,idx) => {
                  return el.type==1?
                  <div className="par-item text-item" key={idx}>
                    <div className="wrap-item">
                      <Form.Item name={['productDetailImgList',idx,'content']} rules={[{ required: true, message: '请输入文本' } ]}>
                        <Input.TextArea/>
                      </Form.Item>
                      <div className="btns-action">
                        <span className="icon-wrap" onClick={()=>handleDown(idx)}><DownOutlined /></span>
                        <span className="icon-wrap" onClick={()=>handleUp(idx)}><UpOutlined /></span>
                        <span className="icon-wrap" onClick={()=>handleDelete(idx)}><CloseOutlined /></span>
                      </div>
                    </div>
                  </div>
                  :
                  <div className="par-item img-item" key={idx}>
                    <div className="wrap-item">
                    <QupLoadImgLimt
                      name={['productDetailImgList',idx,'content']}
                      fileList={el.content}
                      limit="1"
                      upDateList={(fileList)=>handleChangeFile(fileList,idx)}
                      rules={[{ required: true, message: '请上传图片' } ]}/>
                    <div className="btns-action">
                      <span className="icon-wrap" onClick={()=>handleDown(idx)}><DownOutlined /></span>
                      <span className="icon-wrap" onClick={()=>handleUp(idx)}><UpOutlined /></span>
                      <span className="icon-wrap" onClick={()=>handleDelete(idx)}><CloseOutlined /></span>
                    </div>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
}
export default ImageTextEdit;
