import * as R from 'ramda';

/**
 * Convert degrees to radians
 */
function rad(angle) {
  return Math.PI * angle / 180;
}

/**
 * Polygon with circumradius r
 */
export default function polygon(sides, r) {
  const t = 360 / sides;
  return R.range(0, sides).map(idx => {
    return { theta: rad(t * idx), r };
  });
}
