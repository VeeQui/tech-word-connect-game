# Tech-word-connect-game 🎮

> **Language / Γλώσσα:** [English](#english) | [Ελληνικά](#ελληνικά)

---

<a name="english"></a>
## English

**Tech-word-connect-game** is an interactive educational online game specifically designed for **Computer Science** classes in the 1st and 2nd grades of Greek Junior High School (Gymnasio).

The game helps students reinforce fundamental IT concepts in an engaging way, focusing on:

* **Hardware**
* **Software**
* **Networks**

## 🚀 Features

* **Educational Focus:** Aligned with the Greek curriculum for Junior High School.
* **Web-based:** Runs directly in any modern web browser.
* **Integrated Styling:** All CSS styles are included within the project files for easier management and portability.
* **Highly Customizable:** Easily modify colors, images, sounds, and the vocabulary list.

## 🛠 Customization

The game is built with a focus on flexibility for educators and developers:

1. **Terminology:** Modify terms and categories in the `gameData.jsx` file.
2. **Visuals & Sounds:** Replace assets in the relevant folders to change the look and feel.
3. **Styles:** The design is directly accessible within the code (CSS-in-JS or embedded styles), allowing for quick tweaks to the UI.

## 📦 Installation & Setup

To run the game locally:

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/Tech-word-connect-game.git

```


2. Open `index.html` in your browser.

---

### ⚙️ Development Note (.gitignore)

To keep the repository clean, a `.gitignore` file is included. If you are setting this up from scratch, ensure your `.gitignore` contains:

```text
# System files
.DS_Store
Thumbs.db

# IDE & Editor folders
.vscode/
.idea/

# Dependencies & Build folders
node_modules/
dist/
build/
```

---

## 📄 License

This project is available for educational use. Please check the [LICENSE](https://www.google.com/search?q=LICENSE) file for more details.

---

/**
 * TECH-WORD-CONNECT-GAME - Data Configuration Guide
 * ------------------------------------------------
 * The game is structured in LEVELS. Each level contains:
 * - id: Unique level number.
 * - levelTitle: The title displayed to the player.
 * - groups: A list of objects containing:
 * - title: The category name (e.g., "Input Devices").
 * - solution: An array of exactly 4 words belonging to that category.
 * * ⚠️ ATTENTION:
 * 1. Each group must have 4 words in the 'solution' array -I'm working on making it customizable.
 * 2. Ensure all commas (,) are correctly placed between items.
      > **Go to gameData.jsx:** [Here](#gameData)
 */

---

<a name="ελληνικά"></a>
## Ελληνικά
Tech-word-connect-game

Το Tech-word-connect-game είναι ένα διαδραστικό, εκπαιδευτικό online παιχνίδι που σχεδιάστηκε ειδικά για το μάθημα της Πληροφορικής της Α' και Β' τάξης του Ελληνικού Γυμνασίου.

Το παιχνίδι βοηθά τους μαθητές να εμπεδώσουν βασικές έννοιες της πληροφορικής με ευχάριστο τρόπο, εστιάζοντας στις θεματικές ενότητες:

Υλικό (Hardware)

Λογισμικό (Software)

Δίκτυα (Networks)

🚀 Χαρακτηριστικά
Εκπαιδευτικό περιεχόμενο: Βασισμένο στη διδακτέα ύλη του Γυμνασίου.

Web-based: Παίζει απευθείας στον browser χωρίς εγκατάσταση.

Responsive Design: Κατασκευασμένο με HTML, CSS και JavaScript.

Πλήρως Παραμετροποιήσιμο: Ο κώδικας επιτρέπει την εύκολη αλλαγή χρωμάτων, εικόνων, ήχων και λέξεων.

🛠 Παραμετροποίηση (Customization)
Αν είστε εκπαιδευτικός ή προγραμματιστής, μπορείτε εύκολα να προσαρμόσετε το παιχνίδι στις ανάγκες σας:

Αλλαγή Λέξεων/Όρων: Τροποποιήστε το αρχείο gameData.jsx.

Σχεδίαση: Αλλάξτε τα χρώματα και τη μορφοποίηση μέσω του style.css και των αρχείων jsx.

Πολυμέσα: Αντικαταστήστε τα αρχεία στον φάκελο των assets για να αλλάξετε ήχους και εικόνες.

📦 Εγκατάσταση και Χρήση
Για να τρέξετε το παιχνίδι τοπικά:

Κάντε clone το αποθετήριο:

Bash
git clone https://github.com/[το-όνομα-χρήστη-σας]/Tech-word-connect-game.git
Ανοίξτε το αρχείο index.html στον browser σας.

⚠️ Σημείωση για τον Προγραμματιστή (Git Setup)

Για την ορθή διαχείριση του κώδικα στο GitHub, βεβαιωθείτε ότι έχετε δημιουργήσει ένα αρχείο .gitignore στη ρίζα του φακέλου σας.

Προτεινόμενο .gitignore:

```Plaintext
# OS files
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/

# Node environment (αν υπάρχει)
node_modules/
dist/
```

---

📄 Άδεια Χρήσης
Το έργο αυτό διατίθεται για εκπαιδευτικούς σκοπούς. Δείτε το αρχείο LICENSE για περισσότερες λεπτομέρειες.

---

/**
 * TECH-WORD-CONNECT-GAME - Ορισμός κατηγοριών-όρων
 * ------------------------------------------------
 * ΕΛΛΗΝΙΚΑ:
 * Το παιχνίδι χωρίζεται σε Επίπεδα (LEVELS). Κάθε επίπεδο έχει:
 * - id: Μοναδικός αριθμός επιπέδου.
 * - levelTitle: Ο τίτλος που εμφανίζεται στην αρχή.
 * - groups: Μια λίστα από αντικείμενα που περιλαμβάνουν:
 * - title: Το όνομα της κατηγορίας (π.χ. "Μονάδες εισόδου").
 * - solution: Πίνακας με 4 λέξεις που ανήκουν σε αυτή την κατηγορία -θα προστεθεί η δυνατότητα παραμετροποίησης αριθμού λέξεων.
 * * ⚠️ ΠΡΟΣΟΧΗ:
 * 1. Κάθε ομάδα πρέπει να έχει ακριβώς 4 λέξεις στο 'solution'.
 * 2. Μην ξεχνάτε τα κόμματα (,) ανάμεσα στις λέξεις και τις ομάδες.
 */

<a name="gameData"></a>
## gameData.jsx:

```text
// gameData.jsx
export const LEVELS = [
  {
    id: 1,
    levelTitle: "Υλικό και Λογισμικό", // Title for Level 1
    // Provide a large pool of groups here
    groups: [
      { title: "Μονάδες εισόδου", solution: ["Web κάμερα", "Πληκτρολόγιο", "Ποντίκι", "Σαρωτής"] },
      { title: "Μονάδες εξόδου", solution: ["Εκτυπωτής", "Ηχεία", "Ακουστικά", "Βιντεοπροβολέας"] },
      { title: "Λογισμικό Συστήματος", solution: ["BIOS", "Διεπαφή", "Λειτουργικό Σύστημα", "Drivers"] },
      { title: "Εφαρμογές", solution: ["Κειμενογράφος", "Παιχνίδια", "Ζωγραφική", "Υπολογιστικά φύλλα"] },
      { title: "Λειτουργικά Συστήματα", solution: ["Windows", "MacOS", "Android", "Linux"] },
      { title: "Λογισμικό Εφαρμογών", solution: ["Επικοινωνία", "Ανάγκες", "Εργασίες", "Διασκέδαση"] },
      { title: "Διαχείριση αρχείων", solution: ["Δέντρο καταλόγων", "Root", "Φάκελοι", "Αρχεία"] },
      { title: "GUI", solution: ["Κουμπιά", "Κλικ", "Εικονίδια", "Παράθυρο"] },
      { title: "Εσωτερικά εξαρτήματα", solution: ["CPU", "RAM", "Μητρική πλακέτα", "Κάρτα γραφικών"] },
      { title: "Αποθηκευτικά μέσα", solution: ["SSD", "HDD", "Μνήμη USB", "Cloud"] },
      { title: "Θύρες", solution: ["HDMI", "USB", "Ethernet", "VGA"] }
    ]
  },
  {
    id: 2,
    levelTitle: "Δίκτυα και Διαδίκτυο", // Title for Level 2
    groups: [
      { title: "Δικτυακές συσκευές", solution: ["Η/Υ", "Έξυπνες συσκευές", "Εκτυπωτές", "Tablet"] },
      { title: "Δίκτυο Κινητής Τηλεφωνίας", solution: ["Κυψελωτό", "Σταθμός βάσης", "Ραδιοκύματα", "Κινητό"] },
      { title: "Δημόσιο Τηλεφωνικό Δίκτυο", solution: ["Τηλέφωνο", "VoIP", "Φωνή", "PSTN"] },
      { title: "Διαδίκτυο", solution: ["Client-Server", "TCP/IP", "Παγκόσμιο", "ISP"] },
      { title: "Είδη Δικτύων Υπολογιστών", solution: ["Ασύρματο", "Τοπικό", "Ευρείας Περιοχής", "Σώματος"] },
      { title: "Ενεργός εξοπλισμός δικτύου", solution: ["Router", "Switch", "Access Point", "MODEM"] },
      { title: "Υπηρεσίες Διαδικτύου", solution: ["Παγκόσμιος Ιστός", "email", "FTP", "Chat & Messaging"] },
      { title: "Φυλλομετρητής", solution: ["https://", "Ιστοσελίδα", "Μηχανή Αναζήτησης", "Διεύθυνση URL"] },
      { title: "Ασύρματη σύνδεση", solution: ["WiFi", "Bluetooth", "Δορυφορική", "NFC"] },
      { title: "Ενσύρματη σύνδεση", solution: ["USB", "UTP", "Firewire", "Οπτική ίνα"] },
      { title: "Δίκτυο Υπολογιστών", solution: ["Σύνδεση", "Συσκευές", "Σταθμός", "Κόμβος"] }
    ]
  }
];
```
