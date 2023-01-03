import React, { useState, forwardRef, useImperativeHandle } from 'react';

import PropTypes from 'prop-types';

const Toggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState('');

  const showWhenVisible = visible ? '' : 'none';
  const hideWhenVisible = visible ? 'none' : '';

  const { label } = props;

  const toggleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { toggleVisible };
  });

  return (
    <>
      <div style={{ display: hideWhenVisible }}>
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          {label}
        </button>
      </div>
      <div style={{ display: showWhenVisible }}>
        {props.children}
        <br />
        <button
          onClick={() => {
            setVisible(false);
          }}
        >
          Close
        </button>
      </div>
    </>
  );
});

Toggable.propTypes = {
  label: PropTypes.string.isRequired,
};

Toggable.displayName = Toggable;

export default Toggable;
