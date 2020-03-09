import { Upload, Button } from "antd";

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
  const handleChange = info => {
    let file = info.file;
    if (file.status == "done") {
      if (file.response && file.response.httpCode == "200") {
        const { result } = file.response; //后端数据格式需保持一致
        if (result.length > 0) {
          result.map((item, index) => (item.key = item.id));
          props.changeDataSource(result);
        }
      }
    }
  };
  //下载模板
  const downLoadTemp = () => {
    props.downLoadTemp();
  };
  const { action, data } = props;
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
    </div>
  );
};
export default UpLoadFile;
