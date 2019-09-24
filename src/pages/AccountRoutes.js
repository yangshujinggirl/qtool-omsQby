
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Public from './Public';
import Protected from './Protected';
import BaseGoods from './BaseGoods';

class HomeRoutes extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path="/account/public" component={Public} />
        <Route exact path="/account/protected" component={Protected} />
        <Route exact path="/account/baseGoodList" component={BaseGoods}/>
      </Switch>
    )
  }
}

export default HomeRoutes;
