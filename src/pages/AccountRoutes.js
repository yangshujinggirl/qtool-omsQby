
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
import Bgoods from './Bgoods';
import BgoodsAdd from './Bgoods/BgoodsAdd';
import BgoodsDetail from './Bgoods/BgoodsDetail';
import Cgoods from './Cgoods';
import CgoodsAdd from './Cgoods/CgoodsAdd';
import CgoodsDetail from './Cgoods/CgoodsDetail';

class HomeRoutes extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path="/account/public" component={Public}/>
        <Route exact path="/account/protected" component={Protected}/>
        <Route exact path="/account/baseGoodList" component={BaseGoods}/>
        <Route exact path="/account/baseGoodsAdd" component={BaseGoodsAdd}/>
        <Route exact path="/account/bgoods" component={Bgoods}/>
        <Route exact path="/account/bgoodsAdd" component={BgoodsAdd}/>
        <Route exact path="/account/bgoodsDetail" component={BgoodsDetail}/>
        <Route exact path="/account/cgoods" component={Cgoods}/>
        <Route exact path="/account/cgoodsAdd" component={CgoodsAdd}/>
        <Route exact path="/account/cgoodsDetail" component={CgoodsDetail}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default HomeRoutes;
