import { Modal } from 'antd';
import moment from 'moment';
import { Qbtn, QupLoadImgLimt } from 'common';
import { GetSaveImgApi } from '../../../../../api/home/BaseGoodsCenter/InvestmentManage';
import './index.less';

class UploadModal extends React.Component {
  constructor(props){
    super(props);
    this.state={
      fileList:this.props.fileList
    }
  }
  componentWillReceiveProps(props){
    this.setState({ fileList: props.fileList });
  }
  upDateList=(fileList)=> {
    console.log(fileList)
    this.setState({ fileList: fileList });
  }
  onSubmit=()=>{
    let { fileList }=this.state;
    let file = fileList&&fileList.map((el,index)=> {
      return el.response.result
    })
    let { content={} }= this.props;
    let params ={ id:content.id };
    if(content.status==2) {
      params ={ ...params, intentionContractList:file }
    } else {
      params ={ ...params, formalContractList:value }
    }
    GetSaveImgApi(params)
    .then((res)=> {
      this.props.onOk()
    })
  }
  render() {
    let { content={} }= this.props;
    return(
      <Modal
        className="investment-upload-modal-wrap"
        title={`${content.status=="2"?'上传意向合同':'上传正式合同'}`}
        closable
        width={360}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={[
          <Qbtn key="pass" onClick={this.onSubmit}>确定</Qbtn>
        ]}>
        <div className="audit-main-content">
          <QupLoadImgLimt
            upDateList={this.upDateList}
            limit={5}
            fileList={this.state.fileList}/>
        </div>
      </Modal>
    )
  }
}
export default UploadModal;
