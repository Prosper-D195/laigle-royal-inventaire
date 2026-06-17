const express = require('express');
const router = express.Router();

// On importe notre tout nouveau contrôleur pour l'accueil
const indexController = require('../controllers/indexController');

// fonction textuelle par celle du contrôleur
router.get('/', indexController.getDashboard);

module.exports = router;