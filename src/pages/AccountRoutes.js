import {Switch, Route, Link} from "react-router-dom";
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
import CgoodsExplain from "./GoodsCenter/BaseConfigCenter/CgoodsExplain"; //后台类目管理
//基础商品-----------------------------------//////
import BaseGoods from "./GoodsCenter/BaseGoodsCenter";//基础商品
import BaseGoodsAdd from "./GoodsCenter/BaseGoodsCenter/BaseGoodsAdd";//基础商品
import BaseGoodsInfo from "./GoodsCenter/BaseGoodsCenter/BaseGoodsInfo";//基础商品
import BaseGoodsEditImg from "./GoodsCenter/BaseGoodsCenter/BaseGoodsEditImg";//基础商品
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
import ShopOrder from './OrderCenter/Border/ShopOrder' //门店订单
import ShopOrderDetail from './OrderCenter/Border/ShopOrder/ShopOrderDetail' //门店订单详情
import ShopOrderAdd from './OrderCenter/Border/ShopOrder/ShopOrderAdd' //门店订单
import ShopReturnOrder from './OrderCenter/Border/ShopReturnOrder' //门店退单
import ShopReturnOrderDetail from './OrderCenter/Border/ShopReturnOrder/ShopReturnOrderDetail' //门店退单
import ShopReturnAdd from './OrderCenter/Border/ShopReturnOrder/ShopReturnAdd' //门店退单
import UserReturn from './OrderCenter/Corder/UserReturn' //用户退单

/************************************  合作中心  ********************************************/
import SupplierManage from './SupplierManage';//供应商管理
import SupplierManageAdd from './SupplierManage/SupplierManageAdd';//供应商管理
import ShopManage from './CooperateCenter/ShopManage'
import AddShopManage from './CooperateCenter/ShopManage/AddShopManage'

//门店管理
/************************************  营销中心  ********************************************/
import CtipActivity from './MarketCenter/PromotionActivity/CtipActivity';//c端营销活动
import CtipActivityAdd from './MarketCenter/PromotionActivity/CtipActivity/CtipActivityAdd';//c端营销活动
import CtipActivityAddTwo from './MarketCenter/PromotionActivity/CtipActivity/CtipActivityAddTwo';//c端营销活动
import CouponCenter from './MarketCenter/CouponCenter';//优惠券中心
import CouponInfo from './MarketCenter/CouponCenter/CouponInfo';//优惠券中心
import CouponAdd from './MarketCenter/CouponCenter/CouponAdd';//优惠券中心
import CouponRecord from './MarketCenter/CouponRecord';//注券中心
import PosActivity from './MarketCenter/PromotionActivity/PosActivity';//c端营销活动

/************************************   数据中心   *******************************************/
/**
 * 商品数据
 */
import GoodsData from './DataCenter/BaseData/GoodsData'
/**
 * 订单数据
 */
import OrderData from "./DataCenter/BaseData/OrderData";
/**
 * 采购数据
 */
import PurchasingData from "./DataCenter/BaseData/PurchasingData";
/**
 * 仓库数据
 */
import WarehouseData from "./DataCenter/BaseData/WarehouseData";
/**
 * 财务数据
 */
import FinancialData from "./DataCenter/BaseData/FinancialData";
/**
 * App数据
 */
import AppData from "./DataCenter/FromC/AppData";
/**
 * 门店数据
 */
import StoreData from "./DataCenter/FromB/StoreData";
/**
 * 门店库存分布页面
 */
import InventoryDistribution
        from "./DataCenter/FromB/StoreData/StoreInventory/InventoryDistribution";

/************************************   渠道管理   *******************************************/
import ChannelStatistic from './ChannelManage/Statistics'
import ChannelStatisticInfos from './ChannelManage/Statistics/StatisticInfo'

/************************************   运营中心   *******************************************/
import Bpush from './OperateCenter/Boperate/Bpush'
import AddBPush from './OperateCenter/Boperate/Bpush/AddPush'
import BpushInfos from './OperateCenter/Boperate/Bpush/BpushDetail'
import Bbanner from './OperateCenter/Boperate/Bbanner'
import AddBbanner from './OperateCenter/Boperate/Bbanner/AddBanner'
import Cpush from './OperateCenter/Coperate/Cpush'
import AddCPush from './OperateCenter/Coperate/Cpush/AddPush'
import CpushInfos from './OperateCenter/Coperate/Cpush/CpushDetail'
import ThemeAct from './OperateCenter/Coperate/ThemeAct'
import AddTheme from './OperateCenter/Coperate/ThemeAct/AddTheme'
import Banswer from './OperateCenter/Boperate/Banswer'
import AddBanswer from './OperateCenter/Boperate/Banswer/AddBanswer'

/************************************   用户中心   *******************************************/
import PosUserOrder from './UserCenter/PosUserManage'

/************************************   财务中心   *******************************************/
import ShoperRecharge from './FinancialCenter/Recharge'
import Withdraw from './FinancialCenter/Withdraw'
/**
 * 掌柜收支明细
 */
import ShopkeeperInOut from './FinancialCenter/ShopkeeperInOut'
/**
 * 销售收支明细
 */
import SaleInOut from "./FinancialCenter/SaleInOut";
/**
 * 分润管理页面
 */
import ShareInProfitManager from "./FinancialCenter/ShareInProfitManager";

/************************************   客服中心   *******************************************/
/**
 * 门店反馈页面
 */
import StoreFeedback from './CustomerServiceCenter/FromB/StoreFeedback'
/**
 * 门店反馈详情页面
 */
import StoreFeedbackDetail from './CustomerServiceCenter/FromB/StoreFeedback/StoreFeedbackDetail'
/**
 * 用户反馈页面
 */
import UserFeedback from './CustomerServiceCenter/FromC/UserFeedback'
/**
 * 用户意见反馈详情页面
 */
import UserFeedbackDetail from './CustomerServiceCenter/FromC/UserFeedback/UserFeedbackDetail'
/**
 * C端客服工单
 */
import WorkOrderC from './CustomerServiceCenter/FromC/WorkOrderC'
/**
 * C端客服工单详情
 */
import WorkOrderCDetail from "./CustomerServiceCenter/FromC/WorkOrderC/WorkOrderCDetail";
/**
 * 客服工单
 */
import WorkOrder from "./CustomerServiceCenter/FromC/WorkOrder";
/**
 * 客服工单详情页面
 */
import WorkOrderDetail from "./CustomerServiceCenter/FromC/WorkOrder/WorkOrderDetail";

/************************************   会员中心   *******************************************/
/**
 * 成长值任务
 */
import TaskGrowthValue from "./MemberCenter/ConfigurationItem/TaskGrowthValue";
/**
 * 成长值任务详情
 */
import TaskGrowthValueDetail
    from "./MemberCenter/ConfigurationItem/TaskGrowthValue/TaskGrowthValueDetail";

/************************************   渠道管理   *******************************************/
/**
 * 渠道管理
 */
import ChannelManage from "./ChannelManage/Manage";
/**
 * 线下门店二级渠道管理
 */
import OfflineStoreLevelTwo from "./ChannelManage/Manage/OfflineStore/OfflineStoreLevelTwo";
/**
 * 市场推广二级渠道管理
 */
import MarketPromotionLevelTwo
    from "./ChannelManage/Manage/MarketPromotion/MarketPromotionLevelTwo";

class HomeRoutes extends React.Component {
    render() {
        return (
            <Switch>
                {/* <Route exact path="/account/public" component={Public} /> */}
                {/* ----------------------------------  商品中心   ---------------------------------------*/}
                <Route exact path='/account/country_and_region' component={Country}/>
                <Route exact path="/account/brand" component={Brand}/>
                <Route exact path="/account/brandAdd/:id?" component={BrandAdd}/>
                <Route exact path="/account/brandInfo/:id?" component={BrandInfo}/>
                <Route exact path="/account/category" component={Classify}/>
                <Route exact path="/account/standards" component={Attributions}/>
                <Route exact path="/account/items_list" component={BaseGoods}/>
                <Route exact path="/account/baseGoodsAdd/:type/:id?" component={BaseGoodsAdd}/>
                <Route exact path="/account/baseGoodsInfo/:type/:id?" component={BaseGoodsInfo}/>
                <Route exact path="/account/baseGoodsEditImg/:id?" component={BaseGoodsEditImg}/>
                <Route exact path='/account/items_examine' component={GoodsAudit}/>
                <Route exact path="/account/commodities_list" component={Bgoods}/>
                <Route exact path="/account/bgoodsAdd/:id?" component={BgoodsAdd}/>
                <Route exact path="/account/bgoodsInfo/:id?" component={BgoodsInfo}/>
                <Route exact path='/account/b_timing' component={Btimer}/>
                <Route exact path='/account/addTimer/:id?' component={AddTimer}/>
                <Route exact path='/account/timerInfo/:id?' component={TimerInfo}/>
                <Route exact path='/account/c_batch_task' component={Ctask}/>
                <Route exact path='/account/addTask' component={AddTask}/>
                <Route exact path='/account/taskInfo/:id?' component={TaskInfo}/>
                <Route exact path="/account/descriptive_attribute" component={DescriptManage}/>
                <Route exact path="/account/descriptAdd/:id?" component={DescriptAdd}/>
                <Route exact path="/account/descriptInfo/:id?" component={DescriptInfo}/>
                <Route exact path="/account/cross_border_product" component={CrossBorderGoods}/>
                <Route exact path="/account/CrossBorder/log/:id" component={CrossBorderLog}/>
                <Route exact path="/account/CrossBorder/edit/:id" component={CrossBorderEdit}/>
                <Route exact path="/account/CrossBorder/info/:id" component={CrossBorderInfo}/>
                <Route exact path="/account/generalTrade/log/:id" component={GeneralTradeLog}/>
                <Route exact path="/account/generalTrade/info/:id" component={GeneralTradeInfo}/>
                <Route exact path="/account/generalTrade/edit/:id" component={GeneralTradeEdit}/>
                <Route exact path="/account/general_trade_product" component={GeneralTradeGoods}/>
                <Route exact path="/account/c_product_title" component={CgoodsExplain}/>
                {/* ----------------------------------  订单中心   ---------------------------------------*/}
                <Route exact path='/account/purchaseOrder' component={PurchaseIn}/>
                <Route exact path='/account/add_purchasein/:id?' component={AddPurchaseIn}/>
                <Route exact path="/account/purchaseOrderInDetail/:id"
                       component={PurchaseInDetail}/>
                <Route exact path='/account/purchaseRefundOrder' component={PurchaseOut}/>
                <Route exact path="/account/purchaseRefundOrderOutDetail/:id"
                       component={PurchaseOutDetail}/>
                <Route exact path="/account/add_purchaseOut/:id?" component={AddPurchaseOut}/>
                <Route exact path='/account/channel_orders' component={ShopOrder}/>
                <Route exact path='/account/channel_orders/detail/:id?'
                       component={ShopOrderDetail}/>
                <Route exact path='/account/shopOrder/add/:id?' component={ShopOrderAdd}/>
                <Route exact path='/account/channel_refund_orders' component={ShopReturnOrder}/>
                <Route exact path='/account/channel_refund_orders/detail/:id?'
                       component={ShopReturnOrderDetail}/>
                <Route exact path='/account/shopReturn/add/:id?' component={ShopReturnAdd}/>
                <Route exact path='/account/subscriber_refund_orders' component={UserReturn}/>
                {/* ----------------------------------  仓库管理   ---------------------------------------*/}

                {/* ----------------------------------  合作中心   ---------------------------------------*/}
                <Route exact path="/account/supplierManage/add/:id" component={SupplierManageAdd}/>
                <Route exact path="/account/supplierManage" component={SupplierManage}/>
                <Route exact path='/account/channel' component={ShopManage}/>
                {/* ----------------------------------  营销中心   ---------------------------------------*/}
                <Route exact path="/account/c_preferential_promotion" component={CtipActivity}/>
                <Route exact path="/account/ctipActivity/add/:id?" component={CtipActivityAdd}/>
                <Route exact path="/account/ctipActivity/addTwo/:id" component={CtipActivityAddTwo}/>
                <Route exact path="/account/coupon_centre" component={CouponCenter}/>
                <Route exact path="/account/coupon/info/:id" component={CouponInfo}/>
                <Route exact path="/account/coupon/add" component={CouponAdd}/>
                <Route exact path="/account/couponRecord/:id?" component={CouponRecord}/>
                <Route exact path="/account/pos_preferential_promotion" component={PosActivity}/>


                {/* ----------------------------------  数据中心   ---------------------------------------*/}
                <Route exact path='/account/product_data' component={GoodsData}/>
                <Route exact path='/account/order_data' component={OrderData}/>
                <Route exact path='/account/purchase_data' component={PurchasingData}/>
                <Route exact path='/account/warehouse_data' component={WarehouseData}/>
                <Route exact path='/account/app_data' component={AppData}/>
                <Route exact path='/account/channel_data' component={StoreData}/>
                <Route exact path='/account/channel_data/StoreInventory/Distribution/:id'
                       component={InventoryDistribution}/>

                {/* ----------------------------------  运营中心   ---------------------------------------*/}
                <Route exact path='/account/add_bpush/:id?' component={AddBPush}/>
                <Route exact path='/account/b_push' component={Bpush}/>
                <Route exact path='/account/b_banner' component={Bbanner}/>
                <Route exact path='/account/add_banner/:id?' component={AddBbanner}/>
                <Route exact path='/account/themati_activities' component={ThemeAct}/>
                <Route exact path='/account/add_theme/:id?' component={AddTheme}/>
                <Route exact path='/account/bpush_infos' component={BpushInfos}/>
                <Route exact path='/account/add_cpush/:id?' component={AddCPush}/>
                <Route exact path='/account/c_push' component={Cpush}/>
                <Route exact path='/account/cpush_infos' component={CpushInfos}/>
                <Route exact path='/account/b_question' component={Banswer}/>
                <Route exact path='/account/add_b_answer/:id?' component={AddBanswer}/>
                {/* ----------------------------------  渠道管理   ---------------------------------------*/}
                <Route exact path='/account/bridge_statistics' component={ChannelStatistic}/>
                <Route exact path='/account/bridge_statistics_infos'
                       component={ChannelStatisticInfos}/>


                {/* ----------------------------------  客服中心   ---------------------------------------*/}
                <Route exact path='/account/channel_feedback' component={StoreFeedback}/>
                <Route exact path='/account/channel_feedback/detail/:id?'
                       component={StoreFeedbackDetail}/>
                <Route exact path='/account/user_feedback' component={UserFeedback}/>
                <Route exact path='/account/user_feedback/detail/:id?'
                       component={UserFeedbackDetail}/>
                {/* ----------------------------------  财务中心   ---------------------------------------*/}
                <Route exact path='/account/treasurer_recharge' component={ShoperRecharge}/>
                <Route exact path='/account/cash_withdrawal' component={Withdraw}/>
                <Route exact path='/account/treasurer_definite' component={ShopkeeperInOut}/>
                <Route exact path='/account/sale_definite' component={SaleInOut}/>
                <Route exact path='/account/profit_manager' component={ShareInProfitManager}/>
                <Route exact path='/account/finance_data' component={FinancialData}/>
                {/* ----------------------------------  用户中心   ---------------------------------------*/}
                <Route exact path='/account/c_work_order' component={WorkOrderC}/>
                <Route exact path='/account/c_work_order/detail/:id?' component={WorkOrderCDetail}/>
                <Route exact path='/account/work_order' component={WorkOrder}/>
                <Route exact path='/account/work_order/detail/:id?' component={WorkOrderDetail}/>
                <Route exact path='/account/pos_user' component={PosUserOrder}/>

                {/* ----------------------------------  会员中心   ---------------------------------------*/}
                <Route exact path='/account/growth_task_configuration' component={TaskGrowthValue}/>
                <Route exact path='/account/growth_task_configuration/detail/:id?'
                       component={TaskGrowthValueDetail}/>

                {/* ----------------------------------  渠道管理   ---------------------------------------*/}
                <Route exact path='/account/bridge_manager_control' component={ChannelManage}/>
                <Route exact path='/account/bridge_manager_control/offline_store/level_2/:id?'
                       component={OfflineStoreLevelTwo}/>
                <Route exact path='/account/bridge_manager_control/market_promotion/level_2/:id?'
                       component={MarketPromotionLevelTwo}/>


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
