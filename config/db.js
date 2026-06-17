const { Pool } = require('pg');
require('dotenv').config();

// Création du pool de connexion en utilisant l'URL du fichier .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Exporter le pool pour l'utiliser dans le reste de l'application
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool // Utile si on a besoin de fermer la connexion (comme dans le script de peuplement)
};