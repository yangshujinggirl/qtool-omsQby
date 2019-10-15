
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
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default HomeRoutes;
