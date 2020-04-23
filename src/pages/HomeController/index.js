
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
import { Sessions } from 'utils';
const { Header, Footer, Sider, Content } = Layout;

class HomeController extends React.Component {
  state = {
    menuList:[],
    selectKeys:''
  };
  componentDidMount(){
    this.getMenuList()
  }
  getMenuList() {
    GetMenuApi()
    .then((res) => {
      let { result,fileDomain } = res;
      result= result?result:[];
      let openKeys=[result[1].id,result[1].subActions[1].id];
      let selectedKeys = result[1].subActions[1].subActions[0].id;
      Sessions.set('fileDomain',fileDomain);
      Sessions.set('openMenuKeys',JSON.stringify(openKeys));
      Sessions.set('selectedMenuKeys',JSON.stringify(result[1].subActions[1].subActions[0].id));
      result = [...result];
      this.setState({ menuList:result, selectKeys: selectedKeys});
    })
  }
  render() {
    const { menuList, selectKeys } =this.state;
    return(
      <div className="oms-pages-wrap">
        <Layout>
          <Sider
            width="220"
            className="oms-slider-wrap">
            <SiderBarController menuList={menuList} selectKeys={selectKeys}/>
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
