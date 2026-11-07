# Prompt projet — « Mon Juste Prix » (Rail Innovation Challenge)

> Ce fichier est le brief complet du projet. Lis-le en entier avant d'écrire la moindre ligne.
> Il sert à construire, dans ce dépôt, **un prototype de démonstration** et **les visuels présentés au jury**.

---

## 1. Contexte

- **Concours :** Rail Innovation Challenge, 7e édition (Agorize × Ferrocampus), mission **« Le train pour tous et partout »**.
- **Sujet :** l'accessibilité au sens large (financière, cognitive, psychologique). Il porte sur **les personnes qui ne prennent pas le train alors qu'elles le pourraient**, et non sur l'amélioration du voyage de ceux qui le prennent déjà.
- **Calendrier :** dépôt de 5 à 10 slides le **08/11/2026**. Si le projet est sélectionné, mentorat de décembre à février, puis finale le 25/03/2027 (pitch de 3 à 5 min).
- **Usage du prototype :** captures d'écran pour la slide « Visuels » du dépôt, puis démonstration en direct devant le jury.

## 2. Le problème

En Région Sud, les ménages modestes ont droit à une réduction de 50 à 90 % sur le TER (carte ZOU! Solidaire). La loi impose déjà au moins 50 % de réduction sous le plafond de la C2S gratuite (art. L1113-1 du code des transports).

Pourtant, au moment où la personne cherche un trajet, **elle voit le prix plein**. Pour obtenir le bon prix, il faut :
- monter un dossier ;
- fournir des justificatifs ;
- attendre une carte envoyée par la poste ;
- la renouveler.

C'est impossible pour un trajet ponctuel, et cela désigne la personne au guichet comme au contrôle. Résultat : elle prend la voiture, se fait conduire ou **renonce à se déplacer**.

**Les six moments où le train perd la personne :**
1. **Le besoin apparaît.** Elle ne pense même pas au train (« c'est cher », « c'est pas pour moi »).
2. **Recherche.** Le prix plein s'affiche et devient la référence. C'est le moment décisif.
3. **Découverte de la réduction.** Dossier, justificatifs et délai postal sont incompatibles avec un trajet dans trois jours.
4. **Achat.** Choisir le bon tarif, montrer une carte « solidaire ».
5. **Contrôle.** Peur d'être pris en défaut, carte oubliée ou expirée.
6. **Renouvellement.** La carte expire sans prévenir, la personne repasse au plein tarif et abandonne.

**Phrase clé :** *les ayants droit renoncent au train non parce qu'il est cher, mais parce que le prix affiché n'est pas celui qu'ils paieraient.*

## 3. La solution

Un **service de droits tarifaires** porté par la Région et intégré aux canaux existants (appli régionale, site du transporteur, guichets, France Services). Ce n'est pas une appli de plus.

**Les deux portes d'entrée**
- **Porte « recherche ».** À côté du prix, un même lien « Voir mon prix » s'affiche pour **tout le monde**. Il regroupe toutes les réductions (jeune, famille, senior, solidaire). Comme il est universel, il ne désigne personne.
- **Porte « on vient vers vous ».** Un message de l'organisme social ou d'un conseiller : « Le train peut vous coûter beaucoup moins cher. Vérifiez en 1 minute. »

**La vérification en une minute**
1. Le service explique ce qu'il va demander.
2. La personne donne son accord et se connecte avec l'identité numérique de l'État.
3. Le service interroge **une seule source**, qui répond seulement **oui ou non, et la date de fin du droit**.

**Le bon prix**
- Il s'applique automatiquement à chaque trajet, sans aucune mention sociale.
- Le billet est ordinaire. Au contrôle, le contrôleur voit seulement « Valide ».

**La vie du droit**
- La page « Mes accords » montre ce qui a été demandé et quand. L'accord se retire en un clic, et les billets déjà achetés restent valables.
- 30 jours avant la fin, le service revérifie automatiquement. Le droit n'est jamais coupé au milieu d'un voyage payé.

**Quand aucun droit n'est trouvé**
- Le message est neutre : « Nous n'avons pas pu le confirmer automatiquement », jamais « vous n'y avez pas droit ».
- Les autres réductions possibles et le meilleur prix s'affichent tout de suite.
- **Plan B humain :** une seule pièce photographiée, ou un rendez-vous en France Services ou en gare, avec une réponse sous 48 h.
- **Rattrapage :** si la personne a payé le plein tarif en attendant, on lui rembourse la différence une fois le droit confirmé.
- **Porte vers les droits :** « Vous pourriez avoir droit à la C2S », avec un lien vers un simulateur.
- **Sans smartphone :** l'agent fait la vérification avec la personne et charge le droit sur une carte de transport ordinaire, identique à celle de tout le monde.

**En coulisses**
- **La Région décide** (publics, conditions, réductions, budget) et compense le transporteur.
- **Le service de droits tarifaires vérifie** via les services de l'État (API Particulier, identité numérique). Il garde seulement : un identifiant pseudonyme, le niveau de tarif et la date de fin. Il ne garde ni le critère ni la réponse brute.
- **Tous les distributeurs vendent** en interrogeant ce même service. C'est neutre vis-à-vis des opérateurs, ce qui compte avec l'ouverture à la concurrence.
- **Le contrôleur contrôle** : son appli affiche seulement valide ou invalide.

## 4. Les publics (sous les conditions fixées par la Région)

| Ordre | Public | Source unique interrogée (simulée) | Réponse |
|---|---|---|---|
| 1 (prioritaire) | Ménages modestes (sous le plafond C2S gratuite) | Assurance maladie — statut C2S | oui/non + date de fin |
| 2 | Demandeurs d'emploi | France Travail — statut demandeur d'emploi | oui/non + date de fin |
| 3 | Étudiants boursiers | Cnous — statut boursier | oui/non + date de fin |
| — | Aucun droit trouvé | — | plan B |

**Les principes à respecter, non négociables :**
- Aucun dossier à monter : la réponse de l'administration sert de preuve.
- Un critère = une seule source interrogée, et seulement l'information nécessaire.
- Rien qui révèle la situation sociale de la personne, ni à l'écran, ni au guichet, ni au contrôle. Les mots « solidaire », « social », « aide », « RSA », « C2S » et « chômage » **n'apparaissent jamais sur les écrans du voyageur après la vérification**, ni sur le billet. Ils peuvent apparaître dans le panneau jury.
- L'accord est clair, et on peut le retirer à tout moment.
- Un plan B existe, avec et sans smartphone.
- L'accessibilité est exemplaire (voir § 7).

---

## 5. Ce qu'il faut construire

### 5.1 Contraintes techniques

- **HTML, CSS et JavaScript simples.** Pas de framework, pas d'outil de build, pas de npm, pas de dépendance externe obligatoire.
- **Ça marche en double-cliquant sur `index.html`** (protocole `file://`) **et sur GitHub Pages.** Conséquence : pas de `fetch()` d'un fichier JSON. La configuration est un fichier `config.js` qui déclare `window.CONFIG = { … }`.
- **Modifiable par quelqu'un qui ne code pas.** Tous les textes, prix, publics, conditions et options sont dans `config.js`, commentés en français, avec des exemples.
- **Simulation uniquement :**
  - aucune donnée réelle, aucun identifiant réel, aucun paiement, aucun appel réseau vers un service public ;
  - une bannière permanente « Démonstration — simulation, aucune donnée réelle » ;
  - tous les prix sont **fictifs** et signalés comme tels dans le panneau jury.
- **Aucun logo ni charte officielle** : ni Région Sud, ni SNCF, ni ZOU!, ni le bouton FranceConnect. On utilise des libellés génériques (« Se connecter avec l'identité numérique de l'État — simulé ») et une identité visuelle propre au projet. Le nom affiché vient de `CONFIG.service.nom` (par défaut « Mon Juste Prix », nom de travail).

### 5.2 Arborescence attendue

```
/
├── index.html          # la démo : téléphone + panneau jury
├── config.js           # TOUS les réglages (seul fichier à modifier au quotidien)
├── app.js              # moteur de la démo (lit config.js, gère les étapes)
├── styles.css          # mise en forme
├── visuels/
│   ├── index.html      # page des visuels jury (schémas imprimables / capturables)
│   └── *.svg           # schémas exportables
├── README.md           # mode d'emploi en français
└── CHANGELOG.md        # historique des incréments
```

### 5.3 L'écran de démonstration (`index.html`)

- **À gauche, un cadre de téléphone** (environ 390 × 800 px) qui affiche le parcours du voyageur.
- **À droite, le panneau jury.** Pour chaque étape, trois blocs courts :
  1. **Ce que voit la personne**
  2. **Ce qui se passe en coulisses** (qui interroge qui, quelle information circule, ce qui est conservé)
  3. **Le frein levé** (financier, cognitif, psychologique, peur d'être catalogué, délai…), avec le numéro du moment concerné (1 à 6, § 2)
- **En haut, un sélecteur de scénario** et une barre de progression (étape n / total).
- **Navigation :** boutons « Précédent / Suivant », flèches ← → du clavier, touche `R` pour recommencer.
- **Mode présentation** (touche `P` ou bouton) : plein écran, gros caractères, panneau jury simplifié, pour la projection.
- **Sur un petit écran** (moins de 900 px), le panneau jury passe sous le téléphone, repliable.
- **Le compteur de prix est animé** (prix plein barré, puis vrai prix). L'animation est désactivée si `prefers-reduced-motion` est activé.

### 5.4 Scénarios jouables

Chaque scénario est entièrement décrit dans `config.js` : persona fictif, trajet, prix plein, réduction, source, réponse simulée, textes des étapes et du panneau jury.

| # | Scénario | Persona fictif | Trajet (prix fictifs) | Fin |
|---|---|---|---|---|
| S1 | Étudiante boursière — tarif accordé | Nadia, 20 ans, étudiante à Marseille, prend BlaBlaCar pour rentrer le week-end | Marseille → Le Luc | Prix confirmé + contrôle « Valide » + « Mes accords » |
| S2 | Retraitée à mobilité réduite — tarif accordé | Jeanne, 74 ans, Hyères, marche avec une canne | Hyères → Marseille | Tarif réduit + assistance en gare (voyage seule) |
| S3 | Conditions non remplies | Marc, 51 ans, cariste en CDI, revenus modestes au-dessus des plafonds | Les Arcs → Nice | Abonnements éligibles, meilleur prix choisi pour lui, rattrapage |

**Module abonnement (v0.2) :** chaque scénario commence par le besoin, puis l'écran « Que voulez-vous faire ? » (billet / abonnement / réabonnement). L'abonnement suit le même chemin que le billet ; le réabonnement se fait en un clic, sans nouvelle vérification. Bouton « Imprimer » sur l'écran du billet ou de l'abonnement.

**Règles d'affichage décidées après relecture :**
- La connexion passe par **FranceConnect** uniquement, sans logo ni comptes partenaires, et sans écran dédié : « Nous nous connectons à FranceConnect » est dit à l'étape « démarche ».
- La personne ne voit **jamais quel document est vérifié** : seulement le résultat (tarif accordé + date de fin, ou abonnements éligibles).
- Quand le tarif n'est pas accordé, la réponse est **directe** et le service **propose une solution** (abonnements, meilleur prix expliqué). Pas de message vague, pas de promotion d'autres droits.

**Étapes types d'un scénario « droit trouvé » :**
1. Le besoin (contexte du persona, moment 1)
2. La recherche : prix plein affiché, plus le lien universel « Voir mon prix »
3. L'explication : « Nous demandons une seule chose à … : oui ou non, et jusqu'à quand. Rien d'autre. »
4. L'accord : case à cocher explicite, lien « Ce que nous ne demandons pas »
5. La connexion à l'identité numérique (simulée, avec un faux écran générique)
6. La vérification en cours (animation courte), puis la réponse oui + date de fin
7. Le résultat : « Votre prix : X € au lieu de Y € », sans mention sociale
8. L'achat simulé : billet ordinaire avec un QR code factice
9. Le contrôle : l'écran du contrôleur affiche « Valide », sans motif
10. « Mes accords » : ce qui a été demandé, quand, et le bouton « Retirer mon accord »

### 5.5 Les visuels pour le jury (`visuels/index.html`)

Une page à part, propre à capturer ou imprimer (A4 paysage et 16:9). Chaque schéma est en SVG, exportable :

1. **L'entonnoir du renoncement** : les six moments (§ 2), avec le frein de chacun et le point où le service intervient.
2. **Avant / Après** : le parcours actuel (dossier, justificatifs, courrier, carte, renouvellement) face au parcours avec le service (une minute, puis plus rien).
3. **Les coulisses** : Voyageur → Distributeur → Service de droits tarifaires (Région) → Source unique. Retour : oui/non + date de fin. Ce qui est conservé et ce qui ne l'est pas.
4. **Qui fait quoi** : Région / Service de droits tarifaires / Distributeurs / Contrôle.
5. **Les publics** : tableau des critères (intérêt Région, équité, poids du frein, faisabilité) et ordre de déploiement.
6. **Le parcours « aucun droit trouvé »** : message neutre, autres réductions, plan B, rattrapage, porte vers les droits.

Style des visuels : sobre et lisible, pas de couleurs criardes, typographie lisible, une idée par schéma, peu de texte. Ce sont les consignes Agorize.

---

## 6. `config.js` : ce qu'il doit contenir

Le fichier doit être lisible comme une fiche, avec des commentaires en français au-dessus de chaque bloc. Structure attendue :

```js
window.CONFIG = {
  service: {
    nom: "Mon Juste Prix",            // nom affiché (nom de travail)
    region: "Région Sud",             // territoire de référence
    banniereDemo: "Démonstration — simulation, aucune donnée réelle"
  },

  // Incréments : true = activé, false = désactivé (garder ou abandonner sans toucher au code)
  increments: {
    porteOnVientVersVous: false,
    renouvellement: false,
    sansSmartphone: false,
    modePresentation: true
  },

  publics: [
    {
      id: "modeste",
      libelleJury: "Ménages modestes (sous le plafond C2S gratuite)",
      source: "Assurance maladie — statut C2S (simulé)",
      questionPosee: "Avez-vous la C2S, et jusqu'à quand ?",
      reduction: 0.75,                // 75 % (fictif)
      dureeDroitMois: 12
    }
    // … demandeur d'emploi, étudiant boursier
  ],

  scenarios: [
    {
      id: "S1",
      titre: "Nadia — droit trouvé",
      public: "modeste",
      reponseSimulee: { droit: true, dateFin: "2027-09-30" },
      trajet: { depart: "Brignoles", arrivee: "Marseille", prixPlein: 14.20 },  // prix fictif
      etapes: [
        {
          ecran: "recherche",
          texteVoyageur: "…",
          jury: { voit: "…", coulisses: "…", frein: "…", moment: 2 }
        }
        // …
      ]
    }
    // … S2, S3, S4
  ],

  textes: {
    // tous les libellés de l'interface (boutons, messages, aide), modifiables
  }
};
```

`app.js` ne contient **aucun texte en dur** visible par l'utilisateur. Tout vient de `config.js`.

## 7. Accessibilité (niveau exemplaire, viser WCAG 2.2 AA / RGAA)

- `lang="fr"`, titres hiérarchisés, éléments natifs (`button`, `label`, `fieldset`) plutôt que des `div` cliquables.
- **Tout est utilisable au clavier**, focus très visible, ordre de tabulation logique. Un lien d'évitement vers le contenu.
- **Lecteur d'écran :** changements d'étape et résultats annoncés via `aria-live="polite"`. Le prix barré est lu « prix habituel 14,20 €, votre prix 3,55 € ». Le QR code factice a un texte alternatif.
- **Textes en langage simple** (inspiration FALC) : phrases courtes, un message par écran, pas de jargon administratif côté voyageur.
- Contraste AA minimum, police d'au moins 16 px, zoom à 200 % sans perte, aucune information portée par la seule couleur.
- Respect de `prefers-reduced-motion` et du mode sombre (`prefers-color-scheme`).
- Le README contient une petite liste de vérification accessibilité à refaire après chaque incrément.

---

## 8. Méthode : construire par incréments

Chaque incrément doit pouvoir être testé seul, s'activer ou se désactiver dans `config.increments` quand c'est possible, et être noté dans `CHANGELOG.md`. Dans Git, chaque incrément fait l'objet d'un commit clair et d'une étiquette (`v0.1`, `v0.2`…) pour pouvoir revenir en arrière.

| Incrément | Contenu | Test d'acceptation |
|---|---|---|
| **v0.1 — L'idée en 2 minutes** (à livrer en priorité, pour les captures du 08/11) | Téléphone + panneau jury, scénarios **S1** et **S4**, navigation clavier, `config.js`, README | En double-cliquant `index.html`, on joue S1 et S4 de bout en bout, au clavier seulement, et on peut faire une capture propre de l'écran « Votre prix » |
| v0.2 — Tous les publics | Scénarios S2 et S3 | Changer une réduction ou un prix dans `config.js` met la démo à jour sans toucher au reste |
| v0.3 — Visuels jury | `visuels/index.html` et les 6 schémas SVG | Chaque schéma tient sur une slide 16:9 et reste lisible projeté |
| v0.4 — Porte « on vient vers vous » | Scénario qui commence par un message d'un organisme social | Activable/désactivable via `increments.porteOnVientVersVous` |
| v0.5 — Vie du droit | « Mes accords », retrait de l'accord, renouvellement automatique à J-30 | Retirer l'accord fait repasser au plein tarif pour les futurs trajets, les billets achetés restent valides |
| v0.6 — Sans smartphone | Parcours au guichet ou en France Services, avec carte de transport ordinaire | Le panneau jury montre que l'agent ne voit que « tarif applicable : oui » |
| v0.7 — Mode présentation | Plein écran, gros caractères, déroulé chronométré pour un pitch de 3 à 5 min | Démo jouable en moins de 3 minutes |
| v0.8 — Indicateurs (optionnel) | Écran jury des indicateurs simulés : nouveaux trajets, taux de recours, part non trouvée automatiquement, coût par nouveau trajet | Valeurs fictives éditables dans `config.js` |

**Règle de travail :** livrer v0.1, puis **s'arrêter et présenter ce qui est fait**, avec la liste des incréments suivants. N'enchaîner qu'après validation. Ne poser de question que si la réponse change vraiment la suite. Sinon, faire un choix raisonnable et le noter dans le CHANGELOG.

## 9. README attendu (en français, pour quelqu'un qui ne code pas)

1. **Ouvrir le prototype :** télécharger le dépôt (bouton « Code » puis « Download ZIP »), dézipper, double-cliquer sur `index.html`.
2. **Le publier sur GitHub Pages :** Settings → Pages → Source « Deploy from a branch » → branche `main`, dossier `/ (root)`. Où trouver l'adresse publique, et combien de temps attendre.
3. **Le modifier :** éditer `config.js` directement dans GitHub (icône crayon), avec des exemples concrets (changer un prix, un texte, une réduction, ajouter un scénario). Les erreurs fréquentes : virgule oubliée, guillemets, et comment les repérer.
4. **Gérer les incréments :** activer ou désactiver dans `config.increments`, lire le CHANGELOG, revenir à une version étiquetée.
5. **Faire des captures pour les slides :** mode présentation, zoom du navigateur, capture d'écran.
6. **Rappel :** prototype de simulation, aucune donnée réelle, prix fictifs, aucun lien avec un service officiel.

## 10. Définition de « terminé » pour chaque incrément

- La démo s'ouvre sans erreur dans la console, en `file://` et sur GitHub Pages.
- Tous les scénarios actifs se jouent jusqu'au bout, à la souris et au clavier.
- Aucun texte visible n'est écrit en dur dans `app.js`.
- Aucun écran voyageur n'affiche de mot qui révèle une situation sociale après la vérification.
- La liste de vérification accessibilité du README est passée.
- Le CHANGELOG et le README sont à jour.
