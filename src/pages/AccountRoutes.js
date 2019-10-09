
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

class HomeRoutes extends React.Component {
  render() {
    return(
      <Switch>
        <Route  exact path="/account/public" component={Public} />
        <Route  path="/account/protected" component={Protected} />
        <Route  path="/account/baseGoodList" component={BaseGoods}/>
        <Route  path="/account/bgoods" component={Bgoods}/>
        <Route  path="/account/cgoods" component={Cgoods}/>
        <Route  path="/account/bgoodsAdd" component={BgoodsAdd}/>
        <Route  path="/account/cgoodsAdd" component={CgoodsAdd}/>
        <Route  path="/account/bgoodsInfo" component={BgoodsInfo}/>
        <Route  path="/account/cgoodsInfo" component={CgoodsInfo}/>
        <Route  path="/account/baseGoodsAdd/:id?" component={BaseGoodsAdd}/>
        <Route  path="/account/baseGoodsInfo/:id?" component={BaseGoodsInfo}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default HomeRoutes;
