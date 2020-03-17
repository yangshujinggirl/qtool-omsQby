import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Checkbox } from 'antd';
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
      const { userName } = res.result;
      Sessions.set('sessionKey','12fkosiuimjjsssssss');
      Sessions.set('userName', userName);
      // Sessions.set('adminType', urUser.adminType);
      // Sessions.set('wsName', urUser.wsName);
      this.props.history.push('/account/country_and_region')
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
