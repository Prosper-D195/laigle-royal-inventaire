const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

require('dotenv').config();

// 1. Configuration du moteur EJS et des Layouts globales
app.use(expressLayouts);
 
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/main'); // Force l'en-tête bleu de L'AIGLE ROYAL partout !

// 2. Fichiers statiques (CSS) et lecture des formulaires
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// 3. Déclaration de TOUTES tes routes
const mouvementRouter = require('./routes/mouvements');
const indexRouter = require('./routes/index');
const categorieRouter = require('./routes/categories');
const articleRouter = require('./routes/articles');

app.use('/', indexRouter);                 // Pour l'accueil / tableau de bord
app.use('/categories', categorieRouter);   // Pour les catégories
app.use('/articles', articleRouter);       // Pour les articles
app.use('/mouvements', mouvementRouter);

// 4. Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré avec succès sur le port ${PORT}`);
});