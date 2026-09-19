# Portfolio NGOLO-MAYOMBO Gloire Barthélémie

Site vitrine d'une juriste en droit des affaires installée à Moanda, Haut-Ogooué, Gabon.
Page unique à ancres pour la vitrine, deux pages légales séparées, et une API dédiée à
l'envoi du formulaire de contact.

**Règle de contenu.** Tout ce que le site affiche vient des deux brochures rangées dans
`brief/`. Aucun délai de réponse, aucun tarif, aucun horaire n'y figure : ne pas en
inventer. Les trois sections de l'accueil sont Prestations, Qui suis-je et Contact.

```text
portfolio-gloire/
├── brief/      documents source : brochure PDF, photographies, références visuelles
├── front/      site public   (Vite + React 19 + TypeScript + Tailwind v4)
└── api/        API de contact (Express 5 + Zod + Nodemailer + React Email)
```

---

## 1. Démarrer en local

### Prérequis

Node.js 20 ou plus récent, et npm.

### API

```bash
cd api
npm install
cp .env.example .env     # puis compléter les identifiants SMTP
npm run dev              # http://localhost:8000
```

Contrôle rapide : `curl http://localhost:8000/api/v1/health`.

Pour relire les deux modèles de courriel dans un navigateur, sans rien envoyer :

```bash
npm run mail:preview     # génère api/preview/*.html
```

### Front

```bash
cd front
npm install
cp .env.example .env     # VITE_API_URL pointe sur l'API ci-dessus
npm run dev              # http://localhost:5173
```

---

## 2. Ce que fait chaque partie

### front

| Dossier | Rôle |
|---|---|
| `src/api/` | instance Axios unique et un module d'appels par entité |
| `src/hooks/` | hooks métier, dont le hook TanStack Query du formulaire |
| `src/store/` | état d'interface partagé (Zustand) |
| `src/components/` | composants réutilisables, `ui/` pour le socle visuel |
| `src/layouts/` | mise en page commune à toutes les routes |
| `src/pages/` | composants de route |
| `src/routes/` | configuration React Router, chargement paresseux |
| `src/data/` | contenu éditorial : coordonnées, prestations, questions fréquentes |
| `src/lib/` | données structurées Schema.org |

Le contenu du site vient de `src/data/`. Corriger un numéro de téléphone, ajouter une
prestation ou une question fréquente se fait dans ces fichiers, sans toucher aux composants.

### api

| Dossier | Rôle |
|---|---|
| `src/config/` | lecture et validation des variables d'environnement au démarrage |
| `src/validators/` | schémas Zod, seule autorité sur ce qui est accepté |
| `src/controllers/` | traduction HTTP, aucune règle métier |
| `src/services/` | traitement de la demande et encapsulation de l'envoi |
| `src/emails/` | modèles React Email et jeu de styles partagé |
| `src/middlewares/` | limitation de débit, gestion centralisée des erreurs |

---

## 3. L'API de contact

Une seule ressource, versionnée.

```http
POST /api/v1/contact
```

| Champ | Type | Contrainte |
|---|---|---|
| `fullName` | string | obligatoire, 2 à 80 caractères |
| `email` | string | obligatoire, adresse valide |
| `phone` | string | facultatif, 30 caractères maximum |
| `subject` | string | obligatoire, identifiant de domaine ou `autre` |
| `message` | string | obligatoire, 20 à 2000 caractères |
| `consent` | boolean | obligatoire, doit valoir `true` |
| `website` | string | champ piège, doit rester vide |

| Code | Signification |
|---|---|
| 201 | demande transmise, `data.reference` identifie l'échange |
| 202 | champ piège rempli, requête écartée sans envoi |
| 400 | validation échouée, `error.details[]` indique le champ fautif |
| 403 | origine non autorisée par la configuration CORS |
| 429 | limite de débit atteinte |
| 503 | service de messagerie indisponible |

Deux courriels partent à chaque demande : la notification à la juriste, avec `replyTo` sur
le demandeur, puis l'accusé de réception au demandeur. L'échec du second est journalisé
mais ne fait pas échouer la requête, puisque le message est déjà arrivé à destination.

Protections en place : validation stricte côté serveur, schéma fermé qui rejette tout champ
non prévu, champ piège, limitation de débit par adresse, liste blanche d'origines, corps de
requête plafonné à 32 Ko, en-têtes de sécurité via Helmet.

---

## 4. Mise en ligne

### Front

```bash
cd front
npm run build            # produit front/dist
```

Déposer le contenu de `front/dist` à la racine du site. Le fichier `.htaccess` est copié
automatiquement : il assure le routage côté client, la compression, le cache des fichiers
versionnés et quelques en-têtes de sécurité.

Avant la première mise en ligne, remplacer l'adresse provisoire
`https://www.gloire-mayombo.com` par le domaine réel dans :

- `front/src/data/site.ts` (champ `url`)
- `front/index.html` (Open Graph et Twitter)
- `front/public/robots.txt`
- `front/public/sitemap.xml`
- `api/.env` (`SITE_URL` et `CORS_ORIGINS`)

Puis compléter les deux mentions laissées en attente dans
`front/src/pages/legal/LegalNoticePage.tsx` : identifiants de l'éditrice et hébergeur.

### API

```bash
cd api
npm run build
npm start                # ou via un gestionnaire de processus
```

L'API doit tourner sur un hébergement Node, avec le port exposé derrière un proxy inverse
en HTTPS. Mettre `NODE_ENV=production` et renseigner `CORS_ORIGINS` avec le domaine réel.

---

## 5. Choix techniques et limites connues

**Rendu côté client.** Le site est une application à page unique : le HTML initial est
presque vide, et le contenu apparaît après l'exécution du JavaScript. Google sait l'indexer,
mais un pré-rendu au moment du build produirait un HTML complet pour chaque route, ce qui
améliorerait à la fois l'indexation et le Largest Contentful Paint. C'est la première
optimisation à envisager si le référencement devient prioritaire.

**Visuel du hero.** C'est une image WebP détourée, préchargée depuis `index.html` et
dimensionnée en dur. Aucune bibliothèque 3D n'est chargée. En grand écran elle dépasse le
bas de la section, qui la coupe, et remonte au défilement pour découvrir la partie masquée.

**Palette.** Cinq couleurs imposées : #0B1F3A, #FFFFFF, #E7EBEE, #5579EC, #000000. Les
nuances numérotées de `src/index.css` sont des éclaircies et des assombrissements de ces
cinq teintes. Deux d'entre elles sont fixées par le contraste WCAG AA et ne doivent pas
être retouchées : `blue-600` pour le texte et les boutons, `mist-400` pour les bordures de
champs.

**Polices distantes.** Inter et Playfair Display sont servies par Google Fonts. Les
héberger localement supprimerait une connexion externe et une dépendance réseau.

**Pas de base de données.** Les demandes ne sont pas persistées : elles partent par courriel.
Si un suivi des demandes devient nécessaire, il faudra ajouter une table et un espace
d'administration.

**Tests.** Le socle de tests n'est pas en place. Les points à couvrir en premier sont le
schéma de validation, le service de contact avec un transport simulé, et un parcours
Playwright sur l'envoi du formulaire.
