import { connect } from 'react-redux';
import App from '../components/app';
import * as actions from '../actions';

function mapStateToProps(state) {
  return {
    canvas: state.canvas,
  };
}

export default connect(mapStateToProps, actions)(App);
