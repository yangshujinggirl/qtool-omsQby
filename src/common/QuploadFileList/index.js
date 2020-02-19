import { Upload, Button } from "antd";
import Qtable from "common/Qtable/index"; //表单
import "./index.less";

const UpLoadFile = props => {
  const handleChange = file => {
    // let file = info.file;{
    // const {response} = file;}
    // if(file.status == 'done'){
    //   if(response&&response.code == '200'){
    //     const {goodList} = response.result;
    //     props.changeDataList()
    //   }
    // };
    props.changeDataList();
  };
  const downLoadTemp = () => {
    props.downLoadTemp();
  };
  const { Columns, dataList } = props;
  const params = JSON.stringify({
    type: 1
  });
  const Props = {
    accept: ".xlsx,.xls",
    name: "mfile",
    action: "/erpWebRest/webrest.htm?code=qerp.web.promotion.activity.import",
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
    </div>
  );
};
export default UpLoadFile;
