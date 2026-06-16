const express = require('express');
const router = express.Router();

// [READ] Liste de toutes les catégories
router.get('/', (req, res) => {
  res.send("Liste de toutes les catégories (Verger, Élevage...)");
});

// [CREATE] Formulaire de création d'une catégorie
router.get('/creer', (req, res) => {
  res.send("Formulaire pour ajouter une nouvelle catégorie");
});

// [CREATE] Traitement de la création
router.post('/creer', (req, res) => {
  res.send("Traitement de la création en base de données");
});

// [READ] Détail d'une catégorie spécifique
router.get('/:id', (req, res) => {
  res.send(`Affichage de la catégorie avec l'ID : ${req.params.id}`);
});

// [UPDATE] Formulaire de modification d'une catégorie
router.get('/:id/modifier', (req, res) => {
  res.send(`Formulaire pour modifier la catégorie ${req.params.id}`);
});

// [UPDATE] Traitement de la modification
router.post('/:id/modifier', (req, res) => {
  res.send(`Traitement de la modification de la catégorie ${req.params.id}`);
});

// [DELETE] Suppression d'une catégorie
router.post('/:id/supprimer', (req, res) => {
  res.send(`Suppression de la catégorie ${req.params.id}`);
});

module.exports = router;