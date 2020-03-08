import { useState } from "react";
import { Upload, Button, Modal } from "antd";
import Qtable from "common/Qtable/index"; //表单
import "./index.less";

/**
 *
 * @param
 * result: {
 *    list:[]
 *    message: null
 * }
 *
 */
const UpLoadFile = props => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState();
  const [list, setList] = useState([]);
  const handleChange = info => {
    let file = info.file;
    if (file.status == "done") {
      if (file.response && file.response.httpCode == "200") {
        const { list,message } = file.response.result; //后端数据格式需保持一致
        list.map((list,index)=>list.key = index)
        if(message){
          setVisible(true)
        };
        setMessage(message);
        setList(list);
        props.changeDataList(list);
      }
    }
  };
  //下载模板
  const downLoadTemp = () => {
    props.downLoadTemp();
  };
  const { Columns, dataList, action, data } = props;
  let params = null;
  if (data) {
    params = JSON.stringify(data);
  }
  const Props = {
    accept: ".xlsx,.xls",
    name: "mfile",
    action: action,
    onChange: handleChange,
    data: { data: params },
    showUploadList: false
  };
  //modal消失
  const onCancel=()=>{
    setVisible(false)
  }
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
      <Modal title="导入商品结果" visible={visible} footer={null} onCancel={onCancel}>
        <div>
          <p style={{color:'#35bab0'}}>共成功导入商品{list.length}</p>
          {message && <p>{message}</p>}
        </div>
      </Modal>
    </div>
  );
};
export default UpLoadFile;
