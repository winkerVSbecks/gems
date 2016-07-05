import { connect } from 'react-redux';
import App from '../components/app';
import * as actions from '../actions';
import { gemsSelector } from '../selectors';

function mapStateToProps(state) {
  return {
    canvas: state.canvas,
    gems: gemsSelector(state),
  };
}

export default connect(mapStateToProps, actions)(App);
