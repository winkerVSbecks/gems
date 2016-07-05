import Color from 'color';
import { offsetTo, polarToCartesian } from '../utils/geometry';

export function lightFace(location, light, color, isGlowing, side, idx) {
  if (isGlowing) { return glowLight(color, idx); }

  return regularLight(side, color, location, light);
}

function glowLight(color, idx) {
  const clrEven = Color(color).lighten(0.25).hexString();
  const clrOdd = Color(color).lighten(0.15).hexString();

  return idx % 2 === 0 ? clrEven : clrOdd;
}

function regularLight([a, b], color, location, light) {
  const theta = (a.theta + b.theta) / 2;
  const r = a.r * 0.75;
  const vertex = offsetTo(location)(polarToCartesian({ theta, r }));
  // Direction of face normal
  const n = [
    vertex[0] - location.x,
    vertex[1] - location.y,
  ];
  const magN = Math.hypot(...n);
  // Face Normal
  const normal = [
    n[0] / magN,
    n[1] / magN,
  ];
  // Direction of light
  const d = [
    light[0] - vertex[0],
    light[1] - vertex[1],
  ];
  const magD = Math.hypot(...d);
  // Normalized direction
  const direction = [
    d[0] / magD,
    d[1] / magD,
  ];
  // intensity = dot(direction, ecNormal)
  const intensity = normal[0] * direction[0] + normal[1] * direction[1];

  if (intensity > 0) {
    const lightenAmt = Math.min(0.5, intensity);
    return Color(color).lighten(lightenAmt).hexString();
  }

  const darkenAmt = Math.abs(Math.max(-0.25, intensity));
  return Color(color).darken(darkenAmt).hexString();
}

export function bloomColor(isGlowing, color) {
  return isGlowing ? Color(color).lighten(0.4).hexString() : color;
}

export function glowColor(mixer, color) {
  return Color(mixer)
    .mix(Color(color))
    .lighten(0.25)
    .hexString();
}
