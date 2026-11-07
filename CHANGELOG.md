# Historique des versions

## v0.2.1 — Retour de la roue crantée (7 novembre 2026)

- La roue crantée revient au début de l'écran de résultat, avec « Connexion sécurisée avec FranceConnect… » puis « Nous cherchons votre prix en fonction de votre situation… ». Le résultat s'affiche ensuite. Elle n'a plus d'étape à elle : la démo garde le même nombre d'étapes. Elle est présente dans tous les parcours (billet, abonnement, conditions non remplies).
- « Tarif réduit accordé » est suivi de la phrase « Votre situation permet une réduction. »

## v0.2 — Module abonnement et réabonnement (7 novembre 2026)

**Nouveau : choisir entre billet et abonnement**
- **Écran « Que voulez-vous faire ? »** (étape 2) pour les trois personas : « Acheter un billet », « Prendre un abonnement » ou « Me réabonner ». Un menu « Parcours » en haut de la démo permet aussi de choisir directement. Liens directs : `index.html#S1-abonnement`, `index.html#S3-reabonnement`.
- **Abonnement** : même chemin que le billet (recherche, démarche, accord, résultat), puis le prix mensuel confirmé et l'abonnement chargé.
  - Nadia : 18 € par mois au lieu de 72 €.
  - Jeanne : 44,50 € par mois au lieu de 89 €, avec l'assistance en gare.
  - Marc : pas de tarif réduit. Le service lui recommande l'abonnement travail, dont l'employeur rembourse la moitié.
- **Réabonnement en un clic** : le droit est déjà vérifié, donc pas de nouvelle démarche. Un rappel avant la fin du mois, le prix confirmé, l'abonnement rechargé.
- Dans `config.js`, `{ reprendre: "explication" }` recopie une étape du parcours billet, ce qui évite de réécrire les mêmes textes.

**Modifications**
- **Étape 5 (connexion FranceConnect) supprimée** : on passe directement de l'accord au résultat.
- **Étape 3** : « Nous nous connectons à FranceConnect pour trouver le prix qui correspond à votre situation. »
- **Étape 4** : la phrase « Vous pourrez retirer votre accord… » est retirée.
- **Étape « recherche »** : « pour tout le monde » est retiré.
- **Bouton « Imprimer mon billet » / « Imprimer mon abonnement »** sur l'écran du billet. Il ouvre l'impression du billet seul sur GitHub Pages ; dans le lien Claude, seul le message de confirmation s'affiche.

## v0.1.5 — Jeanne seule, Marc en 8 étapes (6 novembre 2026)

- **S2 · Jeanne** voyage seule : l'accompagnant est retiré partout (résultat, prix, billet, contrôle, panneau jury). Elle garde le tarif réduit et l'assistance en gare. Panneau jury : l'aller-retour passe de 39,60 € à 19,80 €.
- **S3 · Marc** : l'étape « Votre situation a changé récemment ? » est supprimée. Le scénario compte 8 étapes et se termine sur le rattrapage.

## v0.1.4 — Mention d'intégration SNCF Connect (6 novembre 2026) — à valider

- Sous le nom du service, en haut du téléphone : « Dans l'appli du transporteur · ex. SNCF Connect ».
- En bas du panneau jury : la phrase d'intégration et l'annotation « Analyse virtuelle, maquette non officielle ».
- Le coin du panneau jury pour l'étape « La recherche » cite SNCF Connect.
- Aucun logo ni aucune charte de la SNCF n'est utilisé.
- **Pour retirer la mention :** dans `config.js`, mettre `mentionIntegration: false` dans le bloc `increments`. Pour revenir exactement à la version précédente : v0.1.3.

## v0.1.3 — Trajet plus long pour Jeanne (6 novembre 2026)

- **S2 · Jeanne** va maintenant de Hyères à Marseille Saint-Charles (1 h 24). Prix plein fictif : 19,80 €.
- Le panneau jury compare l'aller-retour à deux : 79,20 € au prix plein, 19,80 € avec le service.

## v0.1.2 — Trois personas, démarche et abonnements (6 novembre 2026)

**Personas**
- **S1 · Nadia devient étudiante boursière.** Elle prend BlaBlaCar pour rentrer chez ses parents ; elle préférerait le train, moins contraignant, mais le trouve trop cher. Trajet Marseille → Le Luc, tarif réduit accordé.
- **Nouveau S2 · Jeanne, 74 ans, retraitée à mobilité réduite.** Hyères → Toulon. Elle obtient le tarif réduit, la place gratuite pour son accompagnant et l'assistance en gare réservée automatiquement (conditions fictives).
- **S3 · Marc** (ancien S4) : conditions non remplies.

**Étapes**
- **Étape 3 :** la démarche est expliquée en trois temps : se connecter, « nous cherchons le prix en fonction de votre situation », le prix s'affiche.
- **Étape 5 :** une seule connexion FranceConnect. Les comptes partenaires (impots.gouv, ameli…) sont supprimés. Une roue crantée tourne pendant la recherche, puis le bouton « Voir le résultat » apparaît.
- **Étape 6 :** le document vérifié n'est plus affiché. Si le tarif est accordé : la date de validité, plus les avantages inclus. Si le tarif n'est pas accordé : « Vous êtes éligible à ces abonnements », avec leur description et leur prix.
- **Étape 7 :** le train (gares, date, horaires) s'affiche avec la confirmation du prix.
- « Mes accords » indique « Les seuls éléments nécessaires au calcul de votre prix » au lieu du nom du document.

## v0.1.1 — Corrections après relecture (6 novembre 2026)

**Les deux scénarios**
- **Connexion par FranceConnect.** L'organisme interrogé (Assurance maladie, C2S) n'apparaît plus sur le téléphone, seulement dans le panneau jury. Le nom FranceConnect est affiché sans le logo officiel, réservé aux services habilités.
- **Explication et accord.** Les listes « Nous demandons / Nous ne demandons pas » sont supprimées. Elles sont remplacées par un engagement net : « Nous ne consultons que les éléments essentiels au calcul de votre prix. Rien d'autre. » Le bouton devient « Continuer avec FranceConnect ».
- **« Petits revenus » est retiré** du lien universel « Voir mon prix ».
- **Le résultat précise le document vérifié**, défini par public dans `config.js` (`document`), et sa date de validité.
- **« Simulé » est retiré** des boutons d'achat et de l'écran du contrôleur. La bannière de démonstration reste en haut de page.

**S1 — Nadia**
- Bouton de départ : « Chercher un train ».
- Le billet n'affiche plus de mention de paiement.

**S4 — Marc, refondu : « conditions non remplies »**
- Marc a des revenus modestes, mais au-dessus des plafonds de la Région.
- La réponse est directe : « Pas de tarif réduit pour vous », avec le document vérifié.
- Nouvel écran « Votre meilleur prix » : le service choisit l'offre la moins chère, explique pourquoi et montre les autres offres.
- « Votre situation a changé récemment ? » : envoyer un document ou voir un conseiller.
- Rattrapage conservé.
- Étape « porte vers les droits » supprimée. Le scénario compte 9 étapes.

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
