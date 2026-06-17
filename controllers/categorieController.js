const db = require('../config/db');

// 1. [READ] Afficher toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM categories ORDER BY nom ASC');
    res.render('categories/index', { categories: result.rows, title: "Toutes les Catégories" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des catégories");
  }
};

// 2. [READ] Voir les articles d'une catégorie spécifique
exports.getCategorieById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Récupérer les infos de la catégorie
    const catResult = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    if (catResult.rows.length === 0) {
      return res.status(404).send("Catégorie non trouvée");
    }

    // Récupérer les articles liés à cette catégorie
    const articlesResult = await db.query('SELECT * FROM articles WHERE categorie_id = $1 ORDER BY nom ASC', [id]);

    res.render('categories/detail', { 
      categorie: catResult.rows[0], 
      articles: articlesResult.rows 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération des détails de la catégorie");
  }
};

// 3. [CREATE] Afficher le formulaire de création
exports.getCreateForm = async (req, res) => {
  res.render('categories/form', { title: "Ajouter une catégorie", categorie: null });
};

// 4. [CREATE] Traiter l'ajout en BDD
exports.createCategorie = async (req, res) => {
  try {
    const { nom, description } = req.body;
    await db.query('INSERT INTO categories (nom, description) VALUES ($1, $2)', [nom, description]);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la création de la catégorie");
  }
};

// 5. [UPDATE] Afficher le formulaire de modification
exports.getUpdateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send("Catégorie non trouvée");
    }
    
    res.render('categories/form', { 
      title: `Modifier la catégorie : ${result.rows[0].nom}`, 
      categorie: result.rows[0] 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors du chargement du formulaire");
  }
};

// 6. [UPDATE] Traiter la modification (Sécurisée)
exports.updateCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, adminPassword } = req.body;

    if (adminPassword !== process.env.ADMIN_SECRET_PASSWORD) {
      return res.status(403).send("Action refusée : Mot de passe incorrect.");
    }

    await db.query('UPDATE categories SET nom = $1, description = $2 WHERE id = $3', [nom, description, id]);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la mise à jour de la catégorie");
  }
};

// 7. [DELETE] Supprimer une catégorie
exports.deleteCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminPassword } = req.body;

    if (adminPassword !== process.env.ADMIN_SECRET_PASSWORD) {
      return res.status(403).send("Action refusée : Mot de passe incorrect.");
    }

    await db.query('DELETE FROM categories WHERE id = $1', [id]);
    res.redirect('/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send("Impossible de supprimer cette catégorie car elle contient des articles en stock.");
  }
};