const express = require('express');
const router = express.Router();

// [READ] Liste de tous les articles
router.get('/', (req, res) => {
  res.send("Liste de tous les articles de l'inventaire (Papayes Calina, poussins...)");
});

// [CREATE] Formulaire de création d'un article
router.get('/creer', (req, res) => {
  res.send("Formulaire pour ajouter un nouvel article");
});

// [CREATE] Traitement de la création
router.post('/creer', (req, res) => {
  res.send("Traitement de la création de l'article");
});

// [READ] Détail d'un article spécifique
router.get('/:id', (req, res) => {
  res.send(`Affichage de l'article avec l'ID : ${req.params.id}`);
});

// [UPDATE] Formulaire de modification d'un article
router.get('/:id/modifier', (req, res) => {
  res.send(`Formulaire pour modifier l'article ${req.params.id}`);
});

// [UPDATE] Traitement de la modification
router.post('/:id/modifier', (req, res) => {
  res.send(`Traitement de la modification de l'article ${req.params.id}`);
});

// [DELETE] Suppression d'un article
router.post('/:id/supprimer', (req, res) => {
  res.send(`Suppression de l'article ${req.params.id}`);
});

module.exports = router;