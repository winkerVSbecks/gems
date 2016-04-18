/**
 * Convert degrees to radians
 */
function rad(angle) {
  return Math.PI * angle / 180;
}

/**
 * Square with circumradius r
 */
export function square(r) {
  return [
    { theta: rad(45), r },
    { theta: rad(315), r },
    { theta: rad(225), r },
    { theta: rad(135), r },
  ];
}

/**
 * Triangle with circumradius r
 */
export function triangle(r) {
  return [
    { theta: rad(90), r },
    { theta: rad(210), r },
    { theta: rad(330), r },
  ];
}
