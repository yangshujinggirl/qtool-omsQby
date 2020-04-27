import React ,{ Component } from 'react';
import { Upload, Form, Modal, Button, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Sessions } from 'utils';
import './index.less';

const FormItem = Form.Item;
class UpLoadImg extends Component {
  static defaultProps={
		imgType: 1,//1-jpg png jpeg gif,//2--png//3--jpg jpeg
    ruleType:1,//1==,2<=,3>=
    imgTypeMap:{
      1:'jpg,png,jpeg',
      2:'png',
      3:'jpg',
    },
    ruleTypeMap:{
      1:'等于',
      3:'大于等于',
      2:'小于等于',
    }
	}
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    }
  }
  checkImg=(file)=> {
    let regExp
    switch(this.props.imgType) {
      case 1:
        regExp = /image\/(jpeg|jpg|png)/ig;
        break;
      case 2:
        regExp = /image\/png/ig;
        break;
      case 3:
        regExp = /image\/(jpeg|jpg)/ig;
        break;
    }
    let isImg = new Promise((resolve, reject) => {
        let valid = regExp.test(file.type);
        valid ? resolve(true) : reject('格式不正确，请修改后重新上传！');
      })
      return isImg;
  }
  checkLt=(file)=> {
    let isLt2M = new Promise((resolve, reject) => {
        let valid = file.size / 1024 / 1024 < 2;
        valid ? resolve(true) : reject('图片大小超出限制，请修改后重新上传');
      })
      return isLt2M;
  }
  checkSize=(file)=> {
    let { ruleType, ruleTypeMap } =this.props;
    let isSize = new Promise((resolve, reject) => {
        let { width, height } =this.props;
        let percent = (width/height).toFixed(4);
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        if(!width&&!height) {//不校验比例
          resolve(true);
        } else {
          img.onload = function() {
            let valid
            let standardPer = (img.width/img.height).toFixed(4);
            switch(ruleType) {
              case 1:
                valid = standardPer == percent;
                break;
              case 2:
                valid = standardPer == percent||standardPer < percent;
                break;
              case 3:
                valid = standardPer == percent||standardPer > percent;
                break;
            }
            valid ? resolve(true) : reject(`图片宽高比为${ruleTypeMap[ruleType]}${width}:${height}，请修改后重新上传！`);
          };
        }
        img.src = _URL.createObjectURL(file);
      })
      return isSize;
  }
  beforeUpload=(file)=> {
    return Promise.all([this.checkImg(file),this.checkLt(file),this.checkSize(file)])
    .then((res)=> {
      Promise.resolve(true)
    }).catch((err) => {
      message.error(err);
      return Promise.reject(false)
    })
  }
  handleChange = ({file,fileList}) => {
    this.setState({ loading: true });
    if (file.status === 'done'||file.status === "removed") {
      this.setState({ loading: false });
      this.props.upDateList&&this.props.upDateList([...fileList]);
    }
  };
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    };
    return e && e.fileList;
  }
  render() {
     let { fileList,name, formItemLayout, label, rules, width, height, imgTypeMap, ruleTypeMap, imgType, ruleType } = this.props;
     let tipsShow=()=> {
       if(width&&height) {
         return <span className="ant-form-text-tips">
                   {`${label}需上传宽度：高度为${ruleTypeMap[ruleType]}${width}:${height}的图片，仅支持${imgTypeMap[imgType]}格式`}
                </span>
       } else {
         return <span className="ant-form-text-tips">
                   {`${label}需上传图片，仅支持${imgTypeMap[imgType]}格式`}
                </span>
       }
     }
     const uploadButton =(
            <div>
               {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
               <div className="ant-upload-text">添加图片</div>
             </div>
     )

     return(
       <FormItem label={label} {...formItemLayout} className={`${rules?'common-required-formItem':''}`}>
         <FormItem
           rules={rules?rules:[]}
           valuePropName='fileList'
           getValueFromEvent={this.normFile}
           name={name}>
             <Upload
              action='/qtoolsOms/upload/img'
              listType="picture-card"
              className="avatar-uploader set-upload-wrap"
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}>
              {fileList.length>0? null:uploadButton }
            </Upload>
         </FormItem>
       {tipsShow()}
       </FormItem>
     )
  }
}
export default UpLoadImg;
