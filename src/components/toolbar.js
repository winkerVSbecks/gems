import React from 'react';
import {
  patriotClrs,
  processBlueClrs,
} from '../constants';

const Toolbar = ({ setPatriot, setProcessBlue }) => {
  return (
    <div style={ styles.toolbar }>
      <button style={ styles.button(patriotClrs.gems[0]) }
        onClick={ setPatriot } />
      <button style={ styles.button(processBlueClrs.gems[0]) }
        onClick={ setProcessBlue } />
    </div>
  );
};

Toolbar.propTypes = {
  setPatriot: React.PropTypes.func,
  setProcessBlue: React.PropTypes.func,
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
