import react, { Component } from "react";
import { connect } from 'dva';
import { Button, message } from "antd";
import BrandBgModal from "../../../BrandBg";
import CommonMod from '../CommonMod';
import { saveBgPicApi,searchBgPicApi} from "../../../../../../services/cConfig/homeConfiguration/brandBg";

import './index.less';

class BrandMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList:[],
      imageUrl: "",
      color: "",
      loading:false
    };
  }
  onEdit = () => {
    const {homepageModuleId} = this.props.info.brandDisplay;
    searchBgPicApi({homepageModuleId}).then(res=>{
      if(res.code == '0'){
        const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
        const {moduleBackColor,contentPicUrl} = res.searchQueryVo
        this.handleResult(fileDomain,moduleBackColor,contentPicUrl)
      }
    })
    this.setState({
      visible: true
    });
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
    this.setState({
      fileList,
      color:moduleBackColor,
      imageUrl:contentPicUrl
    },() => {
      this.setState({
        visible: true,
      });
    });
  }
  //保存
  onOk = () => {
    const { imageUrl, color } = this.state;
    if (!imageUrl) {
      return message.error("请先上传图片", 0.8);
    }
    if(color&&color.length <6 ){
      return message.error('请输入六位颜色色号',.8)
    }
    this.setState({
      loading:true
    });
    const values = {
      homepageModuleId:this.props.info.brandDisplay.homepageModuleId,
      moduleBackColor: color,
      contentPicUrl: imageUrl
    };
    saveBgPicApi(values).then(res => {
      if (res.code == "0") {
        message.success("保存成功");
        this.setState({
          visible: false,
          fileList:[],
          color: "",
          loading:false
        });
        this.props.callback()
      }else{
        this.setState({
          loading:false
        });
      }
    });
  };
  //取消保存
  onCancel = () => {
    this.setState({
      visible: false,
      fileList:[],
      color: ""
    });
  };
  //修改背景颜色
  colorChange = e => {
    this.setState({
      color: e.target.value
    });
  };
  //修改图片
  changeImg = fileList => {
    this.setState({
      fileList
    });
    if (fileList[0] &&fileList[0].status == "done" && fileList[0].response.code == "0") {
      this.setState({
        imageUrl: fileList[0].response.data[0]
      });
    }else{
      this.setState({
        imageUrl:''
      });
    }
  };
  render() {
    const { visible, fileList, color, loading } = this.state;
    const { homepageInfoVo } =this.props.info;
    let { homepageModuleId,moduleBackColor, contentPicUrl,isDisplay } = this.props.info.brandDisplay;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    moduleBackColor = moduleBackColor?`${moduleBackColor}`:null;
    return (
      <CommonMod
        homepageModuleId={homepageModuleId}
        className={`brand-mod hasLine ${!isDisplay?'hiddle-module':''}`}
        style={{'backgroundColor':moduleBackColor}}>
        {
          contentPicUrl?
          <div className="content-wrap">
            <img src={`${fileDomain}${contentPicUrl}`}/>
          </div>
          :
          <div className="no-module-data brand-mod-no-data">品牌背书</div>
        }
        <div className="handle-btn-action">
          {
            !this.props.data.info&&homepageInfoVo&&!!homepageInfoVo.releasable&&
            <div>
              <Button onClick={this.onEdit}>编辑</Button>
              <Button
                onClick={()=>this.props.toggleShow(homepageModuleId,isDisplay)}>
                {isDisplay?'隐藏':'显示'}
              </Button>
            </div>
          }
        </div>
        <BrandBgModal
          visible={visible}
          fileList={fileList}
          color={color}
          colorChange={this.colorChange}
          changeImg={this.changeImg}
          onOk={this.onOk}
          onCancel={this.onCancel}
          loading={loading}
        />
      </CommonMod>
    );
  }
}
export default BrandMod;
