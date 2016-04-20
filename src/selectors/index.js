import { createSelector } from 'reselect';

const getGems = (state) => state.canvas.get('gems');
const getW = (state) => state.canvas.get('w');
const getH = (state) => state.canvas.get('h');

export const getGemsWithLocations = createSelector(
  [ getGems, getW, getH ],
  (gems, w, h) => {
    return gems.map(gem => {
      return gem.merge({
        location: {
          x: gem.getIn(['location', 'x']) * w / 100,
          y: gem.getIn(['location', 'y']) * h / 100,
        },
      });
    });
  }
);
