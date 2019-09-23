
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
      <div className="oms-pages">
        <Layout>
          <Sider
            theme="dark"
            mode="inline">
            <SiderBarController />
          </Sider>
          <Layout>
            <Header>qoms-header</Header>
            <Content>
              <div className="oms-content">
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
