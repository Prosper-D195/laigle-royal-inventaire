const db = require('../config/db');

exports.getDashboard = async (req, res) => {
  try {
    // 1. Statistiques globales existantes
    const countArticlesResult = await db.query('SELECT COUNT(*) FROM articles');
    const totalArticles = countArticlesResult.rows[0].count;

    const countCategoriesResult = await db.query('SELECT COUNT(*) FROM categories');
    const totalCategories = countCategoriesResult.rows[0].count;

    const valueStockResult = await db.query('SELECT SUM(prix * quantite) FROM articles');
    const totalValue = valueStockResult.rows[0].sum || 0;

    const lowStockResult = await db.query('SELECT * FROM articles WHERE quantite < 10 ORDER BY quantite ASC');

    // ================= NEW : DONNÉES POUR LES GRAPHIQUES =================
    
    // Graphique 1 : Valeur totale du stock par Catégorie (Jointure + Group By)
    const catValueResult = await db.query(`
      SELECT categories.nom AS categorie, SUM(articles.prix * articles.quantite) AS valeur
      FROM articles
      JOIN categories ON articles.categorie_id = categories.id
      GROUP BY categories.nom
    `);

    // Graphique 2 : Quantités en stock par Article
    const articleQuantitiesResult = await db.query(`
      SELECT nom, quantite FROM articles ORDER BY quantite DESC
    `);

    // On passe TOUTES les données à la vue EJS
    res.render('index', {
      totalArticles,
      totalCategories,
      totalValue,
      lowStockArticles: lowStockResult.rows,
      catLabels: catValueResult.rows.map(row => row.categorie),
      catValues: catValueResult.rows.map(row => row.valeur),
      articleLabels: articleQuantitiesResult.rows.map(row => row.nom),
      articleValues: articleQuantitiesResult.rows.map(row => row.quantite)
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors du chargement du tableau de bord");
  }
};