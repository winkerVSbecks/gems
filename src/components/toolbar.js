import React from 'react';
import {
  PATRIOT_CLRS,
  PROCESS_BLUE_CLRS,
} from '../constants';

function Toolbar({ onLeftClick, onRightClick }) {
  return (
    <div style={ styles.toolbar }>

      <button style={ styles.button(PATRIOT_CLRS.gems[0]) }
        onClick={ onLeftClick } />

      <button style={ styles.button(PROCESS_BLUE_CLRS.gems[0]) }
        onClick={ onRightClick } />

    </div>
  );
}

Toolbar.propTypes = {
  onLeftClick: React.PropTypes.func.isRequired,
  onRightClick: React.PropTypes.func.isRequired,
};

export default Toolbar;

const styles = {
  toolbar: {
    position: 'fixed',
    right: '1rem',
    bottom: '1rem',
    width: '4rem',
  },
  button: bgColor => ({
    border: 'none',
    outline: 'none',
    width: '2rem',
    height: '2rem',
    backgroundColor: bgColor,
    display: 'inline-block',
    cursor: 'pointer',
  }),
};
