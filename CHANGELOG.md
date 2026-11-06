# Historique des versions

## v0.1 — L'idée en 2 minutes (6 novembre 2026)

**Ajouté**
- Démo `index.html` : un cadre de téléphone et un panneau jury en trois blocs (ce que voit la personne, en coulisses, le frein levé), avec le moment du parcours (1 à 6) et le public concerné.
- **Scénario S1 — Nadia, droit trouvé** (ménage modeste), en 10 étapes : besoin, recherche, explication, accord, connexion, vérification, vrai prix animé, billet ordinaire, contrôle « Valide », « Mes accords » avec retrait de l'accord.
- **Scénario S4 — Marc, aucun droit trouvé**, en 10 étapes : message neutre, meilleurs prix accessibles à tous, plan B humain, rattrapage de la différence, porte vers les droits.
- Navigation : boutons, flèches ← →, touche R (recommencer), touche P (mode présentation de base, plein écran). Lien direct vers un scénario : `index.html#S4`.
- `config.js` : tous les textes, prix, publics et scénarios, commentés en français. Les « mots magiques » `{prix}`, `{dateFin}`… se recalculent automatiquement.
- Accessibilité :
  - lien d'évitement, focus visible, annonces pour lecteur d'écran ;
  - prix lu « prix habituel …, votre prix … » ;
  - code QR factice avec texte alternatif ;
  - mode sombre, mouvements réduits respectés, mise en page adaptée au mobile.
- Message clair si `config.js` contient une erreur.
- README en français.

**Choix faits (modifiables dans `config.js`)**
- **Gares des trajets.** Le brief proposait Brignoles et Draguignan, qui n'ont pas de desserte TER voyageurs. Remplacées par **Le Luc – Le Cannet → Marseille Saint-Charles** (S1) et **Les Arcs – Draguignan → Nice Ville** (S4).
- **Réduction.** 75 % fictifs pour les ménages modestes, dans la fourchette réelle de 50 à 90 % de ZOU! Solidaire. Prix pleins fictifs : 18,40 € et 21,20 €.
- **Étape « accord » au clavier.** Avec la flèche →, le présentateur coche d'abord la case de façon visible, puis avance au second appui. Avec le bouton du téléphone, un message demande de cocher la case.
- **Écrans S4 après la vérification.** Ils ne contiennent aucun mot de la liste interdite. La porte vers les droits parle de « complémentaire santé gratuite ».
- **Police.** Atkinson Hyperlegible, conçue pour la lisibilité. Chargée depuis Google Fonts, avec une police système en remplacement hors connexion.

**Prochain incrément proposé :** v0.2 (scénarios S2 et S3) ou v0.3 (visuels jury).
