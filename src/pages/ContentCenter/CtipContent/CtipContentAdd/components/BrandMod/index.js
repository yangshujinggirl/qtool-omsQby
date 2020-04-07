import EditModal from "./components/Edit";
import { Sessions } from 'utils';
import CommonMod from '../CommonMod';
import { GetListApi } from "api/contentCenter/BrandSetCtip";

import './index.less';
let fileDomain = Sessions.get('fileDomain');

class BrandMod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList:[],
      color: "",
      loading:false
    };
  }
  onEdit = () => {
    const {homepageModuleId} = this.props.info;
    GetListApi({homepageModuleId})
    .then(res=>{
      const { moduleBackColor,contentPicUrl } = res.result;
      this.handleResult( moduleBackColor,contentPicUrl );
    })
  };
  //结果数据处理
  handleResult=(fileDomain,moduleBackColor,contentPicUrl)=>{
    let fileList = [];
    if(contentPicUrl){
      fileList=[{
        uid: "-1",
        status: "done",
        url: fileDomain + contentPicUrl
      }]
    }
    this.setState({ fileList, color:moduleBackColor},() => {
      this.setState({ visible: true });
    });
  }
  //保存
  onOk = () => { this.props.callback() };
  //取消保存
  onCancel = () => { this.setState({ visible: false }); };
  //更新list
  upDateFilist=(type,fileList)=> {
    this.setState({ fileList });
  }
  render() {
    const { visible, fileList, color, loading } = this.state;
    let { homepageModuleId, moduleBackColor, contentPicUrl, isDisplay } = this.props.info;
    return (
      <CommonMod
        goEdit={this.onEdit}
        hasDisplayBtn={true}
        isDisplay={isDisplay}
        homepageModuleId={homepageModuleId}
        className={`brand-mod hasLine ${!isDisplay?'hiddle-module':''}`}
        style={{'backgroundColor':moduleBackColor}}>
          <div>
            {
              contentPicUrl?
              <div className="content-wrap">
                <img src={`${fileDomain}${contentPicUrl}`}/>
              </div>
              :
              <div className="no-module-data brand-mod-no-data">品牌背书</div>
            }
            <EditModal
              moduleBackColor={color}
              fileList={fileList}
              upDateFilist={this.upDateFilist}
              visible={visible}
              homepageModuleId={homepageModuleId}
              onOk={this.onOk}
              onCancel={this.onCancel}/>
          </div>
      </CommonMod>
    );
  }
}
export default BrandMod;
