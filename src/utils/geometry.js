import * as R from 'ramda';

/**
 * Translate the origin for a poin
 */
export function offsetTo(c) {
  return function offsetToC(pt) {
    const [x, y] = pt;
    return [
      x + c.x,
      y + c.y,
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

export function generatePointsAtOffset(c, vertices) {
  const pointsAtOrigin = generatePointsAtOrigin(vertices);
  return pointsAtOrigin.map(offsetTo(c));
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
    { theta: b.theta, r: b.r * 2 },
    { theta: a.theta, r: a.r * 2 },
  ];
}

/**
 * Takes a side consisting of two vertices
 * and generates the pointDef for a cut
 */
export function makeCut(center, sideVertices) {
  const generatePointsAtC = R.partial(generatePointsAtOffset, [center]);
  return R.compose(
    R.flatten,
    generatePointsAtC,
    makeCutVertices,
  )(sideVertices);
}

/**
 * Take a set of vertices defining a polygon
 * and generates a list of cuts. One per side.
 */
export function makeCuts(center, gemVertices) {
  const makeCutAtOffset = R.partial(makeCut, [center]);
  return R.compose(
    R.map(makeCutAtOffset),
    getSides,
  )(gemVertices);
}

/**
 * For a given set of points
 * generate a list of sides
 */
export function getSides(vertices) {
  return [
    ...R.aperture(2, vertices),
    [vertices[vertices.length - 1], vertices[0]],
  ];
}
