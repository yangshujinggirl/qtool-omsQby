import react, { Component } from "react";
import { Input, Button, message } from "antd";
import { SearchOutlined, ScanOutlined } from "@ant-design/icons";
import { Sessions, CommonUtils } from 'utils';
import { GetSavePicApi, GetListApi } from "api/contentCenter/SearchSetCtip";
import CommonMod from '../CommonMod';
import SearchEdit from "./components/Edit";
import "./index.less";


let fileDomain = Sessions.get('fileDomain');

class SearchMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList:[],fileList2:[],fileList3:[],
      loading: false
    };
  }

  //编辑
  onEdit = () => {
    const { homepageModuleId } = this.props.info;
    GetListApi({ homepageModuleId })
    .then(res => {
      let { backgroundPicUrl=[],contentPicUrl=[],noFullScreenBackGroundPic=[] } = res.result;
      backgroundPicUrl = CommonUtils.formatToFilelist(backgroundPicUrl);
      contentPicUrl = CommonUtils.formatToFilelist(contentPicUrl);
      noFullScreenBackGroundPic = CommonUtils.formatToFilelist(noFullScreenBackGroundPic);
      this.setState({
        fileList:backgroundPicUrl,
        fileList2:noFullScreenBackGroundPic,
        fileList3:contentPicUrl
      },() => {
          this.setState({ visible: true });
      });
    });
  };
  //更新数据
  upDateFilist=(type,fileList)=> {
    switch (type) {
      case 1:
        this.setState({ fileList });
        break;
      case 2:
        this.setState({ fileList2:fileList });
        break;
      case 3:
        this.setState({ fileList3:fileList });
        break;
      default:
    }
  }
  onOk = () => {
    this.props.callback();
  };
  onCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible, fileList,fileList2,fileList3, loading } = this.state;
    let { backgroundPicUrl, homepageModuleId } = this.props.info;
    backgroundPicUrl = `${fileDomain}/${backgroundPicUrl}`;
    return (
      <CommonMod
        pageType={this.props.pageType}
        checkResult={this.props.checkResult}
        goEdit={this.onEdit}
        homepageModuleId={homepageModuleId}
        className="search-mod hasLine"
        style={{'background':`#fff url(${backgroundPicUrl}) center`}}>
        <div>
          <Input
            addonBefore={<SearchOutlined />}
            addonAfter={<ScanOutlined />}/>
          <SearchEdit
            fileList={fileList}
            fileList2={fileList2}
            fileList3={fileList3}
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
export default SearchMod;
