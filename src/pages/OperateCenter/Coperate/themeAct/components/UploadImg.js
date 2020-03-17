import React, { Component } from "react";
import {message} from 'antd'
import UploadOnlyOne from "../../../../components/UploadImg/onlyOneImg";

class UploadImg extends Component {
  constructor(props) {
    super(props);
  }
  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("仅支持jpg/jpeg格式", 0.8);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("上传内容大于2M，请选择2M以内的文件", 0.8);
    }
    const isSize = this.isSize(file);
    return isJPG && isLt2M && isSize;
  };

  //检测尺寸
  isSize = file => {
    return new Promise((resolve, reject) => {
      let width = this.props.width;
      let height = this.props.height;
      let _URL = window.URL || window.webkitURL;
      let img = new Image();
      img.onload = function() {
        let valid = img.width == width && img.height == height;
        valid ? resolve() : reject();
      };
      img.src = _URL.createObjectURL(file);
    }).then(
      () => {
        return file;
      },
      () => {
        message.error(file.name + "图片尺寸不符合要求，请修改后重新上传！",1);
        return Promise.reject();
      }
    );
  };
  render() {
    const { imageUrl, changeImg } = this.props;
    return (
      <div>
        <div className="home_pic">
          <UploadOnlyOne
            name="imgFile"
            action="/erpWebRest/qcamp/upload.htm?type=brand"
            imageUrl={imageUrl}
            changeImg={changeImg}
            beforeUpload={this.beforeUpload}
          />
        </div>
      </div>
    );
  }
}

export default UploadImg;
