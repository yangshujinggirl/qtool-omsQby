
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import NotFound from './NotFound';
import Public from './Public';
import Protected from './Protected';
import BaseGoods from './BaseGoods';
import BaseGoodsAdd from './BaseGoods/BaseGoodsAdd';
import BaseGoodsInfo from './BaseGoods/BaseGoodsInfo';
import BgoodsAdd from './Bgoods/BgoodsAdd';
import BgoodsInfo from './Bgoods/BgoodsInfo';
import Cgoods from './Cgoods';
import Bgoods from './Bgoods';
import CgoodsAdd from './Cgoods/CgoodsAdd';
import CgoodsInfo from './Cgoods/CgoodsInfo';
import Brand from './Brand'
import BrandAdd from './Brand/BrandAdd'
import BrandInfo from './Brand/BrandInfo'
import Classify from './Classify'
import Attributions from './Attributions'
import AttrAdd from './Attributions/AttrAdd'
import AttrBind from './Attributions/AttrBind'
import StoreHouse from './StoreHouse'
import StockManage from './StockManage'
import StoreAdd from './StoreHouse/StoreAdd'
//订单中心
import SaleOrder from './OrderCenter/SaleOrder'
import PosOrder from './OrderCenter/PosOrder'
import ShopKeeperOrder from './OrderCenter/ShopKeeperOrder'
import OnlineOrder from './OrderCenter/OnlineOrder'
import ShopstockOrder from './OrderCenter/ShopstockOrder';
import TaxOrder from './OrderCenter/TaxOrder';
import UnconfirmedOrder from './OrderCenter/UnconfirmedOrder';
import Supplier from './BaseGoodsCenter/Supplier'
import SupplierAdd from './BaseGoodsCenter/Supplier/SupplierAdd'
import InvestmentManage from './BaseGoodsCenter/InvestmentManage'
import ShopManage from './BaseGoodsCenter/ShopManage'
import AddShop from './BaseGoodsCenter/ShopManage/AddShop'
import SetShop from './BaseGoodsCenter/ShopManage/SetShop'
import SupplierManage from './BaseGoodsCenter/SupplierManage'
import AddSupplier from './BaseGoodsCenter/SupplierManage/AddSupplier'

class HomeRoutes extends React.Component {
  render() {
    return(
      <Switch>
        <Route  exact path="/account/public" component={Public} />
        <Route  path="/account/basicCommodityManage" component={BaseGoods}/>
        <Route  path="/account/Bsite" component={Bgoods}/>
        <Route  path="/account/Csite" component={Cgoods}/>
        <Route  path="/account/bgoodsAdd/:id?" component={BgoodsAdd}/>
        <Route  path="/account/cgoodsAdd/:id?" component={CgoodsAdd}/>
        <Route  path="/account/bgoodsInfo/:id?" component={BgoodsInfo}/>
        <Route  path="/account/cgoodsInfo/:id?" component={CgoodsInfo}/>
        <Route  path="/account/baseGoodsAdd/:id?" component={BaseGoodsAdd}/>
        <Route  path="/account/baseGoodsInfo/:id?" component={BaseGoodsInfo}/>
        <Route  path="/account/brandManage" component={Brand}/>
        <Route  path="/account/brandAdd/:id?" component={BrandAdd}/>
        <Route  path="/account/brandInfo/:id?" component={BrandInfo}/>
        <Route  path="/account/categoryManage" component={Classify}/>
        <Route  path="/account/attributeManage" component={Attributions}/>
        <Route  path="/account/AttrAdd/:id?" component={AttrAdd}/>
        <Route  path="/account/AttrBind/:id?" component={AttrBind}/>
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
        <Route  path="/account/InvestmentManage" component={InvestmentManage}/>
        <Route  path="/account/channelManage" component={ShopManage}/>
        <Route  path="/account/addShop/:id?" component={AddShop}/>
        <Route  path="/account/shopSet/:id?" component={SetShop}/>
        <Route  path="/account/supplierManage" component={SupplierManage}/>
        <Route  path="/account/addSupplier/:id?" component={AddSupplier}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default HomeRoutes;
