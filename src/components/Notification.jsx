import React from "react";

import "./Notification.css";

const Notification = ({ info, className = "success" }) => {
  return (
    <>
      <div {...{ className }}>{info}</div>
    </>
  );
};

export default Notification;
