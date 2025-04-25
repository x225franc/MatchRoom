MatchRoom
Présentation
MatchRoom est un projet conçu pour offrir une expérience fluide de création et de gestion de salons virtuels.
L'application permet aux utilisateurs de créer des salles, d'y inviter des participants et de chatter en temps réel.

Structure du projet
```php
MatchRoom/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Room.js
│   │   ├── UserList.js
│   │   ├── ChatBox.js
│   │   └── ...
│   │
│   ├── views/               # Pages principales
│   │   ├── Home.js
│   │   └── ...
│
│   ├── services/            # Services pour appels API
│   │   ├── api.js
│   │   └── ...
│
│   ├── utils/               # Fonctions utilitaires et constantes
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── ...
│
│   ├── App.js
│   └── index.js
│
├── package.json
├── .gitignore
└── README.md
```

Composants Clés
Room.js
Rôle : Gestion de la création et de l'administration des salons.

Fonctions principales :

createRoom() : Crée une nouvelle salle.

deleteRoom() : Supprime une salle existante.

updateRoomSettings() : Met à jour la configuration d'une salle.

UserList.js
Rôle : Gestion de la liste des participants dans une salle.

Fonctions principales :

addUser() : Ajoute un utilisateur à la salle.

removeUser() : Retire un utilisateur de la salle.

listUsers() : Affiche la liste des participants.

ChatBox.js
Rôle : Gestion de la messagerie instantanée.

Fonctions principales :

sendMessage() : Envoie un message dans la salle.

receiveMessage() : Gère la réception des messages entrants.

Utilitaires
api.js
Rôle : Interaction avec le backend via API.

Fonctions principales :

fetchRooms() : Récupère la liste des salles disponibles.

saveRoom() : Sauvegarde les données d'une salle sur le serveur.

helpers.js
Rôle : Fonctions utilitaires réutilisables.

Fonctions principales :

formatDate() : Mise en forme des dates.

validateInput() : Validation des entrées utilisateur.

Bien démarrer
Installation :

Cloner le projet :

```bash
Copier
Modifier
git clone https://github.com/ton-profil/matchroom.git
Installer les dépendances :
```

```bash
Copier
Modifier
cd matchroom
npm install
Lancement de l'application :
```

```bash
Copier
Modifier
npm start
Cela lancera l'application en mode développement à l'adresse http://localhost:3000/.
```

