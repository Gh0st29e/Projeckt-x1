const express = require("express");
const app = express();

app.use(express.json());

// Test-Seite
app.get("/", (req, res) => {
  res.send("Backend läuft 🚀");
});

// Umfrage erstellen
app.post("/polls", (req, res) => {
  res.json({ message: "Umfrage gespeichert!" });
});

// Bewerbungen
app.post("/applications", (req, res) => {
  res.json({ message: "Bewerbung gespeichert!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server läuft auf Port " + PORT);
});
