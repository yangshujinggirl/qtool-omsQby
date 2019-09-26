
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Layout } from 'antd';

import SiderBarController from './components/SiderBarController';
import AccountInfo from './components/AccountInfo';
import AccountRoutes from '../AccountRoutes';
import { GetMenuApi } from '../../api/home/Home';
import './index.less';

const { Header, Footer, Sider, Content } = Layout;

class HomeController extends React.Component {
  state = {
    menuList:[]
  };
  componentDidMount(){
    this.getMenuList()
  }
  getMenuList() {
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
    })
  }
  render() {
    const { menuList } =this.state;
    return(
      <div className="oms-pages-wrap">
        <Layout>
          <Sider
            width="220"
            className="oms-slider-wrap">
            <SiderBarController menuList={menuList}/>
          </Sider>
          <Layout className="oms-part-r">
            <Header className="oms-header-wrap">
              <AccountInfo {...this.props}/>
            </Header>
            <Content>
              <div className="oms-content-wrap">
                <AccountRoutes />
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>

    )
  }
}

export default HomeController;
