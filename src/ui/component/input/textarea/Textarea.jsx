// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { debounce } from "../../../utils/debounce";
// import "./Textarea.css";
// export const Textarea = ({
//   //data transport
//   setText,
//   textCarry,
//   className,
//   //css
//   fontSize,
//   width,
//   height,
//   maxWidth,
//   maxHeight,
//   position,
//   border,
//   borderRadius,
//   margin,
//   padding,
//   display,
//   whiteSpace,
//   overflow,
//   textOverflow,
//   resize,
//   lineHeight,
//   cursor,
//   top,
//   left,
//   textDecoration,
//   //focus
//   focusborder,
//   //controller
//   readOnly,
//   placeholder,
//   //action
//   action,
//   autoChangeHeightSize,
// }) => {
//   const textareaRef = useRef(null);
//   const style = {
//     fontSize,
//     width,
//     height,
//     maxWidth,
//     maxHeight,
//     position,
//     border,
//     borderRadius,
//     margin,
//     padding,
//     display,
//     whiteSpace,
//     overflow,
//     textOverflow,
//     resize,
//     lineHeight,
//     cursor,
//     top,  
//     left,  
//     textDecoration,
//     //focus
//     "--border": focusborder,
//   };
//   const changeSize = () => {
//     if (autoChangeHeightSize) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;      
//     }
//   };
//   useEffect(() => {
//     changeSize();
//     window.addEventListener("resize", changeSize);
//   }, []);
//   // const changeValue = useCallback(debounce(setText, 1000), []);

//   return (
//     // <div contentEditable={readOnly} style={style}>
//     //   {text}
//     // </div>
//     <textarea
//       // key={textCarry}
//       ref={textareaRef}
//       value={textCarry}
//       placeholder={placeholder}
//       readOnly={readOnly}
//       onChange={(e) => {
//         changeSize();
//         // changeValue(e.target.value);
//         setText(e.target.value);
//       }}
//       className={className}
//       style={style}
//       onClick={() => {
//         action();
//       }}
//     >
//       {/* {textCarry} */}
//     </textarea>
//   );
// };


import React, { useEffect, useRef } from "react";
import "./Textarea.css";

export const Textarea = ({
  setText,
  textCarry,
  focusborder,
  readOnly,
  placeholder,
  action,
  className = "",
  textDecoration,
}) => {
  const textareaRef = useRef(null);

  const changeSize = () => {
    if (className.includes("textarea-variant-2")) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    changeSize();
    window.addEventListener("resize", changeSize);
    return () => window.removeEventListener("resize", changeSize);
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={textCarry}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`textarea-common ${className} ${readOnly ? "textarea-readonly" : ""}`}
      style={{
        textDecoration: textDecoration,
        "--focus-border": focusborder,
      }}
      onChange={(e) => {
        changeSize();
        setText?.(e.target.value);
      }}
      onClick={action}
    />
  );
};
