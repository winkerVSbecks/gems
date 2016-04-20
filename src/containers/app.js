import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Canvas from '../components/canvas';
import Gem from '../components/gem';
import Toolbar from '../components/toolbar';
import * as actions from '../actions/canvas';
import { getGemsWithLocations } from '../selectors';

function mapStateToProps(state) {
  return {
    w: state.canvas.get('w'),
    h: state.canvas.get('h'),
    bgColor: state.canvas.get('bgColor'),
    glowMixer: state.canvas.get('glowMixer'),
    light: state.canvas.get('light').toJS(),
    gems: getGemsWithLocations(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    windowResize: (dimensions) => dispatch(actions.windowResize(dimensions)),
    setProcessBlue: () => dispatch(actions.setProcessBlue()),
    setPatriot: () => dispatch(actions.setPatriot()),
    moveLight: (x, y) => dispatch(actions.moveLight(x, y)),
    addGlow: (idx) => dispatch(actions.addGlow(idx)),
    removeGlow: (idx) => dispatch(actions.removeGlow(idx)),
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
    const { gems, light, glowMixer } = this.props;
    const { setProcessBlue, setPatriot, addGlow, removeGlow } = this.props;

    return (
      <div onMouseMove={ this.handleMouseMove }
        onTouchMove={ this.handleTouchMove }>
        <Toolbar { ...{ setProcessBlue, setPatriot } } />
        <Canvas { ...this.props }>
          <defs>
            <filter id="glow" x="-200%" y="-200%" width="400%" height="400%">
  			      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>
          {
            gems.map((gem, idx) => (
              <Gem key={idx} { ...gem.toJS() }
                lightSource={ light }
                glowMixer={ glowMixer }
                addGlow={ addGlow }
                removeGlow={ removeGlow } />
            ))
          }
        </Canvas>
      </div>
    );
  }

  handleMouseMove = (e) => {
    e.preventDefault();
    this.props.moveLight(e.clientX, e.clientY);
  }

  handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.targetTouches[0];
    this.props.moveLight(touch.clientX, touch.clientY);
  }

  handleResize = () => {
    this.props.windowResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

}

App.propTypes = {
  w: React.PropTypes.number.isRequired,
  h: React.PropTypes.number.isRequired,
  gems: React.PropTypes.instanceOf(List).isRequired,
  windowResize: React.PropTypes.func.isRequired,
  light: React.PropTypes.array.isRequired,
  glowMixer: React.PropTypes.string.isRequired,
  setProcessBlue: React.PropTypes.func.isRequired,
  setPatriot: React.PropTypes.func.isRequired,
  moveLight: React.PropTypes.func.isRequired,
  addGlow: React.PropTypes.func.isRequired,
  removeGlow: React.PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
