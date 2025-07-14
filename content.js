// Fonction pour calculer le score de bullshit
function calculateBullshitScore(text) {
    let score = 0;
    const bullshitKeywords = [
        "synergie", "catalyseur", "optimiser", "écosystème", "innovation disruptive",
        "valeur ajoutée", "transformation digitale", "monétiser", "roadmap",
        "paradigm shift", "best practices", "quick win", "low hanging fruit",
        "alignement", "scalabilité", "solution orientée client", "proactif",
        "holistique", "challenge", "opportunité", "croissance exponentielle",
        "leadership éclairé", "pensée latérale", "core business", "business review",
        "agile", "framework", "méthodologie", "co-création", "empowerment",
        "engager", "insight", "pivot", "visionnaire", "win-win",
        "transformation mindset", "co-construction", "solutionner", "créer du lien",
        "gamification", "growth hacking", "storytelling", "mindfulness",
        "wellness", "intrapreneurship", "reskilling", "upskilling", "désintermédiation"
    ];

    const buzzwordRegex = new RegExp(bullshitKeywords.join("|"), "gi");
    const matches = text.match(buzzwordRegex);
    if (matches) {
        score += matches.length * 10; // Chaque mot clé ajoute 10 points
    }

    // Règles basées sur la longueur du post (les posts très longs ou très courts peuvent être suspects)
    if (text.length < 50 || text.length > 1000) {
        score += 5;
    }

    // Vérifier l'utilisation excessive d'emojis (indicateur de "feel-good" bullshit)
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    const emojiMatches = text.match(emojiRegex);
    if (emojiMatches && emojiMatches.length > 5) { // Plus de 5 emojis
        score += emojiMatches.length * 2;
    }

    // Répétition de mots ou phrases simples (peut indiquer un contenu creux)
    const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    const wordCounts = {};
    words.forEach(word => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
    for (const word in wordCounts) {
        if (wordCounts[word] > 3) { // Si un mot est répété plus de 3 fois
            score += (wordCounts[word] - 3) * 5;
        }
    }

    // Détection de phrases génériques ou "creuses"
    const genericPhrases = [
        "hâte de voir vos commentaires", "qu'en pensez-vous", "n'hésitez pas à partager",
        "je suis ravi de partager", "une pensée pour", "un grand merci à",
        "continuons la conversation", "ensemble nous pouvons", "découvrez comment"
    ];
    const genericRegex = new RegExp(genericPhrases.join("|"), "gi");
    const genericMatches = text.match(genericRegex);
    if (genericMatches) {
        score += genericMatches.length * 7; // Chaque phrase générique ajoute 7 points
    }

    return Math.min(100, score); // Le score ne dépasse pas 100
}

// Fonction pour déterminer la couleur et le message du score
function getScoreInfo(score) {
    let color;
    let message;

    if (score < 30) {
        color = '#4CAF50'; // Vert (peu de bullshit)
        message = 'Bullshit Score: Low';
    } else if (score < 60) {
        color = '#FFC107'; // Orange (moyen)
        message = 'Bullshit Score: Medium'
    } else {
        color = '#F44336'; // Rouge (beaucoup de bullshit)
        message = 'Bullshit Score: HIGH! 🚩'; // Ajout d'un drapeau pour souligner
    }
    return { color, message };
}

// Fonction pour traiter un post et ajouter le score
function processPost(postElement) {
    // Utiliser un attribut pour marquer les posts traités et éviter les doublons
    if (postElement.dataset.bullshitProcessed) {
        return;
    }

    let postText = '';
    // Cibler le contenu principal du post (peut varier selon les mises à jour de LinkedIn)
    // On cherche un élément de texte large dans le post
    const textElement = postElement.querySelector('div.feed-shared-update-v2__description-wrapper, span.break-words, div.feed-shared-text');

    if (textElement) {
        postText = textElement.innerText;
    } else {
        // Fallback pour les commentaires ou d'autres formats de contenu
        const commentTextElement = postElement.querySelector('div.comments-view__comment-item-content, div.comment-item__content');
        if (commentTextElement) {
            postText = commentTextElement.innerText;
        }
    }

    if (postText.trim() === '') {
        // Si le post n'a pas de texte significatif (ex: juste une image/vidéo sans description), on ne l'évalue pas.
        return;
    }

    const score = calculateBullshitScore(postText);
    const { color, message } = getScoreInfo(score);

    const scoreDisplay = document.createElement('div');
    scoreDisplay.classList.add('bullshit-score-display');
    scoreDisplay.style.cssText = `
        background-color: ${color};
        color: white;
        padding: 4px 8px;
        border-radius: 5px;
        font-size: 12px;
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px; /* Ajout d'une marge pour l'espacement */
        flex-shrink: 0; /* Empêche le score d'être réduit si l'espace est limité */
    `;
    scoreDisplay.innerText = `${message} (${score}/100)`;

    // Trouver l'emplacement cible pour insérer le score
    // On recherche le conteneur des actions sociales qui est souvent stable
    let insertPoint = postElement.querySelector('.feed-shared-social-actions, .comments-view__comment-action-bar');

    // Cibler spécifiquement le bouton d'identité comme vous l'avez demandé
    const identityButton = postElement.querySelector('.social-actions-button.content-admin-identity-toggle-button');

    if (identityButton) {
        // Insérer juste après le bouton d'identité
        if (!identityButton.nextElementSibling?.classList.contains('bullshit-score-display')) {
            identityButton.parentNode.insertBefore(scoreDisplay, identityButton.nextSibling);
            postElement.dataset.bullshitProcessed = true;
        }
    } else if (insertPoint) {
        // Fallback: si le bouton d'identité n'est pas trouvé, insérer au début de la barre d'actions sociales
        if (!insertPoint.querySelector('.bullshit-score-display')) {
            insertPoint.prepend(scoreDisplay);
            postElement.dataset.bullshitProcessed = true;
        }
    } else {
        // Dernier recours: si aucune des cibles n'est trouvée, chercher un endroit dans l'en-tête du post
        const headerElement = postElement.querySelector('.feed-shared-actor__meta, .comments-view__comment-meta');
        if (headerElement && !headerElement.querySelector('.bullshit-score-display')) {
            headerElement.appendChild(scoreDisplay);
            postElement.dataset.bullshitProcessed = true;
        }
    }
}

// Fonction pour observer les changements dans le DOM et détecter de nouveaux posts
function observePosts() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    // Vérifier si le nœud ajouté est un post principal ou un commentaire
                    if (node.nodeType === 1) { // S'assurer que c'est un élément HTML
                        // Sélecteurs plus robustes pour les posts principaux
                        if (node.matches('div[data-urn*="urn:li:activity"], article.feed-shared-update-v2')) {
                            processPost(node);
                        }
                        // Sélecteurs pour les commentaires ou réponses
                        if (node.matches('div.comments-view__comment-item, li.comment-item')) {
                            processPost(node);
                        }
                        // Pour les cas où les éléments de post sont ajoutés comme enfants dans une zone plus grande (ex: défilement)
                        const newPosts = node.querySelectorAll('div[data-urn*="urn:li:activity"], article.feed-shared-update-v2, div.comments-view__comment-item, li.comment-item');
                        newPosts.forEach(post => processPost(post));
                    }
                });
            }
        });
    });

    // Cible le flux d'actualités principal de LinkedIn et d'autres zones où les posts/commentaires peuvent apparaître
    // On observe un élément parent large et stable pour capturer les ajouts
    const feedContainer = document.querySelector('.scaffold-layout__main, main[role="main"]');
    if (feedContainer) {
        observer.observe(feedContainer, { childList: true, subtree: true });
        console.log("MutationObserver initialisé sur le conteneur du fil d'actualité.");
    } else {
        console.warn("Conteneur du fil d'actualité LinkedIn introuvable. Le détecteur de bullshit pourrait ne pas fonctionner sur toutes les pages.");
        // Fallback: observer le corps du document si le conteneur spécifique n'est pas trouvé
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

// Lancer le traitement des posts déjà présents lors du chargement initial
document.querySelectorAll('div[data-urn*="urn:li:activity"], article.feed-shared-update-v2, div.comments-view__comment-item, li.comment-item').forEach(post => processPost(post));

// Lancer l'observation pour les posts qui se chargent dynamiquement
observePosts();