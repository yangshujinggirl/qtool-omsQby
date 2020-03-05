import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { Sessions } from 'utils';
import { GoLoginOutTApi } from '../../../../api/user/Login';
import './index.less';
const { SubMenu } = Menu;



class AccountInfo extends Component {
  onClick=(value)=> {
    console.log(value)
    let type = value.key;
    switch (type) {
      case '0':
        console.log(type)
        break;
      case '1':
        this.changePassWord()
        break;
      case '2':
        this.loginOut()
        break;
    }
  }
  changePassWord=()=> {

  }
  loginOut=()=> {
    GoLoginOutTApi()
    .then((res)=> {
      Sessions.clear()
      // Sessions.set('wsName', urUser.wsName);
      this.props.history.push('/')
    })
  }
  render() {
    const menu = (
      <Menu onClick={this.onClick}>
        <Menu.Item key="0">
          使用说明
        </Menu.Item>
        <Menu.Item key="1">
          修改密码
        </Menu.Item>
        <Menu.Item key="2">
          注销
        </Menu.Item>
      </Menu>
    );
    const userName = Sessions.get('name');
    return (
      <div className="oms-home-header-nav">
        <span className="download-center">下载中心</span>
        <span className="account-center">
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" href="#">
              Qtools | {userName} 1234<DownOutlined />
            </a>
          </Dropdown>
        </span>
      </div>
    );
  }
}

export default AccountInfo;
