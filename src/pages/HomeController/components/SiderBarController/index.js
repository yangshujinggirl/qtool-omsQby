import { Switch, Route, Link } from 'react-router-dom';
import { Sessions } from 'utils';
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
    selectKeys:this.props.selectKeys,
    defaultSelectedKeys:JSON.parse(Sessions.get('selectedMenuKeys')) || [],
    defaultOpenKeys:JSON.parse(Sessions.get('openMenuKeys')) || "",
  };
  static getDerivedStateFromProps(props, state) {
    if(props.selectKeys!==state.selectKeys) {
      return {
        defaultSelectedKeys:JSON.parse(Sessions.get('selectedMenuKeys')) || [],
        defaultOpenKeys:JSON.parse(Sessions.get('openMenuKeys')) || ""
      }
    }
    return null;
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  onOpenChange=(openKeys)=> {
    let { defaultOpenKeys } =this.state;
    let { menuList } =this.props;
    const latestOpenKey = openKeys.find(key => defaultOpenKeys.indexOf(key) === -1);
    let openKeyIndex = menuList.findIndex((el)=>el.id == latestOpenKey);
    if (openKeyIndex=='-1') {
      Sessions.set('openMenuKeys',JSON.stringify(openKeys));
      this.setState({ defaultOpenKeys:openKeys,defaultSelectedKeys:[] });
    } else {
      Sessions.set('openMenuKeys',JSON.stringify([latestOpenKey]));
      this.setState({
        defaultSelectedKeys:[],
        defaultOpenKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
  handleClick=(e)=> {
    Sessions.set('selectedMenuKeys',JSON.stringify(e.key));
    this.setState({ defaultSelectedKeys: e.key });
  }
  render(){
    const { menuList } = this.props;
    const { defaultSelectedKeys, defaultOpenKeys } = this.state;

    return (
      <div className="oms-sider-controller">
        <div className="slider-logo">
          <img src={menuLogo}/>
        </div>
        <Menu
          selectedKeys={defaultSelectedKeys}
          openKeys={defaultOpenKeys}
          mode="inline"
          theme="dark"
          style={{ height: '100%', borderRight: 0 }}
          onClick={this.handleClick}
          onOpenChange={this.onOpenChange}>
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
                      return <Menu.Item key={`${item.id}`}>
                              <Link to={`/account/${item.action}`}>{item.name}</Link>
                            </Menu.Item>
                    } else {
                      return <SubMenu
                              data-animal-type={`${item.id}`}
                              key={`${item.id}`}
                              title={item.name}>
                              {
                                item.subActions.length>0&&item.subActions.map((ter,dx) => (
                                  <Menu.Item key={`${ter.id}`}>
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
