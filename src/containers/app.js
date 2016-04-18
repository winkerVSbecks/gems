import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/canvas';
import Gem from '../components/gem';
import { windowResize } from '../actions/canvas';

function mapStateToProps(state) {
  return {
    w: state.canvas.get('w'),
    h: state.canvas.get('h'),
    gems: state.canvas.get('gems').toJS(),
    origin: { x: state.canvas.get('w') / 2, y: state.canvas.get('h') / 2 },
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
    const { gems } = this.props;

    return (
      <Canvas { ...this.props }>
        {
          gems.map((gem, idx) => {
            return (
              <Gem key={idx} { ...gem } center={ this.props.origin } />
            );
          })
        }
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
  gems: React.PropTypes.array,
  windowResize: React.PropTypes.func,
  origin: React.PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
