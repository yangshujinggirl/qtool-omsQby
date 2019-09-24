import { GetMenuApi } from '../../../../api/home/Home';
import { Menu, Icon, Button } from 'antd';

const { SubMenu } = Menu;

class SiderBarController extends React.Component {
  state = {
    collapsed: false,
    menuList:[]
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentDidMount(){
    GetMenuApi()
    .then((res) => {
      this.setState({ menuList:res.result });
      console.log(res)
    })
  }
  render(){
    const { menuList } =this.state;
    return(
      <div className="oms-sider-wrap">
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={this.state.collapsed}>
        {
          menuList.length>0&&menuList.map((el,index) => (
            <SubMenu
              key={el.name}
              title={
                <span>
                  <Icon type="mail" />
                  <span>{el.name}</span>
                </span>
              }>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          ))
        }
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Navigation One</span>
            </span>
          }>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="appstore" />
              <span>Navigation Two</span>
            </span>
          }>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
      </div>
    )
  }
}

export default SiderBarController;
