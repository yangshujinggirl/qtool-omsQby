
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

class HomeRoutes extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path="/account/public" component={Public} />
        <Route exact path="/account/protected" component={Protected} />
        <Route exact path="/account/baseGoodList" component={BaseGoods}/>
        <Route exact path="/account/baseGoodsAdd" component={BaseGoodsAdd}/>
        <Route exact path="/account/Bgoods" component={Bgoods}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default HomeRoutes;
