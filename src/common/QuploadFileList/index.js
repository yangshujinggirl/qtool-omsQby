import React, { useState, useEffect } from "react";
import { Upload, Button, Modal } from "antd";
import Qtable from "common/Qtable/index"; //表单
import "./index.less";

const UpLoadFile = props => {
  const handleChange = info => {
    let file = info.file;
    if (file.status == "done") {
      if (file.response && file.response.httpCode == "200") {
        props.changeDataList(file.response.result);
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
      {props.children}
    </div>
  );
};
export default UpLoadFile;
