import React from "react";

// 1. Add 'isOver' to the destructured props
export default function WordTile({ word, onStartDrag, locked, draggable, isOver, ...props }) {
  return (
    <div
      {...props} 
      onPointerDown={onStartDrag}
      style={{
        ...styles.word,
        ...(locked ? styles.locked : {}),
        
        // 2. This line connects the visual glow to the drag state
 	...(!locked && isOver ? styles.highlight : {}),
 	 touchAction: draggable ? "none" : "auto",       
      }}
    >
      {word}
    </div>
  );
}

const styles = {
  // ... (Keep your word and locked styles exactly as they are)
  word: {
 // Responsive width logic
    width: "22vw",         // Uses viewport width to scale on mobile
    maxWidth: "140px",      // Caps it for desktop
    height: 45,             // Slightly taller for better touch targets
    padding: "4px",
    borderRadius: 8,
    background: "#ececec",
    border: "2px solid",
    borderColor: "lightgray",
    textAlign: "center",
    whiteSpace: "pre-line",
    boxShadow: "0 3px 7px rgba(0,0,0,0.2)", // Softer shadow for cleaner look
    userSelect: "none",
    WebkitUserSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(12px, 2.5vw, 17px)", // Fluid font size
    fontFamily: "myGameFont",             // Added for consistency
    transition: "transform 0.1s ease, background 0.15s ease", 
    cursor: 'grab',
    boxSizing: "border-box"               // Important for padding/border math
  },
  locked: {
    background: "#c8e6c9",
    borderColor: "green",
    cursor: "default",
    boxShadow: "none",                    // Removes shadow once locked for "flat" look
  },
  highlight: {
    borderColor: "purple",
    background: "thistle",
    boxShadow: "0 0 12px rgba(128,0,128, 0.7)",
    transform: "scale(1.05)",
    zIndex: 10,
  },
};