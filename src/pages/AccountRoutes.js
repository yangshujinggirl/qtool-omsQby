
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Public from './Public';
import Protected from './Protected';

class HomeRoutes extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path="/account/public" component={Public} />
        <Route exact path="/account/protected" component={Protected} />
      </Switch>

    )
  }
}

export default HomeRoutes;
