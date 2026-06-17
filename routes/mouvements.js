const express = require('express');
const router = express.Router();
const mouvementController = require('../controllers/mouvementController');

// Route globale pour l'historique
router.get('/', mouvementController.getAllMouvements);

module.exports = router;