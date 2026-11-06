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
     {reduction}            → pourcentage de réduction (ex. 75 %)
     {dateFin}              → date de fin du droit (ex. 30 septembre 2027)
     {source}               → l'organisme interrogé (ex. l'Assurance maladie)
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
    banniereDemo: "Démonstration — simulation, aucune donnée réelle"
  },

  /* ---------------------------------------------------------------
     2. LES INCRÉMENTS
     true = activé, false = désactivé.
     Permet de garder ou d'abandonner une fonction sans toucher au code.
     Les incréments marqués « à venir » n'existent pas encore dans la v0.1.
     --------------------------------------------------------------- */
  increments: {
    modePresentation: true,       // touche P : plein écran pour la projection
    porteOnVientVersVous: false,  // à venir (v0.4)
    renouvellement: false,        // à venir (v0.5)
    sansSmartphone: false         // à venir (v0.6)
  },

  /* ---------------------------------------------------------------
     3. LES PUBLICS
     Un public = un critère = UNE seule source interrogée.
     reduction : 0.75 = 75 % de réduction (valeurs fictives).
     source : nom affiché à la personne AVANT la vérification.
     questionPosee : la seule question posée à la source.
     --------------------------------------------------------------- */
  publics: [
    {
      id: "modeste",
      libelleJury: "Ménages modestes (sous le plafond C2S gratuite)",
      source: "l’Assurance maladie",
      sourceJury: "Assurance maladie — statut C2S (simulé)",
      questionPosee: "Avez-vous la complémentaire santé solidaire (C2S), et jusqu’à quand ?",
      reduction: 0.75,
      dureeDroitMois: 12
    },
    {
      id: "emploi",
      libelleJury: "Demandeurs d’emploi",
      source: "France Travail",
      sourceJury: "France Travail — statut demandeur d’emploi (simulé)",
      questionPosee: "Êtes-vous inscrit comme demandeur d’emploi, et jusqu’à quand ?",
      reduction: 0.75,
      dureeDroitMois: 3
    },
    {
      id: "boursier",
      libelleJury: "Étudiants boursiers",
      source: "le Cnous",
      sourceJury: "Cnous — statut étudiant boursier (simulé)",
      questionPosee: "Êtes-vous étudiant boursier cette année, et jusqu’à quand ?",
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
       nonTrouve, planB, rattrapage, porteDroits
     --------------------------------------------------------------- */
  scenarios: [

    /* =============================================================
       S1 — NADIA — droit trouvé (ménage modeste)
       ============================================================= */
    {
      id: "S1",
      actif: true,
      titre: "S1 · Nadia — droit trouvé",
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
            bouton: "Chercher quand même un train"
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
            aideLien: "Jeune, famille, senior, petits revenus… Toutes les réductions au même endroit, pour tout le monde."
          },
          jury: {
            voit: "Le prix plein ({prixPlein}) et, juste à côté, un lien « Voir mon prix » affiché pour TOUS les voyageurs.",
            coulisses: "Le service est intégré à l’appli ou au site où la personne cherche déjà son trajet. Pas d’appli à télécharger.",
            frein: "Financier perçu : le prix plein n’est plus le dernier mot. Le lien est universel, donc il ne désigne personne.",
            moment: 2
          }
        },
        {
          ecran: "explication",
          titre: "L’explication",
          voyageur: {
            titre: "Votre prix en 1 minute",
            texte: "Nous demandons une seule chose à {source} : oui ou non, et jusqu’à quand. Rien d’autre.",
            labelQuestion: "La question posée",
            titreOui: "Nous demandons",
            listeOui: ["Oui ou non", "La date de fin"],
            titreNon: "Nous ne demandons pas",
            listeNon: ["Vos revenus", "Votre situation de famille", "Vos autres droits"],
            bouton: "Continuer"
          },
          jury: {
            voit: "Une explication en une phrase : quel organisme, quelle question, quelles informations ne sont PAS demandées.",
            coulisses: "Un critère = une seule source. Ici : {sourceJury}. Aucun dossier, aucun justificatif.",
            frein: "Cognitif : pas de formulaire ni de jargon. Psychologique : la personne sait exactement ce qui sera partagé.",
            moment: 3
          }
        },
        {
          ecran: "accord",
          titre: "L’accord",
          voyageur: {
            titre: "Votre accord",
            legende: "Êtes-vous d’accord ?",
            caseAccord: "J’accepte que {service} pose cette seule question à {source}.",
            note: "Vous pourrez retirer votre accord à tout moment, dans « Mes accords ».",
            lienNon: "Ce que nous ne demandons pas",
            detailNon: "Ni vos revenus, ni votre adresse, ni votre situation de famille, ni le montant de vos droits. Nous ne gardons que la date de fin.",
            erreur: "Cochez la case pour continuer.",
            bouton: "Continuer"
          },
          jury: {
            voit: "Une case à cocher claire, jamais pré-cochée, et la promesse qu’on peut revenir en arrière.",
            coulisses: "L’accord est enregistré avec sa date. Il conditionne la question posée, et les revérifications futures.",
            frein: "Peur d’être fiché : la personne garde la main, elle sait comment retirer son accord.",
            moment: 3
          }
        },
        {
          ecran: "connexion",
          titre: "La connexion",
          voyageur: {
            entete: "Identité numérique de l’État — simulé",
            titre: "Connectez-vous avec un compte que vous avez déjà",
            options: ["Compte impôts (simulé)", "Compte assurance maladie (simulé)", "Identité numérique La Poste (simulé)"],
            note: "Aucun mot de passe n’est demandé dans cette démonstration."
          },
          jury: {
            voit: "Un écran de connexion générique, avec des comptes que la personne possède souvent déjà (impôts, assurance maladie).",
            coulisses: "La connexion par l’identité numérique de l’État (type FranceConnect) prouve QUI est la personne, sans créer de compte.",
            frein: "Cognitif : pas de nouveau mot de passe, pas de compte à créer.",
            moment: 3
          }
        },
        {
          ecran: "verification",
          titre: "La vérification",
          voyageur: {
            enCours: "Nous posons la question à {source}…",
            resultatTitre: "Réponse reçue",
            resultat: "C’est confirmé jusqu’au {dateFin}.",
            bouton: "Voir mon prix"
          },
          jury: {
            voit: "Quelques secondes d’attente, puis une réponse simple, sans aucun mot qui révèle une situation.",
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
            bouton: "Acheter mon billet (simulé)"
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
            note: "Paiement simulé : aucun argent n’a été débité.",
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
            entete: "Appli du contrôleur — simulé",
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
            labelOrganisme: "Organisme",
            labelQuestion: "Ce qui a été demandé",
            question: "Une réponse oui ou non, et une date de fin",
            labelDateAccord: "Accord donné le",
            dateAccord: "6 novembre 2026",
            labelValidite: "Votre prix est valable jusqu’au",
            boutonRetirer: "Retirer mon accord",
            confirmationRetrait: "Accord retiré. Vos prochains trajets seront au prix habituel. Vos billets déjà achetés restent valables."
          },
          jury: {
            voit: "La liste de ce qui a été demandé, à qui et quand. Un bouton pour tout retirer en un clic.",
            coulisses: "Retirer l’accord efface le niveau de tarif pour les futurs achats. Les billets déjà payés restent valables. 30 jours avant la fin, le service peut revérifier seul (incrément v0.5).",
            frein: "Renouvellement : plus de carte qui expire en silence. Confiance : la personne garde le contrôle de ses données.",
            moment: 6
          }
        }
      ]
    },

    /* =============================================================
       S4 — MARC — aucun droit trouvé
       ============================================================= */
    {
      id: "S4",
      actif: true,
      titre: "S4 · Marc — aucun droit trouvé",
      public: "modeste",
      persona: { nom: "Marc", age: 51, description: "Cariste intérimaire, vit près des Arcs (Var), petits revenus, ne touche aucune prestation." },
      trajet: {
        depart: "Les Arcs – Draguignan",
        arrivee: "Nice Ville",
        date: "dimanche 15 novembre",
        heureDepart: "09:02",
        heureArrivee: "10:24",
        prixPlein: 21.20                       // prix FICTIF
      },
      reponseSimulee: { droit: false, dateFin: null },
      // Autres prix proposés quand le droit n'est pas confirmé (FICTIFS)
      autresOffres: [
        { libelle: "Train de 10 h 32 (heure creuse)", prix: 15.90 },
        { libelle: "Avec la carte de réduction régionale ouverte à tous", prix: 12.70 }
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
            voit: "Marc gagne peu mais ne touche aucune prestation : il est invisible pour les administrations.",
            coulisses: "Rien encore. Marc représente le « double non-recours » : il n’a pas les droits sociaux auxquels il pourrait prétendre.",
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
            aideLien: "Jeune, famille, senior, petits revenus… Toutes les réductions au même endroit, pour tout le monde."
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
            texte: "Nous demandons une seule chose à {source} : oui ou non, et jusqu’à quand. Rien d’autre.",
            labelQuestion: "La question posée",
            titreOui: "Nous demandons",
            listeOui: ["Oui ou non", "La date de fin"],
            titreNon: "Nous ne demandons pas",
            listeNon: ["Vos revenus", "Votre situation de famille", "Vos autres droits"],
            bouton: "Continuer"
          },
          jury: {
            voit: "La même explication simple que pour Nadia.",
            coulisses: "Source unique : {sourceJury}.",
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
            caseAccord: "J’accepte que {service} pose cette seule question à {source}.",
            note: "Vous pourrez retirer votre accord à tout moment, dans « Mes accords ».",
            lienNon: "Ce que nous ne demandons pas",
            detailNon: "Ni vos revenus, ni votre adresse, ni votre situation de famille, ni le montant de vos droits. Nous ne gardons que la date de fin.",
            erreur: "Cochez la case pour continuer.",
            bouton: "Continuer"
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
            entete: "Identité numérique de l’État — simulé",
            titre: "Connectez-vous avec un compte que vous avez déjà",
            options: ["Compte impôts (simulé)", "Compte assurance maladie (simulé)", "Identité numérique La Poste (simulé)"],
            note: "Aucun mot de passe n’est demandé dans cette démonstration."
          },
          jury: {
            voit: "Connexion avec un compte existant.",
            coulisses: "L’identité numérique de l’État prouve qui est la personne.",
            frein: "Cognitif : pas de compte à créer.",
            moment: 3
          }
        },
        {
          ecran: "verification",
          titre: "La vérification",
          voyageur: {
            enCours: "Nous posons la question à {source}…",
            resultatTitre: "Réponse reçue",
            resultat: "Nous n’avons pas pu le confirmer automatiquement.",
            bouton: "Voir mes solutions"
          },
          jury: {
            voit: "Un message neutre. JAMAIS « vous n’y avez pas droit ».",
            coulisses: "La source répond NON. Être absent d’une base ne veut pas dire ne pas avoir droit (autre régime, base pas à jour, droit jamais demandé).",
            frein: "Honte et découragement : le message ne juge pas et ne ferme aucune porte.",
            moment: 3
          }
        },
        {
          ecran: "nonTrouve",
          titre: "Les autres prix",
          voyageur: {
            titre: "Ce n’est pas fini",
            texte: "Cela arrive souvent. Ça ne veut pas dire que vous n’y avez pas droit.",
            titreOffres: "En attendant, vos meilleurs prix pour ce trajet",
            bouton: "Voir les autres solutions"
          },
          jury: {
            voit: "Tout de suite, les meilleurs prix accessibles à tous pour ce trajet (prix fictifs).",
            coulisses: "Le service ne garde rien de la réponse négative. Il compte seulement, de façon anonyme, combien de personnes ne sont pas trouvées.",
            frein: "Financier : même sans droit confirmé, la personne repart avec un prix plus bas que le prix plein.",
            moment: 2
          }
        },
        {
          ecran: "planB",
          titre: "Le plan B",
          voyageur: {
            titre: "Deux autres façons de vérifier",
            options: [
              { titre: "Envoyer une seule photo", texte: "Une seule pièce, prise avec votre téléphone. Réponse sous 48 h." },
              { titre: "Être aidé par une personne", texte: "Dans un espace France Services ou au guichet d’une gare, sans rendez-vous compliqué." }
            ],
            bouton: "Mon trajet est bientôt"
          },
          jury: {
            voit: "Deux options simples : une seule photo, ou l’aide d’une personne.",
            coulisses: "Plan B humain : un agent valide le droit et l’enregistre dans le même service. Il ne voit que « tarif applicable : oui ».",
            frein: "Exclusion numérique et cas particuliers : personne ne reste bloqué par la machine.",
            moment: 3
          }
        },
        {
          ecran: "rattrapage",
          titre: "Le rattrapage",
          voyageur: {
            titre: "Votre trajet n’attend pas",
            texte: "Achetez votre billet maintenant au prix habituel.",
            texteRemboursement: "Si votre droit est confirmé, nous vous remboursons la différence : jusqu’à {economie}.",
            bouton: "Acheter maintenant (simulé)"
          },
          jury: {
            voit: "La personne peut partir tout de suite, sans perdre la réduction si son droit est confirmé ensuite.",
            coulisses: "La différence est remboursée automatiquement une fois le droit validé par le plan B.",
            frein: "Délai : l’urgence du trajet ne fait plus perdre la réduction.",
            moment: 4
          }
        },
        {
          ecran: "porteDroits",
          titre: "La porte vers les droits",
          voyageur: {
            titre: "Et si vous aviez d’autres droits ?",
            texte: "Beaucoup de personnes ont droit à une complémentaire santé gratuite sans le savoir. Vérifiez en 5 minutes, gratuitement et sans engagement.",
            bouton: "Lancer le simulateur (simulé)",
            note: "Si un droit s’ouvre, votre prix de train suivra automatiquement."
          },
          jury: {
            voit: "Une invitation à vérifier ses droits, sans jugement.",
            coulisses: "Lien vers un simulateur public de droits. Le train devient une porte d’entrée vers l’accès aux droits sociaux.",
            frein: "Double non-recours : le service ne se contente pas de constater l’absence de droit, il aide à l’ouvrir.",
            moment: 3
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
    finScenario: "Fin du scénario",
    annonceEtape: "Étape {n} sur {total} : {titre}"
  }
};
