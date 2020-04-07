import { Button, message, Upload, Modal} from 'antd';
import { connect } from 'dva';
import './index.less';

class ImportBtn extends React.Component {
  state = {
    fileList: []
  }
  beforeUpload(file) {
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
  handleChange = (info) => {
    let file = info.file;
    const { response } =file;
    this.props.dispatch({ type: 'tab/loding', payload:true});
    if(file.status == 'done') {
      if (response) {
        if(response.code=='0'){
          const { unImportSpuArr,notExistSpuArr }=response;
          if(unImportSpuArr&&unImportSpuArr.length>0) {
            let content = <div className="import-error-modal">
            商品已导入超过100个，以下商品导入失败<br/>
            SPUID:
              {
                unImportSpuArr.map((el,index) => el = `${el}${index==(unImportSpuArr.length-1)?'':'/'}`)
              }
            </div>
            message.error(content,5)
          }
          if(notExistSpuArr&&notExistSpuArr.length>0) {
            let content = <div className="import-error-modal">
            以下商品不存在，导入失败<br/>
            SPUID:
              {
                notExistSpuArr.map((el,index) => el = `${el}${index==(notExistSpuArr.length-1)?'':'/'}`)
              }
            </div>
            message.error(content,5)
          }
          let spuList= response.spuList?response.spuList:[];
          spuList.map((el,index) =>{
            el.key = index;
            el.FixedPdSpuId = el.pdSpuId;
          })
          this.props.callback(spuList);
        }else{
          message.error(file.response.message,.8);
        }
        this.props.dispatch({ type: 'tab/loding', payload:false});
        return file.response.status === 'success';
      }
    }
  }
  render() {
    const props = {
      action: '/erpWebRest/webrest.htm?code=qerp.web.config.pdFlowSpu.import',
      onChange: this.handleChange,
      beforeUpload:this.beforeUpload,
      name:'mfile',
      showUploadList:false,
    };
    return (
      <Upload{...props}
        className="upload-file-btn">
          <Button type="primary" size="large">
            批量导入
          </Button>
      </Upload>
    );
  }
}


export default ImportBtn;
