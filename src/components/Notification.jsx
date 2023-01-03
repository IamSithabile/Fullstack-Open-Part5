import React from 'react';

import './Notification.css';

import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) return;
  const { info, className = 'success' } = notification;

  return (
    <>
      <div {...{ className }}>{info}</div>
    </>
  );
};

export default Notification;
