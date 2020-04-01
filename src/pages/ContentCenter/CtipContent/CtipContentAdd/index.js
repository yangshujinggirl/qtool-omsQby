import { Dropdown, Menu, Modal, Popover, Button, message, Form } from "antd";
import { useState, useEffect } from 'react';
import { GetEditInfoApi } from 'api/contentCenter/CtipContentAdd';
import SearchMod from "./components/SearchMod";
import BannerMod from "./components/BannerMod";
import IconMod from "./components/IconMod";
import MorePicMod from "./components/MorePicMod";
import './index.less';

const CtipContentAdd=({...props})=> {
  let [totalData, setTotalData] =useState({search:{}});
  let [bannerInfo, setBannder] =useState({moduleContent:[]});
  let [iconInfo, setIconInfo] =useState({moduleContent:[]});
  let [morePicInfo, setMorePicInfo] =useState({moduleContent:[]});
  let homepageId=props.match.params.id;

  const getInfo=()=> {
    GetEditInfoApi(homepageId)
    .then((res)=> {
      let { search, banner, brandDisplay, icon, coupon, productDisplay, picMix,multilineProduct, themeActivity, flowProduct, homepageInfoVo } =res.result;
      setTotalData(homepageInfoVo);
      setBannder(banner);
      setIconInfo(icon);
      setMorePicInfo(picMix);
      console.log(res)
    })
  }
  const releaseHome=()=>{}
  const goPreview=()=>{}
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
        <img src=""/>
        扫码查看App首页内容
      </div>
      <div className="code-item">
        <img src=""/>
        扫码查看小程序首页内容
      </div>
    </div>
  )
  useEffect(()=>{getInfo()},[homepageId]);

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
            <SearchMod info={totalData}/>
            <BannerMod info={bannerInfo} {...props}/>
            <IconMod info={iconInfo} {...props}/>
            <MorePicMod info={morePicInfo} {...props}/>
          </div>
        </div>
}

export default CtipContentAdd;
