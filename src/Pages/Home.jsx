import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Home() {
  return (
    <div style={{ fontFamily: "myGameFont",borderRadius: "8px", border:"solid",textAlign: "center", background: "white" }}>
      <h1 style={{color:"purple"}}>Πόσο καλά ξέρεις Πληροφορική;</h1>
      <p>Συνδύασε τέσσερις λέξεις, για να βρεις την κατηγορία.</p>
       <p>Μπορείς να βρεις και τις πέντε* κατηγορίες;</p>

     <br />
      <Link
        to="/game"
        style={{
 	  fontFamily: "myGameFont",
          padding: "10px 20px",
          background: "purple",
          color: "#fff",
          borderColor: "lightgray",
	  borderStyle: "solid",
	  borderWidth: "3px",
          borderRadius: 8,
          textDecoration: "none",
	  fontSize: "30px",
        }}
     >
        Παίξε!
      </Link>
	<br />
       <p>* Το κάθε επίπεδο έχει συνολικά 11 κατηγορίες. Με κάθε ανανέωση επιλέγονται 5 τυχαίες.</p>

    </div>

  );
}
