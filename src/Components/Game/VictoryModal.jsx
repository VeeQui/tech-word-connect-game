import React, { useState, useRef } from "react";

// Added new props: title and buttonText
export default function VictoryModal({ onRestart, title, buttonText }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const onPointerMove = (e) => {
    if (!dragging.current) return;
    setPos({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      style={styles.overlay}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div
        style={{
          ...styles.modal,
          transform: `translate(${pos.x}px, ${pos.y}px)`,
        }}
        onPointerDown={onPointerDown}
      >
        {/* Dynamic Title (e.g., Level Clear!) */}
        <h2 style={styles.title}>{title || "🎉 Μπράβο!"}</h2>
        
        {/* Dynamic Button Text (e.g., Next Level) */}
        <button style={styles.button} onClick={onRestart}>
          {buttonText || "Παίξε ξανά"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    pointerEvents: "auto",
    display: "flex", // Added to ensure center alignment
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.3)", // Dim the background slightly
  },
  modal: {
    background: "#fff",
    padding: 32, // More padding for a cleaner look
    borderRadius: 16,
    cursor: "grab",
    userSelect: "none",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    minWidth: "250px",
  },
  title: {
    margin: "0 0 20px 0",
    color: "#333",
    fontFamily: "inherit",
  },
  button: {
    padding: "12px 24px",
    fontSize: "18px",
    backgroundColor: "purple", // Purple theme
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }
};