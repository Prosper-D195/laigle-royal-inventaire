const db = require('../config/db');

// 1. [READ] Afficher TOUS les articles
exports.getAllArticles = async (req, res) => {
  try {
    const queryText = `
      SELECT articles.*, categories.nom AS categorie_nom 
      FROM articles 
      JOIN categories ON articles.categorie_id = categories.id
      ORDER BY articles.nom ASC
    `;
    const result = await db.query(queryText);
    res.render('articles/index', { articles: result.rows, title: "Tous les Articles" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des articles");
  }
};

// 2. [READ] Afficher le détail d'un article spécifique
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM articles WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send("Article non trouvé");
    }
    res.render('articles/detail', { article: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération de l'article");
  }
};

// 3. [CREATE] Afficher le formulaire de création
exports.getCreateForm = async (req, res) => {
  try {
    const categoriesResult = await db.query('SELECT * FROM categories ORDER BY nom ASC');
    res.render('articles/form', { 
      title: "Ajouter un article", 
      article: null, 
      categories: categoriesResult.rows 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors du chargement du formulaire");
  }
};

// 4. [CREATE] Traiter l'ajout en BDD
exports.createArticle = async (req, res) => {
  try {
    const { nom, description, prix, quantite, categorie_id } = req.body;
    await db.query(
      'INSERT INTO articles (nom, description, prix, quantite, categorie_id) VALUES ($1, $2, $3, $4, $5)',
      [nom, description, prix, quantite, categorie_id]
    );
    res.redirect('/articles');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la création de l'article");
  }
};

// 5. [UPDATE] Afficher le formulaire de modification
exports.getUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const articleResult = await db.query('SELECT * FROM articles WHERE id = $1', [id]);
    if (articleResult.rows.length === 0) {
      return res.status(404).send("Article non trouvé");
    }
    const categoriesResult = await db.query('SELECT * FROM categories ORDER BY nom ASC');
    res.render('articles/form', { 
      title: `Modifier l'article : ${articleResult.rows[0].nom}`, 
      article: articleResult.rows[0],
      categories: categoriesResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors du chargement du formulaire de modification");
  }
};

// 6. [UPDATE] Traiter la modification avec historique automatique !
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, quantite, categorie_id, adminPassword } = req.body;

    // Vérification du mot de passe admin secret
    if (adminPassword !== process.env.ADMIN_SECRET_PASSWORD) {
      return res.status(403).send("Action refusée : Mot de passe administrateur incorrect.");
    }

    // Récupérer l'ancienne quantité avant modification
    const oldArticleResult = await db.query('SELECT quantite FROM articles WHERE id = $1', [id]);
    if (oldArticleResult.rows.length === 0) {
      return res.status(404).send("Article non trouvé");
    }
    const ancienneQuantite = oldArticleResult.rows[0].quantite;
    const nouvelleQuantite = parseInt(quantite);

    // Mise à jour de l'article
    await db.query(
      'UPDATE articles SET nom = $1, description = $2, prix = $3, quantite = $4, categorie_id = $5 WHERE id = $6',
      [nom, description, prix, nouvelleQuantite, categorie_id, id]
    );

    // Enregistrement automatique du mouvement si le stock a changé
    if (ancienneQuantite !== nouvelleQuantite) {
      const difference = nouvelleQuantite - ancienneQuantite;
      const typeMouvement = difference > 0 ? 'ENTREE' : 'SORTIE';
      const quantiteAbsolue = Math.abs(difference);
      const commentaire = `Ajustement de stock lors de la modification (Ancien: ${ancienneQuantite} -> Nouveau: ${nouvelleQuantite})`;

      await db.query(
        'INSERT INTO mouvements (article_id, type_mouvement, quantite, commentaire) VALUES ($1, $2, $3, $4)',
        [id, typeMouvement, quantiteAbsolue, commentaire]
      );
    }

    res.redirect('/articles');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la mise à jour de l'article et du mouvement");
  }
};

// 7. [DELETE] Supprimer un article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminPassword } = req.body;

    if (adminPassword !== process.env.ADMIN_SECRET_PASSWORD) {
      return res.status(403).send("Action refusée : Mot de passe administrateur incorrect.");
    }

    await db.query('DELETE FROM articles WHERE id = $1', [id]);
    res.redirect('/articles');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la suppression de l'article");
  }
};