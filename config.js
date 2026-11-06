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
     {document}             → le document vérifié pour ce public (panneau jury)
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
    connexion: "FranceConnect",            // service de connexion de l'État (nom seul, sans logo)
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
    porteOnVientVersVous: false,  // à venir
    renouvellement: false,        // à venir
    sansSmartphone: false         // à venir
  },

  /* ---------------------------------------------------------------
     3. LES PUBLICS
     Un public = un critère = UN seul document vérifié, chez UN seul organisme.
     reduction : 0.75 = 75 % de réduction (valeurs fictives).
     Ces informations ne s'affichent QUE dans le panneau jury :
     la personne ne voit jamais quel document a été vérifié.
     --------------------------------------------------------------- */
  publics: [
    {
      id: "modeste",
      libelleJury: "Ménages modestes (sous le plafond C2S gratuite)",
      source: "l’Assurance maladie",
      document: "Attestation de droits de l’Assurance maladie",
      sourceJury: "Assurance maladie — statut C2S (simulé)",
      reduction: 0.75
    },
    {
      id: "boursier",
      libelleJury: "Étudiants boursiers",
      source: "le Cnous",
      document: "Attestation de bourse du Cnous",
      sourceJury: "Cnous — statut étudiant boursier (simulé)",
      reduction: 0.75
    },
    {
      id: "pmr",
      libelleJury: "Personnes à mobilité réduite (carte mobilité inclusion)",
      source: "la carte mobilité inclusion",
      document: "Carte mobilité inclusion",
      sourceJury: "Carte mobilité inclusion — mention invalidité ou priorité (simulé)",
      reduction: 0.5
    },
    {
      id: "emploi",
      libelleJury: "Demandeurs d’emploi",
      source: "France Travail",
      document: "Attestation d’inscription France Travail",
      sourceJury: "France Travail — statut demandeur d’emploi (simulé)",
      reduction: 0.75
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
       resultat, billet, controle, accords, meilleurPrix, planB, rattrapage
     « extras » (facultatif) : liste d'avantages affichés avec une coche.
     Pour retirer une étape : supprimez son bloc { … } en entier.
     --------------------------------------------------------------- */
  scenarios: [

    /* =============================================================
       S1 — NADIA — étudiante boursière, tarif réduit accordé
       ============================================================= */
    {
      id: "S1",
      actif: true,
      titre: "S1 · Nadia, étudiante — tarif réduit accordé",
      public: "boursier",
      persona: { nom: "Nadia", age: 20, description: "Étudiante à Marseille, rentre chez ses parents au Luc (Var) le week-end." },
      trajet: {
        depart: "Marseille Saint-Charles",
        arrivee: "Le Luc – Le Cannet",
        date: "vendredi 13 novembre",
        heureDepart: "17:42",
        heureArrivee: "18:58",
        prixPlein: 18.40                       // prix FICTIF
      },
      reponseSimulee: { droit: true, dateFin: "2027-08-31" },
      etapes: [
        {
          ecran: "besoin",
          titre: "Le besoin",
          voyageur: {
            contexte: "{nom} rentre chez ses parents ce week-end. D’habitude, elle prend BlaBlaCar.",
            pensee: "En covoiturage, je dépends de l’heure du conducteur et du point de rendez-vous. Le train serait plus simple… mais c’est trop cher pour moi.",
            bouton: "Chercher un train"
          },
          jury: {
            voit: "Nadia préférerait le train, moins contraignant que le covoiturage. Elle y renonce à cause du prix qu’elle imagine.",
            coulisses: "Rien encore. Le concurrent du train, ici, c’est le covoiturage : moins cher, mais rigide (horaires, rendez-vous, annulations).",
            frein: "Financier perçu : « le train, c’est trop cher pour une étudiante ». Elle ne sait pas qu’elle a droit à une réduction.",
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
          titre: "La démarche",
          voyageur: {
            titre: "Votre prix en 1 minute",
            texte: "Nous cherchons le prix qui correspond à votre situation.",
            labelDemarche: "Comment ça marche",
            demarche: [
              "Vous vous connectez avec {connexion}.",
              "Nous cherchons le prix en fonction de votre situation.",
              "Votre prix s’affiche. Il s’applique ensuite à tous vos trajets."
            ],
            engagement: "Nous ne consultons que les éléments essentiels au calcul de votre prix. Rien d’autre.",
            bouton: "Continuer"
          },
          jury: {
            voit: "La démarche en trois temps, et un engagement ferme sur les données.",
            coulisses: "FranceConnect identifie la personne. Le service de la Région consulte ensuite UN seul document chez UN seul organisme : {sourceJury}.",
            frein: "Cognitif : la personne sait exactement ce qui va se passer, sans dossier ni formulaire.",
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
            messages: [
              "Connexion sécurisée avec {connexion}…",
              "Nous cherchons votre prix en fonction de votre situation…"
            ],
            termine: "C’est prêt.",
            bouton: "Voir le résultat",
            note: "Démonstration : aucune connexion réelle."
          },
          jury: {
            voit: "Une seule connexion FranceConnect, puis une roue qui tourne pendant la recherche. Aucun document à choisir, aucun justificatif à envoyer.",
            coulisses: "FranceConnect prouve QUI est la personne. Le service interroge alors {sourceJury} via API Particulier : oui/non + date de fin.",
            frein: "Cognitif : pas de compte à créer, pas de pièce à scanner, pas de document à identifier soi-même.",
            moment: 3
          }
        },
        {
          ecran: "verification",
          titre: "Le résultat",
          voyageur: {
            resultatTitre: "Tarif réduit accordé",
            labelValidite: "Valable jusqu’au",
            bouton: "Voir mon prix"
          },
          jury: {
            voit: "« Tarif réduit accordé » et sa date de fin. Aucun document, aucun statut affiché.",
            coulisses: "Réponse : OUI + date de fin. Le service ne garde qu’un identifiant pseudonyme, un niveau de tarif et la date de fin.",
            frein: "Délai : quelques secondes au lieu de plusieurs semaines (dossier, courrier, carte postale).",
            moment: 3
          }
        },
        {
          ecran: "resultat",
          titre: "Le prix confirmé",
          voyageur: {
            titre: "Prix confirmé",
            labelTrain: "Votre train",
            labelAncien: "Prix habituel",
            labelNouveau: "Votre prix",
            economie: "Vous économisez {economie}.",
            note: "Ce prix s’applique à tous vos trajets, jusqu’au {dateFin}.",
            bouton: "Acheter mon billet"
          },
          jury: {
            voit: "Le train choisi et son prix confirmé : {prix} au lieu de {prixPlein}. Aucune mention « boursier », « solidaire » ou « aide ».",
            coulisses: "La réduction de la Région ({reduction}) est appliquée automatiquement par tous les distributeurs qui interrogent le service.",
            frein: "Financier : le train devient moins cher que le covoiturage, et plus simple. C’est le moment où elle le choisit.",
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
            labelConsulte: "Ce qui a été consulté",
            consulte: "Les seuls éléments nécessaires au calcul de votre prix",
            labelDateAccord: "Accord donné le",
            dateAccord: "6 novembre 2026",
            labelValidite: "Votre prix est valable jusqu’au",
            boutonRetirer: "Retirer mon accord",
            confirmationRetrait: "Accord retiré. Vos prochains trajets seront au prix habituel. Vos billets déjà achetés restent valables."
          },
          jury: {
            voit: "Ce qui a été consulté, par quel moyen et quand. Un bouton pour tout retirer en un clic.",
            coulisses: "Retirer l’accord efface le niveau de tarif pour les futurs achats. Les billets déjà payés restent valables. Avant la fin du droit, le service peut revérifier seul.",
            frein: "Renouvellement : plus de carte qui expire en silence. Confiance : la personne garde le contrôle de ses données.",
            moment: 6
          }
        }
      ]
    },

    /* =============================================================
       S2 — JEANNE — retraitée à mobilité réduite
       réduction + accompagnant gratuit + assistance en gare
       ============================================================= */
    {
      id: "S2",
      actif: true,
      titre: "S2 · Jeanne, mobilité réduite — tarif + accompagnant",
      public: "pmr",
      persona: { nom: "Jeanne", age: 74, description: "Retraitée, vit à Hyères, marche avec une canne." },
      trajet: {
        depart: "Hyères",
        arrivee: "Toulon",
        date: "mercredi 18 novembre",
        heureDepart: "14:05",
        heureArrivee: "14:26",
        prixPlein: 6.60                        // prix FICTIF
      },
      reponseSimulee: { droit: true, dateFin: "2031-03-31" },
      etapes: [
        {
          ecran: "besoin",
          titre: "Le besoin",
          voyageur: {
            contexte: "{nom} veut aller voir ses petits-enfants à Toulon, {date}.",
            pensee: "Le train ? Avec ma canne, les marches, le quai… et il faudrait payer aussi pour ma voisine qui m’accompagne. J’attendrai que mon fils ait le temps de m’emmener.",
            bouton: "Chercher un train"
          },
          jury: {
            voit: "Jeanne renonce au train pour trois raisons à la fois : l’accès physique, la peur d’être seule en gare, et le prix pour deux.",
            coulisses: "Rien encore. Les personnes à mobilité réduite cumulent les freins : elles dépendent d’un proche ou renoncent à sortir.",
            frein: "Physique, psychologique et financier : le train paraît impossible avant même d’être regardé.",
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
            coulisses: "Le parcours est identique pour tous jusqu’à la réponse.",
            frein: "Financier perçu : le prix plein n’est pas le dernier mot.",
            moment: 2
          }
        },
        {
          ecran: "explication",
          titre: "La démarche",
          voyageur: {
            titre: "Votre prix en 1 minute",
            texte: "Nous cherchons le prix qui correspond à votre situation.",
            labelDemarche: "Comment ça marche",
            demarche: [
              "Vous vous connectez avec {connexion}.",
              "Nous cherchons le prix en fonction de votre situation.",
              "Votre prix s’affiche. Il s’applique ensuite à tous vos trajets."
            ],
            engagement: "Nous ne consultons que les éléments essentiels au calcul de votre prix. Rien d’autre.",
            bouton: "Continuer"
          },
          jury: {
            voit: "La même démarche en trois temps.",
            coulisses: "Un seul document, chez un seul organisme : {sourceJury}.",
            frein: "Cognitif : textes courts et gros boutons, lisibles par une personne âgée.",
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
            messages: [
              "Connexion sécurisée avec {connexion}…",
              "Nous cherchons votre prix en fonction de votre situation…"
            ],
            termine: "C’est prêt.",
            bouton: "Voir le résultat",
            note: "Démonstration : aucune connexion réelle."
          },
          jury: {
            voit: "Une seule connexion FranceConnect, puis la recherche.",
            coulisses: "Le service interroge {sourceJury} : oui/non + date de fin. La carte mobilité inclusion est souvent attribuée pour plusieurs années.",
            frein: "Cognitif : rien à fournir, rien à scanner.",
            moment: 3
          }
        },
        {
          ecran: "verification",
          titre: "Le résultat",
          voyageur: {
            resultatTitre: "Tarif réduit accordé",
            labelValidite: "Valable jusqu’au",
            titreExtras: "Inclus avec votre tarif",
            extras: [
              "Votre accompagnant voyage gratuitement.",
              "Assistance en gare : un agent vous accompagne pour monter et descendre du train."
            ],
            bouton: "Voir mon prix"
          },
          jury: {
            voit: "Le tarif réduit, et deux avantages que Jeanne ne connaissait pas : l’accompagnant gratuit et l’assistance en gare.",
            coulisses: "Les avantages liés au même droit sont activés en même temps (conditions fixées par la Région, fictives ici). L’assistance est réservée automatiquement à l’achat.",
            frein: "Physique et psychologique : elle ne sera pas seule sur le quai. Financier : elle ne paie pas pour sa voisine.",
            moment: 3
          }
        },
        {
          ecran: "resultat",
          titre: "Le prix confirmé",
          voyageur: {
            titre: "Prix confirmé",
            labelTrain: "Votre train",
            labelAncien: "Prix habituel",
            labelNouveau: "Votre prix",
            economie: "Vous économisez {economie}.",
            extras: [
              "Accompagnant : 0 €",
              "Assistance réservée : un agent vous attend à {depart} à 13 h 50."
            ],
            note: "Ce prix s’applique à tous vos trajets, jusqu’au {dateFin}.",
            bouton: "Acheter mon billet"
          },
          jury: {
            voit: "Le train, le prix confirmé ({prix} au lieu de {prixPlein}), l’accompagnant à 0 € et l’heure de l’assistance.",
            coulisses: "Le distributeur transmet la réservation d’assistance au service en gare, sans motif détaillé.",
            frein: "Tous les freins levés sur un seul écran : prix, accompagnement, accès au train.",
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
            extras: ["2 voyageurs : vous et votre accompagnant", "Assistance en gare réservée"],
            altQr: "Code QR du billet (factice)",
            bouton: "Passer au contrôle"
          },
          jury: {
            voit: "Un seul billet pour deux voyageurs, avec l’assistance réservée.",
            coulisses: "Le billet porte un niveau de tarif neutre et le nombre de voyageurs.",
            frein: "Rien à demander au guichet, rien à justifier.",
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
            extras: ["2 voyageurs"],
            note: "Le contrôleur ne voit pas pourquoi le tarif est réduit."
          },
          jury: {
            voit: "« Valide, 2 voyageurs ». Rien d’autre.",
            coulisses: "Le motif n’est jamais transmis au contrôleur.",
            frein: "Psychologique : pas de carte à sortir, pas d’explication à donner devant les autres voyageurs.",
            moment: 5
          }
        }
      ]
    },

    /* =============================================================
       S3 — MARC — conditions non remplies, abonnements proposés
       ============================================================= */
    {
      id: "S3",
      actif: true,
      titre: "S3 · Marc — conditions non remplies",
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
      // Abonnements et cartes ouverts à tous, proposés quand le tarif réduit n'est pas accordé (FICTIFS).
      abonnements: [
        { nom: "Carte de réduction régionale", pour: "Ouverte à tous", avantage: "−25 % sur tous vos trajets dans la région.", prix: "30 € par an" },
        { nom: "Abonnement mensuel travail", pour: "Salariés", avantage: "Trajets illimités entre domicile et travail. Votre employeur en rembourse la moitié.", prix: "À partir de 62 € par mois" },
        { nom: "Billets heures creuses", pour: "Ouverts à tous", avantage: "Jusqu’à −30 % en dehors des heures de pointe.", prix: "Sans abonnement" }
      ],
      // Offres pour CE trajet (prix FICTIFS). La moins chère est recommandée ; « raison » explique ce choix.
      autresOffres: [
        { libelle: "Train de 10 h 32 (heure creuse) avec la carte de réduction régionale", prix: 12.70,
          raison: "C’est le prix le plus bas pour ce trajet, sans aucune condition. La carte coûte 30 € par an : elle est remboursée dès le 4e trajet." },
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
          titre: "La démarche",
          voyageur: {
            titre: "Votre prix en 1 minute",
            texte: "Nous cherchons le prix qui correspond à votre situation.",
            labelDemarche: "Comment ça marche",
            demarche: [
              "Vous vous connectez avec {connexion}.",
              "Nous cherchons le prix en fonction de votre situation.",
              "Votre prix s’affiche. Il s’applique ensuite à tous vos trajets."
            ],
            engagement: "Nous ne consultons que les éléments essentiels au calcul de votre prix. Rien d’autre.",
            bouton: "Continuer"
          },
          jury: {
            voit: "La même démarche en trois temps.",
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
            messages: [
              "Connexion sécurisée avec {connexion}…",
              "Nous cherchons votre prix en fonction de votre situation…"
            ],
            termine: "C’est prêt.",
            bouton: "Voir le résultat",
            note: "Démonstration : aucune connexion réelle."
          },
          jury: {
            voit: "Une seule connexion FranceConnect, puis la recherche.",
            coulisses: "Le service interroge {sourceJury}.",
            frein: "Cognitif : rien à fournir.",
            moment: 3
          }
        },
        {
          ecran: "verification",
          titre: "Le résultat",
          voyageur: {
            resultatTitre: "Pas de tarif réduit pour vous",
            texte: "Votre situation ne correspond pas aux conditions du tarif réduit fixées par la Région.",
            titreAbonnements: "Vous êtes éligible à ces abonnements",
            bouton: "Voir mon meilleur prix"
          },
          jury: {
            voit: "Une réponse claire, puis les abonnements et cartes auxquels Marc a droit. La plupart des voyageurs occasionnels ne les connaissent pas.",
            coulisses: "La source répond NON. Le service ne garde rien de cette réponse et propose les offres ouvertes à tous, dont l’abonnement remboursé à moitié par l’employeur.",
            frein: "Méconnaissance des offres : au lieu d’un refus sec, Marc découvre ce à quoi il a droit.",
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
