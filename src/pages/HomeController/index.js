
import {
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Layout } from 'antd';

import SiderBarController from './components/SiderBarController';
import AccountRoutes from '../AccountRoutes';
import './index.less';

const { Header, Footer, Sider, Content } = Layout;

class HomeController extends React.Component {
  render() {
    return(
      <div className="oms-pages-wrap">
        <Layout>
          <Sider
            width="220"
            className="oms-slider-wrap">
            <SiderBarController />
          </Sider>
          <Layout className="oms-part-r">
            <Header className="oms-header-wrap">qoms-header</Header>
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
