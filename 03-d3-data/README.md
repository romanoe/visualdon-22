# Données

## Installation
Comme la semaine dernière, le dossier d'exercice contient les élément nécéssaire pour démarrer un serveur [Node.js](https://nodejs.org/en/) en local et de *traduire* votre code ES6 dans un langage lisible par le navigateur avec [webpack](https://webpack.js.org/).  
* Rentrez dans le dossier *03-d3-data* ``cd 03-d3-data/``
* Installez les packages nécessaires et qui sont dans le package.json ```npm install```
* Démarrez le serveur ```npm start```

:rocket: Vous devriez avoir accès à votre serveur local sur [localhost:8080](http:localhost:8080) :rocket:

Comme la semaine passée, le fichier html se trouve dans ```public/index.html``` et l'exercice se déroulera dans le fichier ```src/ìndex.js```, où vous allez enfin charger et manipuler des données. 

## Charger les données
* [{JSON} Placeholder](https://jsonplaceholder.typicode.com/) est un projet qui met à disposition de fake API pour tester et prototyper des applications. Chargez les données `posts` et `users` avec d3.json()

Pour charger plusieurs datasets: https://stackoverflow.com/questions/49239474/load-multiple-files-using-the-d3-fetch-module

## Manipuler les données
* A partir des données **users** et **posts**, créez un tableau d'objets qui a la structure suivante

```js
[
  {
    nom_utilisateur: 'Machin',
    ville: 'Truc',
    nom_companie: 'Bidule',
    titres_posts: [
      'Titre 1',
      'Titre 2',
    ]
  },
  // ...
]
```
Ecrivez dans le DOM les résultats suivants: 

* Calculez le nombre de **posts** par **user**
* Trouvez le **user** qui a écrit le texte le plus long dans **posts.body**

## Dessiner avec les données
* Dessinez un graphique en bâton en ayant sur l'axe *x* les utilisateurs et *y* le nombre de posts 
* Mettez une étiquette en dessous ce chaque bâton qui indique le nombre de posts

