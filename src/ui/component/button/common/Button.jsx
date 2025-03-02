import React, { useState } from "react";
import "./Button.css";

export const Button = ({
  className,
  //css
  text,
  fontSize,
  backgroundColor,
  color,
  border,
  outline,
  borderRadius,
  width,
  height,
  padding,
  margin,
  cursor,
  transition,
  position,
  top,
  right,
  bottom,
  left,
  boxShadow,
  //background image
  backgroundImage,
  // hover
  hoverbgcolor,
  hovertextcolor,
  hovertransformscale,
  // animation
  enableRotateBorder = false,
  enableClickedAnimation = false,
  animationBorder,
  animation,
  // Action
  disable,
  action,
}) => {  
  const [hover, setHover] = useState(false);

  const style = {
    fontSize,
    backgroundColor: hover ? hoverbgcolor : backgroundColor,
    color: hover ? hovertextcolor : color,
    border,
    outline,
    borderRadius,
    width,
    height,
    padding,
    margin,
    cursor,
    transition,
    position,
    top,
    right,
    bottom,
    left,
    boxShadow,
    //background image
    "--backgroundImage": `url(${backgroundImage})`,
    backgroundSize: "contain",
    backgroundPosition: "center", 
    backgroundRepeat: "no-repeat",
    //hover
    "--hoverbackgroundColor": hoverbgcolor,
    "--hovercolor": hovertextcolor,
    "--hovertransformscale": hovertransformscale,
    //animation
    "--animationBorder": animationBorder,
    "--animation": animation,
  };  
  return (
    <button
      key={text}
      className={`common-button ${className} ${
        enableRotateBorder||enableClickedAnimation ? "rotating-border" : ""
      } 
      ${
         enableClickedAnimation ? "rotating-border-onclicked" : ""
      }`}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        action();
      }}
      disabled={disable || false}
    >
      {text?.split("")[0]?.toUpperCase() + text?.slice(1)}
    </button>
  );
};
