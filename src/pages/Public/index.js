import { connect } from 'react-redux';
import { Spin, Icon } from 'antd';
import { QbyConnect, Qbtn } from 'common';
import * as Actions from './actions';
import HomeController from '../HomeController';

class Public extends React.Component {
  componentDidMount(props) {
    let params = {
      menuList:['a','b','c'],
      totalData:{qty:1234},
    }
    // this.props.actions.setMenuList(params)
    // this.props.actions.getMenuList()
  }
  goPro=()=> {
    this.props.history.push('/account/protected')
  }
  onClick=()=> {
    console.log('加载中时点不了我哦')
  }
  render() {
    console.log(this.props)
    return (
      <Spin tip="加载中..." spinning={this.props.loading}>
        <Qbtn
        size="free"
        onClick={this.onClick}>加载中时点不了我哦</Qbtn>
        <h3 onClick={this.goPro}>Public</h3>
      </Spin>

    )
  }
}
export default QbyConnect( Public, Actions,'PublicReducers');
