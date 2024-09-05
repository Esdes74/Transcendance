// Importer les modules nécessaires
const http = require('http');
const fs = require('fs');
const path = require('path');

// Définir le port sur lequel le serveur écoutera
const PORT = process.env.PORT || 3000;

// Créer le serveur
const server = http.createServer((req, res) => {
    // Définir le répertoire où se trouvent les fichiers statiques
    const staticDir = path.join(__dirname, 'public');

    // Construire le chemin du fichier demandé
    let filePath = path.join(staticDir, req.url === '/' ? 'index.html' : req.url);

    // Obtenir l'extension du fichier pour déterminer le type de contenu
    const extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }

    // Lire le fichier et le renvoyer comme réponse
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // En cas d'erreur (ex. fichier non trouvé), envoyer une réponse 404
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(staticDir, '404.html'), (error, page404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(page404, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Erreur serveur : ${err.code}`);
            }
        } else {
            // Envoyer le contenu du fichier avec le bon type MIME
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Démarrer le serveur et écouter sur le port défini
server.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});

// const express = require('express');
// const app = express();

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
