import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  background: 'none !important',
  border: 'none',
  padding: '0 !important',
  color: 'black',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: 12
}
const LinkButton = ({ text, onClick }) => (
  <button
    style={styles}
    onClick={onClick}
    >
      { text }
  </button>
);

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LinkButton;
