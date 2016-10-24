import React from 'react';

/**
 * SVG Canvas
 * This component generates the base SVG
 * and sets up all the sub-components
 */
function Canvas({ w, h, children, bgColor }) {
  const viewBox = [0, 0, w, h].join(' ');
  const styles = { display: 'block', backgroundColor: bgColor, cursor: 'move' };

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
}

Canvas.propTypes = {
  h: React.PropTypes.number.isRequired,
  w: React.PropTypes.number.isRequired,
  children: React.PropTypes.node.isRequired,
  bgColor: React.PropTypes.string.isRequired,
};

export default Canvas;
