const db = require('../config/db');

// [READ] Afficher l'historique de tous les mouvements
exports.getAllMouvements = async (req, res) => {
  try {
    const queryText = `
      SELECT mouvements.*, articles.nom AS article_nom 
      FROM mouvements 
      JOIN articles ON mouvements.article_id = articles.id
      ORDER BY mouvements.date_mouvement DESC
    `;
    const result = await db.query(queryText);
    
    res.render('mouvements/index', { mouvements: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la récupération de l'historique");
  }
};