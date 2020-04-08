import { Button, message, Upload, Modal} from 'antd';

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
    if(file.status == 'done') {
      if (response) {
        if(response.httpCode=='200'){
          let { unImportSpuArr,notExistSpuArr,pdFlowTabSpus }=response.result;
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
          pdFlowTabSpus= pdFlowTabSpus?pdFlowTabSpus:[];
          pdFlowTabSpus.map((el,index) =>{
            el.key = index;
            el.FixedPdSpuId = el.pdSpuId;
          })
          this.props.callback(pdFlowTabSpus);
        }else{
          message.error(file.response.message,.8);
        }
        return file.response.status === 'success';
      }
    }
  }
  render() {
    const props = {
      action: '/qtoolsApp/content/pdFlowTab/pdFlowSpuImport',
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
