import React, { useState, useEffect } from "react"; // <-- Added useEffect
import WordGrid from "./WordGrid";
import WordTile from "./WordTile";

// --- Color Bank & Utilities ---

const ALPHA = 1;

const COLOR_BANK = [
  `rgba(251, 213, 8, ${ALPHA})`,  //yellow
  `rgba(114, 158, 234, ${ALPHA})`, //purplish blue
  `rgba(182, 226, 81, ${ALPHA})`, //lime green
  `rgba(184, 111, 190, ${ALPHA})`, //purple
  `rgba(247, 140, 52, ${ALPHA})`, //orange
  `rgba(247, 52, 104, ${ALPHA})`, //watermelon
/*  `rgba(42, 209, 47, ${ALPHA})`, //fresh green
  `rgba(230, 18, 61, ${ALPHA})`, //cherry red */
];

const getUniqueColor = (usedColors) => {
  const availableColors = COLOR_BANK.filter(
    (color) => !usedColors.includes(color)
  );
  if (availableColors.length === 0) {
    return COLOR_BANK[0];
  }
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  return availableColors[randomIndex];
};
// --- End Utilities ---


// ... (keep your existing imports and color logic)

// --- End Utilities ---


// ... (keep your existing imports and color logic)

export default function GameBoard({ slots, bank, lockedGroups, groupTitles, onStartDrag, hoveredSlot, selectedGroups}) { // Change onDrop to onStartDrag
  const [groupColors, setGroupColors] = useState({});

  useEffect(() => {
    lockedGroups.forEach((lock) => {
      const groupIndex = lock.row;

      // Only assign a color if this group doesn't have one yet
      if (!groupColors[groupIndex]) {
        setGroupColors((prevColors) => {
          // Double check inside the setter to prevent race conditions
          if (prevColors[groupIndex]) return prevColors;

          // The number of groups already colored determines the next index
          const nextColorIndex = Object.keys(prevColors).length;
          
          // Use modulo (%) just in case you have more groups than colors
          const newColor = COLOR_BANK[nextColorIndex % COLOR_BANK.length];

          return {
            ...prevColors,
            [groupIndex]: newColor,
          };
        });
      }
    });
  }, [lockedGroups]); // Removed groupColors from dependency to prevent unnecessary re-runs

  return (
    <div>
      <div style={styles.board}>
        <h3 style={styles.description}>Σχημάτισε κατηγορίες βάζοντας τέσσερις λέξεις στην ίδια σειρά</h3>

{slots.map((rowWords, groupIndex) => {
  const lock = lockedGroups.find((g) => g.row === groupIndex);
  const title = lock ? groupTitles[lock.solution] : null;
  const assignedColor = groupColors[groupIndex]; 

  // Pull the array of 4 words for this specific locked group
  const solutionWords = lock ? selectedGroups[lock.solution]?.solution : null;

  return (
    <WordGrid
      key={groupIndex}
      groupIndex={groupIndex}
      words={rowWords}
      locked={!!lock}
      title={title}
      solutionWords={solutionWords} // New Prop
      assignedColor={assignedColor}
      onStartDrag={onStartDrag} 
      hoveredSlot={hoveredSlot} 
    />
  );
})}
      </div>
    </div>
  );
}

const styles = {
  board: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    fontSize: 12,
    fontWeight: "normal",
    alignItems: "center",

  },
  description: {
  marginRight: "10px", 
  textDecoration: "none", 
  color: "black",
  fontWeight: "bold",
  background:"thistle",
  borderWidth: "6px",
  border: "solid",
  borderColor: "purple",
  padding: "5px",
  borderRadius: "8px",
  pointerEvents: "none", 
  
  // 2. The "No Selection" rule (Adding Safari-specific prefix)
  userSelect: "none",
  WebkitUserSelect: "none", 
  msUserSelect: "none",
  MozUserSelect: "none",

  // 3. Disable the default Safari tap highlight color
  WebkitTapHighlightColor: "transparent", 
},

  bank: {
    display: "flex",
    gap: 0,
    flexWrap: "wrap",
    justifyContent: "center",
  },
};