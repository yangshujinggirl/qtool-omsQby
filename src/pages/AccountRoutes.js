
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import NotFound from './NotFound';
import Public from './Public';
import Protected from './Protected';
import BaseGoods from './BaseGoods';
import Bgoods from './Bgoods';
import BaseGoodsAdd from './BaseGoods/BaseGoodsAdd';
import BaseGoodsInfo from './BaseGoods/BaseGoodsInfo';
import BgoodsAdd from './Bgoods/BgoodsAdd';
import Cgoods from './Cgoods';

class HomeRoutes extends React.Component {
  render() {
    return(
      <Switch>
        <Route  exact path="/account/public" component={Public} />
        <Route  path="/account/protected" component={Protected} />
        <Route  path="/account/baseGoodList" component={BaseGoods}/>
        <Route  path="/account/bgoods" component={Bgoods}/>
        <Route  path="/account/bgoodsAdd" component={BgoodsAdd}/>
        <Route  path="/account/baseGoodsAdd/:id?" component={BaseGoodsAdd}/>
        <Route  path="/account/baseGoodsInfo/:id?" component={BaseGoodsInfo}/>
        <Route  path="/account/cgoods" component={Cgoods}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default HomeRoutes;
