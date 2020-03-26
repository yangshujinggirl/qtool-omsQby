import { Form, Upload } from 'antd';
import { Qbtn, Qmessage } from 'common';
import filePathOptions from '../StaicFile';

const ImportFile=({...props})=> {
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
  const params = JSON.stringify(props.data);
  const upLoadProps = {
    accept: ".xlsx,.xls",
    action:props.action,
    onChange: handleChange,
    name: "mfile",
    data: { data: params },
    showUploadList: false
  };
  return (
    <Form.Item label="商品信息">
      <Form.Item>
        <Upload {...upLoadProps}><Qbtn>导入商品</Qbtn></Upload>&nbsp;
        <Qbtn onClick={goDownLoad}>下载模板</Qbtn>
      </Form.Item>
      {props.children}
    </Form.Item>
  )
}
export default ImportFile;
