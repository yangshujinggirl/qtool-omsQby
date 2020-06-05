
import ReactDOM,{ render } from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import { helloSaga } from './saga'
import 'antd/dist/antd.less';
import './common/common.less';//reset,公共样式 /
import './common/commonOperation.less';//公共业务样式
import { Sessions } from 'utils';
import rootReducer from './reducers';
import Login from './pages/Login';
import HomeController from './pages/HomeController';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware=createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(helloSaga);
// const store = createStore(rootReducer,applyMiddleware(thunkMiddleware,createLogger()));
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
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
                    <Route component={HomeController}  path="/account" />
                    <Route  path="/login" component={Login}/>
                    <Route  component={HomeController}  exact path="/"/>
                  </div>
          } else {
            return <Redirect to="/login"/>
          }
        }
      }}/>
    </Router>
  </Provider>
  </ConfigProvider>
  ,
  document.getElementById('root')
);
