import React from 'react';

/**
 * SVG Canvas
 * This component generates the base SVG
 * and sets up all the sub-components
 */
const Canvas = ({ w, h, children, bgColor }) => {
  const viewBox = [0, 0, w, h].join(' ');
  const styles = { display: 'block', backgroundColor: bgColor };

  return (
    <svg version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox={ viewBox }
      style={ styles }>
      { children }
    </svg>
  );
};

Canvas.propTypes = {
  h: React.PropTypes.number,
  w: React.PropTypes.number,
  children: React.PropTypes.node,
  bgColor: React.PropTypes.string,
};

export default Canvas;
