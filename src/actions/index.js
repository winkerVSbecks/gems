import {
  WINDOW_RESIZE,
  SET_COLOR,
  MOVE_LIGHT_SOURCE,
  SET_GLOW,
  PATRIOT_CLRS,
  PROCESS_BLUE_CLRS,
} from '../constants';

/**
 * Window Resize
 */
export function windowResize({ width, height }) {
  const w = width >= height ? 100 : width * 100 / height;
  const h = height > width ? 100 : height * 100 / width;

  return {
    type: WINDOW_RESIZE,
    payload: { width, height, w, h },
  };
}

/**
 * Set colour palette
 */
export function setProcessBlue() {
  return { type: SET_COLOR, payload: PROCESS_BLUE_CLRS };
}

export function setPatriot() {
  return { type: SET_COLOR, payload: PATRIOT_CLRS };
}

/**
 * Move Light
 */
export function moveLight(x, y, canvas) {
  const w = canvas.get('w');
  const h = canvas.get('h');
  const width = canvas.get('width');
  const height = canvas.get('height');

  const normX = x * w / width;
  const normY = y * h / height;

  return {
    type: MOVE_LIGHT_SOURCE,
    payload: [normX, normY],
  };
}

/**
 * Glow Actions
 */
export function addGlow(idx) {
  return {
    type: SET_GLOW,
    payload: {
      gem: idx,
      value: true,
    },
  };
}

export function removeGlow(idx) {
  return {
    type: SET_GLOW,
    payload: {
      gem: idx,
      value: false,
    },
  };
}
