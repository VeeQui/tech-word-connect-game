import React from "react"; 
import WordTile from "./WordTile";

const staticStyles = {
  wrapper: { marginBottom: 12,
//zoom: window.innerWidth < 600 ? "0.7" : "1",  ////////////////////////////
},
  row: {
    position: "relative",
    display: "flex",
    gap: 12,
    justifyContent: "center",
flexWrap: "nowrap", // Force them to stay in one line
  },
  baseOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column", // Stack title and terms vertically
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    pointerEvents: "none",
    zIndex: 2,
    textAlign: "center",
    padding: "5px",
  // 2. The "No Selection" rule (Adding Safari-specific prefix)
    userSelect: "none",
    WebkitUserSelect: "none", 
    msUserSelect: "none",
    MozUserSelect: "none",
 //   transform: window.innerWidth < 600 ? "scale(0.8)" : "scale(1)",
 //   transformOrigin: "top center",
  // 3. Disable the default Safari tap highlight color
    WebkitTapHighlightColor: "transparent",
   fontFamily: "myGameFont",
 },
  titleText: {
    fontWeight: "bold",
    fontSize: "1.2rem", // Slightly smaller to fit both lines
    color: "black",
    textTransform: "uppercase",
  },
  termsText: {
    fontFamily:"myGameFont",
    fontWeight: "normal",
    fontSize: "0.9rem", // Smaller letters for the terms
    color: "black",
    marginTop: 4,
  }
};

export default function WordGrid({
  groupIndex,
  words,
  locked,
  title,
  solutionWords, // Receive the array here
  onStartDrag,
  assignedColor, 
  hoveredSlot
}) {
  const overlayStyle = {
    ...staticStyles.baseOverlay,
    background: assignedColor 
// Apply scale here only if screen is small
//    transform: window.innerWidth < 600 ? "scale(0.9)" : "scale(1)",
  };

  return (
    <div style={staticStyles.wrapper}>
      <div style={staticStyles.row}>
        {words.map((word, slotIndex) => (
          <WordTile
            key={slotIndex}
            word={word}
            draggable={!locked}
            locked={locked}
            data-row={groupIndex}
            data-slot={slotIndex}
            isOver={
              hoveredSlot && 
              hoveredSlot.row === groupIndex && 
              hoveredSlot.slot === slotIndex
            }
            onStartDrag={(e) => onStartDrag(e, groupIndex, slotIndex)}
          />
        ))}

        {locked && title && (
          <div style={overlayStyle}>
            <div style={staticStyles.titleText}>{title}</div>
            {solutionWords && (
              <div style={staticStyles.termsText}>
                {solutionWords.join(", ")}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}