import React ,{ Component } from 'react';
import { Upload,Icon, Form, Modal, Button, message } from 'antd';
import './index.less';

const FormItem = Form.Item;
class UpLoadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      previewVisible: false,
      previewImage: '',
      fileList:[]
    }
  }
  getBase64=(file)=> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
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
  // handleChange = info => {
  //   this.setState({
  //     loading: true,
  //   })
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     const { response } =info.file;
  //     if(response.code == 0) {
  //       this.setState({
  //         loading: false,
  //       })
  //     }
  //   }
  // };
  handleChange = ({ fileList }) => this.setState({ fileList });
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview =  file => {
    console.log(file)
      if (!file.url && !file.preview) {
        file.preview = file.response.thumbUrl;
      }
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    }
  render() {
      const { getFieldDecorator } =this.props.form;
      // let { fileList,index,name } = this.props;
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
     return(
       <FormItem className="banner-upload-wrap" label="商品图片">
         <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}>
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
       </FormItem>
      )
  }
}
export default UpLoadImg;
