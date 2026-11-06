/* =====================================================================
   MON JUSTE PRIX — MOTEUR DE LA DÉMO
   Ce fichier lit config.js et affiche les étapes. Aucun texte visible
   n'est écrit ici : tout vient de config.js.
   Il n'est normalement pas nécessaire de le modifier.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.CONFIG;
  if (!C || !C.scenarios || !C.textes) {
    var err = document.getElementById("erreur-config");
    if (err) err.hidden = false;
    var ent = document.getElementById("entete");
    if (ent) ent.hidden = true;
    var demo = document.getElementById("demo");
    if (demo) demo.hidden = true;
    return;
  }

  var T = C.textes;
  var reduitMouvement = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var scenarios = C.scenarios.filter(function (s) { return s.actif !== false; });

  var etat = {
    s: 0,          // index du scénario
    e: 0,          // index de l'étape
    accord: false, // case d'accord cochée
    accordRetire: false
  };
  var minuteries = [];

  /* ---------- Outils ---------- */
  var $ = function (id) { return document.getElementById(id); };

  function nettoyerMinuteries() {
    minuteries.forEach(function (t) { clearTimeout(t); cancelAnimationFrame(t); });
    minuteries = [];
  }

  function euros(n) {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n);
  }

  function dateLongue(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(d);
  }

  function arrondi(n) { return Math.round(n * 100) / 100; }

  function scenario() { return scenarios[etat.s]; }
  function etape() { return scenario().etapes[etat.e]; }
  function publicDe(sc) {
    return (C.publics || []).filter(function (p) { return p.id === sc.public; })[0] || {};
  }

  function valeurs(sc) {
    sc = sc || scenario();
    var pub = publicDe(sc);
    var plein = sc.trajet.prixPlein;
    var prix = arrondi(plein * (1 - (pub.reduction || 0)));
    return {
      nom: sc.persona.nom,
      age: sc.persona.age,
      depart: sc.trajet.depart,
      arrivee: sc.trajet.arrivee,
      date: sc.trajet.date,
      heureDepart: sc.trajet.heureDepart,
      heureArrivee: sc.trajet.heureArrivee,
      prixPlein: euros(plein),
      prix: euros(prix),
      economie: euros(arrondi(plein - prix)),
      reduction: Math.round((pub.reduction || 0) * 100) + " %",
      dateFin: dateLongue(sc.reponseSimulee && sc.reponseSimulee.dateFin),
      source: pub.source || "",
      sourceJury: pub.sourceJury || "",
      public: pub.libelleJury || "",
      service: C.service.nom,
      _plein: plein,
      _prix: prix
    };
  }

  // Remplace {mots} par leur valeur
  function t(texte, extra) {
    if (texte === undefined || texte === null) return "";
    var v = Object.assign({}, valeurs(), extra || {});
    return String(texte).replace(/\{(\w+)\}/g, function (m, k) {
      return v[k] !== undefined ? v[k] : m;
    });
  }

  // Petit constructeur d'éléments
  function h(tag, attrs, enfants) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var val = attrs[k];
        if (val === null || val === undefined || val === false) return;
        if (k === "class") el.className = val;
        else if (k === "text") el.textContent = val;
        else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), val);
        else el.setAttribute(k, val === true ? "" : val);
      });
    }
    (enfants || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return el;
  }

  function annoncer(msg) {
    var a = $("annonce");
    a.textContent = "";
    minuteries.push(setTimeout(function () { a.textContent = msg; }, 60));
  }

  function boutonPrincipal(texte, action) {
    return h("div", { class: "ecran-actions" }, [
      h("button", { type: "button", class: "btn btn-principal btn-large", text: t(texte), onclick: action || function () { aller(1, true); } })
    ]);
  }

  function titreEcran(texte) {
    return h("h3", { class: "ecran-titre", tabindex: "-1", text: t(texte) });
  }

  /* ---------- Faux code QR (décoratif, déterministe) ---------- */
  function fauxQR(graine, alt) {
    var n = 25, taille = 6, ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + n * taille + " " + n * taille);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", alt);
    svg.setAttribute("class", "qr");
    var x = 0;
    for (var i = 0; i < graine.length; i++) x = (x * 31 + graine.charCodeAt(i)) >>> 0;
    function alea() { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return (x >>> 0) / 4294967296; }
    function repere(r, c) { return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7); }
    function carre(r, c, cote) {
      var el = document.createElementNS(ns, "rect");
      el.setAttribute("x", c * taille); el.setAttribute("y", r * taille);
      el.setAttribute("width", cote * taille); el.setAttribute("height", cote * taille);
      return el;
    }
    var fond = carre(0, 0, n); fond.setAttribute("class", "qr-fond"); svg.appendChild(fond);
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
      if (!repere(r, c) && alea() > 0.52) svg.appendChild(carre(r, c, 1));
    }
    [[0, 0], [0, n - 7], [n - 7, 0]].forEach(function (p) {
      svg.appendChild(carre(p[0], p[1], 7));
      var b = carre(p[0] + 1, p[1] + 1, 5); b.setAttribute("class", "qr-fond"); svg.appendChild(b);
      svg.appendChild(carre(p[0] + 2, p[1] + 2, 3));
    });
    return svg;
  }

  /* ---------- Les écrans du téléphone ---------- */
  var ecrans = {

    besoin: function (v) {
      var sc = scenario();
      return [
        h("div", { class: "carte-persona" }, [
          h("div", { class: "avatar", "aria-hidden": "true", text: sc.persona.nom.charAt(0) }),
          h("div", {}, [
            h("h3", { class: "ecran-titre", tabindex: "-1", text: sc.persona.nom + ", " + sc.persona.age }),
            h("p", { class: "persona-desc", text: t(sc.persona.description) })
          ])
        ]),
        h("p", { class: "contexte", text: t(v.contexte) }),
        h("blockquote", { class: "bulle" }, [h("p", { text: t(v.pensee) })]),
        boutonPrincipal(v.bouton)
      ];
    },

    recherche: function (v) {
      var sc = scenario();
      return [
        titreEcran(v.titre),
        h("dl", { class: "fiche-trajet" }, [
          h("div", {}, [h("dt", { text: t(v.labelDepart) }), h("dd", { text: sc.trajet.depart })]),
          h("div", {}, [h("dt", { text: t(v.labelArrivee) }), h("dd", { text: sc.trajet.arrivee })]),
          h("div", {}, [h("dt", { text: t(v.labelDate) }), h("dd", { text: sc.trajet.date })])
        ]),
        h("div", { class: "carte-train" }, [
          h("p", { class: "horaires" }, [
            h("span", { class: "heure", text: sc.trajet.heureDepart }),
            h("span", { class: "fleche", "aria-hidden": "true", text: "→" }),
            h("span", { class: "heure", text: sc.trajet.heureArrivee })
          ]),
          h("p", { class: "prix-plein" }, [
            h("span", { class: "sr-only", text: t(v.labelPrix) + " : " }),
            t("{prixPlein}")
          ])
        ]),
        h("div", { class: "lien-prix-zone" }, [
          h("button", { type: "button", class: "btn btn-principal btn-large", onclick: function () { aller(1, true); } }, [
            h("span", { "aria-hidden": "true", class: "icone-coche", text: "✓ " }), t(v.lienPrix)
          ]),
          h("p", { class: "aide", text: t(v.aideLien) })
        ])
      ];
    },

    explication: function (v) {
      var pub = publicDe(scenario());
      return [
        titreEcran(v.titre),
        h("p", { class: "texte-fort", text: t(v.texte) }),
        h("div", { class: "question-posee" }, [
          h("p", { class: "petit-label", text: t(v.labelQuestion) }),
          h("p", { text: t(pub.questionPosee) })
        ]),
        h("div", { class: "deux-listes" }, [
          h("div", { class: "liste-oui" }, [
            h("h4", { text: t(v.titreOui) }),
            h("ul", {}, (v.listeOui || []).map(function (x) { return h("li", { text: t(x) }); }))
          ]),
          h("div", { class: "liste-non" }, [
            h("h4", { text: t(v.titreNon) }),
            h("ul", {}, (v.listeNon || []).map(function (x) { return h("li", { text: t(x) }); }))
          ])
        ]),
        boutonPrincipal(v.bouton)
      ];
    },

    accord: function (v) {
      var erreur = h("p", { class: "erreur", id: "erreur-accord", role: "alert" });
      var caseAccord = h("input", { type: "checkbox", id: "case-accord", "aria-describedby": "note-accord erreur-accord" });
      caseAccord.checked = etat.accord;
      caseAccord.addEventListener("change", function () {
        etat.accord = caseAccord.checked;
        if (etat.accord) erreur.textContent = "";
      });
      return [
        titreEcran(v.titre),
        h("fieldset", { class: "accord" }, [
          h("legend", { text: t(v.legende) }),
          h("div", { class: "case" }, [
            caseAccord,
            h("label", { for: "case-accord", text: t(v.caseAccord) })
          ]),
          h("p", { class: "note", id: "note-accord", text: t(v.note) })
        ]),
        h("details", { class: "detail-non" }, [
          h("summary", { text: t(v.lienNon) }),
          h("p", { text: t(v.detailNon) })
        ]),
        erreur,
        boutonPrincipal(v.bouton, function () { avancerDepuisAccord(true); })
      ];
    },

    connexion: function (v) {
      return [
        h("p", { class: "bandeau-etat", text: t(v.entete) }),
        titreEcran(v.titre),
        h("ul", { class: "liste-connexion" }, (v.options || []).map(function (o) {
          return h("li", {}, [h("button", { type: "button", class: "btn btn-option", text: t(o), onclick: function () { aller(1, true); } })]);
        })),
        h("p", { class: "note", text: t(v.note) })
      ];
    },

    verification: function (v) {
      var sc = scenario();
      var ok = sc.reponseSimulee && sc.reponseSimulee.droit;
      var zone = h("div", { class: "verif" });
      var attente = h("div", { class: "verif-attente" }, [
        h("div", { class: "rouet", "aria-hidden": "true" }),
        h("p", { text: t(v.enCours) })
      ]);
      var resultat = h("div", { class: "verif-resultat " + (ok ? "verif-ok" : "verif-neutre") }, [
        h("p", { class: "verif-icone", "aria-hidden": "true", text: ok ? "✓" : "i" }),
        h("h3", { class: "ecran-titre", tabindex: "-1", text: t(v.resultatTitre) }),
        h("p", { class: "texte-fort", text: t(v.resultat) }),
        boutonPrincipal(v.bouton)
      ]);
      zone.appendChild(attente);
      var montrer = function () {
        attente.remove();
        zone.appendChild(resultat);
        annoncer(t(v.resultatTitre) + ". " + t(v.resultat));
      };
      if (reduitMouvement) montrer();
      else { annoncer(t(v.enCours)); minuteries.push(setTimeout(montrer, 1400)); }
      return [zone];
    },

    resultat: function (v) {
      var val = valeurs();
      var nouveau = h("span", { class: "prix-nouveau-valeur", "aria-hidden": "true", text: reduitMouvement ? val.prix : val.prixPlein });
      var ancien = h("span", { class: "prix-ancien-valeur" + (reduitMouvement ? " barre-prix" : ""), "aria-hidden": "true", text: val.prixPlein });
      var bloc = [
        titreEcran(v.titre),
        h("div", { class: "bloc-prix" }, [
          h("p", { class: "sr-only", text: t(T.prixLecteur) }),
          h("p", { class: "prix-ancien", "aria-hidden": "true" }, [h("span", { class: "petit-label", text: t(v.labelAncien) }), ancien]),
          h("p", { class: "prix-nouveau", "aria-hidden": "true" }, [h("span", { class: "petit-label", text: t(v.labelNouveau) }), nouveau])
        ]),
        h("p", { class: "economie", text: t(v.economie) }),
        h("p", { class: "note", text: t(v.note) }),
        boutonPrincipal(v.bouton)
      ];
      if (!reduitMouvement) {
        minuteries.push(setTimeout(function () {
          ancien.classList.add("barre-prix");
          var debut = null, duree = 900;
          var pas = function (ts) {
            if (!debut) debut = ts;
            var k = Math.min(1, (ts - debut) / duree);
            var e = 1 - Math.pow(1 - k, 3);
            nouveau.textContent = euros(val._plein + (val._prix - val._plein) * e);
            if (k < 1) minuteries.push(requestAnimationFrame(pas));
            else nouveau.classList.add("pulse");
          };
          minuteries.push(requestAnimationFrame(pas));
        }, 450));
      }
      return bloc;
    },

    billet: function (v) {
      var sc = scenario();
      return [
        titreEcran(v.titre),
        h("div", { class: "billet" }, [
          h("dl", { class: "billet-infos" }, [
            h("div", {}, [h("dt", { text: t(v.labelTrajet) }), h("dd", { text: sc.trajet.depart + " → " + sc.trajet.arrivee })]),
            h("div", {}, [h("dt", { text: t(v.labelDate) }), h("dd", { text: sc.trajet.date + " · " + sc.trajet.heureDepart })]),
            h("div", {}, [h("dt", { text: t(v.labelTarif) }), h("dd", { text: t(v.tarif) })]),
            h("div", {}, [h("dt", { text: t(v.labelPrix) }), h("dd", { text: t("{prix}") })])
          ]),
          h("div", { class: "billet-qr" }, [fauxQR(sc.id + sc.trajet.depart, t(v.altQr))])
        ]),
        h("p", { class: "note", text: t(v.note) }),
        boutonPrincipal(v.bouton)
      ];
    },

    controle: function (v) {
      var sc = scenario();
      return [
        h("p", { class: "bandeau-etat bandeau-controle", text: t(v.entete) }),
        h("div", { class: "controle-statut" }, [
          h("p", { class: "controle-icone", "aria-hidden": "true", text: "✓" }),
          h("h3", { class: "ecran-titre", tabindex: "-1", text: t(v.statut) })
        ]),
        h("dl", { class: "billet-infos" }, [
          h("div", {}, [h("dt", { text: t(v.labelTrajet) }), h("dd", { text: sc.trajet.depart + " → " + sc.trajet.arrivee })]),
          h("div", {}, [h("dt", { text: t(v.labelDate) }), h("dd", { text: sc.trajet.date })])
        ]),
        h("p", { class: "note", text: t(v.note) })
      ];
    },

    accords: function (v) {
      var pub = publicDe(scenario());
      var message = h("p", { class: "confirmation", role: "status" });
      var bouton = h("button", { type: "button", class: "btn btn-secondaire btn-large", text: t(v.boutonRetirer) });
      var ligne = h("dl", { class: "carte-accord" + (etat.accordRetire ? " retire" : "") }, [
        h("div", {}, [h("dt", { text: t(v.labelOrganisme) }), h("dd", { text: capitaliser(t(pub.source)) })]),
        h("div", {}, [h("dt", { text: t(v.labelQuestion) }), h("dd", { text: t(v.question) })]),
        h("div", {}, [h("dt", { text: t(v.labelDateAccord) }), h("dd", { text: t(v.dateAccord) })]),
        h("div", {}, [h("dt", { text: t(v.labelValidite) }), h("dd", { text: t("{dateFin}") })])
      ]);
      bouton.addEventListener("click", function () {
        etat.accordRetire = true;
        ligne.classList.add("retire");
        bouton.disabled = true;
        message.textContent = t(v.confirmationRetrait);
      });
      if (etat.accordRetire) { bouton.disabled = true; message.textContent = t(v.confirmationRetrait); }
      return [titreEcran(v.titre), ligne, h("div", { class: "ecran-actions" }, [bouton]), message];
    },

    nonTrouve: function (v) {
      var sc = scenario();
      var offres = (sc.autresOffres || []).slice().sort(function (a, b) { return a.prix - b.prix; });
      return [
        titreEcran(v.titre),
        h("p", { class: "texte-fort", text: t(v.texte) }),
        h("h4", { class: "sous-titre", text: t(v.titreOffres) }),
        h("ul", { class: "liste-offres" }, offres.map(function (o) {
          return h("li", {}, [h("span", { text: t(o.libelle) }), h("strong", { text: euros(o.prix) })]);
        })),
        boutonPrincipal(v.bouton)
      ];
    },

    planB: function (v) {
      return [
        titreEcran(v.titre),
        h("ul", { class: "liste-options" }, (v.options || []).map(function (o) {
          return h("li", { class: "carte-option" }, [h("h4", { text: t(o.titre) }), h("p", { text: t(o.texte) })]);
        })),
        boutonPrincipal(v.bouton)
      ];
    },

    rattrapage: function (v) {
      return [
        titreEcran(v.titre),
        h("p", { class: "texte-fort", text: t(v.texte) }),
        h("div", { class: "encart" }, [h("p", { text: t(v.texteRemboursement) })]),
        boutonPrincipal(v.bouton)
      ];
    },

    porteDroits: function (v) {
      return [
        titreEcran(v.titre),
        h("p", { class: "texte-fort", text: t(v.texte) }),
        h("div", { class: "ecran-actions" }, [
          h("button", { type: "button", class: "btn btn-principal btn-large", text: t(v.bouton) })
        ]),
        h("p", { class: "note", text: t(v.note) })
      ];
    }
  };

  function capitaliser(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  /* ---------- Affichage ---------- */
  function afficher(focusTelephone) {
    nettoyerMinuteries();
    var sc = scenario(), et = etape(), total = sc.etapes.length;
    var v = et.voyageur || {};

    // Téléphone
    var ecran = $("ecran");
    ecran.innerHTML = "";
    ecran.className = "ecran ecran-" + et.ecran;
    var rendu = ecrans[et.ecran];
    (rendu ? rendu(v) : []).forEach(function (el) { ecran.appendChild(el); });
    ecran.scrollTop = 0;
    $("titre-telephone").textContent = t(T.telephoneLabel);

    // Progression
    $("texte-etape").textContent = t(T.etape, { n: etat.e + 1, total: total });
    $("barre-remplie").style.width = ((etat.e + 1) / total * 100) + "%";
    $("btn-precedent").disabled = etat.e === 0;
    $("btn-suivant").disabled = etat.e === total - 1;

    // Panneau jury
    var j = et.jury || {};
    var m = j.moment;
    $("jury-moment").textContent = m ? t(T.juryMoment, { n: m, nom: (C.moments || [])[m - 1] || "" }) : "";
    $("jury-moment").hidden = !m;
    $("jury-public").textContent = t(T.juryPublic);
    $("jury-titre-etape").textContent = t(T.etape, { n: etat.e + 1, total: total }) + " — " + t(et.titre);
    $("jury-voit").textContent = t(j.voit);
    $("jury-coulisses").textContent = t(j.coulisses);
    $("jury-frein").textContent = t(j.frein);

    annoncer(t(T.annonceEtape, { n: etat.e + 1, total: total, titre: t(et.titre) }));

    if (focusTelephone) {
      var titre = ecran.querySelector(".ecran-titre");
      if (titre) titre.focus({ preventScroll: false });
    }
  }

  function aller(delta, depuisTelephone) {
    var total = scenario().etapes.length;
    var cible = etat.e + delta;
    if (cible < 0 || cible >= total) return;
    // L'accord doit être donné pour aller au-delà de l'étape « accord »
    if (delta > 0 && etape().ecran === "accord" && !etat.accord) {
      avancerDepuisAccord(depuisTelephone);
      return;
    }
    etat.e = cible;
    afficher(depuisTelephone);
  }

  // Bouton du téléphone : exige la case cochée.
  // Flèche / Suivant (présentateur) : coche la case d'abord, visiblement, puis avance au second appui.
  function avancerDepuisAccord(depuisTelephone) {
    var caseAccord = $("case-accord");
    if (etat.accord) { etat.e += 1; afficher(depuisTelephone); return; }
    if (depuisTelephone) {
      var err = $("erreur-accord");
      if (err) err.textContent = t(etape().voyageur.erreur);
      if (caseAccord) caseAccord.focus();
    } else if (caseAccord) {
      caseAccord.checked = true;
      etat.accord = true;
      annoncer(t(etape().voyageur.caseAccord));
    }
  }

  function recommencer() {
    etat.e = 0; etat.accord = false; etat.accordRetire = false;
    afficher(false);
  }

  function changerScenario(i) {
    etat.s = i;
    recommencer();
  }

  /* ---------- Mode présentation ---------- */
  function basculerPresentation(forcer) {
    if (!C.increments || !C.increments.modePresentation) return;
    var actif = typeof forcer === "boolean" ? forcer : !document.body.classList.contains("presentation");
    document.body.classList.toggle("presentation", actif);
    var b = $("btn-presentation");
    b.setAttribute("aria-pressed", actif ? "true" : "false");
    b.textContent = actif ? T.quitterPresentation : T.modePresentation;
    try {
      if (actif && !document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(function () {});
      } else if (!actif && document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function () {});
      }
    } catch (e) { /* plein écran indisponible : le mode reste actif */ }
  }

  document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement && document.body.classList.contains("presentation")) basculerPresentation(false);
  });

  /* ---------- Initialisation ---------- */
  function init() {
    document.title = T.titrePage;
    $("lien-evitement").textContent = T.lienEvitement;
    $("banniere-demo").textContent = C.service.banniereDemo;
    $("marque-nom").textContent = C.service.nom;
    $("marque-accroche").textContent = C.service.accroche || "";
    $("appli-nom").textContent = C.service.nom;
    $("label-scenario").textContent = T.choisirScenario;
    $("btn-precedent").textContent = "← " + T.precedent;
    $("btn-suivant").textContent = T.suivant + " →";
    $("btn-recommencer").textContent = T.recommencer;
    $("btn-presentation").textContent = T.modePresentation;
    $("btn-presentation").hidden = !(C.increments && C.increments.modePresentation);
    $("heure-telephone").textContent = T.heureTelephone;
    $("titre-jury").textContent = T.juryTitre;
    $("jury-label-voit").textContent = T.juryVoit;
    $("jury-label-coulisses").textContent = T.juryCoulisses;
    $("jury-label-frein").textContent = T.juryFrein;
    $("jury-fictif").textContent = T.prixFictifs;
    $("aide-clavier").textContent = T.aideClavier;
    $("btn-replier").textContent = T.masquerJury;

    var choix = $("choix-scenario");
    scenarios.forEach(function (s, i) {
      choix.appendChild(h("option", { value: String(i), text: s.titre }));
    });
    choix.addEventListener("change", function () { changerScenario(Number(choix.value)); });

    $("btn-precedent").addEventListener("click", function () { aller(-1, false); });
    $("btn-suivant").addEventListener("click", function () { aller(1, false); });
    $("btn-recommencer").addEventListener("click", recommencer);
    $("btn-presentation").addEventListener("click", function () { basculerPresentation(); });
    $("btn-replier").addEventListener("click", function () {
      var b = $("btn-replier");
      var ouvert = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", ouvert ? "false" : "true");
      b.textContent = ouvert ? T.afficherJury : T.masquerJury;
      $("jury-contenu").hidden = ouvert;
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
      var tag = (ev.target.tagName || "").toLowerCase();
      if (tag === "select" || tag === "textarea" || (tag === "input" && ev.target.type !== "checkbox")) return;
      if (ev.key === "ArrowRight") { ev.preventDefault(); aller(1, false); }
      else if (ev.key === "ArrowLeft") { ev.preventDefault(); aller(-1, false); }
      else if (ev.key === "r" || ev.key === "R") { recommencer(); }
      else if (ev.key === "p" || ev.key === "P") { basculerPresentation(); }
      else if (ev.key === "Escape" && document.body.classList.contains("presentation")) { basculerPresentation(false); }
    });

    // Lien direct vers un scénario : index.html#S4
    var ancre = (location.hash || "").replace("#", "");
    scenarios.forEach(function (s, i) { if (s.id === ancre) etat.s = i; });
    choix.value = String(etat.s);

    afficher(false);
  }

  init();
})();
