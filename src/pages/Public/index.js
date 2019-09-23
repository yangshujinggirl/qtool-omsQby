import { connect } from 'react-redux';
import { QbyConnect } from 'common';
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
  render() {
    // console.log(this.props)
    return (

      <h3 onClick={this.goPro}>Public</h3>
    )
  }
}
export default QbyConnect( Public, Actions,'PublicReducers');
