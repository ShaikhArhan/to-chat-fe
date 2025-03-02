import React from "react";
import "./Popup.css";

export const Popup = ({ content ,style }) => {  
  return (
    <div className="popup-overlay">
      <div style={style}>{content}</div>
    </div>
  );
};
