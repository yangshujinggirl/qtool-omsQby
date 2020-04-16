import { Dropdown, Menu, Modal, Popover, Button, message, Form } from "antd";
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Qmessage } from 'common';
import { GetEditInfoApi, GetChangeStatusApi, GetSearchFlowPdApi } from 'api/contentCenter/CtipContentAdd';
import SearchMod from "./components/SearchMod";
import BannerMod from "./components/BannerMod";
import BrandMod from "./components/BrandMod";
import IconMod from "./components/IconMod";
import MorePicMod from "./components/MorePicMod";
import NewUserMod from "./components/NewUserMod";
import ThemeMod from "./components/ThemeMod";
import MoreGoodsMod from "./components/MoreGoodsMod";
import ClassifyMod from "./components/ClassifyMod";
import SingleGoodsMod from "./components/SingleGoodsMod";
import ReleaseModal from "./components/ReleaseModal";
import './index.less';

const CtipContentAdd=({...props})=> {
  let [visible,setVisible] =useState(false);
  let [issueContent,setIssue] =useState({});
  let [checkResult,setCheckResult] =useState([]);
  let [urlCodeWx,setCodeWx] =useState('');
  let [urlCodeApp,setCodeApp] =useState('');
  let [totalData, setTotalData] =useState({});
  let [searchInfo, setSearchInfo] =useState({});
  let [bannerInfo, setBannder] =useState({moduleContent:[]});
  let [iconInfo, setIconInfo] =useState({moduleContent:[]});
  let [morePicInfo, setMorePicInfo] =useState({moduleContent:[]});
  let [newUserInfo, setNewUserInfo] =useState({});
  let [themeInfo, setThemeInfo] =useState([]);
  let [moreGoods, setMoreGoods] =useState({moduleContent:[]});
  let [brandInfo, setBrandInfo] =useState({moduleContent:[]});
  let [classifyInfo, setClassifyInfo] =useState({moduleContent:[]});
  let [classifyList, setFlowProductList] =useState([]);
  let [singleGoods, setSingleGoods] =useState({moduleContent:[]});
  let homepageId=props.match.params.id;
  let pageType=props.match.params.pageType;

  const getInfo=()=> {
    GetEditInfoApi(homepageId)
    .then((res)=> {
      let { search, banner, brandDisplay, icon, coupon, productDisplay, picMix,
        multilineProduct, themeActivity, flowProduct, homepageInfoVo } =res.result;
        if(flowProduct&&flowProduct.moduleContent&&flowProduct.moduleContent.length>0) {
          getFlowProduct(flowProduct.moduleContent[0].pdFlowTabId);
        }
      setTotalData(homepageInfoVo);
      setSearchInfo(search);
      setBannder(banner);
      setIconInfo(icon);
      setMorePicInfo(picMix);
      setNewUserInfo(coupon);
      setThemeInfo(themeActivity);
      setMoreGoods(multilineProduct);
      setBrandInfo(brandDisplay);
      setClassifyInfo(flowProduct);
      setSingleGoods(productDisplay);
    })
  }
  const getFlowProduct=(id)=> {
    GetSearchFlowPdApi(id)
    .then((res)=>{
      let { result } =res;
      result = result?result:[];
      result.map((el,index)=>el.key=index);
      setFlowProductList(result)
    })
  }
  const handleDisplay=(homepageModuleId,isDisplay)=> {
    isDisplay=isDisplay?0:1;
    let message = !isDisplay?'确认要隐藏此模块么，确认隐藏，此模块将不会在C端App和小程序中显示':'确认要显示此模块么，确认显示，此模块将会在C端App和小程序中显示'
    Modal.confirm({
      title: '温馨提示',
      content: message,
      onOk:()=>{
        GetChangeStatusApi({homepageModuleId,isDisplay})
        .then((res) => {
          getInfo()
        })
      },
      onCancel:()=> {

      },
    });
  }
  const releaseHome=(value)=>{
    setVisible(true)
    setIssue({type:value.key,homepageId})
  }
  const onOk=(res)=> {
    let msg = issueContent.type=='1'?'发布成功':'立即发布设置成功';
    let { httpCode, result } =res;
    if( httpCode=='200') {
      Qmessage.success(msg);
      props.history.push('/account/home_page_configuration');
    } else if( httpCode=='260'){
      setCheckResult(result)
    }
  }
  const onCancel=()=>{
    setVisible(false);
    setIssue({})
  }
  //二维码生成
  const goPreview=()=> {
    let baseUrl = window.location.href;
    let url = '';
    if(baseUrl.indexOf('https') !== -1){//表示线上
      url ='https://qtoolsapp-hd.qtoolsbaby.cn/home/index.html';
    }else{//测试环境
      url ='http://'+ window.location.host+'/home/index.html';
    };
    let urlCodeWx = `${url}?homepageId=${homepageId}&platform=1`
    let urlCodeApp = `${url}?homepageId=${homepageId}&platform=2`
    QRCode.toDataURL(urlCodeWx)
    .then(url => {
      setCodeWx(url)
    })
    .catch(err => {})
    QRCode.toDataURL(urlCodeApp)
    .then(url => {
      setCodeApp(url)
    })
    .catch(err => {})
  }
  const menu = (
   <Menu className="home-configuration-menu" onClick={releaseHome}>
     <Menu.Item key="1">
       <p>立即发布</p>
     </Menu.Item>
     <Menu.Item key="2">
       <p>定时发布</p>
     </Menu.Item>
   </Menu>
  );
  const urlContent = (
    <div className="urlCode-arr">
      <div className="code-item">
        <img src={urlCodeApp}/>
        扫码查看App首页内容
      </div>
      <div className="code-item">
        <img src={urlCodeWx}/>
        扫码查看小程序首页内容
      </div>
    </div>
  )
  useEffect(()=>{getInfo();goPreview()},[homepageId]);

  return (
    <div className="home-configuration-edit-pages">
      <div className="part-head">
        <p className="pl">{totalData.versionName}</p>
        <div className="pr">
          <Popover content={urlContent} title={null} trigger="click">
            <p className="preview" onClick={goPreview}>预览</p>
          </Popover>
          {
            !pageType&&
            <Dropdown overlay={menu} trigger={["click"]}>
              <p>|保存并发布</p>
            </Dropdown>
          }
        </div>
      </div>
      <div className="part-mods">
        <SearchMod  pageType={pageType} info={searchInfo} callback={getInfo} checkResult={checkResult}/>
        <BannerMod  pageType={pageType} info={bannerInfo} {...props} checkResult={checkResult}/>
        <BrandMod  pageType={pageType} info={brandInfo} {...props} callback={getInfo}  toggleShow={handleDisplay} checkResult={checkResult}/>
        <IconMod  pageType={pageType} info={iconInfo} {...props} toggleShow={handleDisplay} checkResult={checkResult}/>
        <NewUserMod  pageType={pageType} info={newUserInfo} {...props} toggleShow={handleDisplay} checkResult={checkResult}/>
        <SingleGoodsMod  pageType={pageType} info={singleGoods} {...props} toggleShow={handleDisplay} checkResult={checkResult}/>
        <MorePicMod  pageType={pageType} info={morePicInfo} {...props} checkResult={checkResult}/>
        <MoreGoodsMod  pageType={pageType} info={moreGoods} {...props} checkResult={checkResult}/>
        <ThemeMod  pageType={pageType} info={themeInfo} {...props} checkResult={checkResult}/>
        <ClassifyMod  pageType={pageType} info={{...classifyInfo,flowProductList:classifyList}} {...props} checkResult={checkResult}/>
      </div>
      <ReleaseModal
        content={issueContent}
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}/>
    </div>
  )
}

export default CtipContentAdd;
