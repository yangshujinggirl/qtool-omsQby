import React, { useState } from "react";
import { Upload, Button, Modal, Table, message } from "antd";
import "./index.less";

let keyIndex = 100;
/**
 *                                  是否必传
 * @param {Columns:[]} 列表字段       true
 * @param {dataSource:[]} 列表数据    true
 * @param {action:String} 导入的url   true
 * @param {data:{}} 如果存在post导入，参数
 * @param {del:Boolean} 列表是否可以删除 false
 * @param {footer:Boolean} 列表底部是否可以添加 false
 * @param {changeDataSource:function} 更改父组件的列表数据函数 true
 *
 */

const UpLoadFile = ({
  Columns,
  dataSource = [],
  action,
  data,
  del,
  footer,
  changeDataSource,
  downLoadTemp
}) => {
  const [errorMsg, setErrMsg] = useState("");
  const [visible, setVisible] = useState("");
  /**
   *上传change
   * @param {*} info
   */
  const handleChange = info => {
    let file = info.file;
    if (file.status == "done") {
      if (file.response && file.response.httpCode == "200") {
        const { result } = file.response;
        if (result.constructor == Object) {
          if (result.hasOwnProperty("msg")) {
            if (result['msg']&&result['msg']!='success') {
              setErrMsg(result['msg']);
              setVisible(true);
            }
            result.result.map((item, index) => {
              item.key = index;
            });
            changeDataSource(result["result"]);
            return;
          }
          if (result["message"]) {
            setErrMsg(result["message"]);
            setVisible(true);
          }
          result.list.map((item, index) => {
            item.key = index;
          });
          changeDataSource(result["list"]);
          return;
        }
        result.map((item, index) => {
          item.key = index;
        });
        changeDataSource(result);
      } else {
        message.error(file.response.msg, 0.8);
      }
    }
  };
  /**
   * 下载模板
   */
  const downLoadTempFuc = () => {
    downLoadTemp();
  };
  /**
   * 弹窗消失
   */
  const onCancel = () => {
    setVisible(false);
  };
  /**
   * 新增
   */
  const add = () => {
    keyIndex++;
    const newData = [...dataSource, { key: keyIndex }];
    changeDataSource(newData);
  };
  /**
   * 删除
   * @param {*} record
   */
  const delet = record => {
    let newData = [...dataSource];
    const index = newData.findIndex(item => record.key == item.key);
    newData.splice(index, 1);
    changeDataSource(newData);
  };
/**
 * Columns二次加工--->是否存在删除
 */
  const EditColumns = del
    ? [
        ...Columns,
        {
          title: "操作",
          render: (text, record, index) => {
            return (
              dataSource.length > 1 && <a onClick={() => delet(record)}>删除</a>
            );
          }
        }
      ]
    : Columns;
/**
 * 请求参数
 */
  let params = null;
  if (data) {
    params = JSON.stringify(data);
  }
  /**
   * upload  参数
   */
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
        <a className="download" onClick={downLoadTempFuc}>
          下载导入模板
        </a>
      </div>
      {dataSource.length > 0 && (
        <Table
          dataSource={dataSource}
          columns={EditColumns}
          pagination={false}
          bordered={true}
          rowKey={record => record.key}
          footer={footer ? () => <Button onClick={add}>+商品</Button> : null}
        />
      )}
      {visible && (
        <Modal
          title="导入商品结果"
          visible={visible}
          footer={null}
          onCancel={onCancel}
        >
          <div>
            <p style={{ color: "#35bab0" }}>
              共成功导入商品{dataSource.length}条
            </p>
            {errorMsg && <p>{errorMsg}</p>}
          </div>
        </Modal>
      )}
    </div>
  );
};
export default UpLoadFile;
