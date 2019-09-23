import { connect } from 'react-redux';
import { QbyConnect } from 'common';
import HomeController from '../HomeController';

class Protected extends React.Component {
  goPro=()=> {
    this.props.history.push('/account/public')
  }
  render() {
    // console.log(this.props)
    return (
      <h3 onClick={this.goPro}>Protected</h3>
    )
  }
}
export default Protected;
