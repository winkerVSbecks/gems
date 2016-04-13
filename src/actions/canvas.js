import { WINDOW_RESIZE } from '../constants';

export function windowResize({ width, height }) {
  const w = width >= height ? 100 : width * 100 / height;
  const h = height > width ? 100 : height * 100 / width;
  const s = (w >= h ? h : w) / 2;

  return {
    type: WINDOW_RESIZE,
    payload: { width, height, w, h, s },
  };
}
