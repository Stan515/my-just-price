/* =====================================================================
   MON JUSTE PRIX — FICHIER DE RÉGLAGES
   =====================================================================

   C'est le SEUL fichier à modifier au quotidien.
   Tous les textes, prix, publics et scénarios de la démo sont ici.

   Règles d'écriture (pour ne rien casser) :
   - Un texte s'écrit entre guillemets droits : "comme ceci".
   - Pour mettre un guillemet dans un texte, utilisez « » ou ’ (apostrophe typographique).
   - Chaque élément d'une liste ou d'un bloc est suivi d'une virgule,
     sauf le dernier (une virgule en trop est tolérée, une virgule oubliée non).
   - Les nombres s'écrivent avec un POINT : 18.40 (et non 18,40).
   - Les dates s'écrivent AAAA-MM-JJ : "2027-09-30".

   Mots magiques utilisables dans les textes (remplacés automatiquement) :
     {nom} {age}            → la personne du scénario
     {depart} {arrivee}     → les gares du trajet
     {date} {heureDepart} {heureArrivee}
     {prixPlein}            → prix habituel du trajet
     {prix}                 → prix après réduction
     {economie}             → différence entre les deux
     {meilleurPrix}         → le prix le plus bas parmi les autres offres (scénario sans réduction)
     {reduction}            → pourcentage de réduction (ex. 75 %)
     {dateFin}              → date de fin du droit (ex. 30 septembre 2027)
     {document}             → le document vérifié pour ce public
     {source}               → l'organisme qui détient ce document
     {connexion}            → le service de connexion (FranceConnect)
     {service}              → le nom du service (ex. Mon Juste Prix)

   RAPPEL : démonstration uniquement. Personnes, prix et réponses sont FICTIFS.
   ===================================================================== */

window.CONFIG = {

  /* ---------------------------------------------------------------
     1. LE SERVICE
     --------------------------------------------------------------- */
  service: {
    nom: "Mon Juste Prix",                 // nom affiché (nom de travail, modifiable)
    accroche: "Le train au prix que vous payez vraiment.",
    region: "Région Sud",                  // territoire de référence
    connexion: "FranceConnect",            // service de connexion de l'État (nom seul, sans logo officiel)
    banniereDemo: "Démonstration — simulation, aucune donnée réelle"
  },

  /* ---------------------------------------------------------------
     2. LES INCRÉMENTS
     true = activé, false = désactivé.
     Permet de garder ou d'abandonner une fonction sans toucher au code.
     Les incréments marqués « à venir » n'existent pas encore.
     --------------------------------------------------------------- */
  increments: {
    modePresentation: true,       // touche P : plein écran pour la projection
    porteOnVientVersVous: false,  // à venir (v0.4)
    renouvellement: false,        // à venir (v0.5)
    sansSmartphone: false         // à venir (v0.6)
  },

  /* ---------------------------------------------------------------
     3. LES PUBLICS
     Un public = un critère = UN seul document vérifié, chez UN seul organisme.
     reduction : 0.75 = 75 % de réduction (valeurs fictives).
     document : nom du document affiché à la personne après la vérification.
     sourceJury / questionPosee : visibles uniquement dans le panneau jury.
     --------------------------------------------------------------- */
  publics: [
    {
      id: "modeste",
      libelleJury: "Ménages modestes (sous le plafond C2S gratuite)",
      source: "l’Assurance maladie",
      document: "Attestation de droits de l’Assurance maladie",
      sourceJury: "Assurance maladie — statut C2S (simulé)",
      questionPosee: "A-t-elle la C2S, et jusqu’à quand ?",
      reduction: 0.75,
      dureeDroitMois: 12
    },
    {
      id: "emploi",
      libelleJury: "Demandeurs d’emploi",
      source: "France Travail",
      document: "Attestation d’inscription France Travail",
      sourceJury: "France Travail — statut demandeur d’emploi (simulé)",
      questionPosee: "Est-il inscrit comme demandeur d’emploi, et jusqu’à quand ?",
      reduction: 0.75,
      dureeDroitMois: 3
    },
    {
      id: "boursier",
      libelleJury: "Étudiants boursiers",
      source: "le Cnous",
      document: "Attestation de bourse du Cnous",
      sourceJury: "Cnous — statut étudiant boursier (simulé)",
      questionPosee: "Est-elle boursière cette année, et jusqu’à quand ?",
      reduction: 0.5,
      dureeDroitMois: 10
    }
  ],

  /* ---------------------------------------------------------------
     4. LES 6 MOMENTS OÙ LE TRAIN PERD LA PERSONNE
     (affichés dans le panneau jury : « Moment 2 sur 6 : Recherche »)
     --------------------------------------------------------------- */
  moments: [
    "Le besoin apparaît",
    "La recherche",
    "La découverte de la réduction",
    "L’achat",
    "Le contrôle",
    "Le renouvellement"
  ],

  /* ---------------------------------------------------------------
     5. LES SCÉNARIOS
     Chaque scénario = une personne fictive + un trajet + des étapes.
     actif: false → le scénario disparaît du menu sans être supprimé.

     Chaque étape contient :
       ecran    : le type d'écran (ne pas modifier, sauf pour réorganiser)
       titre    : le nom de l'étape (barre de progression)
       voyageur : les textes du téléphone
       jury     : les 3 blocs du panneau jury + le numéro du moment (1 à 6)

     Types d'écran disponibles :
       besoin, recherche, explication, accord, connexion, verification,
       resultat, billet, controle, accords,
       meilleurPrix, planB, rattrapage
     Pour retirer une étape : supprimez son bloc { … } en entier.
     --------------------------------------------------------------- */
  scenarios: [

    /* =============================================================
       S1 — NADIA — tarif réduit accordé (ménage modeste)
       ============================================================= */
    {
      id: "S1",
      actif: true,
      titre: "S1 · Nadia — tarif réduit accordé",
      public: "modeste",
      persona: { nom: "Nadia", age: 42, description: "Aide à domicile, vit au Luc (Var), sans voiture fiable." },
      trajet: {
        depart: "Le Luc – Le Cannet",
        arrivee: "Marseille Saint-Charles",
        date: "jeudi 12 novembre",
        heureDepart: "08:14",
        heureArrivee: "09:31",
        prixPlein: 18.40                       // prix FICTIF
      },
      reponseSimulee: { droit: true, dateFin: "2027-09-30" },
      etapes: [
        {
          ecran: "besoin",
          titre: "Le besoin",
          voyageur: {
            contexte: "{nom} a un rendez-vous à l’hôpital à Marseille, {date} à 10 h.",
            pensee: "Le train ? Ça doit coûter une fortune. Je vais demander à ma voisine de m’emmener…",
            bouton: "Chercher un train"
          },
          jury: {
            voit: "Nadia a un besoin de déplacement contraint. Le train n’est pas dans ses options : elle pense qu’il est trop cher.",
            coulisses: "Rien encore. C’est le moment où le train perd le plus de monde, sans que personne ne le sache.",
            frein: "Psychologique : « le train, ce n’est pas pour moi ». Le prix imaginé suffit à l’écarter.",
            moment: 1
          }
        },
        {
          ecran: "recherche",
          titre: "La recherche",
          voyageur: {
            titre: "Votre trajet",
            labelDepart: "Départ",
            labelArrivee: "Arrivée",
            labelDate: "Date",
            labelPrix: "Prix",
            lienPrix: "Voir mon prix",
            aideLien: "Jeune, famille, senior… Toutes les réductions au même endroit, pour tout le monde."
          },
          jury: {
            voit: "Le prix plein ({prixPlein}) et, juste à côté, un lien « Voir mon prix » affiché pour TOUS les voyageurs.",
            coulisses: "Le service est intégré à l’appli ou au site où la personne cherche déjà son trajet. Pas d’appli à télécharger.",
            frein: "Financier perçu : le prix plein n’est plus le dernier mot. Le lien est le même pour tous, donc il ne désigne personne.",
            moment: 2
          }
        },
        {
          ecran: "explication",
          titre: "L’explication",
          voyageur: {
            titre: "Votre prix en 1 minute",
            texte: "Connectez-vous avec {connexion}. Nous vérifions vos documents et calculons votre prix.",
            engagement: "Nous ne consultons que les éléments essentiels au calcul de votre prix. Rien d’autre.",
            bouton: "Continuer"
          },
          jury: {
            voit: "Une phrase : la vérification passe par FranceConnect, et seuls les éléments essentiels sont consultés.",
            coulisses: "FranceConnect identifie la personne. Le service de la Région consulte ensuite UN seul document chez UN seul organisme : {sourceJury}.",
            frein: "Cognitif : pas de dossier ni de liste à lire. Psychologique : un engagement simple et ferme sur les données.",
            moment: 3
          }
        },
        {
          ecran: "accord",
          titre: "L’accord",
          voyageur: {
            titre: "Votre accord",
            legende: "Êtes-vous d’accord ?",
            caseAccord: "J’accepte que {service} consulte, via {connexion}, les seuls éléments nécessaires au calcul de mon prix.",
            engagement: "Aucun autre document n’est consulté. Aucune information n’est conservée, à part la date de fin de votre tarif.",
            note: "Vous pourrez retirer votre accord à tout moment, dans « Mes accords ».",
            erreur: "Cochez la case pour continuer.",
            bouton: "Continuer avec {connexion}"
          },
          jury: {
            voit: "Une case à cocher claire, jamais pré-cochée, et un bouton « Continuer avec FranceConnect ».",
            coulisses: "L’accord est enregistré avec sa date. Il autorise une seule consultation, puis les revérifications futures.",
            frein: "Peur d’être fiché : l’engagement est explicite, et la personne sait comment retirer son accord.",
            moment: 3
          }
        },
        {
          ecran: "connexion",
          titre: "La connexion",
          voyageur: {
            titre: "Choisissez un compte que vous avez déjà",
            options: ["impots.gouv", "ameli", "Identité Numérique La Poste", "MSA"],
            note: "Démonstration : aucune connexion réelle, aucun mot de passe."
          },
          jury: {
            voit: "L’écran FranceConnect : la personne choisit un compte qu’elle possède déjà (impots.gouv, ameli, La Poste, MSA). Le logo officiel n’est pas reproduit dans la démo.",
            coulisses: "FranceConnect prouve QUI est la personne, sans créer de compte. Il ouvre l’accès aux documents des administrations.",
            frein: "Cognitif : pas de nouveau mot de passe, pas de compte à créer, pas de justificatif à scanner.",
            moment: 3
          }
        },
        {
          ecran: "verification",
          titre: "La vérification",
          voyageur: {
            enCours: "Vérification de vos documents via {connexion}…",
            resultatTitre: "Tarif réduit accordé",
            labelDocument: "Document vérifié",
            labelValidite: "Valable jusqu’au",
            bouton: "Voir mon prix"
          },
          jury: {
            voit: "Le document vérifié (attestation de droits de l’Assurance maladie) et sa date de validité. Le mot « C2S » n’apparaît pas à l’écran.",
            coulisses: "Le service de la Région interroge {sourceJury} via API Particulier. Réponse : OUI + date de fin. Il ne garde que : un identifiant pseudonyme, un niveau de tarif, la date de fin.",
            frein: "Délai : quelques secondes au lieu de plusieurs semaines (dossier, courrier, carte postale).",
            moment: 3
          }
        },
        {
          ecran: "resultat",
          titre: "Le vrai prix",
          voyageur: {
            titre: "Votre prix",
            labelAncien: "Prix habituel",
            labelNouveau: "Votre prix",
            economie: "Vous économisez {economie}.",
            note: "Ce prix s’applique à tous vos trajets, jusqu’au {dateFin}. Rien d’autre à faire.",
            bouton: "Acheter mon billet"
          },
          jury: {
            voit: "« Votre prix : {prix} au lieu de {prixPlein} ». Aucune mention « solidaire », « social » ou « aide ».",
            coulisses: "La réduction de la Région ({reduction}) est appliquée automatiquement par tous les distributeurs qui interrogent le service.",
            frein: "Financier : la personne voit enfin le prix qu’elle paiera vraiment. C’est le moment où elle choisit le train.",
            moment: 2
          }
        },
        {
          ecran: "billet",
          titre: "Le billet",
          voyageur: {
            titre: "Votre billet",
            labelTrajet: "Trajet",
            labelDate: "Date",
            labelTarif: "Tarif",
            tarif: "Votre tarif",
            labelPrix: "Prix payé",
            altQr: "Code QR du billet (factice)",
            bouton: "Passer au contrôle"
          },
          jury: {
            voit: "Un billet ordinaire, identique à celui de n’importe quel voyageur. Le tarif s’appelle simplement « Votre tarif ».",
            coulisses: "Le billet porte un niveau de tarif neutre. Pas de carte à montrer, pas de justificatif à garder sur soi.",
            frein: "Peur d’être catalogué à l’achat : rien à expliquer, rien à montrer au guichet.",
            moment: 4
          }
        },
        {
          ecran: "controle",
          titre: "Le contrôle",
          voyageur: {
            entete: "Appli du contrôleur",
            statut: "Valide",
            labelTrajet: "Trajet",
            labelDate: "Date",
            note: "Le contrôleur ne voit pas pourquoi le tarif est réduit."
          },
          jury: {
            voit: "Le contrôleur scanne le billet : « Valide ». Rien d’autre.",
            coulisses: "L’appli de contrôle vérifie que le niveau de tarif est actif à cette date. Le motif (le critère) n’est jamais transmis.",
            frein: "Psychologique : plus de peur d’une carte oubliée ou expirée, plus de regard des autres voyageurs.",
            moment: 5
          }
        },
        {
          ecran: "accords",
          titre: "Mes accords",
          voyageur: {
            titre: "Mes accords",
            labelConnexion: "Connexion",
            labelDocument: "Document consulté",
            labelDateAccord: "Accord donné le",
            dateAccord: "6 novembre 2026",
            labelValidite: "Votre prix est valable jusqu’au",
            boutonRetirer: "Retirer mon accord",
            confirmationRetrait: "Accord retiré. Vos prochains trajets seront au prix habituel. Vos billets déjà achetés restent valables."
          },
          jury: {
            voit: "Ce qui a été consulté, par quel moyen et quand. Un bouton pour tout retirer en un clic.",
            coulisses: "Retirer l’accord efface le niveau de tarif pour les futurs achats. Les billets déjà payés restent valables. 30 jours avant la fin, le service peut revérifier seul (incrément v0.5).",
            frein: "Renouvellement : plus de carte qui expire en silence. Confiance : la personne garde le contrôle de ses données.",
            moment: 6
          }
        }
      ]
    },

    /* =============================================================
       S4 — MARC — conditions non remplies
       ============================================================= */
    {
      id: "S4",
      actif: true,
      titre: "S4 · Marc — conditions non remplies",
      public: "modeste",
      persona: { nom: "Marc", age: 51, description: "Cariste en CDI, vit près des Arcs (Var), revenus modestes." },
      trajet: {
        depart: "Les Arcs – Draguignan",
        arrivee: "Nice Ville",
        date: "dimanche 15 novembre",
        heureDepart: "09:02",
        heureArrivee: "10:24",
        prixPlein: 21.20                       // prix FICTIF
      },
      reponseSimulee: { droit: false, dateFin: null },
      // Offres ouvertes à tous, proposées quand les conditions ne sont pas remplies (prix FICTIFS).
      // La moins chère est recommandée automatiquement ; « raison » explique ce choix.
      autresOffres: [
        { libelle: "Train de 10 h 32 avec la carte de réduction régionale ouverte à tous", prix: 12.70,
          raison: "C’est le prix le plus bas pour ce trajet, sans aucune condition. La carte se prend en 2 minutes." },
        { libelle: "Train de 10 h 32 (heure creuse)", prix: 15.90 },
        { libelle: "Train de 09 h 02 (prix habituel)", prix: 21.20 }
      ],
      etapes: [
        {
          ecran: "besoin",
          titre: "Le besoin",
          voyageur: {
            contexte: "{nom} veut aller voir sa mère à Nice, {date}.",
            pensee: "Avec l’essence et le péage, c’est cher. Mais le train, c’est sûrement pire…",
            bouton: "Chercher un train"
          },
          jury: {
            voit: "Marc a des revenus modestes, mais au-dessus des plafonds fixés par la Région pour le tarif réduit.",
            coulisses: "Rien encore. Ce scénario montre la réponse du service quand les conditions ne sont pas remplies.",
            frein: "Psychologique et financier : le train est écarté avant même d’être regardé.",
            moment: 1
          }
        },
        {
          ecran: "recherche",
          titre: "La recherche",
          voyageur: {
            titre: "Votre trajet",
            labelDepart: "Départ",
            labelArrivee: "Arrivée",
            labelDate: "Date",
            labelPrix: "Prix",
            lienPrix: "Voir mon prix",
            aideLien: "Jeune, famille, senior… Toutes les réductions au même endroit, pour tout le monde."
          },
          jury: {
            voit: "Le même lien « Voir mon prix » que tout le monde.",
            coulisses: "Le parcours est identique pour tous jusqu’à la réponse : rien ne permet de deviner qui a droit à quoi.",
            frein: "Financier perçu : le prix plein n’est pas le dernier mot.",
            moment: 2
          }
        },
        {
          ecran: "explication",
          titre: "L’explication",
          voyageur: {
            titre: "Votre prix en 1 minute",
            texte: "Connectez-vous avec {connexion}. Nous vérifions vos documents et calculons votre prix.",
            engagement: "Nous ne consultons que les éléments essentiels au calcul de votre prix. Rien d’autre.",
            bouton: "Continuer"
          },
          jury: {
            voit: "La même explication que pour Nadia.",
            coulisses: "Un seul document, chez un seul organisme : {sourceJury}.",
            frein: "Cognitif : aucune démarche à comprendre.",
            moment: 3
          }
        },
        {
          ecran: "accord",
          titre: "L’accord",
          voyageur: {
            titre: "Votre accord",
            legende: "Êtes-vous d’accord ?",
            caseAccord: "J’accepte que {service} consulte, via {connexion}, les seuls éléments nécessaires au calcul de mon prix.",
            engagement: "Aucun autre document n’est consulté. Aucune information n’est conservée, à part la date de fin de votre tarif.",
            note: "Vous pourrez retirer votre accord à tout moment, dans « Mes accords ».",
            erreur: "Cochez la case pour continuer.",
            bouton: "Continuer avec {connexion}"
          },
          jury: {
            voit: "Accord explicite, jamais pré-coché.",
            coulisses: "L’accord est daté et peut être retiré.",
            frein: "Peur d’être fiché.",
            moment: 3
          }
        },
        {
          ecran: "connexion",
          titre: "La connexion",
          voyageur: {
            titre: "Choisissez un compte que vous avez déjà",
            options: ["impots.gouv", "ameli", "Identité Numérique La Poste", "MSA"],
            note: "Démonstration : aucune connexion réelle, aucun mot de passe."
          },
          jury: {
            voit: "Connexion FranceConnect avec un compte existant.",
            coulisses: "FranceConnect prouve qui est la personne et ouvre l’accès aux documents des administrations.",
            frein: "Cognitif : pas de compte à créer.",
            moment: 3
          }
        },
        {
          ecran: "verification",
          titre: "La vérification",
          voyageur: {
            enCours: "Vérification de vos documents via {connexion}…",
            resultatTitre: "Pas de tarif réduit pour vous",
            texte: "Votre situation ne correspond pas aux conditions du tarif réduit fixées par la Région.",
            labelDocument: "Document vérifié",
            bouton: "Voir mon meilleur prix"
          },
          jury: {
            voit: "Une réponse claire et directe : pas de tarif réduit, et sur quelle base. Aucune ambiguïté, aucun formulaire à remplir pour rien.",
            coulisses: "La source répond NON. Le service ne garde rien de cette réponse : il compte seulement, de façon anonyme, le nombre de refus.",
            frein: "Incertitude : la personne sait tout de suite à quoi s’en tenir, et le service passe aussitôt à la solution.",
            moment: 3
          }
        },
        {
          ecran: "meilleurPrix",
          titre: "Le meilleur prix",
          voyageur: {
            titre: "Votre meilleur prix",
            texte: "Nous avons choisi pour vous l’offre la moins chère pour ce trajet.",
            labelRecommande: "Notre choix pour vous",
            labelPourquoi: "Pourquoi ce choix",
            titreAutres: "Les autres offres",
            bouton: "Choisir ce prix"
          },
          jury: {
            voit: "Le service choisit pour Marc l’offre la moins chère et explique pourquoi. Les autres offres restent visibles.",
            coulisses: "Le moteur compare les offres ouvertes à tous (heure creuse, carte régionale) et recommande la moins chère.",
            frein: "Financier : Marc repart avec {meilleurPrix} au lieu de {prixPlein}, sans condition. Le train redevient une option.",
            moment: 2
          }
        },
        {
          ecran: "planB",
          titre: "Si la situation a changé",
          voyageur: {
            titre: "Votre situation a changé récemment ?",
            texte: "Les documents des administrations peuvent avoir quelques semaines de retard. Faites vérifier votre situation actuelle :",
            options: [
              { titre: "Envoyer un document", texte: "Une seule pièce, prise en photo. Réponse sous 48 h." },
              { titre: "Voir un conseiller", texte: "Dans un espace France Services ou au guichet d’une gare." }
            ],
            bouton: "Mon trajet est bientôt"
          },
          jury: {
            voit: "Un recours simple, réservé aux situations qui ont changé depuis la dernière mise à jour des bases.",
            coulisses: "Un agent valide le document et enregistre le droit dans le même service. Il ne voit que « tarif applicable : oui ».",
            frein: "Exclusion numérique et cas particuliers : personne ne reste bloqué par la machine.",
            moment: 3
          }
        },
        {
          ecran: "rattrapage",
          titre: "Le rattrapage",
          voyageur: {
            titre: "Votre trajet n’attend pas",
            texte: "Achetez votre billet maintenant, au meilleur prix ({meilleurPrix}).",
            texteRemboursement: "Si votre droit au tarif réduit est confirmé ensuite, nous vous remboursons automatiquement la différence.",
            bouton: "Acheter mon billet"
          },
          jury: {
            voit: "La personne peut partir tout de suite, sans perdre le tarif réduit si son droit est confirmé ensuite.",
            coulisses: "La différence est remboursée automatiquement une fois le droit validé par un conseiller.",
            frein: "Délai : l’urgence du trajet ne fait plus perdre la réduction.",
            moment: 4
          }
        }
      ]
    }

    /* S2 (Karim, demandeur d'emploi) et S3 (Léa, étudiante boursière)
       arrivent avec l'incrément v0.2. */
  ],

  /* ---------------------------------------------------------------
     6. LES TEXTES DE L'INTERFACE (boutons, titres, aides)
     --------------------------------------------------------------- */
  textes: {
    titrePage: "Mon Juste Prix — démonstration",
    lienEvitement: "Aller à la démonstration",
    choisirScenario: "Scénario",
    precedent: "Précédent",
    suivant: "Suivant",
    recommencer: "Recommencer",
    modePresentation: "Mode présentation",
    quitterPresentation: "Quitter la présentation",
    etape: "Étape {n} sur {total}",
    telephoneLabel: "Écran du téléphone de {nom}",
    heureTelephone: "10:12",
    juryTitre: "Pour le jury",
    juryVoit: "Ce que voit la personne",
    juryCoulisses: "En coulisses",
    juryFrein: "Le frein levé",
    juryMoment: "Moment {n} sur 6 : {nom}",
    juryPublic: "Public : {public}",
    prixFictifs: "Personnes, prix et réponses sont fictifs.",
    aideClavier: "Clavier : flèches ← → pour avancer ou reculer, R pour recommencer, P pour le mode présentation.",
    masquerJury: "Masquer les explications",
    afficherJury: "Afficher les explications",
    prixLecteur: "Prix habituel {prixPlein}, votre prix {prix}.",
    annonceEtape: "Étape {n} sur {total} : {titre}"
  }
};
