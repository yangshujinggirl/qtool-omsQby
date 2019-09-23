
import ReactDOM,{ render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import 'antd/dist/antd.less';
import './common/common.less';
import { Sessions } from 'utils';

import rootReducer from './reducers';
import Login from './pages/Login';
import HomeRoutes from './pages/HomeController';

const store = createStore(
        rootReducer,
        applyMiddleware(
          thunkMiddleware,
          createLogger()
        )
      );

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" render={({location})=>{
        let routeName = location.pathname;
        const sessionKey = Sessions.get('sessionKey');
        if(routeName == '/login') {
          return <Route exact path="/login" component={Login}/>
        } else {
          if(sessionKey) {
            return <div>
                    <Route  path="/account" component={HomeRoutes}/>
                    <Route  path="/login" component={Login}/>
                    <Route exact path="/" render={()=>{
                      return <Redirect to="/account/public"/>
                    }} />
                  </div>
          } else {
            return <Redirect to="/login"/>
          }
        }
      }}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
