import { Form, Icon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Upload, Modal } from 'antd';
import React, { Component } from 'react';
import './index.less';

const FormItem = Form.Item;

class QupLoadList extends Component {
  static defaultProps={
    formItemLayout:{
          labelCol: {
            sm: { span: 2 },
          },
          wrapperCol: {
            sm: { span: 16 },
          },
    },
    label:'上传图片'//
  }
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }
  beforeUpload(file){
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    if (!isJPG && !isPNG) {
      message.error('仅支持jpg/jpeg/png格式',.8);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传内容大于2M，请选择2M以内的文件',.8);
    }

    return (isJPG || isPNG) && isLt2M;
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => this.setState({ fileList })
  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">添加图片</div>
      </div>
    );
    const { fileList, previewVisible, previewImage } =this.state;
    const { label, formItemLayout, name } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <FormItem label={label} {...formItemLayout}>
        {getFieldDecorator(name)(
          <Upload
            name="imgFile"
            action="/erpWebRest/qcamp/upload.htm?type=spu"
            listType="picture-card"
            fileList={fileList}
            beforeUpload={this.beforeUpload}
            onPreview={this.handlePreview}
            onChange={this.handleChange}>
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
        )}
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </FormItem>

    )
  }
}

export default QupLoadList;
