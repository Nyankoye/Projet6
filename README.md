# Projet6 Développez une application web en utilisation une API
Ce projet consiste à créer une application web permettant de visualiser en temps réel un classement de films intéressants.
Les informations sur les films se trouvent sur une API locale que vous pouvez installer sur votre ordinateur. 
Le lien de l’API est le suivant: [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
# Execution du code
 Pour exécuter ce code, vous devez suivre les informations suivantes:
 ## Option 1
 * Installer et lancer l'API en suivant les instructions sur [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
 * Inserer ce HTML: " <script src="./JS/index.js"></script> "  juste avant la fermeture de la balise </body>
 * Ouvrir le fichier index.html avec un navigateur
 * En cas de message d'erreur du type CORS Header: Access-Control-Allow-Origin utiliser l'option 2, c'est celle que j'ai utilisée pour developper l'application web.
 ## Option 2 
 * Installer et lancer l'API en suivant les instructions sur [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
 * Si vous n'avez pas npm rendez-vous sur [la page suivante](https://nodejs.org/en/)
 * Installer [webpack](https://webpack.js.org/) en utilisant la commande: npm install webpack webpack-cli --save-dev
 * Installer [webpack-dev-server](https://github.com/webpack/webpack-dev-server) en utilisant la commande:  npm install webpack-dev-server --save-dev
 * Utiliser la commande: npm run start:dev
 * Cette commande permet de lancer le server local et ouvrira automatiquement la page web.
