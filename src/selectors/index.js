import * as R from 'ramda';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { lightFace, centerColor, glowColor } from '../utils/light';
import {
  getSides,
  makeCut,
  percentToPx,
  calcCenterCutPoints,
} from '../utils/geometry';

const getGems = state => state.gems.get('gems').toJS();
const getW = state => state.canvas.get('w');
const getH = state => state.canvas.get('h');
const getGlowMixer = state => state.gems.get('glowMixer');
const getLight = state => state.light.get('origin').toJS();

export const gemsSelector = createSelector(
  [ getGems, getW, getH, getGlowMixer, getLight ],
  (gems, w, h, glowMixer, light) =>
    fromJS(gems.map(gem => buildGemParts(w, h, glowMixer, light, gem)))
);

/**
 * Selector Utils
 */
function buildGemParts(w, h, glowMixer, light, gem) {
  const location = percentToPx(w, h, gem.location);
  const centerCutPts = calcCenterCutPoints(location, gem.vertices);

  return {
    idx: gem.idx,
    centerCut: buildCenterCut(centerCutPts, gem.isGlowing, gem.color),
    glow: buildGlow(centerCutPts, glowMixer, gem.color, gem.isGlowing),
    cuts: buildCuts(location, light, gem.color, gem.isGlowing, gem.vertices),
  };
}

function buildCenterCut(centerCutPts, isGlowing, color) {
  return {
    points: centerCutPts,
    color: centerColor(isGlowing, color),
  };
}

function buildGlow(centerCutPts, glowMixer, color, isGlowing) {
  return {
    points: centerCutPts,
    color: glowColor(glowMixer, color),
    filter: 'url(#glow)',
    opacity: isGlowing ? 0.75 : 0.25,
  };
}

function buildCuts(location, light, color, isGlowing, vertices) {
  const sides = getSides(vertices);
  const buildCutForSide = R.partial(
    buildCut,
    [location, light, color, isGlowing]
  );

  return sides.map(buildCutForSide);
}

function buildCut(location, light, color, isGlowing, side, idx) {
  return {
    color: lightFace(location, light, color, isGlowing, side, idx),
    points: makeCut(location, side),
  };
}
