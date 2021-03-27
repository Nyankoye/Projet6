# Projet6 Développez une application web en utilisation une API
Ce projet consiste à créer une application web permettant de visualiser en temps réel un classement de films intéressants.
Les informations sur les films se trouvent sur une API locale que vous pouvez installer sur votre ordinateur. 
Le lien de l’API est le suivant: [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
# Execution du code
 Pour exécuter ce code, vous devez suivre les instructions suivantes:
 ## Option 1 (Risque d'erreur)
 1. Installer et lancer l'API en suivant les instructions sur [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
 2. Inserer ce HTML: " <script src="./JS/index.js"></script> "  juste avant la fermeture de la balise (body)
 3. Ouvrir le fichier index.html avec un navigateur
 * En cas de message d'erreur du type CORS Header: Access-Control-Allow-Origin utiliser l'option 2, c'est celle que j'ai utilisée pour developper l'application web.
 ## Option 2 (Recommander)
 * Si vous avez commencer par l'option 1, veuillez retirer l'HTML inserer avant de commencer l'option 2
 1. Installer et lancer l'API en suivant les instructions sur [OCMovies-API](https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR)
 2. Si vous n'avez pas npm rendez-vous sur [la page suivante](https://nodejs.org/en/) pour telecharger et installer
 3. Installer [webpack](https://webpack.js.org/) en utilisant la commande: npm install webpack webpack-cli --save-dev
 4. Installer [webpack-dev-server](https://github.com/webpack/webpack-dev-server) en utilisant la commande:  npm install webpack-dev-server --save-dev
 5. Utiliser la commande: npm run start:dev
 * Cette commande permet de lancer le server local et ouvrira automatiquement la page web.
 * Pour les prochaines fois vous n'aurez qu'à réutiliser la commande de l'étape 5 c'est à dire: npm run start:dev
