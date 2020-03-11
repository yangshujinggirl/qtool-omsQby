import { Upload, Button, Modal } from "antd";
import Qtable from "common/Qtable/index"; //表单
import "./index.less";

const UpLoadFile = props => {
  const handleChange = info => {
    let file = info.file;
    if (file.status == "done") {
      if (file.response && file.response.httpCode == "200") {
        props.changeDataList(file.response.result)
      }
    }
  };
  //下载模板
  const downLoadTemp = () => {
    props.downLoadTemp();
  };
  const { Columns, dataList, action, data,errMessage } = props;
  let params = null;
  if (data) {
    params = JSON.stringify(data);
  }
  //modal消失
  const onCancel=()=>{
    setVisible(false)
  }
  const Props = {
    accept: ".xlsx,.xls",
    name: "mfile",
    action: action,
    onChange: handleChange,
    data: { data: params },
    showUploadList: false
  };
  return (
    <div>
      <div className="add_task_upload">
        <Upload {...Props}>
          <Button type="primary" size="large">
            导入商品
          </Button>
        </Upload>
        <a className="download" onClick={downLoadTemp}>
          下载导入模板
        </a>
      </div>
      {dataList.length > 0 && (
        <Qtable columns={Columns} dataSource={dataList} />
      )}
      <Modal title="导入商品结果" visible={Boolean(errMessage)} footer={null} onCancel={onCancel}>
        <div>
          <p style={{color:'#35bab0'}}>共成功导入商品{dataList.length}</p>
          {errMessage && <p>{errMessage}</p>}
        </div>
      </Modal>
    </div>
  );
};
export default UpLoadFile;
