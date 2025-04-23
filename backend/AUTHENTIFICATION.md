# Documentation de l'Authentification

Ce document décrit le fonctionnement du système d'authentification du backend, y compris l'inscription, la connexion, l'authentification à deux facteurs (2FA) et la déconnexion.

## Prérequis

Avant de tester, assurez-vous que votre fichier `.env` à la racine du projet backend contient les variables suivantes :

```dotenv
DATABASE_URL=votre_url_de_connexion_postgresql
JWT_SECRET=votre_cle_secrete_tres_forte_pour_jwt
PORT=3000 # Ou le port de votre choix
```

## Structure Générale

- **`index.js`**: Point d'entrée, initialise Express et les routes.
- **`routes/authRoute.js`**: Définit les endpoints `/auth/*`.
- **`controllers/authController.js`**: Contient la logique métier pour chaque endpoint.
- **`middleware/authMiddleware.js`**: Vérifie le jeton JWT pour les routes protégées.
- **`models/usersModel.js`**: Gère les interactions avec la table `users` de la base de données.
- **`utils/authUtils.js`**: Fonctions utilitaires pour JWT et 2FA.
- **`config/db.js`**: Configure la connexion à la base de données.

## Endpoints API

Tous les endpoints sont préfixés par `/auth`.

### 1. Inscription

- **Endpoint**: `POST /auth/register`
- **Description**: Crée un nouvel utilisateur.
- **Corps de la requête (JSON)**:
  ```json
  {
    "email": "utilisateur@example.com",
    "password": "motdepasseSecurise",
    "name": "Nom Utilisateur"
  }
  ```
- **Réponse en cas de succès (201 Created)**:
  ```json
  {
    "message": "Utilisateur enregistré avec succès",
    "userId": "l_id_du_nouvel_utilisateur"
  }
  ```
- **Réponses d'erreur**:
    - `400 Bad Request`: Données manquantes ou email déjà utilisé.
    - `500 Internal Server Error`: Erreur serveur lors de la création.

### 2. Connexion

- **Endpoint**: `POST /auth/login`
- **Description**: Connecte un utilisateur existant.
- **Corps de la requête (JSON)**:
  ```json
  {
    "email": "utilisateur@example.com",
    "password": "motdepasseSecurise"
  }
  ```
- **Réponses en cas de succès**:
    - **Si 2FA n'est PAS activé (200 OK)**: Renvoie un jeton JWT.
      ```json
      {
        "token": "votre_jeton_jwt_ici"
      }
      ```
      *Note : Ce jeton est enregistré dans la base de données avec une date d'expiration.*
    - **Si 2FA EST activé (200 OK)**: Indique que la vérification 2FA est requise.
      ```json
      {
        "requires2FA": true,
        "userId": "l_id_de_l_utilisateur"
      }
      ```
      *Note : Vous devrez ensuite appeler l'endpoint `/auth/2fa/verify`.*
- **Réponses d'erreur**:
    - `401 Unauthorized`: Email ou mot de passe incorrect.
    - `500 Internal Server Error`: Erreur serveur.

### 3. Configuration de la 2FA

- **Endpoint**: `POST /auth/2fa/setup`
- **Description**: Génère un secret 2FA et un QR code pour l'utilisateur. **Nécessite une authentification préalable.**
- **En-tête requis**: `Authorization: Bearer <votre_jeton_jwt>` (obtenu lors de la connexion sans 2FA ou après vérification 2FA).
- **Corps de la requête**: Aucun.
- **Réponse en cas de succès (200 OK)**:
  ```json
  {
    "message": "Secret 2FA généré. Scannez le QR code.",
    "qrCode": "otpauth://totp/VotreApp:utilisateur@example.com?secret=VOTRE_SECRET_BASE32&issuer=VotreApp"
  }
  ```
  *Note : L'utilisateur doit scanner ce QR code avec une application d'authentification (Google Authenticator, Authy...). Le secret est enregistré dans la base de données pour cet utilisateur.*
- **Réponses d'erreur**:
    - `401 Unauthorized`: Jeton JWT invalide ou expiré (vérifié par `authMiddleware`).
    - `400 Bad Request`: La 2FA est déjà activée.
    - `500 Internal Server Error`: Erreur serveur.

### 4. Vérification de la 2FA

- **Endpoint**: `POST /auth/2fa/verify`
- **Description**: Vérifie le code 2FA fourni par l'utilisateur après une tentative de connexion où `requires2FA` était `true`.
- **Corps de la requête (JSON)**:
  ```json
  {
    "userId": "l_id_de_l_utilisateur", // Obtenu lors de l'étape de connexion nécessitant la 2FA
    "token": "123456" // Le code à 6 chiffres de l'application d'authentification
  }
  ```
- **Réponse en cas de succès (200 OK)**: Renvoie un nouveau jeton JWT valide.
  ```json
  {
    "token": "votre_nouveau_jeton_jwt_ici"
  }
  ```
  *Note : Un nouveau jeton de session est généré et enregistré dans la base de données.*
- **Réponses d'erreur**:
    - `400 Bad Request`: `userId` ou `token` manquant, ou 2FA non configurée pour cet utilisateur.
    - `401 Unauthorized`: Code 2FA invalide.
    - `500 Internal Server Error`: Erreur serveur.

### 5. Déconnexion

- **Endpoint**: `POST /auth/logout`
- **Description**: Invalide le jeton de session actuel de l'utilisateur. **Nécessite une authentification préalable.**
- **En-tête requis**: `Authorization: Bearer <votre_jeton_jwt>`
- **Corps de la requête**: Aucun.
- **Réponse en cas de succès (200 OK)**:
  ```json
  {
    "message": "Déconnexion réussie"
  }
  ```
  *Note : Les informations de session (`session_token`, `session_expires_at`) sont effacées de la base de données pour cet utilisateur, rendant le jeton JWT inutilisable pour les futures requêtes protégées.*
- **Réponses d'erreur**:
    - `401 Unauthorized`: Jeton JWT invalide ou expiré (vérifié par `authMiddleware`).
    - `500 Internal Server Error`: Erreur serveur.

## Middleware d'Authentification (`authMiddleware.js`)

- Ce middleware est appliqué aux routes nécessitant qu'un utilisateur soit connecté (ex: `/2fa/setup`, `/logout`, et potentiellement d'autres routes de l'application non listées ici).
- Il extrait le jeton JWT de l'en-tête `Authorization: Bearer <token>`.
- Il vérifie la validité du jeton en utilisant `jwt.verify` et le `JWT_SECRET`.
- Il consulte la base de données pour s'assurer que :
    1. L'utilisateur (`id` décodé du jeton) existe.
    2. Le `session_token` stocké dans la base de données correspond au jeton fourni.
    3. La session (`session_expires_at`) n'a pas expiré.
- Si tout est valide, il ajoute `req.userId` à l'objet requête et passe au prochain middleware ou au contrôleur.
- Sinon, il renvoie une erreur `401 Unauthorized`.

## Tester avec Postman (Résumé)

1.  **Inscription**: `POST /auth/register` (Corps: email, password, name) -> Noter `userId`.
2.  **Connexion (sans 2FA initiale)**: `POST /auth/login` (Corps: email, password) -> Obtenir `{ token: "JETON_1" }`. Sauvegarder `JETON_1`.
3.  **Configuration 2FA**: `POST /auth/2fa/setup` (Header: `Authorization: Bearer JETON_1`) -> Obtenir `{ qrCode: "URL_QR" }`. Scanner avec une app Authenticator.
4.  **Connexion (maintenant requiert 2FA)**: `POST /auth/login` (Corps: email, password) -> Obtenir `{ requires2FA: true, userId: "USER_ID" }`. Sauvegarder `USER_ID`.
5.  **Vérification 2FA**: `POST /auth/2fa/verify` (Corps: `userId`: "USER_ID", `token`: "CODE_APP_AUTH") -> Obtenir `{ token: "JETON_2" }`. Sauvegarder `JETON_2`. Utiliser ce jeton pour les requêtes suivantes.
6.  **(Optionnel) Accéder à une route protégée**: Utiliser `JETON_2` dans l'en-tête `Authorization`.
7.  **Déconnexion**: `POST /auth/logout` (Header: `Authorization: Bearer JETON_2`) -> Succès. `JETON_2` est maintenant invalide.
