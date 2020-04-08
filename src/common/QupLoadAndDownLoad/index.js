import { Form, Upload } from 'antd';
import { Qbtn, Qmessage } from 'common';
import filePathOptions from '../StaicFile';

const ImportFile=({...props})=> {
  let { noLabel,importText, downText } =props;
  const beforeUpload=(file)=> {
    const isSize = file.size / 1024 / 1024 < 1;
    let fileName = file.name;
    let fileType = fileName.split('.')[1];
    if(fileType!='xls'&&fileType!='xlsx') {
      message.error('请选择Excel文件');
      return false;
    }else {
      if (!isSize) {
        message.error('导入文件不得大于1M');
        return false;
      }
    }
  }
  const handleChange = info => {
    let file = info.file;
    const { response } = file;
    if (file.status == "done") {
      if (response) {
        if (response.httpCode == "200") {
          props.upDateList(response);
        } else {
          Qmessage.error(file.response.message, 0.8);
        }
        return file.response.status === "success";
      }
    }
  };
  const goDownLoad=()=> {
    window.open(filePathOptions[props.fileName]);
  }
  const params = props.data?JSON.stringify(props.data):null;
  const upLoadProps = {
    accept: ".xlsx,.xls",
    action:props.action,
    onChange: handleChange,
    beforeUpload: beforeUpload,
    name: "mfile",
    data: { data: params },
    showUploadList: false
  };
  return (
    <Form.Item noStyle>
    {
      noLabel?//纯导入下载
      <Form.Item noStyle>
        <Upload {...upLoadProps}><Qbtn>{importText?importText:'导入文件'}</Qbtn></Upload>&nbsp;&nbsp;
        <Qbtn onClick={goDownLoad}>{downText?downText:'下载模板'}</Qbtn>
      </Form.Item>
      :
      <Form.Item label="商品信息">
        <Form.Item>
          <Upload {...upLoadProps}><Qbtn>{importText?importText:'导入文件'}</Qbtn></Upload>&nbsp;
          <Qbtn onClick={goDownLoad}>{downText?downText:'下载模板'}</Qbtn>
        </Form.Item>
        {props.children}
      </Form.Item>
    }
    </Form.Item>
  )
}
export default ImportFile;
