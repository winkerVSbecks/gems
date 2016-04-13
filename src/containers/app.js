import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/canvas';
import Gem from '../components/gem';
import { windowResize } from '../actions/canvas';

function mapStateToProps(state) {
  return {
    w: state.canvas.get('w'),
    h: state.canvas.get('h'),
    gem: state.canvas.get('gem').toJS(),
    center: { x: state.canvas.get('w') / 2, y: state.canvas.get('h') / 2 },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    windowResize: (dimensions) => dispatch(windowResize(dimensions)),
  };
}

class App extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => this.handleResize(), 300);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { gem } = this.props;

    return (
      <Canvas { ...this.props }>
        <Gem { ...gem } center={ this.props.center } />
      </Canvas>
    );
  }

  handleResize = () => {
    this.props.windowResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

}

App.propTypes = {
  w: React.PropTypes.number,
  h: React.PropTypes.number,
  gem: React.PropTypes.object,
  windowResize: React.PropTypes.func,
  center: React.PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
