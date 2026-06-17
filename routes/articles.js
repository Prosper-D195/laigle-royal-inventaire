const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// 1. [READ] Liste globale
router.get('/', articleController.getAllArticles);

// 2. [CREATE] Formulaires d'ajout
router.get('/creer', articleController.getCreateForm);
router.post('/creer', articleController.createArticle);

// 3. [UPDATE] Formulaires de modification
router.get('/:id/modifier', articleController.getUpdateForm);
router.post('/:id/modifier', articleController.updateArticle);

// 4. LIGNE 13 : Détail d'un article spécifique
router.get('/:id', articleController.getArticleById);

// 5. [DELETE] Suppression
router.post('/:id/supprimer', articleController.deleteArticle);

module.exports = router;