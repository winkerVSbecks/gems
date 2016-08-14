import * as R from 'ramda';

/**
 * Translate the origin for a point
 */
export function offsetTo(p) {
  return function offsetToC(pt) {
    const [x, y] = pt;
    return [
      p.x + x,
      p.y - y,
    ];
  };
}

/**
 * Convert a point from polar coords to cartesian
 */
export function polarToCartesian({ theta, r }) {
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return [x, y];
}

export function generatePointsAtOrigin(vertices) {
  return vertices.map(polarToCartesian);
}

export function generatePointsAtOffset(p, vertices) {
  const pointsAtOrigin = generatePointsAtOrigin(vertices);
  return pointsAtOrigin.map(offsetTo(p));
}

/**
 * Flatten the array of x,y pairs
 */
export function generatePointDef(points) {
  return R.flatten(points);
}

/**
 * a'---------b'
 *    a----b
 * Given a & b it generates a list of
 * a, b, b', a'
 */
export function makeCutVertices(vertices) {
  const [a, b] = vertices;

  return [
    a,
    b,
    { theta: b.theta, r: b.r * 0.5 },
    { theta: a.theta, r: a.r * 0.5 },
  ];
}

/**
 * Takes a side consisting of two vertices
 * and generates the pointDef for a cut
 */
export function makeCut(location, sideVertices) {
  const generatePointsAtCenter = R.partial(generatePointsAtOffset, [location]);
  return R.compose(
    R.flatten,
    generatePointsAtCenter,
    makeCutVertices,
  )(sideVertices);
}

/**
 * Calculates the centre cut shape for a gem
 */
export const calcCenterCutPoints = R.compose(
  generatePointDef,
  generatePointsAtOffset
);

/**
 * For a given set of points
 * generate a list of sides
 * For example:
 *  for points = [a, b, c, d];
 *  we get the following sides: [[a,b], [b,c], [c,d], [d,a]]
 */
export function getSides(vertices) {
  return [
    ...R.aperture(2, vertices),
    [
      vertices[vertices.length - 1],
      {
        r: vertices[0].r,
        theta: vertices[0].theta === 0 ? 2 * Math.PI : vertices[0].theta,
      },
    ],
  ];
}

/**
 * Coverts a location from width
 * or height percent to pixels
 */
export function percentToPx(w, h, { x, y }) {
  return {
    x: x * w / 100,
    y: y * h / 100,
  };
}
