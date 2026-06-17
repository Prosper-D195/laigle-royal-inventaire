const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');

// 1. [READ] Liste globale
router.get('/', categorieController.getAllCategories);

// 2. [CREATE] Formulaires de création (Placés avant le :id variable)
router.get('/creer', categorieController.getCreateForm);
router.post('/creer', categorieController.createCategorie);

// 3. [UPDATE] Formulaires de modification
router.get('/:id/modifier', categorieController.getUpdateForm);
router.post('/:id/modifier', categorieController.updateCategorie);

// 4. [READ] Voir les articles d'une catégorie spécifique
router.get('/:id', categorieController.getCategorieById);

// 5. [DELETE] Suppression
router.post('/:id/supprimer', categorieController.deleteCategorie);

module.exports = router;