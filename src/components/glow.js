import React from 'react';
import Color from 'color';

const Glow = ({ points, color, mixer, enabled }) => {
  const ptsDef = points.join(' ');
  const clr = Color(mixer)
    .mix(Color(color))
    .lighten(0.25)
    .hexString();

  const opacity = enabled ? 0.75 : 0.25;

  return (
    <polygon points={ ptsDef }
      fill={ clr }
      filter="url(#glow)"
      opacity={ opacity } />
  );
};

Glow.propTypes = {
  points: React.PropTypes.array,
  color: React.PropTypes.string,
  mixer: React.PropTypes.string,
  enabled: React.PropTypes.bool,
};

export default Glow;
