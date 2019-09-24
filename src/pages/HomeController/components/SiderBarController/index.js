import { GetMenuApi } from '../../../../api/home/Home';
import { Menu, Icon, Button } from 'antd';
import './index.less';

const { SubMenu } = Menu;

class SiderBarController extends React.Component {
  state = {
    collapsed: 'false',
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
      let { result } =res;
      let ss = [{
        id: "4cf5f4486d164352b85db8cf405e7079",
        action: "/public",
        cls: "fa",
        name: "前端管理",
        subActions:[{
          action: "reportSeach.html",
          cls: "fa",
          id: "12",
          name: "weber1级",
          subActions:[{
            action: "reportSeach.html",
            cls: "fa",
            id: "120",
            name: "weber2级",
            subActions:null
          }]
        },{
          action: "/reportSeach",
          cls: "fa",
          id: "13",
          name: "react1级",
          subActions:[{
            action: "",
            cls: "fa",
            id: "130",
            name: "react2级",
            subActions:null
          }]
        }]
      }]
      result = [...result,...ss];
      this.setState({ menuList:result});
      console.log(result)
    })
  }
  render(){
    const { menuList } =this.state;
    return(
      <div className="oms-sider-controller">
        <div className="slider-logo">
          门店&用户中心
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          collapsed={this.state.collapsed}>
          {
            menuList.length>0&&menuList.map((el,index) => (
              <SubMenu
                key={el.id}
                title={
                  <span>
                    <Icon type="mail" />
                    <span>{el.name}</span>
                  </span>
                }>
                {
                  el.subActions&&el.subActions.length>0&&el.subActions.map((item,idx) => {
                    if(!item.subActions) {
                      return <Menu.Item key={`${item.id}${idx}`}>{item.name}</Menu.Item>
                    } else {
                      return <SubMenu
                        key={`${item.id}${idx}`}
                        title={item.name}>
                          {
                            item.subActions.length>0&&item.subActions.map((ter,dx) => (
                              <Menu.Item key={`${ter.id}${idx}`}>{ter.name}</Menu.Item>
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
    )
  }
}

export default SiderBarController;
