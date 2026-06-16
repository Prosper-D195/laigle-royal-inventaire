const express = require('express');
const router = express.Router();

const categoriesRouter = require('./categories');
const articlesRouter = require('./articles');

// Page d'accueil principale
router.get('/', (req, res) => {
  res.send("Bienvenue sur le tableau de bord de l'inventaire L'AIGLE ROYAL !");
});

// Liaison des sous-routes
router.use('/categories', categoriesRouter);
router.use('/articles', articlesRouter);

module.exports = router;