import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { GoLoginApi, GoLoginTApi } from '../../api/user/Login';
import { Sessions } from 'utils';
import './index.less';

import LoginForm from './components/LoginForm';
import Banner from './imgs/login_banner.png';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  submit=(values)=> {
    GoLoginTApi(values)
    .then(res=> {
      const { sessionId, urUser } =res;
      Sessions.set('sessionKey',sessionId);
      Sessions.set('name', urUser.name);
      Sessions.set('adminType', urUser.adminType);
      Sessions.set('wsName', urUser.wsName);
      this.props.history.push('/account/public')
    },err=> {
      console.log(err)
    })
  }
  render() {
    return(
      <div className="login-pages">
        <div className="main-content-action">
          <div className="top-action">
            <img src={Banner}></img>
          </div>
          <div className="bottom-action">
            <LoginForm submit={this.submit}/>
          </div>
        </div>
      </div>
    )
  }
}
export default Login;
// export default QbyConnect(Login,Actions,'UserReducers');
