import { Form, Upload } from 'antd';
import { Qbtn } from 'common';

/*
window.open('../../static/order.xlsx');门店订单
 */
const ImportFile=({...props})=> {
  const handleChange=(file)=> {
    console.log(file);
  }
  const goDownLoad=()=> {
    
  }
  const upLoadProps = {
    accept: ".xlsx,.xls",
    name: "mfile",
    action:props.action,
    onChange: handleChange,
    showUploadList: false
  };

  return (
    <Form.Item label="商品信息">
      <Form.Item>
        <Upload {...upLoadProps}><Qbtn>导入商品</Qbtn></Upload>
        <Qbtn onClick={goDownLoad}>下载模板</Qbtn>
      </Form.Item>
      {props.children}
    </Form.Item>
  )
}
export default ImportFile;
