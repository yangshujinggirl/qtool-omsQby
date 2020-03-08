import { Switch, Route, Link } from "react-router-dom";
import NotFound from "./NotFound";
// import Public from "./Public";
// import Protected from "./Protected";
// import Cgoods from "./Cgoods";
// import CgoodsAdd from "./Cgoods/CgoodsAdd";
// import CgoodsInfo from "./Cgoods/CgoodsInfo";

// import StoreHouse from "./StoreHouse";
// import StockManage from "./StockManage";
// import StoreAdd from "./StoreHouse/StoreAdd";
// //订单中心
// import SaleOrder from "./OrderCenter/SaleOrder";
// import PosOrder from "./OrderCenter/PosOrder";
// import ShopKeeperOrder from "./OrderCenter/ShopKeeperOrder";
// import OnlineOrder from "./OrderCenter/OnlineOrder";
// import ShopstockOrder from "./OrderCenter/ShopstockOrder";
// import TaxOrder from "./OrderCenter/TaxOrder";
// import UnconfirmedOrder from "./OrderCenter/UnconfirmedOrder";
// import Supplier from "./GoodsCenter/BaseConfigCenter/Supplier";//供应商
// import SupplierAdd from "./GoodsCenter/BaseConfigCenter/Supplier/SupplierAdd";
// import InvestmentManage from "./GoodsCenter/BaseConfigCenter/InvestmentManage"; //招商管理
// import InvestmentManageInfo from "./GoodsCenter/BaseConfigCenter/InvestmentManage/InvestmentManageInfo"; //招商信息
// import ShopManage from "./GoodsCenter/BaseConfigCenter/ShopManage";//门店管理
// import AddShop from "./GoodsCenter/BaseConfigCenter/ShopManage/AddShop";
// import SetShop from "./GoodsCenter/BaseConfigCenter/ShopManage/SetShop";
// // import SupplierManage from "./GoodsCenter/BaseConfigCenter/SupplierManage";
// import AddSupplier from "./GoodsCenter/BaseConfigCenter/SupplierManage/AddSupplier";
// import OrderAgency from "./OrderCenter/OrderAgency";




/************************************  商品中心  ********************************************/
//基础配置-----------------------------------//////
import BrandAdd from "./Brand/BrandAdd";
import BrandInfo from "./Brand/BrandInfo";
import Country from "./GoodsCenter/BaseConfigCenter/Country"; //国家地区管理
import Attributions from "./Attributions"; //规格管理
import Brand from "./Brand"; //品牌管理
import Classify from "./Classify"; //后台类目管理
//基础商品-----------------------------------//////
import BaseGoods from "./GoodsCenter/BaseGoodsCenter";//基础商品
import BaseGoodsAdd from "./GoodsCenter/BaseGoodsCenter/BaseGeneralTradeGoods/BaseGeneralTradeAdd";//基础商品
import BaseGoodsInfo from "./GoodsCenter/BaseGoodsCenter/BaseGeneralTradeGoods/BaseGeneralTradeInfo";//基础商品
import GoodsAudit from "./GoodsCenter/BaseConfigCenter/GoodsAudit"; //商品审核
//C端---------------------------------------//////
import DescriptManage from "./Ctip/DescriptManage";//描述属性管理
import DescriptAdd from "./Ctip/DescriptManage/DescriptAdd";//描述属性
import DescriptInfo from "./Ctip/DescriptManage/DescriptInfo";//描述属性
import CrossBorderLog from "./Ctip/CrossBorderGoods/CrossBorderLog";//C端跨境商品
import CrossBorderInfo from "./Ctip/CrossBorderGoods/CrossBorderInfo";//C端跨境商品
import CrossBorderEdit from "./Ctip/CrossBorderGoods/CrossBorderEdit";//C端跨境商品
import CrossBorderGoods from "./Ctip/CrossBorderGoods";//C端跨境商品
import GeneralTradeGoods from "./Ctip/GeneralTradeGoods";//C端一般贸易商品
import GeneralTradeEdit from "./Ctip/GeneralTradeGoods/GeneralTradeEdit";//C端一般贸易商品
import GeneralTradeInfo from "./Ctip/GeneralTradeGoods/GeneralTradeInfo";//C端一般贸易商品
import GeneralTradeLog from "./Ctip/GeneralTradeGoods/GeneralTradeLog";//C端一般贸易商品
import Ctask from './GoodsCenter/Cgoods/Ctask'//C端批量任务
import AddTask from './GoodsCenter/Cgoods/Ctask/AddTask'//C端批量任务
import TaskInfo from './GoodsCenter/Cgoods/Ctask/TaskInfo'//C端批量任务
//B端商品-----------------------------------//////
import Bgoods from "./GoodsCenter/Bgoods/GoodsList";//商品列表
import BgoodsAdd from "./GoodsCenter/Bgoods/GoodsList/BgoodsAdd";//新增
import BgoodsInfo from "./GoodsCenter/Bgoods/GoodsList/BgoodsInfo";//详情
import Btimer from './GoodsCenter/Bgoods/Btimer' //B端定时
import AddTimer from './GoodsCenter/Bgoods/Btimer/AddTimer' //商品定时
import TimerInfo from './GoodsCenter/Bgoods/Btimer/TimerInfo' //商品定时

/************************************  订单中心  ********************************************/
import PurchaseIn from './OrderCenter/PurchaseOrder/PurchaseIn' //采购
import AddPurchaseIn from './OrderCenter/PurchaseOrder/PurchaseIn/AddPurchaseIn' //新增采购
import PurchaseInDetail from "./OrderCenter/PurchaseOrder/PurchaseIn/PurchaseInDetail";//采购订单详情
import PurchaseOut from './OrderCenter/PurchaseOrder/PurchaseOut' //采退
import PurchaseOutDetail from "./OrderCenter/PurchaseOrder/PurchaseOut/PurchaseOutDetail";//采退订单详情
import AddPurchaseOut from './OrderCenter/PurchaseOrder/PurchaseOut/AddPurchaseOut' //新增采退
import shopOrder from './OrderCenter/Border/ShopOrder' //门店订单
import shopReturnOrder from './OrderCenter/Border/ShopReturnOrder' //门店退单

/************************************  合作中心  ********************************************/
import SupplierManage from './SupplierManage';//供应商管理
import SupplierManageAdd from './SupplierManage/SupplierManageAdd';//供应商管理
import shopManage from './CooperateCenter/ShopManage'

//门店管理



class HomeRoutes extends React.Component {
  render() {
    return (
      <Switch>
        {/* <Route exact path="/account/public" component={Public} /> */}
{/* ----------------------------------  商品中心   ---------------------------------------*/}
          <Route exact path='/account/country_and_region' component={Country}/>
          <Route  path="/account/brand" component={Brand}/>
          <Route  path="/account/brandAdd/:id?" component={BrandAdd}/>
          <Route  path="/account/brandInfo/:id?" component={BrandInfo}/>
          <Route  path="/account/category" component={Classify}/>
          <Route  path="/account/standards" component={Attributions}/>
          <Route  path="/account/items_list" component={BaseGoods}/>
          <Route  path="/account/baseGoodsAdd/:id?" component={BaseGoodsAdd}/>
          <Route  path="/account/baseGoodsInfo/:id?" component={BaseGoodsInfo}/>
          <Route path='/account/items_examine' component={GoodsAudit}/>
          <Route  path="/account/commodities_list" component={Bgoods}/>
          <Route  path="/account/bgoodsAdd/:id?" component={BgoodsAdd}/>
          <Route  path="/account/bgoodsInfo/:id?" component={BgoodsInfo}/>
          <Route path='/account/b_timing' component={Btimer}/>
          <Route path='/account/addTimer/:id?' component={AddTimer}/>
          <Route path='/account/timerInfo/:id?' component={TimerInfo}/>
          <Route path='/account/c_batch_task' component={Ctask}/>
          <Route path='/account/addTask' component={AddTask}/>
          <Route path='/account/taskInfo/:id?' component={TaskInfo}/>
          <Route  path="/account/descriptive_attribute" component={DescriptManage}/>
          <Route  path="/account/descriptAdd/:id?" component={DescriptAdd}/>
          <Route  path="/account/descriptInfo/:id?" component={DescriptInfo}/>
          <Route  path="/account/cross_border_product" component={CrossBorderGoods}/>
          <Route  path="/account/CrossBorder/log/:id" component={CrossBorderLog}/>
          <Route  path="/account/CrossBorder/edit/:id" component={CrossBorderEdit}/>
          <Route  path="/account/CrossBorder/info/:id" component={CrossBorderInfo}/>
          <Route  path="/account/generalTrade/log/:id" component={GeneralTradeLog}/>
          <Route  path="/account/generalTrade/info/:id" component={GeneralTradeInfo}/>
          <Route  path="/account/generalTrade/edit/:id" component={GeneralTradeEdit}/>
          <Route  path="/account/general_trade_product" component={GeneralTradeGoods}/>
{/* ----------------------------------  订单中心   ---------------------------------------*/}
        <Route path='/account/purchaseOrder' component={PurchaseIn}/>
        <Route path='/account/add_purchasein/:id?' component={AddPurchaseIn}/>
        <Route path="/account/purchaseOrderInDetail/:id" component={PurchaseInDetail}/>
        <Route path='/account/purchaseRefundOrder' component={PurchaseOut}/>
          <Route path="/account/purchaseRefundOrderOutDetail/:id" component={PurchaseOutDetail}/>
          <Route path="/account/add_purchaseOut/:id?" component={AddPurchaseOut}/>
        <Route path='/account/c_batch_task' component={shopOrder}/>
        <Route path='/account/c_batch_task' component={shopReturnOrder}/>
{/* ----------------------------------  仓库管理   ---------------------------------------*/}

{/* ----------------------------------  合作中心   ---------------------------------------*/}
        <Route  path="/account/supplierManage/add/:id" component={SupplierManageAdd}/>
        <Route  path="/account/supplierManage" component={SupplierManage}/>
        <Route path='/account/channel' component={shopManage}/>








        {/*


        <Route  path="/account/descriptAdd/:id?" component={DescriptAdd}/>
        <Route  path="/account/Csite" component={Cgoods}/>
        <Route  path="/account/cgoodsAdd/:id?" component={CgoodsAdd}/>

        <Route  path="/account/cgoodsInfo/:id?" component={CgoodsInfo}/>
        <Route  path="/account/wareHouseManage" component={StoreHouse}/>
        <Route  path="/account/stockManage" component={StockManage}/>
        <Route  path="/account/storeAdd/:id?" component={StoreAdd}/>
        <Route  path="/account/orderException" component={ShopstockOrder}/>
        <Route  path="/account/orderConfirm" component={UnconfirmedOrder}/>
        <Route  path="/account/orderSale" component={SaleOrder}/>
        <Route  path="/account/orderPos" component={PosOrder}/>
        <Route  path="/account/orderShopkeeper" component={ShopKeeperOrder}/>
        <Route  path="/account/orderOnline" component={OnlineOrder}/>
        <Route  path="/account/orderBonded" component={TaxOrder}/>
        <Route  path="/account/productsIstation" component={Supplier}/>
        <Route  path="/account/supplierAdd/:id?" component={SupplierAdd}/>
        <Route  path="/account/customer" component={InvestmentManage}/>
        <Route  path="/account/investmentInfo/:id" component={InvestmentManageInfo}/>
        <Route  path="/account/channel" component={ShopManage}/>
        <Route  path="/account/addShop/:id?" component={AddShop}/>
        <Route  path="/account/shopSet/:id?" component={SetShop}/>
        // <Route  path="/account/supplier" component={SupplierManage}/>
        {/* <Route  path="/account/addSupplier/:id?" component={AddSupplier}/> */}
        {/* <Route  path="/account/addSupplier/:id?" component={AddSupplier}/>
        <Route  path="/account/orderAgency" component={OrderAgency}/> */}
        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default HomeRoutes;
