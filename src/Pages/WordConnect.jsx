import React, { useState, useEffect, useCallback } from "react";
import { LEVELS } from './gameData';
import GameBoard from "../Components/Game/GameBoard";
import VictoryModal from "../Components/Game/VictoryModal";
import { useNavigate } from "react-router-dom";
import shuffleIcon from "../assets/icons/shuffle.png";
import infoIcon from "../assets/icons/info.png";
import homeIcon from "../assets/icons/home.png";
import refreshIcon from "../assets/icons/refresh.png";
import soundON from "../assets/icons/soundON.png";
import soundOFF from "../assets/icons/soundOFF.png";
import successSfx from "../assets/sounds/success.mp3";
import moveSfx from "../assets/sounds/move.mp3";
import clickSound from "../assets/sounds/click.mp3";


const ACTIVE_ROW_COUNT = 5; 
const GROUP_SIZE = 4;  //if more words per group then the container width must be adjusted

export default function WordConnect() {
const isExiting = React.useRef(false); 
  /* ================= STATE ================= */

  //sound
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('wordConnectMuted');
    return saved === 'true'; // If it's "true", start muted; otherwise, false
  });  
  const playSound = (audioFile) => {
    if (isMuted || isExiting.current) return;   
    // Make sure this is on its own line:
    const audio = new Audio(audioFile);
    audio.volume = 0.5; 
    audio.play().catch(e => console.log("Audio play blocked:", e));
  };
  useEffect(() => {
  localStorage.setItem('wordConnectMuted', isMuted);
}, [isMuted]);

  //navigator
  const navigate = useNavigate(); // Initialize the navigator

  const goHome = () => {
    navigate("/");      // Then move to the Home page
  };
   

  const [levelIndex, setLevelIndex] = useState(() => {
    const saved = localStorage.getItem('wordConnectLevel');
    return saved ? Math.min(parseInt(saved), LEVELS.length - 1) : 0;
  });

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [slots, setSlots] = useState([]);
  const [lockedGroups, setLockedGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState(null);

  /* ================= LOGIC ================= */

const initLevel = useCallback(() => {
  const currentLevel = LEVELS[levelIndex];
  if (!currentLevel) return;
  
  // --- THE GUARD ---
  // Explicitly clear state BEFORE calculating new grid
  setLockedGroups([]); 
  setIsActive(true);
  setSeconds(0);
  // -----------------

  // 1. Shuffle all available groups in this level and pick 5
  const shuffledPool = [...currentLevel.groups].sort(() => Math.random() - 0.5);
  const pickedGroups = shuffledPool.slice(0, ACTIVE_ROW_COUNT);

  // 2. Set these as our "Selected Groups" for the current game
  setSelectedGroups(pickedGroups);

  // 3. Flatten the words from these 5 groups only
  const allWords = pickedGroups.flatMap(g => g.solution);
  const shuffledWords = [...allWords].sort(() => Math.random() - 0.5);

  // 4. Arrange them into rows
  const rows = [];
  for (let i = 0; i < ACTIVE_ROW_COUNT; i++) {
    rows.push(shuffledWords.slice(i * GROUP_SIZE, (i + 1) * GROUP_SIZE));
  }

  setSlots(rows);
  setLockedGroups([]);
  setSeconds(0);
  setIsActive(true);
}, [levelIndex]);

  useEffect(() => {
    initLevel();
  }, [initLevel]);

  const validateGroup = useCallback((words) =>
    selectedGroups.findIndex(
      (group) =>
        group.solution.length === words.length &&
        group.solution.every((w) => words.includes(w))
    ), [selectedGroups]);

  const recomputeLocks = (nextSlots) => {
    const locks = [];
    nextSlots.forEach((words, row) => {
      const solutionIndex = validateGroup(words);
      if (solutionIndex !== -1) {
        locks.push({ row, solution: solutionIndex });
      }
   });
       if (locks.length > lockedGroups.length) {
         playSound(successSfx); // Play happy chime
      }
    setLockedGroups(locks);
  };

  const moveWord = (from, to) => {
  try {
    playSound(moveSfx); 
  } catch (err) {
    console.error("Sound failed, but moving anyway", err);
  }
 setSlots((prev) => {
      const next = prev.map((row) => [...row]);
      const fromWord = next[from.group][from.slot];
      const toWord = next[to.group][to.slot];

      next[to.group][to.slot] = fromWord;
      next[from.group][from.slot] = toWord;

      recomputeLocks(next);
      return next;
    });
  };

  const handleShuffle = () => {
    setSlots(prev => {
      const lockedRowsIndices = lockedGroups.map(l => l.row);
      const wordsToShuffle = [];
      prev.forEach((row, i) => {
        if (!lockedRowsIndices.includes(i)) wordsToShuffle.push(...row);
      });
      const newShuffled = wordsToShuffle.sort(() => Math.random() - 0.5);
      let counter = 0;
      return prev.map((row, i) => {
        if (lockedRowsIndices.includes(i)) return row;
        const newRow = newShuffled.slice(counter, counter + GROUP_SIZE);
        counter += GROUP_SIZE;
        return newRow;
      });
    });
  };

  const handleStartDrag = (e, fromRow, fromSlot) => {
    if (lockedGroups.some(lock => lock.row === fromRow)) return;
    document.body.style.cursor = 'grabbing';
    const originalTile = e.currentTarget;
    const rect = originalTile.getBoundingClientRect();
    const ghost = originalTile.cloneNode(true);
    
    Object.assign(ghost.style, {
      position: 'fixed',
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      opacity: '0.8',
      pointerEvents: 'none',
      zIndex: '1000',
      transform: 'scale(1.1)',
      boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
      cursor: 'grabbing',

    });
    document.body.appendChild(ghost);
    originalTile.style.opacity = '0.3';

    const onPointerMove = (moveEvent) => {
  // 1. Detect if the board is currently scaled
  const board = document.querySelector('[style*="transform"]'); // Or use a ref
  const scale = window.innerWidth < 650 ? window.innerWidth / 650 : 1;

  // 2. Adjust the positioning math
  // We divide by the scale to "normalize" the mouse movement
  ghost.style.left = `${moveEvent.clientX - (rect.width * scale) / 2}px`;
  ghost.style.top = `${moveEvent.clientY - (rect.height * scale) / 2}px`;
   const elementAtPoint = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
      const targetTile = elementAtPoint?.closest('[data-row]');
      if (targetTile) {
        const row = parseInt(targetTile.dataset.row);
        const slot = parseInt(targetTile.dataset.slot);
        if (!lockedGroups.some(lock => lock.row === row)) {
          setHoveredSlot({ row, slot }); 
        } else {
          setHoveredSlot(null);
        }
      } else {
        setHoveredSlot(null);
      }
    };

    const onPointerUp = (upEvent) => {
      document.body.style.cursor = 'default';
      if (document.body.contains(ghost)) document.body.removeChild(ghost);
      originalTile.style.opacity = '1';
      setHoveredSlot(null);
      const elementAtPoint = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
      const targetTile = elementAtPoint?.closest('[data-row]');
      if (targetTile) {
        const toRow = parseInt(targetTile.dataset.row);
        const toSlot = parseInt(targetTile.dataset.slot);
        if (!lockedGroups.some(lock => lock.row === toRow)) {
          moveWord({ group: fromRow, slot: fromSlot }, { group: toRow, slot: toSlot });
        }
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const handleNextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      const nextIdx = levelIndex + 1;
      setLevelIndex(nextIdx);
      localStorage.setItem('wordConnectLevel', nextIdx);
    } else {
      setLevelIndex(0);
      localStorage.setItem('wordConnectLevel', 0);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (lockedGroups.length === ACTIVE_ROW_COUNT && ACTIVE_ROW_COUNT > 0) {
      setIsActive(false);
    }
  }, [lockedGroups]);

  const victory = lockedGroups.length === ACTIVE_ROW_COUNT;

return (
    <>
      {/* 1. Header with Level, Timer, and Shuffle */}
      <div style={styles.header}>
       <div> 
             <button 
                title ="Επανέναρξη παιχνιδιού" 
                onClick={() => {
                playSound(clickSound); 
    		// Put everything that changes the page inside the timeout
    		setTimeout(() => {
    		// If you specifically want to reset the level to 0 on this click:
    		localStorage.setItem('wordConnectLevel', 0);
		goHome(); }, 200);
  		}}               
		style={styles.Btn}>
		<img 
    		src={homeIcon} 
    		alt="Επανέναρξη" 
    		style={styles.everyIconStyle} 
  		/>           
	    </button>
              <button 
                title ="Ανανέωση επιπέδου" 
                onClick={() => {
                playSound(clickSound); 
    		// Put everything that changes the page inside the timeout
    		setTimeout(() => {
         	initLevel();}, 200);
  		}}               
		style={styles.Btn}>
		<img 
    		src={refreshIcon} 
    		alt="Ανανέωση Επιπέδου" 
    		style={styles.everyIconStyle} 
  		/>           
	    </button>
  
	<button 
          title= "Εμφάνιση κατηγοριών επιπέδου"
          onClick={() => {playSound(clickSound); setShowHints(true)} }
          style={styles.Btn}>
          <img 
    		src={infoIcon} 
    		alt="Hint" 
    		style={styles.everyIconStyle} />
        </button>
   
{/* shuffle button not shown
    <button 
            title="Ανακάτεμα των λέξεων" 
            onClick={()=> {playSound(clickSound);handleShuffle()}} 
            style={styles.Btn}>
            <img 
    		src={shuffleIcon} 
    		alt="Ανακάτεμα" 
    		style={styles.everyIconStyle} />
        </button> */}
	<button 
	  title={isMuted ? "Ενεργοποίηση ήχου" : "Σίγαση ήχου"}
	  onClick={() => {
	    // We play the sound BEFORE toggling if we are unmuting, 
	    // so the user hears immediate feedback.
	    if (isMuted) {
	      const audio = new Audio(clickSound);
	      audio.volume = 0.5;
	      audio.play();
	    }
	    setIsMuted(!isMuted);
	  }} 
	  style={styles.Btn}>
          <img 
	    src={isMuted ? soundOFF : soundON} 
	    alt={isMuted ? "Ήχος απενεργοποιημένος" : "Ήχος ενεργοποιημένος"} 
	    style={styles.everyIconStyle} 
	  />
	</button>
	</div>
        <div><h3>Επίπεδο {levelIndex + 1}: {LEVELS[levelIndex]?.levelTitle}</h3></div><div> <h3>Χρόνος: {seconds}s</h3></div>

        </div>

      {/* 2. The Main Game Board */}
 <div style={styles.gameBoardContainer}>
     <GameBoard 
        slots={slots} 
        lockedGroups={lockedGroups} 
        groupTitles={selectedGroups.map(g => g.title)}
        selectedGroups={selectedGroups} 
        onStartDrag={handleStartDrag}
        hoveredSlot={hoveredSlot}
      />
</div>
 
      {/* 3. The Hint Modal (Pop-up) */}
      {showHints && (
        <div  style={styles.modalOverlay} onClick={() => setShowHints(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Κατηγορίες Επιπέδου {levelIndex + 1}</h2>
            <p style={{ fontSize: '0.9em', color: '#666' }}>Συνδύασε τις λέξεις που σχηματίζουν τις παρακάτω κατηγορίες:</p>
            <ul style={styles.list}>
              {selectedGroups.map((g, i) => (
                <li key={i} style={styles.listItem}>{g.title}</li>
              ))}
            </ul>
            <button 
              onClick={() => setShowHints(false)} 
              style={styles.closeButton}
            >
              Κλείσιμο
            </button>
          </div>
        </div>
      )}

      {/* 4. Victory Modal */}
      {victory && (
        <VictoryModal 
          onRestart={handleNextLevel} 
          title={levelIndex === LEVELS.length - 1 ? "🎉 Συγχαρητήρια! Τερμάτισες το παιχνίδι!" : "🌟 Το Επίπεδο Ολοκληρώθηκε!"}
          buttonText={levelIndex === LEVELS.length - 1 ? "Παίξε από την αρχή" : "Επόμενο Επίπεδο"}
        />
      )} 

{/* Orientation Guard: Only shows when phone is held vertically */}
<div className="orientation-guard">
  <div style={styles.rotateMessage}>
    <img src={refreshIcon} style={{ width: '50px', marginBottom: '15px', transform: 'rotate(90deg)' }} />
    <h2>Παρακαλώ γυρίστε το κινητό σας οριζόντια</h2>
    <p>(Landscape Mode)</p>
  </div>
</div>      
    </>
  );
}

const styles = {
  header: {
    maxHeight: "30px",
    maxWidth: "632px",
    display: "flex",
    margin: "auto",
    right: "0px",
    left: "0px",
    fontSize: "0.9rem",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 4px",
    background: "#f0f0f0",
    borderRadius: "5px",
    marginBottom: "5px",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    MozUserSelect: "none",
    WebkitTapHighlightColor: "transparent",
  zoom: window.innerWidth < 650 ? "0.8" : "1",  //width (650) should be adjusted to game container
  WebkitZoom: window.innerWidth < 650 ? "0.8" : "1", // Specific for Safari - width (650) should be adjusted to game container
  },
  Btn: {
    fontFamily: "myGameFont",
    color:"white",
    background: "purple",
    border: "1px solid #ccc",
    borderRadius: "45px",
    padding: "8px 15px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  transition: "transform 0.1s active",
    outline: "none",
},
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000, // Make sure it is above the "ghost" tile
  },
  modalContent: {
    fontFamily: "myGameFont",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "80%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  list: {
    textAlign: "left",
    lineHeight: "1.8",
    fontSize: "16px",
  },
  listItem: {
    marginBottom: "5px",
    color: "#333",
  },
  closeButton: {
    fontFamily: "myGameFont",
    marginTop: "15px",
    padding: "10px 20px",
    background: "purple",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  everyIconStyle: {
    maxHeight: "20px",
  },
rotateMessage: {
  position: 'fixed',
  top: 0, left: 0,
  width: '100vw', height: '100vh',
  backgroundColor: 'purple', 
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
  textAlign: 'center',
  fontFamily: 'myGameFont'
},
// Inside WordConnect.jsx styles
gameBoardContainer: {
  width: "100%",
  maxWidth: "632px",
  margin: "0 auto",
transform: window.innerWidth < 650 ? `scale(${window.innerWidth / 650})` : "scale(1)",
  transformOrigin: "top center",
};