import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
// import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu, Button } from 'antd';
import { GetMenuApi } from '../../../../api/home/Home';
import './index.less';
import menuLogo from '../../imgs/menu_logo.png';
import menu from 'common/siderBarData'

const { SubMenu } = Menu;

class SiderBarController extends React.Component {
  state = {
    collapsed: 'false',
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render(){
    const { menuList } = this.props;
    // const menuList = menu;
    // console.log(menuList)
    return (
      <div className="oms-sider-controller">
        <div className="slider-logo">
          <img src={menuLogo}/>
        </div>
        <Menu
          defaultSelectedKeys={['62b4f36e9e554357ac59172b0c89f2350']}
          defaultOpenKeys={['0a4167e8a15a43c1ab9f11ea505f58bf','c280e4fa579d4fc4bdf5773ccbcacc1d0']}
          mode="inline"
          theme="dark"
          style={{ height: '100%', borderRight: 0 }}
          collapsed={this.state.collapsed}>
          {
            menuList.length>0&&menuList.map((el,index) => (
              <SubMenu
                key={el.id}
                title={
                  <span className="diy-menu-title">
                    {/*<LegacyIcon type="mail" />*/}
                    <span>{el.name}</span>
                  </span>
                }>
                {
                  el.subActions&&el.subActions.length>0&&el.subActions.map((item,idx) => {
                    if(!item.subActions) {
                      return <Menu.Item key={`${item.id}${idx}`}>
                        <Link to={`/account/${item.action}`}>{item.name}</Link>
                      </Menu.Item>
                    } else {
                      return <SubMenu
                        data-animal-type={`${item.id}${idx}`}
                        key={`${item.id}${idx}`}
                        title={item.name}>
                          {
                            item.subActions.length>0&&item.subActions.map((ter,dx) => (
                              <Menu.Item key={`${ter.id}${idx}`}>
                                <Link to={`/account/${ter.action}`}>{ter.name}</Link>
                              </Menu.Item>
                            ))
                          }
                      </SubMenu>
                    }
                  })
                }
              </SubMenu>
            ))
          }
        </Menu>
      </div>
    );
  }
}

export default SiderBarController;
