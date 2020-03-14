import React, { useState, useEffect } from "react";
import { Upload, Button, Modal } from "antd";
import Qtable from "common/Qtable/index"; //表单
import "./index.less";

const UpLoadFile = props => {
  const [errorMsg, setErrMsg] = useState("");
  const [visible, setVisible] = useState("");
  /**
   *
   * @param {*} info
   */
  const handleChange = info => {
    let file = info.file;
    if (file.status == "done") {
      if (file.response && file.response.httpCode == "200") {
        const { result } = file.response;
        if (result.constructor == Object) {
          if (result.hasOwnProperty("msg")) {
            if (result[msg]) {
              setErrMsg(result[msg]);
              setVisible(true);
            }
            props.changeDataList(result["result"]);
            return;
          }
          if (result["message"]) {
            setErrMsg(result["message"]);
            setVisible(true);
          }
          props.changeDataList(result["list"]);
          return;
        }
        props.changeDataList(result);
      }
    }
  };
  //下载模板
  const downLoadTemp = () => {
    props.downLoadTemp();
  };
  /**
   * 弹窗消失
   */
  const onCancel = () => {
    setVisible(false);
  };
  const { Columns, dataList = [], action, data } = props;
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
      {visible && (
        <Modal
          title="导入商品结果"
          visible={visible}
          footer={null}
          onCancel={onCancel}
        >
          <div>
            <p style={{ color: "#35bab0" }}>共成功导入商品{dataList.length}</p>
            {errorMsg && <p>{errorMsg}</p>}
          </div>
        </Modal>
      )}
    </div>
  );
};
export default UpLoadFile;
