/**
 * Generate range from 0 to length
 */
function range(length) {
  const res = Array(length);
  for (let idx = 0; idx < length; idx++) {
    res[idx] = idx;
  }
  return res;
}

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
  return range(sides).map(idx => {
    return { theta: rad(t * idx), r };
  });
}
