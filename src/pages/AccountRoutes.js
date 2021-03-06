import { Switch, Route, Link } from "react-router-dom";
import NotFound from "./NotFound";
import DefaultPage from "./DefaultPage";

/************************************  商品中心  ********************************************/
//基础配置-----------------------------------//////
import BrandAdd from "./GoodsCenter/BaseConfigCenter/Brand/BrandAdd";
import BrandInfo from "./GoodsCenter/BaseConfigCenter/Brand/BrandInfo";
import Country from "./GoodsCenter/BaseConfigCenter/Country"; //国家地区管理
import Attributions from "./GoodsCenter/BaseConfigCenter/Attributions"; //规格管理
import Brand from "./GoodsCenter/BaseConfigCenter/Brand"; //品牌管理
import Classify from "./GoodsCenter/BaseConfigCenter/Classify"; //后台类目管理
import CgoodsExplain from "./GoodsCenter/BaseConfigCenter/CgoodsExplain"; //后台类目管理
import DescriptManage from "./GoodsCenter/BaseConfigCenter/DescriptManage"; //描述属性管理
import DescriptAdd from "./GoodsCenter/BaseConfigCenter/DescriptManage/DescriptAdd"; //描述属性
import DescriptInfo from "./GoodsCenter/BaseConfigCenter/DescriptManage/DescriptInfo"; //描述属性
import GoodLabel from "./GoodsCenter/BaseConfigCenter/GoodLabel"; //描述属性

//基础商品-----------------------------------//////
import BaseGoods from "./GoodsCenter/BaseGoodsCenter"; //基础商品
import BaseGoodsAdd from "./GoodsCenter/BaseGoodsCenter/BaseGoodsAdd"; //基础商品
import BaseGoodsInfo from "./GoodsCenter/BaseGoodsCenter/BaseGoodsInfo"; //基础商品
import BaseGoodsEditImg from "./GoodsCenter/BaseGoodsCenter/BaseGoodsEditImg"; //基础商品
import BaseGoodsImgInfo from "./GoodsCenter/BaseGoodsCenter/BaseGoodsImgInfo"; //基础商品
import GoodsAudit from "./GoodsCenter/BaseConfigCenter/GoodsAudit"; //商品审核
//C端---------------------------------------//////
import CrossBorderLog from "./GoodsCenter/Cgoods/CrossBorderGoods/CrossBorderLog"; //C端跨境商品
import CrossBorderInfo from "./GoodsCenter/Cgoods/CrossBorderGoods/CrossBorderInfo"; //C端跨境商品
import CrossBorderEdit from "./GoodsCenter/Cgoods/CrossBorderGoods/CrossBorderEdit"; //C端跨境商品
import CrossBorderGoods from "./GoodsCenter/Cgoods/CrossBorderGoods"; //C端跨境商品
import GeneralTradeGoods from "./GoodsCenter/Cgoods/GeneralTradeGoods"; //C端一般贸易商品
import GeneralTradeEdit from "./GoodsCenter/Cgoods/GeneralTradeGoods/GeneralTradeEdit"; //C端一般贸易商品
import GeneralTradeInfo from "./GoodsCenter/Cgoods/GeneralTradeGoods/GeneralTradeInfo"; //C端一般贸易商品
import GeneralTradeLog from "./GoodsCenter/Cgoods/GeneralTradeGoods/GeneralTradeLog"; //C端一般贸易商品
import Ctask from "./GoodsCenter/Cgoods/Ctask"; //C端批量任务
import AddTask from "./GoodsCenter/Cgoods/Ctask/AddTask"; //C端批量任务
import TaskInfo from "./GoodsCenter/Cgoods/Ctask/TaskInfo"; //C端批量任务
import ActExchangeGoods from "./GoodsCenter/Cgoods/ActExchangeGoods";
import AddActExchangeGoods from "./GoodsCenter/Cgoods/ActExchangeGoods/AddGoods";
//B端商品-----------------------------------//////
import Bgoods from "./GoodsCenter/Bgoods/GoodsList"; //商品列表
import BgoodsAdd from "./GoodsCenter/Bgoods/GoodsList/BgoodsAdd"; //新增
import BgoodsInfo from "./GoodsCenter/Bgoods/GoodsList/BgoodsInfo"; //详情
import Btimer from "./GoodsCenter/Bgoods/Btimer"; //B端定时
import AddTimer from "./GoodsCenter/Bgoods/Btimer/AddTimer"; //商品定时
import TimerInfo from "./GoodsCenter/Bgoods/Btimer/TimerInfo"; //商品定时

/************************************  订单中心  ********************************************/
import PurchaseIn from "./OrderCenter/PurchaseOrder/PurchaseIn"; //采购
import AddPurchaseIn from "./OrderCenter/PurchaseOrder/PurchaseIn/AddPurchaseIn"; //新增采购
import PurchaseInDetail from "./OrderCenter/PurchaseOrder/PurchaseIn/PurchaseInDetail"; //采购订单详情
import PurchaseOut from "./OrderCenter/PurchaseOrder/PurchaseOut"; //采退
import PurchaseOutDetail from "./OrderCenter/PurchaseOrder/PurchaseOut/PurchaseOutDetail"; //采退订单详情
import AddPurchaseOut from "./OrderCenter/PurchaseOrder/PurchaseOut/AddPurchaseOut"; //新增采退

import ShopOrder from "./OrderCenter/Border/ShopOrder"; //门店订单
import ShopOrderDetail from "./OrderCenter/Border/ShopOrder/ShopOrderDetail"; //门店订单详情
import ShopOrderAdd from "./OrderCenter/Border/ShopOrder/ShopOrderAdd"; //新建门店订单
import ShopReturnOrderAdd from "./OrderCenter/Border/ShopOrder/ShopReturnOrderAdd"; //新建门店退单
import ShopReturnOrder from "./OrderCenter/Border/ShopReturnOrder"; //门店退单
import ShopReturnOrderDetail from "./OrderCenter/Border/ShopReturnOrder/ShopReturnOrderDetail"; //门店退单

import UserReturn from "./OrderCenter/Corder/UserReturn"; //用户退单
import AllReturnInfo from "./OrderCenter/Corder/UserReturn/AllReturn/AllReturnInfo"; //全部退单详情
import AuditReturnInfo from "./OrderCenter/Corder/UserReturn/AuditReturn/AuditReturnInfo"; //审核退单详情
import AbnormalOrder from "./OrderCenter/AbnormalOrder"; //异常订单
import AbnormalOrderInfo from "./OrderCenter/AbnormalOrder/AbnormalOrderInfo"; //异常订单详情
import ReplaceOrder from "./OrderCenter/ReplaceOrder"; //代发订单
import GetPurchaseInOrder from "./OrderCenter/ReplaceOrder/GetPurchaseInOrder"; //生成采购订单
import ShortageOrder from "./OrderCenter/ShortageOrder"; //生成采购订单
import UserOrder from "./OrderCenter/Corder/UserOrder"; //用户订单
import AddReturnOrder from "./OrderCenter/Corder/UserOrder/AddReturnOrder"; //新增退单
import UserOrderInfo from "./OrderCenter/Corder/UserOrder/UserOrderInfo"; //一般退单详情
import BondedOrderInfo from "./OrderCenter/Corder/UserOrder/BondedOrderInfo"; //保税退单详情
import BondedOrder from "./OrderCenter/BondedOrder"; //保税订单

/************************************  合作中心  ********************************************/
import SupplierManage from "./SupplierManage"; //供应商管理
import SupplierManageAdd from "./SupplierManage/SupplierManageAdd"; //供应商管理
import SupplierManageInfo from "./SupplierManage/SupplierManageInfo"; //供应商管理
import ShopManage from "./CooperateCenter/ShopManage";
import AddShopManage from "./CooperateCenter/ShopManage/AddShopManage";
import ShopManageInfo from "./CooperateCenter/ShopManage/ShopManageInfo";

//门店管理
/************************************  营销中心  ********************************************/
import CtipActivity from "./MarketCenter/PromotionActivity/CtipActivity"; //c端营销活动
import CtipActivityAdd from "./MarketCenter/PromotionActivity/CtipActivity/CtipActivityAdd"; //c端营销活动
import CtipActivityAddTwo from "./MarketCenter/PromotionActivity/CtipActivity/CtipActivityAddTwo"; //c端营销活动
import CtipActivityInfo from "./MarketCenter/PromotionActivity/CtipActivity/CtipActivityInfo"; //c端营销活动
import CouponCenter from "./MarketCenter/CouponCenter"; //优惠券中心
import CouponInfo from "./MarketCenter/CouponCenter/CouponInfo"; //优惠券中心
import CouponAdd from "./MarketCenter/CouponCenter/CouponAdd"; //优惠券中心
import CouponRecord from "./MarketCenter/CouponRecord"; //注券中心
import PosActivity from "./MarketCenter/PromotionActivity/PosActivity"; //POS端营销活动
import PosActivityInfo from "./MarketCenter/PromotionActivity/PosActivity/PosActivityInfo"; //POS端营销活动
import PosActivityAdd from "./MarketCenter/PromotionActivity/PosActivity/PosActivityAdd"; //POS端营销活动
import PosActivityAddTwo from "./MarketCenter/PromotionActivity/PosActivity/PosActivityAddTwo"; //POS端营销活动
import PosAudit from "./MarketCenter/AuditCenter/PosAudit"; //POS审核
import PosAuditEdit from "./MarketCenter/AuditCenter/PosAudit/PosAuditEdit"; //POS审核
import CtipAudit from "./MarketCenter/AuditCenter/CtipAudit"; //C审核
import CtipAuditEdit from "./MarketCenter/AuditCenter/CtipAudit/CtipAuditEdit"; //C审核
import BossActivity from "./MarketCenter/PromotionActivity/BossActivity"; //C审核
import BossActivityAdd from "./MarketCenter/PromotionActivity/BossActivity/BossActivityAdd"; //C审核
import BossActivityInfo from "./MarketCenter/PromotionActivity/BossActivity/BossActivityInfo"; //C审核
/**********************************  内容中心 ***************************************************/
import CtipContent from "./ContentCenter/CtipContent"; //内容列表
import CtipContentAdd from "./ContentCenter/CtipContent/CtipContentAdd/index"; //配置页
import BannerSetCtip from "./ContentCenter/CtipContent/BannerSetCtip"; //banner
import IconSetCtip from "./ContentCenter/CtipContent/IconSetCtip"; //icon
import MorePicSetCtip from "./ContentCenter/CtipContent/MorePicSetCtip"; //多图
import NewUserSetCtip from "./ContentCenter/CtipContent/NewUserSetCtip"; //新人礼
import ThemeActivitySetCtip from "./ContentCenter/CtipContent/ThemeActivitySetCtip"; //主题活动
import MoreGoodSet from "./ContentCenter/CtipContent/MoreGoodSet"; //两行三列活动
import CommodityFlow from "./ContentCenter/CtipContent/CommodityFlow"; //两行三列活动
import SingleGoodsSet from "./ContentCenter/CtipContent/SingleGoodsSet"; //单行商品
import PageSetCtip from './ContentCenter/CtipContent/PageSetCtip';//页面配置
import PageSetEditCtip from './ContentCenter/CtipContent/PageSetCtip/PageSetEditCtip';//页面配置
import CtipContentLog from './ContentCenter/CtipContent/CtipContentLog';//页面配置
import BillLoad from './ContentCenter/CtipContent/BillLoad';//页面配置
/************************************   数据中心   *******************************************/
import GoodsAnalysis from "./DataCenter/GoodsData/GoodsAnalysis"; // 商品数据-->商品分析
import ClassifyAnalysis from "./DataCenter/GoodsData/ClassifyAnalysis"; //商品数据-->分类分析
import GoodsDataList from "./DataCenter/GoodsData/GoodsDataList"; //商品数据-->商品数据
import CommodityExpirySate from "./DataCenter/GoodsData/CommodityExpirySate"; //商品数据-->商品效期
import GoodHotColdData from './DataCenter/GoodsData/GoodsAnalysis/GoodList'//商品数据-->商品分析-->热销滞销商品列表
import ShopOrderData from "./DataCenter/OrderData/Shop"; //订单数据-->门店订单
import PosOrderData from "./DataCenter/OrderData/POS"; //订单数据-->pos订单
import PurchasingAnalysis from "./DataCenter/PurchasingData/PurchasingAnalysis"; //采购数据
import SaleData from "./DataCenter/ShopData/SaleData"; //门店数据-->销售数据
import JointOperationShareProportion from "./DataCenter/ShopData/JointOperationShareProportion"; //门店数据-->联营分成
import AppData from "./DataCenter/AppData"; //App数据
import SpLearning from "./DataCenter/ShopData/SaleData/SpLearning"; //门店学习
import SpRanking from "./DataCenter/ShopData/SaleData/SpRanking"; //门店排行
import SpNotice from "./DataCenter/ShopData/SaleData/SpNotice"; //门店注意
import PurchasingTheArrivalOfTheGoods from "./DataCenter/FinancialData/PurchasingTheArrivalOfTheGoods"; //财务数据--->采购到货
import StoresTheInvoice from "./DataCenter/FinancialData/StoresTheInvoice"; //财务数据--->门店发票
import ShopPos from './DataCenter/ShopPos'//门店pos
import ShopPos_Content from './DataCenter/ShopPos/Content'//门店pos内部



/************************************   渠道管理   *******************************************/
import ChannelStatistic from "./ChannelManage/Statistics";
import ChannelStatisticInfos from "./ChannelManage/Statistics/StatisticInfo";
/************************************   库存中心   *******************************************/
import StoreMange from "./StockCenter/StoreManage"; //仓库管理
import ErpStock from "./StockCenter/GoodStock/ErpStock"; //ERP库存
import ShopStock from "./StockCenter/GoodStock/ShopStock"; //门店库存
import CrossBorderStock from "./StockCenter/GoodStock/CrossBorderStock"; //跨境商品库存
import BstockAdjust from "./StockCenter/StockAdjust/BstockAdjust"; //B端库存调整
import CrossBorderAdjust from "./StockCenter/StockAdjust/CrossBorderAdjust"; //跨境库存调整
/************************************   运营中心   *******************************************/
import Bpush from "./OperateCenter/Boperate/Bpush";
import AddBPush from "./OperateCenter/Boperate/Bpush/AddPush";
import BpushInfos from "./OperateCenter/Boperate/Bpush/BpushDetail";
import Bbanner from "./OperateCenter/Boperate/Bbanner";
import AddBbanner from "./OperateCenter/Boperate/Bbanner/AddBanner";
import Cpush from "./OperateCenter/Coperate/Cpush";
import AddCPush from "./OperateCenter/Coperate/Cpush/AddPush";
import CpushInfos from "./OperateCenter/Coperate/Cpush/CpushDetail";
import ThemeAct from "./OperateCenter/Coperate/ThemeAct";
import AddTheme from "./OperateCenter/Coperate/ThemeAct/AddTheme";
import Banswer from "./OperateCenter/Boperate/Banswer";
import AddBanswer from "./OperateCenter/Boperate/Banswer/AddBanswer";

/************************************   用户中心   *******************************************/
import PosUserOrder from "./UserCenter/PosUserManage";
import PosUserOrderInfo from "./UserCenter/PosUserManage/infos";
import CuserOrder from "./UserCenter/CuserManage";

/************************************   财务中心   *******************************************/
import ShoperRecharge from "./FinancialCenter/Recharge"; //充值
import RechargeInfo from "./FinancialCenter/Recharge/RechargeInfo"; //充值
import Withdraw from "./FinancialCenter/Withdraw"; //提现
import WithdrawInfo from "./FinancialCenter/Withdraw/WithdrawInfo"; //提现详情
import ShopkeeperInOut from "./FinancialCenter/ShopkeeperInOut"; /*** 掌柜收支明细*/
import SaleInOut from "./FinancialCenter/SaleInOut"; /*** 销售收支明细*/
import ShareInProfitManager from "./FinancialCenter/ShareInProfitManager"; /*** 分润管理页面*/
import AccountBanlance from "./FinancialCenter/AccountBanlance"; /*** 账户余额*/

/************************************   客服中心   *******************************************/
import StoreFeedback from "./CustomerServiceCenter/FromB/StoreFeedback"; /*** 门店反馈页面*/
import StoreFeedbackDetail from "./CustomerServiceCenter/FromB/StoreFeedback/StoreFeedbackDetail"; /*** 门店反馈详情页面*/
import UserFeedback from "./CustomerServiceCenter/FromC/UserFeedback"; /*** 用户反馈页面*/
import UserFeedbackDetail from "./CustomerServiceCenter/FromC/UserFeedback/UserFeedbackDetail"; /*** 用户意见反馈详情页面*/
import WorkOrderC from "./CustomerServiceCenter/FromC/WorkOrderC"; /*** C端客服工单*/
import WorkOrderCDetail from "./CustomerServiceCenter/FromC/WorkOrderC/WorkOrderCDetail"; /*** C端客服工单详情*/
import WorkOrder from "./CustomerServiceCenter/FromC/WorkOrder"; /*** 客服工单*/
import WorkOrderDetail from "./CustomerServiceCenter/FromC/WorkOrder/WorkOrderDetail"; /*** 客服工单详情页面*/

/************************************   会员中心   *******************************************/
import TaskGrowthValue from "./MemberCenter/ConfigurationItem/TaskGrowthValue"; /*** 成长值任务*/
import TaskGrowthValueDetail from "./MemberCenter/ConfigurationItem/TaskGrowthValue/TaskGrowthValueDetail"; /*** 成长值任务详情*/
import TaskGrowthEdit from "./MemberCenter/ConfigurationItem/TaskGrowthValue/TaskGrouthEdit";

/************************************   渠道管理   *******************************************/
import ChannelManage from "./ChannelManage/Manage"; /*** 渠道管理*/
import OfflineStoreLevelTwo from "./ChannelManage/Manage/OfflineStore/OfflineStoreLevelTwo"; /*** 线下门店二级渠道管理*/
import MarketPromotionLevelTwo from "./ChannelManage/Manage/MarketPromotion/MarketPromotionLevelTwo"; /*** 市场推广二级渠道管理*/

class HomeRoutes extends React.Component {
  render() {
    return (
      <Switch>
          <Route exact path="/" component={DefaultPage} />
          {/* <Route exact path="/account/public" component={Public} /> */}
          {/* ----------------------------------  商品中心   ---------------------------------------*/}
          <Route exact path="/account/country_and_region" component={Country} />
        <Route exact path="/account/brand" component={Brand} />
        <Route exact path="/account/brandAdd/:id?" component={BrandAdd} />
        <Route exact path="/account/brandInfo/:id?" component={BrandInfo} />
        <Route exact path="/account/category" component={Classify} />
        <Route exact path="/account/standards" component={Attributions} />
        <Route exact path="/account/items_list" component={BaseGoods} />
        <Route exact path="/account/baseGoodsAdd/:type/:id?" component={BaseGoodsAdd}/>
        <Route exact path="/account/baseGoodsInfo/:type/:id?" component={BaseGoodsInfo}/>
        <Route exact path="/account/baseGoodsEditImg/:id?" component={BaseGoodsEditImg}/>
        <Route exact path="/account/baseGoodsImgInfo/:id" component={BaseGoodsImgInfo}/>
        <Route exact path="/account/items_examine" component={GoodsAudit} />
        <Route exact path="/account/commodities_list" component={Bgoods} />
        <Route exact path="/account/bgoodsAdd/:id?" component={BgoodsAdd} />
        <Route exact path="/account/bgoodsInfo/:id?" component={BgoodsInfo} />
        <Route exact path="/account/b_timing" component={Btimer} />
        <Route exact path="/account/addTimer/:id?" component={AddTimer} />
        <Route exact path="/account/timerInfo/:id?" component={TimerInfo} />
        <Route exact path="/account/c_batch_task" component={Ctask} />
        <Route exact path="/account/addTask" component={AddTask} />
        <Route exact path="/account/taskInfo/:id?" component={TaskInfo} />
        <Route exact path="/account/descriptive_attribute" component={DescriptManage}/>
        <Route exact path="/account/descriptAdd/:id?" component={DescriptAdd} />
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
        <Route exact path="/account/event_exchange_products" component={ActExchangeGoods}/>
        <Route exact path="/account/add_act_exchange_goods/:id?" component={AddActExchangeGoods}/>
        <Route exact path="/account/c_label" component={GoodLabel} />
        {/* ----------------------------------  订单中心   ---------------------------------------*/}
        <Route exact path="/account/purchaseOrder" component={PurchaseIn} />
        <Route exact path="/account/add_purchasein/:id?" component={AddPurchaseIn}/>
        <Route exact path="/account/purchaseOrderInDetail/:id" component={PurchaseInDetail}/>
        <Route exact path="/account/purchaseRefundOrder" component={PurchaseOut}/>
        <Route exact path="/account/purchaseRefundOrderOutDetail/:id" component={PurchaseOutDetail}/>
        <Route exact path="/account/add_purchaseOut/:id?" component={AddPurchaseOut}/>
        <Route exact path="/account/channel_orders" component={ShopOrder} />
        <Route exact path="/account/channel_orders/detail/:id?" component={ShopOrderDetail}/>
        <Route exact path="/account/shopOrder/add/:type" component={ShopOrderAdd}/>
        <Route exact path="/account/channel_refund_orders" component={ShopReturnOrder}/>
        <Route exact path="/account/channel_refund_orders/detail/:id?" component={ShopReturnOrderDetail}/>
        <Route exact path="/account/shopReturn/add" component={ShopReturnOrderAdd}/>
        <Route exact path="/account/subscriber_refund_orders" component={UserReturn}/>
        <Route exact path="/account/allReturn_infos/:id?" component={AllReturnInfo}/>
        <Route exact path="/account/auditReturn_info/:id?" component={AuditReturnInfo}/>
        <Route exact path="/account/unlawful_orders" component={AbnormalOrder}/>
        <Route exact path="/account/abnormalOrder_info/:id?" component={AbnormalOrderInfo}/>
        <Route exact path="/account/agency_delivery_orders/:id?" component={ReplaceOrder}/>
        <Route exact path="/account/get_purchasein_order" component={GetPurchaseInOrder}/>
        <Route exact path="/account/shortage_sku_order_detail" component={ShortageOrder}/>
        <Route exact path="/account/addUserOrder_returnOrder" component={AddReturnOrder}/>
        <Route exact path="/account/user_order_infos/:id" component={UserOrderInfo}/>
        <Route exact path="/account/user_bondedOrder_infos/:id" component={BondedOrderInfo}/>
        <Route exact path="/account/subscriber_orders" component={UserOrder} />
        <Route exact path="/account/orderBonded" component={BondedOrder} />
        {/* ----------------------------------  仓库管理   ---------------------------------------*/}

        {/* ----------------------------------  合作中心   ---------------------------------------*/}
        <Route exact path="/account/supplierManage/info/:id" component={SupplierManageInfo}/>
        <Route exact path="/account/supplierManage/add/:id?" component={SupplierManageAdd}/>
        <Route exact path="/account/supplier" component={SupplierManage} />
        <Route exact path="/account/channel" component={ShopManage} />
        <Route exact path="/account/shopManage_edit/:id?" component={AddShopManage}/>
        <Route exact path="/account/shopManage_infos/:id?" component={ShopManageInfo}/>
        {/* ----------------------------------  营销中心   ---------------------------------------*/}
        <Route exact path="/account/c_preferential_promotion" component={CtipActivity}/>
        <Route exact path="/account/ctipActivity/add/:id?" component={CtipActivityAdd}/>
        <Route exact path="/account/ctipActivity/addTwo/:id" component={CtipActivityAddTwo}/>
        <Route exact path="/account/ctipActivity/info/:id" component={CtipActivityInfo}/>
        <Route exact path="/account/coupon_centre" component={CouponCenter} />
        <Route exact path="/account/coupon/info/:id" component={CouponInfo} />
        <Route exact path="/account/coupon/add" component={CouponAdd} />
        <Route exact path="/account/couponRecord/:id?" component={CouponRecord}/>
        <Route exact path="/account/pos_preferential_promotion" component={PosActivity}/>
        <Route exact path="/account/posActivity/add/:id?" component={PosActivityAdd}/>
        <Route exact path="/account/posActivity/info/:id" component={PosActivityInfo}/>
        <Route exact path="/account/posActivity/addTwo/:id" component={PosActivityAddTwo}/>
        <Route exact path="/account/c_sales_promotion_check" component={CtipAudit}/>
        <Route exact path="/account/ctipAudit" component={CtipAudit} />
        <Route exact path="/account/ctipAudit/edit/:id/:auditId" component={CtipAuditEdit}/>
        <Route exact path="/account/pos_sales_promotion_check" component={PosAudit}/>
        <Route exact path="/account/posAudit/edit/:id/:auditId" component={PosAuditEdit}/>
        <Route exact path="/account/b_limited_promotion" component={BossActivity}/>
        <Route exact path="/account/bossActivity/add/:id?" component={BossActivityAdd}/>
        <Route exact path="/account/bossActivity/info/:id" component={BossActivityInfo}
        />
        {/*----------------------------内容中心----------------------------------------------------*/}
        <Route exact path="/account/home_page_configuration" component={CtipContent}/>
        <Route exact path="/account/ctipContent/log/:id" component={CtipContentLog}/>
        <Route exact path="/account/ctipContent/add/:id" component={CtipContentAdd}/>
        <Route exact path="/account/ctipContent/info/:id/:pageType" component={CtipContentAdd}/>
        <Route exact path="/account/cbannerSet/:id?" component={BannerSetCtip}/>
        <Route exact path="/account/cIconSet/:id?" component={IconSetCtip} />
        <Route exact path="/account/cMorePicSet/:id" component={MorePicSetCtip}/>
        <Route exact path="/account/cNewUserSet/:id" component={NewUserSetCtip}/>
        <Route exact path="/account/cThemeSet/:id" component={ThemeActivitySetCtip}/>
        <Route exact path="/account/cMoreGoodSet/:id" component={MoreGoodSet} />
        <Route exact path="/account/commodityFlow/:id" component={CommodityFlow}/>
        <Route exact path="/account/singleGoods/:id" component={SingleGoodsSet}/>
        <Route exact path="/account/page_configuration" component={PageSetCtip}/>
        <Route exact path="/account/cPageSet/edit/:id?" component={PageSetEditCtip}/>
        <Route exact path="/account/extract_page_message" component={BillLoad}/>

        {/* ----------------------------------  数据中心   ---------------------------------------*/}
        <Route exact path="/account/commodity_item_analysis" component={GoodsAnalysis} />
        <Route exact path="/account/classification_analysis" component={ClassifyAnalysis} />
        <Route exact path="/account/commodity_data_information" component={GoodsDataList} />
        <Route exact path="/account/validity_of_products" component={CommodityExpirySate} />
        <Route exact path="/account/hot_cold_good" component={GoodHotColdData} />
        <Route exact path="/account/store_order_information" component={ShopOrderData} />
        <Route exact path="/account/pos_order_information" component={PosOrderData} />
        <Route exact path="/account/purchase_data" component={PurchasingAnalysis} />
        <Route exact path="/account/sales_data_information" component={SaleData} />
        <Route exact path="/account/pool_components_data" component={JointOperationShareProportion} />
        <Route exact path="/account/app_data" component={AppData} />
        <Route exact path="/account/shopData/sp_learning/:id" component={SpLearning} />
        <Route exact path="/account/shopData/sp_ranking" component={SpRanking} />
        <Route exact path="/account/shopData/sp_notice" component={SpNotice} />
        <Route exact path="/account/cost_accounting_data" component={StoresTheInvoice} />
        <Route exact path="/account/stores_cost_data" component={PurchasingTheArrivalOfTheGoods} />
        <Route exact path="/account/store_pos_data" component={ShopPos} />
        <Route exact path="/account/shop_pos_in" component={ShopPos_Content} />




        {/* ----------------------------------  运营中心   ---------------------------------------*/}
        <Route exact path="/account/add_bpush/:id?" component={AddBPush} />
        <Route exact path="/account/b_push" component={Bpush} />
        <Route exact path="/account/b_banner" component={Bbanner} />
        <Route exact path="/account/add_banner/:id?" component={AddBbanner} />
        <Route exact path="/account/themati_activities" component={ThemeAct} />
        <Route exact path="/account/add_theme/:id?" component={AddTheme} />
        <Route exact path="/account/bpush_infos/:id" component={BpushInfos} />
        <Route exact path="/account/add_cpush/:id?" component={AddCPush} />
        <Route exact path="/account/c_push" component={Cpush} />
        <Route exact path="/account/cpush_infos/:id" component={CpushInfos} />
        <Route exact path="/account/b_question" component={Banswer} />
        <Route exact path="/account/add_b_answer/:id?" component={AddBanswer} />
        {/* ----------------------------------  渠道管理   ---------------------------------------*/}
        <Route exact path="/account/bridge_statistics" component={ChannelStatistic}/>
        <Route exact path="/account/bridge_statistics_infos" component={ChannelStatisticInfos}/>

        {/* ----------------------------------  客服中心   ---------------------------------------*/}
        <Route exact path="/account/channel_feedback" component={StoreFeedback}/>
        <Route exact path="/account/channel_feedback/detail/:id?" component={StoreFeedbackDetail}/>
        <Route exact path="/account/user_feedback" component={UserFeedback} />
        <Route exact path="/account/user_feedback/detail/:id?" component={UserFeedbackDetail}/>
        {/* ----------------------------------  财务中心   ---------------------------------------*/}
        <Route exact path="/account/treasurer_recharge" component={ShoperRecharge}/>
        <Route exact path="/account/rechargeInfos/:id" component={RechargeInfo}/>
        <Route exact path="/account/cash_withdrawal" component={Withdraw} />
        <Route exact path="/account/withdrawDetail/:id" component={WithdrawInfo}/>
        <Route exact path="/account/treasurer_definite" component={ShopkeeperInOut}/>
        <Route exact path="/account/sale_definite" component={SaleInOut} />
        <Route exact path="/account/profit_manager" component={ShareInProfitManager}/>
        <Route exact path="/account/account_balance_b" component={AccountBanlance}/>
        {/* ----------------------------------  用户中心   ---------------------------------------*/}
        <Route exact path="/account/c_work_order" component={WorkOrderC} />
        <Route exact path="/account/c_work_order/detail/:id?" component={WorkOrderCDetail}/>
        <Route exact path="/account/work_order" component={WorkOrder} />
        <Route exact path="/account/work_order/detail/:id?" component={WorkOrderDetail}/>
        <Route exact path="/account/pos_user" component={PosUserOrder} />
        <Route exact path="/account/pos_user_infos" component={PosUserOrderInfo} />
        <Route exact path="/account/c_user" component={CuserOrder} />

        {/* ----------------------------------  会员中心   ---------------------------------------*/}
        <Route exact path="/account/growth_task_configuration" component={TaskGrowthValue}/>
        <Route exact path="/account/growth_task_configuration/detail/:id?" component={TaskGrowthValueDetail}/>
        <Route exact path="/account/taskGrowth/edit/:id?" component={TaskGrowthEdit}/>

        {/* ----------------------------------  渠道管理   ---------------------------------------*/}
        <Route exact path="/account/bridge_manager_control" component={ChannelManage}/>
        <Route exact path="/account/bridge_manager_control/offline_store/level_2/:id?" component={OfflineStoreLevelTwo}/>
        <Route exact path="/account/bridge_manager_control/market_promotion/level_2/:id?" component={MarketPromotionLevelTwo}/>
        {/* ----------------------------------  仓库管理   ---------------------------------------*/}
        <Route exact path="/account/warehouse_manager" component={StoreMange} />
        <Route exact path="/account/stock_erp" component={ErpStock} />
        <Route exact path="/account/stock_channel" component={ShopStock} />
        <Route exact path="/account/stock_bonded" component={CrossBorderStock}/>
        <Route exact path="/account/stocking_change_b" component={BstockAdjust}/>
        <Route exact path="/account/stocking_change_bonded" component={CrossBorderAdjust}/>

        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default HomeRoutes;
