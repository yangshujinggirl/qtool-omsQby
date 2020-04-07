
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
    menuList:[]
  };
  componentDidMount(){
    this.getMenuList()
  }
  getMenuList() {
    GetMenuApi()
    .then((res) => {
      let { result,fileDomain } = res;
      Sessions.set('fileDomain',fileDomain)
      result = [...result];
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
