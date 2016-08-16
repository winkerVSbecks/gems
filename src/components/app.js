import React, { Component } from 'react';
import { List, Map } from 'immutable';
import Canvas from './canvas';
import Gem from './gem';
import Toolbar from './toolbar';
import BlurFilter from './blur-filter';

class App extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => this.handleResize(), 300);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { gems, canvas } = this.props;
    const { setProcessBlue, setPatriot, addGlow, removeGlow } = this.props;

    return (
      <div onMouseMove={ this.handleMouseMove }
        onTouchMove={ this.handleTouchMove }>
        <Toolbar
          onLeftClick={ setPatriot }
          onRightClick={ setProcessBlue } />

        <Canvas bgColor={ canvas.get('bgColor') }
          w={ canvas.get('w') }
          h={ canvas.get('h') }>

          <BlurFilter />
          {
            gems.map((gem, idx) => (
              <Gem key={ idx }
                idx={ idx }
                glow={ gem.get('glow') }
                centerCut={ gem.get('centerCut') }
                cuts={ gem.get('cuts') }
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
    this.props.moveLight(e.clientX, e.clientY, this.props.canvas);
  }

  handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.targetTouches[0];
    this.props.moveLight(touch.clientX, touch.clientY, this.props.canvas);
  }

  handleResize = () => {
    this.props.windowResize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

}

App.propTypes = {
  canvas: React.PropTypes.instanceOf(Map).isRequired,
  gems: React.PropTypes.instanceOf(List).isRequired,
  windowResize: React.PropTypes.func.isRequired,
  setProcessBlue: React.PropTypes.func.isRequired,
  setPatriot: React.PropTypes.func.isRequired,
  moveLight: React.PropTypes.func.isRequired,
  addGlow: React.PropTypes.func.isRequired,
  removeGlow: React.PropTypes.func.isRequired,
};

export default App;
