# laigle-royal-inventaire

# 🦅 L'AIGLE ROYAL - Gestion d'Inventaire Agricole

L'AIGLE ROYAL est une application web intuitive et dynamique de gestion de stocks et de suivi des flux de production, conçue spécifiquement pour les exploitations agricoles (suivi des récoltes, ventes, et pertes en temps réel).

## 🚀 Fonctionnalités Clés

*   **Tableau de Bord Analytique :** Indicateurs clés de performance (KPIs) affichant le nombre total d'articles, de catégories et la valeur financière globale du stock (en FCFA).
*   **Graphiques Dynamiques (Chart.js) :** 
    *   Visualisation de la répartition financière de la valeur des stocks par catégorie (Camembert).
    *   Comparatif visuel des volumes et quantités disponibles par article (Histogramme).
*   **Système d'Alertes :** Détection automatique et mise en évidence des articles proches de la rupture de stock (moins de 10 unités).
*   **Historique Automatisé des Flux :** Chaque modification de quantité (réapprovisionnement ou vente) génère automatiquement une entrée "ENTRÉE" ou "SORTIE" datée et commentée dans le journal des mouvements.
*   **Sécurisation Administrateur :** Actions sensibles (modification, suppression) protégées par un mot de passe administrateur global.
*   **Export PDF en un Clic :** Génération instantanée de rapports d'inventaire complets et imprimables directement depuis l'interface grâce à `html2pdf.js`.

## 🛠️ Technologies Utilisées

*   **Backend :** Node.js, Express.js
*   **Base de données :** PostgreSQL (avec le module `pg`)
*   **Moteur de rendu :** EJS (Embedded JavaScript templates)
*   **Frontend & Graphiques :** HTML5/CSS3, Chart.js, html2pdf.js
*   **Gestionnaire de tâches :** Nodemon (environnement de développement)

