import React ,{ Component } from 'react';
import { Form } from '@ant-design/compatible';
import { PlusOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Upload, Modal, Button, message } from 'antd';
import './index.less';

const FormItem = Form.Item;
class UpLoadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
    }
  }
  checkImg=(file)=> {
    let regExp = /image\/(jpeg|jpg|gif|png)/ig;
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
  beforeUpload=(file)=> {
    return Promise.all([this.checkImg(file),this.checkLt(file)])
    .then((res)=> {
      Promise.resolve(true)
    }).catch((err) => {
      message.error(err);
      return Promise.reject(false)
    })
  }
  handleChange = ({ file, fileList }) => {
    const { response, status } =file;
    this.props.upDateList([...fileList])
  };
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview =  file => {
      if (!file.url && !file.preview) {
        file.preview = file.response.result;
      }
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    }
  render() {
      let { fileList } = this.props;
      const { previewVisible, previewImage } = this.state;
      const uploadButton = (
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">上传</div>
        </div>
      );
     return(
       <div>
         <Upload
          action="/qtoolsOms/upload/file"
          listType="picture-card"
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}>
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
      )
  }
}
export default UpLoadImg;
