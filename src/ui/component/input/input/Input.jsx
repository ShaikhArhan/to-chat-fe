import React from "react";

export const Input = ({ type, width, padding }) => {    
  const style = {
    width,
    padding,
  };
  return <input type={type} style={style}></input>;
};
