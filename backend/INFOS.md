## USER

/                         → Landing page (présentation + CTA)
/auth/signin              → Connexion utilisateur
/auth/signup              → Inscription utilisateur

/matchroom                → Homepage utilisateur
/matchroom/profile        → Profil utilisateur
/matchroom/preferences    → Choix ville / catégorie / dates
/matchroom/swipe          → Interface de swipe (match ou skip)
/matchroom/negotiation    → Négociation après "match" (proposition de prix)
/matchroom/history        → Historique des offres (en attente / validées / refusées)
/matchroom/messages       → Messagerie (offres envoyées / statut des propositions)


Règles :

- 1 seule offre par hôtel

- Pas de re-match si offre déjà envoyée ou acceptée

- Réservations possibles sur plusieurs hôtels

- L'historique + messages donnent un aperçu de l’état global des échanges


## HOTELIER

/auth/signup              → Inscription hôtelier (formulaire étendu depuis user)
/auth/login               → Connexion hôtelier

/hotelier/dashboard       → Accueil hôtelier
/hotelier/rooms           → Ajout / gestion des chambres (avec options)
/hotelier/profile         → Infos personnelles / peut customiser son hotel (photo)


## ADMIN

/admin/login              → Connexion admin
/admin/dashboard          → Tableau de bord admin
/admin/users              → Liste des utilisateurs (READ / UPDATE / DELETE)
/admin/hotels             → Liste des hôtels (READ / UPDATE / DELETE)
/admin/statistics         → Statistiques : moyenne des économies clients

Gestion :

- Réservations en cours

- Comptes utilisateurs / hôteliers

- Validation des hôteliers en attente inscrits