// webpack.config.js
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'production', // ou 'development' selon votre besoin
    entry: './js/rooter.js', // Point d'entrée (ajustez selon votre structure)
    output: {
        path: path.resolve(__dirname, 'dist'), // Dossier de sortie du bundle
        filename: 'bundle.js', // Fichier bundle généré
    },
    plugins: [
        new Dotenv(), // Charge les variables d'environnement à partir du fichier .env
    ],
};
