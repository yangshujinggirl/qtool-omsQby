import { Input, Form, Upload }from 'antd';
import { useState } from 'react';
import { PlusOutlined, LoadingOutlined, DownOutlined,UpOutlined, CloseOutlined } from '@ant-design/icons';
import './index.less';

const QupLoadImgUrl=({...props})=> {
  let { imageUrl, upDateFile } = props;
  let [loading,setLoad] = useState(false);
  let fileDomain="https://qtltestfiles.oss-cn-shanghai.aliyuncs.com/";

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
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoad(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoad(false);
      upDateFile(info.file.response.result);
    }

  };
  const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
  return <Upload
          name="avatar"
          listType="picture-card"
          className="upload-imageUrl-picture"
          showUploadList={false}
          name="file"
          action="/qtoolsOms/upload/img"
          beforeUpload={beforeUpload}
          onChange={handleChange}>
          {imageUrl ? <img src={`${fileDomain}${imageUrl}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
}

export default QupLoadImgUrl;
