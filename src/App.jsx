import React from "react";
import { HashRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import Home from "./Pages/Home";
import bgPattern from "./assets/computer-doodles.png";
import "./styles.css";
import WordConnect from "./Pages/WordConnect.jsx";

export default function App() {
  return (
    /* 1. Move the Router to the very top! */
    <Router>
      <div style={styles.container}>
        <div style={styles.card}>

        <Routes>
 	 	{/* The 'index' route is your Home page */}
  		<Route index element={<Home />} />
  		<Route path="/" element={<Home />} />
  		<Route path="/game" element={<WordConnect />} />
  
  		{/* Catch-all: If the URL is weird, send them Home */}
  		<Route path="*" element={<Navigate to="/" replace />} />
	</Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  container: { 
    zoom: window.innerWidth < 640 ? "0.8" : "1",
  WebkitZoom: window.innerWidth < 640 ? "0.8" : "1", // Specific for Safari
    overflowX: "hidden",
    padding: "20px", 
    minHeight: "100vh", // Added this so background covers whole screen
    fontFamily: "myGameFont",
    backgroundImage: `url(${bgPattern})`,
    backgroundRepeat: "repeat",
    backgroundSize: "200px", // Use pixels for more predictable tiling
    backgroundPosition: "top left"
  },
  nav: { 
    marginBottom: "10px",

  },
  card: {
    background: "rgba(255,255,255,0)",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  everyIconStyle: {
    maxHeight: "30px"
  }
};