import { Dropdown, Menu, Modal, Popover, Button, message, Form } from "antd";
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
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
  let [urlCodeWx,setCodeWx] =useState('');
  let [visible,setVisible] =useState(false);
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
  let [flowProduct, setFlowProduct] =useState({moduleContent:[],flowProductList:[]});
  let [singleGoods, setSingleGoods] =useState({moduleContent:[]});
  let homepageId=props.match.params.id;

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
      setFlowProduct(flowProduct);
      setSingleGoods(productDisplay);
    })
  }
  const getFlowProduct=(id)=> {
    GetSearchFlowPdApi(id)
    .then((res)=>{
      setFlowProduct({...flowProduct,flowProductList:[]})
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
  const releaseHome=()=>{}
  const onCancel=()=>{}
  const onOk=()=>{}
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

  return <div className="home-configuration-edit-pages">
          <div className="part-head">
            <p className="pl">{totalData.versionName}</p>
            <div className="pr">
              <Popover content={urlContent} title={null} trigger="click">
                <p className="preview" onClick={goPreview}>预览</p>
              </Popover>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <p>|保存并发布</p>
                </Dropdown>
            </div>
          </div>
          <div className="part-mods">
            <SearchMod info={searchInfo} callback={getInfo}/>
            <BannerMod info={bannerInfo} {...props}/>
            <BrandMod info={brandInfo} {...props} callback={getInfo}  toggleShow={handleDisplay}/>
            <IconMod info={iconInfo} {...props} toggleShow={handleDisplay}/>
            <NewUserMod info={newUserInfo} {...props} toggleShow={handleDisplay}/>
            <SingleGoodsMod info={singleGoods} {...props} toggleShow={handleDisplay}/>
            <MorePicMod info={morePicInfo} {...props}/>
            <MoreGoodsMod info={moreGoods} {...props}/>
            <ThemeMod info={themeInfo} {...props}/>
            <ClassifyMod info={moreGoods} {...props}/>
          </div>
          <ReleaseModal
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}/>
        </div>
}

export default CtipContentAdd;
