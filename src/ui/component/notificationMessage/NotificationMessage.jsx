import React, { useState, useEffect } from "react";
import "./NotificationMessage.css";

const NotificationMessage = ({ message, sender, onClose }) => {

  return (
    <div className="custom-notification">
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      <div className="message-notification-name">
        {sender.name || "Unknown"}
      </div>
      <hr />
      <div className="message-content">{message.text}</div>
    </div>
  );
};

export default NotificationMessage;
