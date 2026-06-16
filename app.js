const express = require('express');
const app = express();
const mainRouter = require('./routes/index');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Permet à Express de lire les données des formulaires (POST)
app.use(express.urlencoded({ extended: true }));

// Utilisation du routeur principal
app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur : http://localhost:${PORT}`);
});