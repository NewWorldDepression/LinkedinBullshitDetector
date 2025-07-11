const bullshitKeywords = [
  // Jargon corporate
  "synergie", "leadership", "disruptif", "disruption", "résilience", "inspirant", "inspiration",
  "empowerment", "alignement", "vision", "visionnaire", "agilité", "pivot", "transversalité",
  "collaboratif", "innovation", "transformant", "transformation", "digitalisation",
  "réinvention", "proactivité", "scalabilité", "éthique", "valeurs", "cohérence", "bienveillance",
  "intelligence collective", "co-construction", "brainstorming", "talents", "agile", "flexibilité",
  "ambition partagée", "accélération", "leadership éclairé", "cheminement", "roadmap",
  "stratégie gagnante", "écosystème", "multidisciplinaire", "pensée design", "intelligence émotionnelle",
  "soft skills", "hard skills", "compétences clés", "expérience utilisateur", "UX", "UI",
  "créateur de valeur", "création de valeur", "capital humain", "leviers", "empowerer",

  // Auto-glorification
  "tellement fier", "honoré", "reconnaissant", "gratitude", "privilégié", "humbled",
  "merci la vie", "une chance incroyable", "magnifique aventure", "challenge relevé",
  "parcours exceptionnel", "fierté", "chemin parcouru", "belle réussite", "détermination",
  "passionné", "passionnante aventure", "parcours inspirant", "mon why", "authenticité",
  "croyance profonde", "succès collectif", "apprentissage permanent",

  // Jargon RH / startup
  "onboarding", "offboarding", "feedback constructif", "people centric", "recrutement ciblé",
  "management bienveillant", "team building", "culture d’entreprise", "talents d’exception",
  "skills", "lead", "recrutement stratégique", "attractivité", "engagement collaborateur",

  // Marketing creux
  "stratégie digitale", "brand content", "influence", "performance", "levier de croissance",
  "lead nurturing", "conversion", "omnicanal", "multicanal", "branding", "référencement",
  "stratégie omnicanale", "enjeux business", "marché en mutation", "customer centric",

  // Grandiloquence & vide
  "changer le monde", "faire la différence", "ensemble on va plus loin", "donner du sens",
  "créer du lien", "avoir de l’impact", "montrer la voie", "penser autrement",
  "sortir du cadre", "oser rêver", "révéler le potentiel", "grandir ensemble", "repousser les limites",

    // Anglais
  "resilience", "empower", "visionary", "growth", "mindset", "value-driven",
  "disruptive", "innovative", "impactful", "mission-driven", "authenticity", "diversity",
  "leadership", "entrepreneurial", "scalable", "transformative", "collaboration",
  "inspiration", "purpose", "ecosystem", "strategy", "networking", "branding",
  "game changer", "thought leader", "personal branding", "team player", "goals",
  "career path", "journey", "trusted advisor", "business partner"
];

function computeBullshitScore(text) {
  let score = 0;
  const lower = text.toLowerCase();

  bullshitKeywords.forEach(word => {
    if (lower.includes(word)) score += 5;
  });

  const emojis = (text.match(/[\u{1F600}-\u{1F64F}]/gu) || []).length;
  score += emojis * 2;

  if (text.length > 500) score += 5;
  if (text.split(" ").length > 100) score += 3;

  return score;
}

function getColor(score) {
  if (score < 10) return "#ccffcc";    // vert
  if (score < 20) return "#fff2b2";    // jaune
  return "#ffcccc";                    // rouge
}

function replaceHeaderWithScore(post, score) {
  // Sélectionne la zone de header auteur/date
  const header = post.querySelector('[class*="update-components-header"]');
  if (!header || header.querySelector('.bullshit-header')) return;

  // Vide son contenu
  header.innerHTML = '';

  // Ajoute le bullshit score à la place
  const div = document.createElement('div');
  div.className = 'bullshit-header';
  div.innerText = `Bullshit Score: ${score}`;
  div.style.backgroundColor = getColor(score);

  header.appendChild(div);
}

function analyzePosts() {
  const posts = document.querySelectorAll('div.feed-shared-update-v2');
  posts.forEach(post => {
    const score = computeBullshitScore(post.innerText);
    replaceHeaderWithScore(post, score);
  });
}

setInterval(analyzePosts, 2000);
