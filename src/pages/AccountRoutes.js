
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
import AttrInfo from './Attributions/AttrInfo'

class HomeRoutes extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact  exact path="/account/public" component={Public} />
        <Route exact  path="/account/basicCommodityManage" component={BaseGoods}/>
        <Route exact  path="/account/Bsite" component={Bgoods}/>
        <Route exact  path="/account/Csite" component={Cgoods}/>
        <Route exact  path="/account/bgoodsAdd" component={BgoodsAdd}/>
        <Route exact  path="/account/cgoodsAdd" component={CgoodsAdd}/>
        <Route exact  path="/account/bgoodsInfo/:id?" component={BgoodsInfo}/>
        <Route exact  path="/account/cgoodsInfo/:id?" component={CgoodsInfo}/>
        <Route exact  path="/account/baseGoodsAdd/:id?" component={BaseGoodsAdd}/>
        <Route exact  path="/account/baseGoodsInfo/:id?" component={BaseGoodsInfo}/>
        <Route exact  path="/account/brandManage" component={Brand}/>
        <Route exact  path="/account/brandAdd/:id?" component={BrandAdd}/>
        <Route exact  path="/account/brandInfo/:id?" component={BrandInfo}/>
        <Route exact  path="/account/categoryManage" component={Classify}/>
        <Route exact  path="/account/attributeManage" component={Attributions}/>
        <Route exact  path="/account/AttrAdd/:id?" component={AttrAdd}/>
        <Route exact  path="/account/AttrInfo/:id?" component={AttrInfo}/>
        <Route  component={NotFound}/>
      </Switch>
    )
  }
}

export default HomeRoutes;
