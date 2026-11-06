# Mon Juste Prix — prototype de démonstration

Rail Innovation Challenge (Agorize × Ferrocampus), mission **« Le train pour tous et partout »**.

**L'idée :** la réduction de train à laquelle une personne a droit s'applique toute seule. Pas de dossier, pas de carte, pas de justificatif. Au moment où elle cherche un trajet, elle voit le prix qu'elle paierait vraiment.

> ⚠️ **Prototype de simulation.** Personnes, prix et réponses sont fictifs. Aucune donnée réelle, aucun paiement, aucune connexion à un service public. Aucun lien avec un organisme officiel.

---

## 1. Ouvrir le prototype

1. Sur la page GitHub du dépôt, cliquez sur le bouton vert **« Code »**, puis sur **« Download ZIP »**.
2. Dézippez le fichier téléchargé.
3. Double-cliquez sur **`index.html`**. La démo s'ouvre dans votre navigateur.

Aucune installation n'est nécessaire, et la démo fonctionne même sans Internet. Sans connexion, seule la police change.

**Astuce :** pour ouvrir directement un scénario, ajoutez son code à la fin de l'adresse, par exemple `index.html#S4`.

## 2. Le publier sur GitHub Pages (une adresse web à partager)

1. Dans le dépôt, ouvrez l'onglet **Settings**, puis le menu **Pages** à gauche.
2. Sous « Build and deployment », réglez :
   - **Source** : *Deploy from a branch* ;
   - **Branch** : `main`, puis dossier `/ (root)`.
3. Cliquez sur **Save**.
4. Attendez 1 à 3 minutes, puis rechargez la page **Settings → Pages**. L'adresse publique apparaît en haut, par exemple `https://stan515.github.io/my-just-price/`.

Chaque modification enregistrée dans le dépôt met le site à jour en 1 à 2 minutes.

## 3. Le modifier sans coder

Tout se règle dans **un seul fichier : `config.js`**.

**Modifier directement dans GitHub :**
1. Cliquez sur `config.js`.
2. Cliquez sur l'icône **crayon** (« Edit this file ») en haut à droite.
3. Faites votre modification.
4. Cliquez sur **« Commit changes »**, puis encore sur **« Commit changes »** dans la fenêtre qui s'ouvre.

**Exemples concrets :**

| Je veux… | Où dans `config.js` | Exemple |
|---|---|---|
| Changer le prix d'un trajet | `trajet` → `prixPlein` | `prixPlein: 18.40` → `prixPlein: 22.00` |
| Changer une réduction | `publics` → `reduction` | `reduction: 0.75` (75 %) → `reduction: 0.9` (90 %) |
| Changer le nom du service | `service` → `nom` | `nom: "Mon Juste Prix"` → `nom: "Prix Juste"` |
| Changer un texte du téléphone | l'étape concernée → `voyageur` | modifier le texte entre guillemets |
| Changer une explication pour le jury | l'étape concernée → `jury` | `voit`, `coulisses`, `frein` |
| Masquer un scénario sans le supprimer | le scénario → `actif` | `actif: true` → `actif: false` |
| Ajouter un scénario | copier un bloc `{ id: "S1", … }` en entier | changer l'`id`, le `titre`, la personne, le trajet |

**Les mots magiques.** Dans les textes, `{prix}`, `{prixPlein}`, `{dateFin}`, `{nom}` ou `{source}` sont remplacés automatiquement. Si vous changez un prix, tous les textes suivent.

**Les erreurs fréquentes :**
- **Virgule oubliée** entre deux éléments. C'est l'erreur n° 1.
- **Guillemet non fermé.** Chaque texte commence et finit par `"`.
- **Guillemet droit à l'intérieur d'un texte.** Utilisez « » ou l'apostrophe ’ à la place.
- **Nombre écrit avec une virgule.** Écrivez `18.40`, pas `18,40`.

**Si la démo affiche « Le fichier config.js contient une erreur » :**
1. Ouvrez `config.js` dans GitHub, puis cliquez sur **History** pour voir votre dernière modification.
2. Relisez les lignes modifiées, ou revenez à la version précédente.
3. Pour localiser l'erreur : dans le navigateur, appuyez sur **F12**, puis ouvrez l'onglet **Console**. Le numéro de la ligne fautive y est indiqué.

## 4. Gérer les incréments

Le prototype se construit par étapes, appelées incréments. Chacune peut être gardée ou abandonnée.

- **Activer ou désactiver :** dans `config.js`, bloc `increments`, mettez `true` (activé) ou `false` (désactivé).
- **Savoir ce qui a changé :** ouvrez `CHANGELOG.md`.
- **Revenir à une version précédente :** chaque incrément porte une étiquette (`v0.1`, `v0.2`…). Dans GitHub, cliquez sur **Tags**, choisissez la version, puis **Download ZIP**.

| Version | Contenu | État |
|---|---|---|
| v0.1 | Téléphone + panneau jury, scénarios S1 (tarif réduit accordé) et S4 (conditions non remplies) | ✅ livrée |
| v0.2 | Scénarios S2 (demandeur d'emploi) et S3 (étudiant boursier) | à venir |
| v0.3 | Page de visuels pour le jury (6 schémas SVG) | à venir |
| v0.4 | Porte d'entrée « on vient vers vous » | à venir |
| v0.5 | Vie du droit : retrait de l'accord, renouvellement automatique | à venir |
| v0.6 | Parcours sans smartphone (guichet, France Services) | à venir |
| v0.7 | Mode présentation chronométré | à venir |
| v0.8 | Indicateurs simulés | optionnel |

## 5. Faire des captures pour les slides

1. Ouvrez la démo et choisissez le scénario.
2. Avancez avec la flèche **→** jusqu'à l'écran voulu. Pour l'écran « Votre prix », attendez 2 secondes la fin de l'animation.
3. **Pour la projection :** appuyez sur **P** (mode présentation, plein écran, gros caractères). Appuyez sur **Échap** pour sortir.
4. **Pour une capture nette :** zoomez à 125 % (Ctrl + / Cmd +), puis
   - sur Windows : touches **Windows + Maj + S** ;
   - sur Mac : touches **Cmd + Maj + 4**.

**Commandes clavier :** flèches **← →** pour avancer ou reculer, **R** pour recommencer, **P** pour le mode présentation, **Tab** pour parcourir les boutons.

## 6. Liste de vérification accessibilité

À refaire après chaque incrément :

- [ ] Toute la démo se joue **au clavier seul** (Tab, Entrée, Espace, flèches), avec un focus toujours visible.
- [ ] Le lien « Aller à la démonstration » apparaît au premier appui sur Tab.
- [ ] **Avec un lecteur d'écran** (NVDA sur Windows, VoiceOver sur Mac), le changement d'étape est annoncé, et le prix est lu « prix habituel …, votre prix … ».
- [ ] Le **zoom à 200 %** ne fait rien disparaître.
- [ ] Le **mode sombre** de l'ordinateur reste lisible.
- [ ] Avec « Réduire les animations » activé dans le système, aucune animation ne gêne.
- [ ] Aucune information n'est donnée par la seule couleur : un ✓ ou un mot l'accompagne toujours.
- [ ] Après la vérification, aucun écran voyageur ne contient « solidaire », « social », « aide », « RSA », « C2S » ou « chômage ».

## 7. Fichiers du projet

| Fichier | Rôle | À modifier ? |
|---|---|---|
| `config.js` | Tous les réglages : textes, prix, publics, scénarios | ✅ oui |
| `index.html` | Structure de la page | rarement |
| `styles.css` | Couleurs et mise en forme (couleurs en haut du fichier) | pour le style |
| `app.js` | Moteur de la démo | non |
| `CLAUDE.md` | Brief complet du projet (pour l'outil de code) | quand le projet évolue |
| `CHANGELOG.md` | Historique des incréments | à chaque version |
