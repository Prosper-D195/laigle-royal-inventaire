const { Pool } = require('pg');
require('dotenv').config();

// On utilise directement l'URL du .env pour ce script indépendant
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  prix NUMERIC(10, 2) NOT NULL,
  quantite INT NOT NULL DEFAULT 0,
  categorie_id INT REFERENCES categories(id) ON DELETE RESTRICT
);

INSERT INTO categories (nom, description) VALUES
('Verger', 'Productions fruitières exotiques de l''exploitation'),
('Élevage', 'Gestion du cheptel et des productions animales'),
('Intrants & Matériel', 'Engrais, semences et outils de la ferme')
ON CONFLICT (nom) DO NOTHING;

INSERT INTO articles (nom, description, prix, quantite, categorie_id) VALUES
('Papaye Calina IPB9', 'Papayes douces, sélectionnées pour le marché', 1500, 120, 1),
('Poussins d''un jour', 'Lot de poussins pour le renouvellement des poulaillers', 500, 300, 2),
('Aliment Volaille Croissance', 'Sac de 50kg pour l''alimentation des poulets', 18000, 25, 3)
ON CONFLICT DO NOTHING;
`;

async function main() {
  console.log("Connexion à la base de données et création des tables...");
  const client = await pool.connect();
  try {
    await client.query(SQL);
    console.log("Félicitations ! Les tables ont été créées et peuplées avec succès !");
  } catch (err) {
    console.error("Erreur lors du peuplement de la base de données :", err);
  } finally {
    client.release();
    await pool.end();
  }
}

main();