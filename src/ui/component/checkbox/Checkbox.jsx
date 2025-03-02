import React from "react";
import "./Checkbox.css";
export const Checkbox = ({
  width,
  accentColor,
  margin,
  cursor,
  checked,
  left,
  zIndex,
  //action
  action,
}) => {
  const style = { width, accentColor, margin, cursor, checked, left, zIndex };
  
  return (
    <input
      type="checkbox"
      style={style}
      checked={checked}
      onClick={() => {
        action();
      }}
      onChange={()=>{}}
    ></input>
  );
};
