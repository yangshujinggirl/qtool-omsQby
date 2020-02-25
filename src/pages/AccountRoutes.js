import { Switch, Route, Link } from "react-router-dom";
import NotFound from "./NotFound";
import Public from "./Public";
import Protected from "./Protected";
import BaseGoods from "./BaseGoods";
import BaseGoodsAdd from "./BaseGoods/BaseGoodsAdd";
import BaseGoodsInfo from "./BaseGoods/BaseGoodsInfo";

import Cgoods from "./Cgoods";

import CgoodsAdd from "./Cgoods/CgoodsAdd";
import CgoodsInfo from "./Cgoods/CgoodsInfo";

import BrandAdd from "./Brand/BrandAdd";
import BrandInfo from "./Brand/BrandInfo";

import StoreHouse from "./StoreHouse";
import StockManage from "./StockManage";
import StoreAdd from "./StoreHouse/StoreAdd";
//订单中心
import SaleOrder from "./OrderCenter/SaleOrder";
import PosOrder from "./OrderCenter/PosOrder";
import ShopKeeperOrder from "./OrderCenter/ShopKeeperOrder";
import OnlineOrder from "./OrderCenter/OnlineOrder";
import ShopstockOrder from "./OrderCenter/ShopstockOrder";
import TaxOrder from "./OrderCenter/TaxOrder";
import UnconfirmedOrder from "./OrderCenter/UnconfirmedOrder";
import PurchaseOrder from "./OrderCenter/PurchaseOrder"; //采购单
import PurchaseOrderAdd from "./OrderCenter/PurchaseOrder/PurchaseOrderAdd"; //采购单

import Supplier from "./BaseGoodsCenter/Supplier";//供应商
import SupplierAdd from "./BaseGoodsCenter/Supplier/SupplierAdd";
import InvestmentManage from "./BaseGoodsCenter/InvestmentManage"; //招商管理
import InvestmentManageInfo from "./BaseGoodsCenter/InvestmentManage/InvestmentManageInfo"; //招商信息
import ShopManage from "./BaseGoodsCenter/ShopManage";//门店管理
import AddShop from "./BaseGoodsCenter/ShopManage/AddShop";
import SetShop from "./BaseGoodsCenter/ShopManage/SetShop";
import SupplierManage from "./BaseGoodsCenter/SupplierManage";
import AddSupplier from "./BaseGoodsCenter/SupplierManage/AddSupplier";
import OrderAgency from "./OrderCenter/OrderAgency";
/************************************  商品管理  ********************************************/
//基础配置
import Country from "./BaseGoodsCenter/Country"; //国家地区管理
import GoodsAudit from "./BaseGoodsCenter/GoodsAudit"; //商品审核
import Attributions from "./Attributions"; //规格管理
import Brand from "./Brand"; //品牌管理
import Classify from "./Classify"; //后台类目管理
//B端商品
import Bgoods from "./GoodsCenter/Bgoods/GoodsList";
import BgoodsAdd from "./GoodsCenter/Bgoods/GoodsList/BgoodsAdd";//新增
import BgoodsInfo from "./GoodsCenter/Bgoods/GoodsList/BgoodsInfo";//详情
//C端-----------------------------------//////
import DescriptManage from "./Ctip/DescriptManage";//描述属性管理
import DescriptAdd from "./Ctip/DescriptManage/DescriptAdd";//

import CrossBorderGoods from "./Ctip/CrossBorderGoods";//C端跨境商品
import GeneralTradeGoods from "./Ctip/GeneralTradeGoods";//C端一般贸易商品
import GeneralTradeEdit from "./Ctip/GeneralTradeGoods/GeneralTradeEdit";//C端一般贸易商品
import GeneralTradeInfo from "./Ctip/GeneralTradeGoods/GeneralTradeInfo";//C端一般贸易商品
import GeneralTradeLog from "./Ctip/GeneralTradeGoods/GeneralTradeLog";//C端一般贸易商品

import Ctask from './GoodsCenter/Cgoods/Ctask'//批量任务
import AddTask from './GoodsCenter/Cgoods/Ctask/AddTask'//批量任务

class HomeRoutes extends React.Component {
  render() {
    return (
      <Switch>
        {/* <Route exact path="/account/public" component={Public} /> */}
        {/*<Route  path="/account/basicCommodityManage" component={BaseGoods}/>*/}
        <Route  path="/account/generalTradeLog/:id" component={GeneralTradeLog}/>
        <Route  path="/account/generalTradeInfo/:id" component={GeneralTradeInfo}/>
        <Route  path="/account/generalTradeEdit/:id" component={GeneralTradeEdit}/>
        <Route  path="/account/generalTradeGoods" component={GeneralTradeGoods}/>
        <Route  path="/account/crossBorderGoods" component={CrossBorderGoods}/>
        <Route  path="/account/descriptManage" component={DescriptManage}/>
        <Route  path="/account/descriptAdd/:id?" component={DescriptAdd}/>
        <Route  path="/account/items_baseGoods" component={BaseGoods}/>
        <Route  path="/account/bGoods" component={Bgoods}/>
        <Route  path="/account/Csite" component={Cgoods}/>
        <Route  path="/account/bgoodsAdd/:id?" component={BgoodsAdd}/>
        <Route  path="/account/cgoodsAdd/:id?" component={CgoodsAdd}/>
        <Route  path="/account/bgoodsInfo/:id?" component={BgoodsInfo}/>
        <Route  path="/account/cgoodsInfo/:id?" component={CgoodsInfo}/>
        <Route  path="/account/baseGoodsAdd/:id?" component={BaseGoodsAdd}/>
        <Route  path="/account/baseGoodsInfo/:id?" component={BaseGoodsInfo}/>
        <Route  path="/account/brand" component={Brand}/>
        <Route  path="/account/brandAdd/:id?" component={BrandAdd}/>
        <Route  path="/account/brandInfo/:id?" component={BrandInfo}/>
        <Route  path="/account/category" component={Classify}/>
        <Route  path="/account/standards" component={Attributions}/>
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
        <Route  path="/account/supplier" component={SupplierManage}/>
        {/* <Route  path="/account/addSupplier/:id?" component={AddSupplier}/> */}
        <Route  path="/account/addSupplier/:id?" component={AddSupplier}/>
        <Route  path="/account/purchaseOrder" component={PurchaseOrder}/>
        <Route  path="/account/purchaseAdd/:id?" component={PurchaseOrderAdd}/>
        <Route  path="/account/orderAgency" component={OrderAgency}/>
        <Route exact path='/account/country_and_region' component={Country}/>
        <Route path='/account/items_examine' component={GoodsAudit}/>
        <Route path='/account/cTask' component={Ctask}/>
        <Route path='/account/addTask' component={AddTask}/>

        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default HomeRoutes;
