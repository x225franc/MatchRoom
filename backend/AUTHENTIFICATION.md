# Documentation de l'Authentification

Ce document décrit le fonctionnement du système d'authentification du backend, y compris l'inscription, la connexion, l'authentification à deux facteurs (2FA) et la déconnexion.

## Prérequis

Avant de tester, assurez-vous que votre fichier `.env` à la racine du projet backend contient les variables suivantes :

```dotenv
DATABASE_URL=votre_url_de_connexion_postgresql
JWT_SECRET=votre_cle_secrete_tres_forte_pour_jwt
PORT=3000 # Ou le port de votre choix
```
Et que le modèle `User` ([`src/models/usersModel.js`](src/models/usersModel.js)) définit un statut par défaut (ex: 'active') lors de la création d'un utilisateur.

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
    "message": "Utilisateur enregistré",
    "userId": "l_id_du_nouvel_utilisateur"
  }
  ```
- **Réponses d'erreur**:
    - `400 Bad Request`: `"Vui lòng cung cấp email, password và name"` (si champs manquants) ou `"Email déjà utilisé"`.
    - `500 Internal Server Error`: `"Erreur interne lors de l'enregistrement"`. Les détails sont loggués côté serveur.

### 2. Connexion

- **Endpoint**: `POST /auth/login`
- **Description**: Connecte un utilisateur existant. Applique une limitation de tentatives (5 essais par 15 minutes par IP).
- **Corps de la requête (JSON)**:
  ```json
  {
    "email": "utilisateur@example.com",
    "password": "motdepasseSecurise"
  }
  ```
- **Réponses en cas de succès (200 OK)**:
    - **Si 2FA n'est PAS activé**: Renvoie un jeton JWT.
      ```json
      {
        "token": "votre_jeton_jwt_ici"
      }
      ```
      *Note : Ce jeton est enregistré dans la base de données avec une date d'expiration.*
    - **Si 2FA EST activé**: Indique que la vérification 2FA est requise.
      ```json
      {
        "requires2FA": true,
        "userId": "l_id_de_l_utilisateur"
      }
      ```
      *Note : Vous devrez ensuite appeler l'endpoint `/auth/2fa/verify`.*
- **Réponses d'erreur**:
    - `400 Bad Request`: `"Vui lòng cung cấp email và password"` (si champs manquants).
    - `401 Unauthorized`: `"Identifiants invalides"`.
    - `403 Forbidden`: `"Compte non actif ou suspendu"` (si le statut de l'utilisateur n'est pas 'active').
    - `429 Too Many Requests`: `"Trop de tentatives de connexion, réessayez dans 15 minutes"` (si la limite de tentatives est dépassée).
    - `500 Internal Server Error`: `"Erreur interne lors de la connexion"`. Les détails sont loggués côté serveur.

### 3. Configuration de la 2FA

- **Endpoint**: `POST /auth/2fa/setup`
- **Description**: Génère un secret 2FA, l'enregistre, active la 2FA pour l'utilisateur et renvoie un QR code. **Nécessite une authentification préalable.**
- **En-tête requis**: `Authorization: Bearer <votre_jeton_jwt>` (obtenu lors de la connexion sans 2FA ou après vérification 2FA).
- **Corps de la requête**: Aucun.
- **Réponse en cas de succès (200 OK)**:
  ```json
  {
    "qrCode": "otpauth://totp/MatchRoom:utilisateur@example.com?secret=VOTRE_SECRET_BASE32&issuer=MatchRoom",
    "secret": "VOTRE_SECRET_BASE32" // Secret à sauvegarder par l'utilisateur si besoin
  }
  ```
  *Note : L'utilisateur doit scanner ce QR code avec une application d'authentification. Le secret et le statut `two_factor_enabled = TRUE` sont enregistrés dans la base de données.*
- **Réponses d'erreur**:
    - `401 Unauthorized`: Jeton JWT invalide ou expiré (vérifié par `authMiddleware`).
    - `400 Bad Request`: `"2FA déjà configuré"`.
    - `404 Not Found`: `"Utilisateur non trouvé"` (cas rare si l'utilisateur est supprimé après validation du token).
    - `500 Internal Server Error`: `"Erreur interne lors de la configuration 2FA"`. Les détails sont loggués côté serveur.

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
    - `400 Bad Request`: `"Vui lòng cung cấp userId và token 2FA"` (si champs manquants) ou `"2FA non configuré ou secret manquant pour cet utilisateur"`.
    - `401 Unauthorized`: `"Code 2FA invalide"`.
    - `404 Not Found`: `"Utilisateur non trouvé"`.
    - `500 Internal Server Error`: `"Erreur interne lors de la vérification 2FA"`. Les détails sont loggués côté serveur.

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
  *Note : Les informations de session (`session_token`, `session_expires_at`) sont effacées de la base de données pour cet utilisateur.*
- **Réponses d'erreur**:
    - `401 Unauthorized`: Jeton JWT invalide ou expiré (vérifié par `authMiddleware`).
    - `400 Bad Request`: `"ID utilisateur manquant dans la requête authentifiée"` (cas très rare).
    - `500 Internal Server Error`: `"Erreur interne lors de la déconnexion"`. Les détails sont loggués côté serveur.

## Middleware d'Authentification (`authMiddleware.js`)

- Ce middleware est appliqué aux routes nécessitant qu'un utilisateur soit connecté (ex: `/2fa/setup`, `/logout`).
- Il extrait le jeton JWT de l'en-tête `Authorization: Bearer <token>`.
- Il vérifie la validité du jeton (`jwt.verify` avec `JWT_SECRET`).
- Il consulte la base de données pour s'assurer que l'utilisateur existe, que le `session_token` correspond et que la session n'a pas expiré.
- Si valide, il ajoute `req.userId` à la requête et passe au contrôleur.
- Sinon, il renvoie une erreur `401 Unauthorized` (`"Aucun jeton fourni"`, `"Session invalide ou expirée"`, ou `"Jeton invalide"`).

## Tester avec Postman (Résumé)

1.  **Inscription**: `POST /auth/register` (Corps: email, password, name) -> Noter `userId`.
2.  **Connexion (sans 2FA initiale)**: `POST /auth/login` (Corps: email, password) -> Obtenir `{ token: "JETON_1" }`. Sauvegarder `JETON_1`.
3.  **Configuration 2FA**: `POST /auth/2fa/setup` (Header: `Authorization: Bearer JETON_1`) -> Obtenir `{ qrCode: "URL_QR", secret: "SECRET_32" }`. Scanner `URL_QR` avec une app Authenticator. Sauvegarder `SECRET_32` si besoin de récupération.
4.  **Connexion (maintenant requiert 2FA)**: `POST /auth/login` (Corps: email, password) -> Obtenir `{ requires2FA: true, userId: "USER_ID" }`. Sauvegarder `USER_ID`.
5.  **Vérification 2FA**: `POST /auth/2fa/verify` (Corps: `userId`: "USER_ID", `token`: "CODE_APP_AUTH") -> Obtenir `{ token: "JETON_2" }`. Sauvegarder `JETON_2`. Utiliser ce jeton pour les requêtes suivantes.
6.  **(Optionnel) Accéder à une route protégée**: Utiliser `JETON_2` dans l'en-tête `Authorization`.
7.  **Déconnexion**: `POST /auth/logout` (Header: `Authorization: Bearer JETON_2`) -> Succès. `JETON_2` est maintenant invalide.
