# Projet6 Développez une application web en utilisation une API
Ce projet consiste à créer une application web permettant de visualiser en temps réel un classement de films intéressants.
Les informations sur les films se trouvent sur une API locale que vous pouvez installer sur votre ordinateur. 
Le lien de l’API est le suivant: [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
# Execution du code
 Pour exécuter ce code vous devez suivre les informations suivantes:
 ## Option 1
 * Installer et lancer l'API en suivant les informations sur [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
 * Inserer ce html <script src="js/index.js"></script> dans le fichier index.html juste avant la fermeture de la balise body
 * Ouvrir le fichier index.html avec un navigateur
 * En cas de message d'erreur du type CORS Header: Access-Control-Allow-Origin utiliser l'option 2 c'est celle que j'ai utilisée pour developper l'application web.
 ## Option 2 
 * Installer et lancer l'API en suivant les informations sur [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
 * Utiliser [webpack](https://webpack.js.org/) pour Regrouper les fichiers
 * Créer un server local en utilisant [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
 * Ouvrir le fichier index.html
