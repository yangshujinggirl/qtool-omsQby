import { connect } from 'react-redux';
import {　bindActionCreators　} from 'redux';

export default function QbyConnect(App, Action, reducerKey) {
  return connect(
    (state, ownProps) => {
      return state[reducerKey];
    },
    (dispatch, ownProps) => {
      return {
        actions: bindActionCreators(Action, dispatch)
      }
    }
  )(App);
}
