import React, { Component } from 'react';
import { Map } from 'immutable';
import Canvas from './canvas';

class App extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    const { canvas } = this.props;

    return (
      <div onMouseMove={ this.handleMouseMove }
        onTouchMove={ this.handleTouchMove }>
        <Canvas bgColor={ canvas.get('bgColor') }
          w={ canvas.get('w') }
          h={ canvas.get('h') }>
          <circle cx={ 50 } cy={ 50 } r={ 10 } fill="#fff" />
        </Canvas>
      </div>
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
  canvas: React.PropTypes.instanceOf(Map).isRequired,
  windowResize: React.PropTypes.func.isRequired,
};

export default App;
