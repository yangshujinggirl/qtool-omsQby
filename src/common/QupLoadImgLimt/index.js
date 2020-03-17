import React, { Component } from "react";
import { Form, Icon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Upload, Modal, Button, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import "./index.less";

const FormItem = Form.Item;
class UpLoadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: ""
    };
  }
  static defaultProps = {
    limit: 1,
    action:'/qtoolsOms/upload/img'
  };
  checkImg = file => {
    let regExp = /image\/(jpeg|jpg|gif|png)/gi;
    let isImg = new Promise((resolve, reject) => {
      let valid = regExp.test(file.type);
      valid ? resolve(true) : reject("格式不正确，请修改后重新上传！");
    });
    return isImg;
  };
  checkLt = file => {
    let isLt2M = new Promise((resolve, reject) => {
      let valid = file.size / 1024 / 1024 < 2;
      valid ? resolve(true) : reject("图片大小超出限制，请修改后重新上传");
    });
    return isLt2M;
  };
  checkSize = file => {
    return new Promise((resolve, reject) => {
      let width = this.props.width;
      let height = this.props.height;
      let _URL = window.URL || window.webkitURL;
      let img = new Image();
      img.onload = function() {
        let valid = img.width / img.height == width / height;
        // let valid = img.width == width && img.height == height;
        valid ? resolve() : reject();
      };
      img.src = _URL.createObjectURL(file);
    }).then(() => {
        return file},
      () => {
        return Promise.reject( "图片尺寸不符合要求，请修改后重新上传！");
      }
    );
  };
  beforeUpload = file => {
    let CheckArr = [this.checkImg(file), this.checkLt(file)];
    if(this.props.width){
      CheckArr = [this.checkImg(file), this.checkLt(file),this.checkSize(file)]
    };
    return Promise.all(CheckArr)
      .then(res => {
        Promise.resolve(true);
      })
      .catch(err => {
        message.error(err);
        return Promise.reject(false);
      });
  };
  isSize = file => {
    return new Promise((resolve, reject) => {
      let width = this.props.width;
      let height = this.props.height;
      let _URL = window.URL || window.webkitURL;
      let img = new Image();
      img.onload = function() {
        // let valid = img.width / img.height == width / height;
        let valid = img.width == width && img.height == height;
        valid ? resolve() : reject();
      };
      img.src = _URL.createObjectURL(file);
    }).then(
      () => {
        return file;
      },
      () => {
        message.error(file.name + "图片尺寸不符合要求，请修改后重新上传！");
        return Promise.reject();
      }
    );
  };
  handleChange = ({file,fileList}) => {
    this.props.upDateList([...fileList]);
  };
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = file => {
    debugger
    if (!file.url && !file.preview) {
      file.preview = file.response.fileDomain+file.response.result;
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };
  render() {
    let { fileList, limit, action } = this.props;
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div>
        <Upload
          action={action}
          listType="picture-card"
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= limit ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default UpLoadImg;
