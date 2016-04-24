import {
  WINDOW_RESIZE,
  PROCESS_BLUE,
  PATRIOT,
  MOVE_LIGHT_SOURCE,
  ADD_GLOW,
  REMOVE_GLOW,
} from '../constants';

export function windowResize({ width, height }) {
  const w = width >= height ? 100 : width * 100 / height;
  const h = height > width ? 100 : height * 100 / width;
  const s = (w >= h ? h : w) / 2;

  return {
    type: WINDOW_RESIZE,
    payload: { width, height, w, h, s },
    meta: { debounce: { time: 100 } },
  };
}

export function setProcessBlue() {
  return { type: PROCESS_BLUE };
}

export function setPatriot() {
  return { type: PATRIOT };
}

export function moveLight(_x, _y) {
  return (dispatch, getState) => {
    const w = getState().canvas.get('w');
    const h = getState().canvas.get('h');
    const width = getState().canvas.get('width');
    const height = getState().canvas.get('height');

    const x = _x * w / width;
    const y = _y * h / height;
    dispatch({
      type: MOVE_LIGHT_SOURCE,
      payload: [x, y],
      meta: { debounce: { time: 15 } },
    });
  };
}

export function addGlow(idx) {
  return { type: ADD_GLOW, payload: idx };
}

export function removeGlow(idx) {
  return { type: REMOVE_GLOW, payload: idx };
}
