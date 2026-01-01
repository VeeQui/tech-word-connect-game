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
    width: 140,
    height: 40,
    padding: "0.2em",
    borderRadius: 8,
    background: "#ececec",
    border: "2px solid",
    borderColor: "lightgray",
    textAlign: "center",
    whiteSpace: "pre-line",
    boxShadow: "0 3px 7px rgba(0,0,0,0.5)",
    userSelect: "none",
    WebkitUserSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 17,
    transition: "transform 0.1s ease, background 0.15s ease", 
    cursor: 'grab'
},
  locked: {
    background: "#c8e6c9",
    borderColor: "green",
    cursor: "default",
  },
  highlight: {
    borderColor: "purple",
    background: "thistle",
    boxShadow: "0 0 12px rgba(128,0,128, 0.7)",
    transform: "scale(1.05)",
    zIndex: 10, // Added this to ensure the highlighted tile pops forward
  },
};