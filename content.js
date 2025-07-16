// Activer ou désactiver le mode débogage (affiche les raisons du score)
const debugMode = true;

// Fonction pour calculer le score de bullshit
function calculateBullshitScore(text) {
  let score = 0;
  const bullshitKeywords = [
    // Mots déjà présents (français et franglais)
    "synergie",
    "catalyseur",
    "optimiser",
    "écosystème",
    "innovation disruptive",
    "valeur ajoutée",
    "transformation digitale",
    "monétiser",
    "roadmap",
    "paradigm shift",
    "best practices",
    "quick win",
    "low hanging fruit",
    "alignement",
    "scalabilité",
    "solution orientée client",
    "proactif",
    "holistique",
    "challenge",
    "opportunité",
    "croissance exponentielle",
    "leadership éclairé",
    "pensée latérale",
    "core business",
    "business review",
    "agile",
    "framework",
    "méthodologie",
    "co-création",
    "empowerment",
    "engager",
    "insight",
    "pivot",
    "visionnaire",
    "win-win",
    "transformation mindset",
    "co-construction",
    "solutionner",
    "créer du lien",
    "gamification",
    "growth hacking",
    "storytelling",
    "mindfulness",
    "wellness",
    "intrapreneurship",
    "reskilling",
    "upskilling",
    "désintermédiation",

    // Nouveaux mots anglais / jargon d'entreprise
    "leverage", // Utiliser (souvent de manière pompeuse)
    "disrupt", // Disrupter, souvent sans réelle nouveauté
    "innovate", // Innover, quand il s'agit juste d'une petite amélioration
    "deep dive", // Plongée en profondeur (pour une simple analyse)
    "granular", // Granulaire (pour parler de détails)
    "bandwidth", // Bande passante (pour la capacité ou le temps)
    "onboarding", // Intégration (d'un nouvel employé, client, etc.)
    "offboarding", // Désintégration (départ)
    "right-sizing", // Redimensionnement (pour des licenciements)
    "streamline", // Rationaliser, simplifier
    "boilerplate", // Texte standardisé, souvent générique
    "thought leader", // Leader d'opinion (souvent autoproclamé)
    "ideation", // Création d'idées (pour un brainstorming)
    "value proposition", // Proposition de valeur
    "client-centric", // Centré sur le client
    "bleeding edge", // Pointe de la technologie (souvent plus risqué que "cutting edge")
    "synergy", // Doublon mais très utilisé en anglais aussi
    "actionable insights", // Informations exploitables (redondant)
    "move the needle", // Faire avancer les choses
    "push the envelope", // Repousser les limites
    "out-of-the-box thinking", // Pensée non-conventionnelle
    "low-hanging fruit", // Doublon mais très utilisé
    "circle back", // Revenir vers quelqu'un
    "touch base", // Prendre contact
    "gain traction", // Gagner du terrain, de l'élan
    "cross-functional", // Transversal
    "pain point", // Point de douleur (pour un problème client)
    "MVP (Minimum Viable Product)", // Produit Minimum Viable (souvent détourné)
    "ROI (Return on Investment)", // Retour sur investissement (souvent brandi sans preuve)
    "KPI (Key Performance Indicator)", // Indicateur clé de performance
    "SME (Subject Matter Expert)", // Expert en la matière
    "pivot", // Doublon mais très utilisé
    "bandwidth", // Doublon mais important
    "empowerment", // Doublon mais important
    "deliverable", // Livrable (souvent utilisé pour n'importe quelle tâche)
    "ecosystem", // Doublon mais important
    "stakeholder", // Partie prenante
    "failing fast", // Échouer rapidement (concept agile parfois abusé)
    "learnings", // Apprentissages (plutôt que leçons ou enseignements)
    "resilience", // Résilience (surtout post-crise)
    "agile transformation", // Transformation agile
    "digital native", // Natif numérique
    "data-driven", // Axé sur les données
    "growth mindset", // Mentalité de croissance
    "purpose-driven", // Axé sur la raison d'être
    "future-proof", // Résistant à l'épreuve du temps
    "hypergrowth", // Hypercroissance
    "scalable solution", // Solution évolutive
    "disruptive innovation", // Doublon mais très utilisé
    "on premise", // Sur site (pour le logiciel)
    "cloud-native", // Conçu pour le cloud
    "thought leadership", // Leadership éclairé, influence
    "synergistic approach", // Approche synergique
    "holistic view", // Vue holistique
    "strategic alignment", // Alignement stratégique
    "core competency", // Compétence clé
    "talent pool", // Bassin de talents
    "skill set", // Ensemble de compétences
    "value chain", // Chaîne de valeur
    "market capitalization", // Capitalisation boursière (parfois pour impressionner)
    "asset-light", // Léger en actifs
    "blue-sky thinking", // Réflexion sans contraintes
    "walk the talk", // Joindre le geste à la parole
    "level up", // Passer au niveau supérieur
    "deep dive into", // Approfondir
    "going forward", // À l'avenir (souvent pour remplacer "à l'avenir")
    "move the needle", // Faire une différence significative
    "net-net", // Au final, en résumé
    "win-win situation", // Situation gagnant-gagnant
    "low hanging fruit", // Solution facile et rapide
    "paradigm shift", // Changement de paradigme
    "best practices", // Meilleures pratiques
    "knowledge sharing", // Partage de connaissances
    "white-glove service", // Service haut de gamme
    "customer journey", // Parcours client
    "user experience (UX)", // Expérience utilisateur (UX) - Le terme en soi n'est pas bullshit, mais l'abus ou l'usage vide de sens l'est.
    "user interface (UI)", // Interface utilisateur (UI)
    "customer relationship management (CRM)", // Gestion de la relation client (CRM)
    "enterprise resource planning (ERP)", // Planification des ressources de l'entreprise (ERP)
    "artificial intelligence (AI)", // Intelligence artificielle (IA) - De même, l'abus ou le marketing creux autour est le problème.
    "machine learning (ML)", // Apprentissage automatique (ML)
    "big data", // Mégadonnées
    "blockchain", // Chaîne de blocs
    "internet of things (IoT)", // Internet des objets (IoT)
    "virtual reality (VR)", // Réalité virtuelle (RV)
    "augmented reality (AR)", // Réalité augmentée (RA)
    "cloud computing", // Informatique en nuage
    "cybersecurity", // Cybersécurité
    "fintech", // Technologies financières
    "edtech", // Technologies éducatives
    "healthtech", // Technologies de la santé
    "sustainability", // Durabilité
    "ESG (Environmental, Social, Governance)", // Environnemental, Social et Gouvernance
    "circular economy", // Économie circulaire
    "greenwashing", // Écoblanchiment
    "corporate social responsibility (CSR)", // Responsabilité sociale des entreprises (RSE)
    "diversity & inclusion (D&I)", // Diversité et inclusion
    "work-life balance", // Équilibre travail-vie personnelle
    "employee engagement", // Engagement des employés
    "talent acquisition", // Acquisition de talents
    "human capital", // Capital humain
    "workforce planning", // Planification des effectifs
    "remote work", // Télétravail
    "hybrid model", // Modèle hybride
    "digital transformation journey", // Parcours de transformation digitale
    "customer-centric approach", // Approche centrée sur le client
    "market segmentation", // Segmentation du marché
    "target audience", // Public cible
    "brand awareness", // Notoriété de la marque
    "lead generation", // Génération de leads
    "conversion rate", // Taux de conversion
    "marketing funnel", // Entonnoir de marketing
    "call to action (CTA)", // Appel à l'action
    "content marketing", // Marketing de contenu
    "search engine optimization (SEO)", // Optimisation pour les moteurs de recherche (SEO)
    "social media marketing", // Marketing des médias sociaux
    "influencer marketing", // Marketing d'influence
    "public relations (PR)", // Relations publiques
    "crisis management", // Gestion de crise
    "reputation management", // Gestion de la réputation
    "stakeholder engagement", // Engagement des parties prenantes
    "supply chain management", // Gestion de la chaîne d'approvisionnement
    "logistics optimization", // Optimisation logistique
    "procurement", // Approvisionnement
    "vendor management", // Gestion des fournisseurs
    "quality assurance (QA)", // Assurance qualité
    "risk mitigation", // Atténuation des risques
    "compliance", // Conformité
    "governance", // Gouvernance
    "due diligence", // Diligence raisonnable
    "mergers & acquisitions (M&A)", // Fusions et acquisitions
    "initial public offering (IPO)", // Introduction en bourse
    "venture capital (VC)", // Capital-risque
    "private equity (PE)", // Capital-investissement
    "seed funding", // Financement d'amorçage
    "angel investor", // Investisseur providentiel
    "term sheet", // Lettre d'intention
    "exit strategy", // Stratégie de sortie
    "valuation", // Évaluation
    "burn rate", // Taux de consommation des liquidités
    "runway", // Durée de vie des fonds restants
    "traction", // Traction (preuve de succès ou d'adoption)
    "unit economics", // Économie unitaire
    "gross margin", // Marge brute
    "net profit", // Bénéfice net
    "EBITDA", // BAIIA (Bénéfice avant intérêts, impôts, dépréciation et amortissement)
    "CAGR (Compound Annual Growth Rate)", // Taux de croissance annuel composé
    "market share", // Part de marché
    "competitive advantage", // Avantage concurrentiel
    "niche market", // Marché de niche
    "blue ocean strategy", // Stratégie de l'océan bleu
    "red ocean strategy", // Stratégie de l'océan rouge
    "SWOT analysis", // Analyse SWOT (Forces, Faiblesses, Opportunités, Menaces)
    "PESTEL analysis", // Analyse PESTEL (Politique, Économique, Sociologique, Technologique, Environnemental, Légal)
    "Porter's Five Forces", // Cinq forces de Porter
    "core competencies", // Compétences clés
    "distinctive capabilities", // Capacités distinctives
    "organizational culture", // Culture organisationnelle
    "corporate values", // Valeurs d'entreprise
    "mission statement", // Énoncé de mission
    "vision statement", // Énoncé de vision
    "strategic goals", // Objectifs stratégiques
    "tactical plan", // Plan tactique
    "operational plan", // Plan opérationnel
    "execution", // Exécution
    "accountability", // Responsabilité
    "transparency", // Transparence
    "integrity", // Intégrité
    "ethics", // Éthique
    "compliance", // Conformité
    "regulatory landscape", // Paysage réglementaire
    "governance model", // Modèle de gouvernance
    "best practice sharing", // Partage des meilleures pratiques
    "knowledge management", // Gestion des connaissances
    "learning organization", // Organisation apprenante
    "change management", // Gestion du changement
    "organizational development", // Développement organisationnel
    "talent management", // Gestion des talents
    "performance management", // Gestion de la performance
    "succession planning", // Planification de la relève
    "coaching", // Coaching
    "mentoring", // Mentorat
    "leadership development", // Développement du leadership
    "team building", // Consolidation d'équipe
    "conflict resolution", // Résolution de conflits
    "negotiation skills", // Compétences de négociation
    "critical thinking", // Pensée critique
    "problem-solving", // Résolution de problèmes
    "decision-making", // Prise de décision
    "emotional intelligence (EQ)", // Intelligence émotionnelle (QE)
    "adaptability", // Adaptabilité
    "creativity", // Créativité
    "innovation", // Innovation
    "design thinking", // Pensée de conception
    "lean startup", // Lean startup
    "scrum", // Scrum (méthodologie agile)
    "kanban", // Kanban (méthodologie agile)
    "sprint", // Sprint (période de travail en agile)
    "backlog", // Backlog (liste de tâches en agile)
    "retrospective", // Rétrospective (réunion agile)
    "daily stand-up", // Stand-up quotidien (réunion agile)
    "user story", // User story (en agile)
    "product owner", // Product owner (en agile)
    "scrum master", // Scrum master (en agile)
    "minimum viable product (MVP)", // Produit minimum viable (MVP)
    "proof of concept (POC)", // Preuve de concept (POC)
    "pilot project", // Projet pilote
    "rollout", // Déploiement
    "post-mortem", // Post-mortem (analyse après projet)
    "lessons learned", // Leçons apprises
    "benchmarking", // Étalonnage
    "best-in-class", // Le meilleur de sa catégorie
    "industry standard", // Norme de l'industrie
    "market leader", // Leader du marché
    "game changer", // Qui change la donne
    "value proposition", // Proposition de valeur
    "unique selling proposition (USP)", // Proposition de vente unique
    "competitive landscape", // Paysage concurrentiel
    "market trends", // Tendances du marché
    "consumer behavior", // Comportement du consommateur
    "demographics", // Démographie
    "psychographics", // Psychographie
    "segmentation, targeting, positioning (STP)", // Segmentation, ciblage, positionnement (STP)
    "marketing mix (4Ps)", // Mix marketing (4P)
    "brand identity", // Identité de marque
    "brand equity", // Capital de marque
    "brand loyalty", // Fidélité à la marque
    "brand awareness", // Notoriété de la marque
    "brand positioning", // Positionnement de la marque
    "brand storytelling", // Storytelling de marque
    "digital marketing", // Marketing numérique
    "social media strategy", // Stratégie de médias sociaux
    "content strategy", // Stratégie de contenu
    "email marketing", // Marketing par e-mail
    "search engine marketing (SEM)", // Marketing pour les moteurs de recherche (SEM)
    "pay-per-click (PPC)", // Paiement par clic (PPC)
    "display advertising", // Publicité display
    "native advertising", // Publicité native
    "programmatic advertising", // Publicité programmatique
    "influencer outreach", // Sollicitation d'influenceurs
    "community management", // Gestion de communauté
    "online reputation management (ORM)", // Gestion de la réputation en ligne
    "web analytics", // Analyse web
    "conversion rate optimization (CRO)", // Optimisation du taux de conversion (CRO)
    "A/B testing", // Test A/B
    "multivariate testing", // Test multivarié
    "funnel optimization", // Optimisation de l'entonnoir
    "customer lifetime value (CLTV)", // Valeur vie client (CLTV)
    "customer acquisition cost (CAC)", // Coût d'acquisition client (CAC)
    "churn rate", // Taux de désabonnement
    "customer satisfaction (CSAT)", // Satisfaction client (CSAT)
    "net promoter score (NPS)", // Net Promoter Score (NPS)
    "customer loyalty", // Fidélité client
    "customer retention", // Rétention client
    "customer experience (CX)", // Expérience client (CX)
    "service level agreement (SLA)", // Accord de niveau de service (SLA)
    "key performance indicators (KPIs)", // Indicateurs clés de performance (KPI)
    "return on investment (ROI)", // Retour sur investissement (ROI)
    "return on ad spend (ROAS)", // Retour sur les dépenses publicitaires (ROAS)
    "cost per acquisition (CPA)", // Coût par acquisition (CPA)
    "cost per click (CPC)", // Coût par clic (CPC)
    "cost per impression (CPM)", // Coût pour mille impressions (CPM)
    "click-through rate (CTR)", // Taux de clics (CTR)
    "bounce rate", // Taux de rebond
    "time on page", // Temps passé sur la page
    "page views", // Vues de page
    "unique visitors", // Visiteurs uniques
    "sessions", // Sessions
    "referral traffic", // Trafic de référence
    "organic traffic", // Trafic organique
    "paid traffic", // Trafic payant
    "direct traffic", // Trafic direct
    "social traffic", // Trafic social
    "email traffic", // Trafic e-mail
    "mobile-first", // Mobile d'abord
    "responsive design", // Conception réactive
    "user-friendly", // Convivial
    "intuitive interface", // Interface intuitive
    "seamless experience", // Expérience fluide
    "frictionless", // Sans friction
    "personalization", // Personnalisation
    "customization", // Personnalisation (en profondeur)
    "scalability", // Évolutivité
    "robust", // Robuste
    "resilient", // Résilient
    "secure", // Sécurisé
    "reliable", // Fiable
    "high-performance", // Haute performance
    "low-latency", // Faible latence
    "distributed system", // Système distribué
    "microservices", // Microservices
    "containerization", // Conteneurisation
    "orchestration", // Orchestration
    "DevOps", // DevOps
    "continuous integration (CI)", // Intégration continue (CI)
    "continuous delivery (CD)", // Livraison continue (CD)
    "automation", // Automatisation
    "scripting", // Scripting
    "monitoring", // Surveillance
    "logging", // Journalisation
    "alerting", // Alertes
    "troubleshooting", // Dépannage
    "root cause analysis (RCA)", // Analyse des causes profondes
    "incident management", // Gestion des incidents
    "problem management", // Gestion des problèmes
    "service desk", // Service desk
    "ITIL", // ITIL (cadre de gestion des services informatiques)
    "agile methodology", // Méthodologie agile
    "lean methodology", // Méthodologie lean
    "waterfall model", // Modèle en cascade
    "project management office (PMO)", // Bureau de gestion de projet (PMO)
    "program management", // Gestion de programme
    "portfolio management", // Gestion de portefeuille
    "risk management", // Gestion des risques
    "issue tracking", // Suivi des problèmes
    "change control", // Contrôle des changements
    "quality control", // Contrôle qualité
    "quality assurance (QA)", // Assurance qualité
    "testing", // Test
    "user acceptance testing (UAT)", // Test d'acceptation utilisateur (UAT)
    "system integration testing (SIT)", // Test d'intégration système (SIT)
    "unit testing", // Test unitaire
    "regression testing", // Test de régression
    "performance testing", // Test de performance
    "security testing", // Test de sécurité
    "load testing", // Test de charge
    "stress testing", // Test de stress
    "usability testing", // Test d'utilisabilité
    "accessibility testing", // Test d'accessibilité
    "test automation", // Automatisation des tests
    "test driven development (TDD)", // Développement piloté par les tests (TDD)
    "behavior driven development (BDD)", // Développement piloté par le comportement (BDD)
    "domain driven design (DDD)", // Conception pilotée par le domaine (DDD)
    "object-oriented programming (OOP)", // Programmation orientée objet (POO)
    "functional programming", // Programmation fonctionnelle
    "micro-frontend", // Micro-frontend
    "serverless", // Sans serveur
    "edge computing", // Informatique en périphérie
    "quantum computing", // Informatique quantique
    "robotics", // Robotique
    "automation", // Automatisation
    "augmented analytics", // Analyse augmentée
    "predictive analytics", // Analyse prédictive
    "prescriptive analytics", // Analyse prescriptive
    "business intelligence (BI)", // Intelligence d'affaires (BI)
    "data warehousing", // Entrepôt de données
    "data lake", // Lac de données
    "data mart", // Magasin de données
    "ETL (Extract, Transform, Load)", // ETL (Extraction, Transformation, Chargement)
    "data governance", // Gouvernance des données
    "data quality", // Qualité des données
    "data security", // Sécurité des données
    "data privacy", // Confidentialité des données
    "GDPR (General Data Protection Regulation)", // RGPD (Règlement général sur la protection des données)
    "CCPA (California Consumer Privacy Act)", // CCPA (Loi californienne sur la protection de la vie privée des consommateurs)
    "HIPAA (Health Insurance Portability and Accountability Act)", // HIPAA (Loi sur la portabilité et la responsabilité de l'assurance maladie)
    "PCI DSS (Payment Card Industry Data Security Standard)", // Norme de sécurité des données de l'industrie des cartes de paiement (PCI DSS)
    "ISO 27001", // ISO 27001 (norme de gestion de la sécurité de l'information)
    "SOC 2", // SOC 2 (rapport d'audit pour les contrôles de service)
    "cloud security", // Sécurité du cloud
    "network security", // Sécurité réseau
    "endpoint security", // Sécurité des terminaux
    "identity and access management (IAM)", // Gestion des identités et des accès (IAM)
    "multi-factor authentication (MFA)", // Authentification multifacteur (MFA)
    "single sign-on (SSO)", // Authentification unique (SSO)
    "encryption", // Chiffrement
    "decryption", // Déchiffrement
    "firewall", // Pare-feu
    "intrusion detection system (IDS)", // Système de détection d'intrusion (IDS)
    "intrusion prevention system (IPS)", // Système de prévention d'intrusion (IPS)
    "security information and event management (SIEM)", // Gestion des informations et des événements de sécurité (SIEM)
    "security operations center (SOC)", // Centre d'opérations de sécurité (SOC)
    "threat intelligence", // Renseignement sur les menaces
    "vulnerability management", // Gestion des vulnérabilités
    "penetration testing", // Test d'intrusion
    "red teaming", // Red teaming
    "blue teaming", // Blue teaming
    "purple teaming", // Purple teaming
    "incident response", // Réponse aux incidents
    "disaster recovery", // Reprise après sinistre
    "business continuity", // Continuité des activités
    "backup and recovery", // Sauvegarde et récupération
    "high availability", // Haute disponibilité
    "load balancing", // Équilibrage de charge
    "failover", // Basculement
    "redundancy", // Redondance
    "scalability", // Évolutivité
    "elasticity", // Élasticité
    "performance tuning", // Optimisation des performances
    "resource utilization", // Utilisation des ressources
    "cost optimization", // Optimisation des coûts
    "vendor lock-in", // Dépendance vis-à-vis d'un fournisseur
    "open source", // Open source
    "proprietary software", // Logiciel propriétaire
    "software as a service (SaaS)", // Logiciel en tant que service (SaaS)
    "platform as a service (PaaS)", // Plateforme en tant que service (PaaS)
    "infrastructure as a service (IaaS)", // Infrastructure en tant que service (IaaS)
    "anything as a service (XaaS)", // Tout en tant que service (XaaS)
    "hybrid cloud", // Cloud hybride
    "multi-cloud", // Multi-cloud
    "public cloud", // Cloud public
    "private cloud", // Cloud privé
    "server room", // Salle des serveurs
    "data center", // Centre de données
    "colocation", // Colocation
    "virtualization", // Virtualisation
    "containerization", // Conteneurisation
    "microservices architecture", // Architecture microservices
    "service mesh", // Maillage de services
    "API (Application Programming Interface)", // Interface de programmation d'applications (API)
    "RESTful API", // API RESTful
    "GraphQL", // GraphQL
    "SOAP", // SOAP
    "webhooks", // Webhooks
    "message queue", // File d'attente de messages
    "event-driven architecture", // Architecture événementielle
    "serverless computing", // Informatique sans serveur
    "function as a service (FaaS)", // Fonction en tant que service (FaaS)
    "edge computing", // Informatique en périphérie
    "fog computing", // Informatique en brouillard
    "quantum computing", // Informatique quantique
    "blockchain technology", // Technologie blockchain
    "distributed ledger technology (DLT)", // Technologie de registre distribué (DLT)
    "cryptocurrency", // Cryptomonnaie
    "NFT (Non-Fungible Token)", // NFT (Jeton non fongible)
    "metaverse", // Métavers
    "web3", // Web3
    "decentralized finance (DeFi)", // Finance décentralisée (DeFi)
    "smart contracts", // Contrats intelligents
    "digital twins", // Jumeaux numériques
    "digital thread", // Fil numérique
    "augmented reality (AR)", // Réalité augmentée (RA)
    "virtual reality (VR)", // Réalité virtuelle (RV)
    "mixed reality (MR)", // Réalité mixte (RM)
    "extended reality (XR)", // Réalité étendue (XR)
    "wearable technology", // Technologie portable
    "smart home", // Maison intelligente
    "smart city", // Ville intelligente
    "autonomous vehicles", // Véhicules autonomes
    "drones", // Drones
    "robotics", // Robotique
    "industrial automation", // Automatisation industrielle
    "cyber-physical systems", // Systèmes cyber-physiques
    "industry 4.0", // Industrie 4.0
    "predictive maintenance", // Maintenance prédictive
    "digital manufacturing", // Fabrication numérique
    "additive manufacturing", // Fabrication additive (impression 3D)
    "generative design", // Conception générative
    "digital twin technology", // Technologie des jumeaux numériques
    "virtual commissioning", // Mise en service virtuelle
    "simulations", // Simulations
    "modeling", // Modélisation
    "optimization", // Optimisation
    "algorithmic trading", // Trading algorithmique
    "high-frequency trading (HFT)", // Trading à haute fréquence (HFT)
    "robo-advisors", // Robo-conseillers
    "insurtech", // Technologies de l'assurance
    "regtech", // Technologies réglementaires
    "suptech", // Technologies de supervision
    "legaltech", // Technologies juridiques
    "proptech", // Technologies immobilières
    "agritech", // Technologies agricoles
    "foodtech", // Technologies alimentaires
    "cleantech", // Technologies propres
    "greentech", // Technologies vertes
    "biotech", // Biotechnologie
    "medtech", // Technologies médicales
    "healthtech", // Technologies de la santé
    "femtech", // Technologies pour la santé des femmes
    "sportstech", // Technologies du sport
    "traveltech", // Technologies du voyage
    "retailtech", // Technologies du commerce de détail
    "martech", // Technologies du marketing
    "adtech", // Technologies de la publicité
    "salestech", // Technologies de la vente
    "HRtech", // Technologies des ressources humaines
    "edtech", // Technologies éducatives
    "govtech", // Technologies gouvernementales
    "civic tech", // Technologies civiques
    "smart contracts", // Contrats intelligents
    "tokenization", // Tokenisation
    "distributed autonomous organization (DAO)", // Organisation autonome décentralisée (DAO)
    "non-fungible token (NFT)", // Jeton non fongible (NFT)
    "digital asset", // Actif numérique
    "cryptoeconomics", // Cryptoéconomie
    "staking", // Staking
    "yield farming", // Yield farming
    "liquidity mining", // Minage de liquidité
    "gas fees", // Frais de gaz
    "web3.0", // Web3.0
    "dApp (decentralized application)", // Application décentralisée (dApp)
    "DAO (Decentralized Autonomous Organization)", // Organisation autonome décentralisée (DAO)
    "DID (Decentralized Identity)", // Identité décentralisée (DID)
    "zero-knowledge proof", // Preuve à divulgation nulle de connaissance
    "sharding", // Sharding
    "layer 2 solution", // Solution de couche 2
    "sidechain", // Sidechain
    "oracle", // Oracle
    "consensus mechanism", // Mécanisme de consensus
    "proof of work (PoW)", // Preuve de travail (PoW)
    "proof of stake (PoS)", // Preuve d'enjeu (PoS)
    "decentralization", // Décentralisation
    "interoperability", // Interopérabilité
    "scalability trilemma", // Trilemme de la scalabilité
    "network effect", // Effet de réseau
    "platform economy", // Économie de plateforme
    "gig economy", // Économie des petits boulots
    "creator economy", // Économie des créateurs
    "subscription economy", // Économie de l'abonnement
    "shared economy", // Économie du partage
    "on-demand economy", // Économie à la demande
    "circular economy", // Économie circulaire
    "green economy", // Économie verte
    "blue economy", // Économie bleue
    "impact investing", // Investissement à impact
    "social enterprise", // Entreprise sociale
    "B Corp", // B Corp
    "fair trade", // Commerce équitable
    "sustainable development goals (SDGs)", // Objectifs de développement durable (ODD)
    "net zero", // Zéro émission nette
    "carbon footprint", // Empreinte carbone
    "renewable energy", // Énergie renouvelable
    "climate change mitigation", // Atténuation du changement climatique
    "climate change adaptation", // Adaptation au changement climatique
    "circularity", // Circularité
    "regenerative agriculture", // Agriculture régénératrice
    "eco-friendly", // Respectueux de l'environnement
    "biodegradable", // Biodégradable
    "compostable", // Compostable
    "upcycling", // Surcyclage
    "downcycling", // Sous-cyclage
    "carbon offsetting", // Compensation carbone
    "carbon capture", // Capture de carbone
    "carbon neutral", // Neutre en carbone
    "climate positive", // Climatiquement positif
    "green bonds", // Obligations vertes
    "ESG investing", // Investissement ESG
    "social impact", // Impact social
    "environmental impact", // Impact environnemental
    "governance metrics", // Métriques de gouvernance
    "stakeholder capitalism", // Capitalisme des parties prenantes
    "conscious capitalism", // Capitalisme conscient
    "value-based leadership", // Leadership basé sur les valeurs
    "ethical AI", // IA éthique
    "responsible AI", // IA responsable
    "AI ethics", // Éthique de l'IA
    "data ethics", // Éthique des données
    "privacy by design", // Confidentialité dès la conception
    "security by design", // Sécurité dès la conception
    "trust by design", // Confiance dès la conception
    "digital ethics", // Éthique numérique
    "algorithmic bias", // Biais algorithmique
    "explainable AI (XAI)", // IA explicable (XAI)
    "human-centered AI", // IA centrée sur l'humain
    "fairness in AI", // Équité en IA
    "transparency in AI", // Transparence en IA
    "accountability in AI", // Responsabilité en IA
    "AI governance", // Gouvernance de l'IA
    "AI regulation", // Réglementation de l'IA
    "data sovereignty", // Souveraineté des données
    "data localization", // Localisation des données
    "digital divide", // Fracture numérique
    "digital inclusion", // Inclusion numérique
    "digital literacy", // Littératie numérique
    "digital citizenship", // Citoyenneté numérique
    "digital rights", // Droits numériques
    "net neutrality", // Neutralité du net
    "open internet", // Internet ouvert
    "digital public goods", // Biens publics numériques
    "digital transformation initiatives", // Initiatives de transformation numérique
    "digital maturity", // Maturité numérique
    "digital readiness", // Préparation numérique
    "digital strategy", // Stratégie numérique
    "digital roadmap", // Feuille de route numérique
    "digital capabilities", // Capacités numériques
    "digital talent", // Talent numérique
    "digital culture", // Culture numérique
    "digital mindset", // Mentalité numérique
    "digital leadership", // Leadership numérique
    "digital native organizations", // Organisations natives numériques
    "digital ecosystem", // Écosystème numérique
    "digital platform", // Plateforme numérique
    "digital products", // Produits numériques
    "digital services", // Services numériques
    "digital solutions", // Solutions numériques
    "digital experiences", // Expériences numériques
    "digital journeys", // Parcours numériques
    "digital channels", // Canaux numériques
    "digital marketing", // Marketing numérique
    "digital sales", // Ventes numériques
    "digital customer service", // Service client numérique
    "digital operations", // Opérations numériques
    "digital supply chain", // Chaîne d'approvisionnement numérique
    "digital finance", // Finance numérique
    "digital HR", // RH numériques
    "digital security", // Sécurité numérique
    "digital governance", // Gouvernance numérique
    "digital ethics", // Éthique numérique
    "digital trust", // Confiance numérique
    "digital resilience", // Résilience numérique
    "digital sovereignty", // Souveraineté numérique
    "digital transformation consulting", // Conseil en transformation numérique
    "digital transformation partner", // Partenaire de transformation numérique
    "digital transformation vendor", // Fournisseur de transformation numérique
    "digital transformation framework", // Cadre de transformation numérique
    "digital transformation roadmap", // Feuille de route de transformation numérique
    "digital transformation strategy", // Stratégie de transformation numérique
    "digital transformation journey", // Parcours de transformation numérique
    "digital transformation initiatives", // Initiatives de transformation numérique
    "digital transformation office (DTO)", // Bureau de transformation numérique (DTO)
    "chief digital officer (CDO)", // Directeur numérique (CDO)
    "chief innovation officer (CINO)", // Directeur de l'innovation (CINO)
    "chief transformation officer (CTO)", // Directeur de la transformation (CTO)
    "chief data officer (CDO)", // Directeur des données (CDO)
    "chief AI officer (CAIO)", // Directeur de l'IA (CAIO)
    "chief privacy officer (CPO)", // Directeur de la confidentialité (CPO)
    "chief security officer (CSO)", // Directeur de la sécurité (CSO)
    "chief compliance officer (CCO)", // Directeur de la conformité (CCO)
    "chief risk officer (CRO)", // Directeur des risques (CRO)
    "chief sustainability officer (CSO)", // Directeur du développement durable (CSO)
    "chief diversity officer (CDO)", // Directeur de la diversité (CDO)
    "chief people officer (CPO)", // Directeur des personnes (CPO)
    "chief experience officer (CXO)", // Directeur de l'expérience (CXO)
    "chief marketing officer (CMO)", // Directeur marketing (CMO)
    "chief sales officer (CSO)", // Directeur des ventes (CSO)
    "chief customer officer (CCO)", // Directeur client (CCO)
    "chief operating officer (COO)", // Directeur des opérations (COO)
    "chief financial officer (CFO)", // Directeur financier (CFO)
    "chief legal officer (CLO)", // Directeur juridique (CLO)
    "chief human resources officer (CHRO)", // Directeur des ressources humaines (DRH)
    "chief information officer (CIO)", // Directeur des systèmes d'information (DSI)
    "chief technology officer (CTO)", // Directeur technique (CTO)
    "chief product officer (CPO)", // Directeur produit (CPO)
    "chief growth officer (CGO)", // Directeur de la croissance (CGO)
    "chief strategy officer (CSO)", // Directeur de la stratégie (CSO)
    "chief of staff (COS)", // Chef de cabinet (COS)
    "board of directors", // Conseil d'administration
    "executive committee", // Comité exécutif
    "management team", // Équipe de direction
    "advisory board", // Conseil consultatif
    "stakeholder engagement", // Engagement des parties prenantes
    "shareholder value", // Valeur actionnariale
    "corporate governance", // Gouvernance d'entreprise
    "ESG reporting", // Rapports ESG
    "sustainability report", // Rapport de développement durable
    "annual report", // Rapport annuel
    "quarterly earnings", // Résultats trimestriels
    "investor relations", // Relations avec les investisseurs
    "public relations", // Relations publiques
    "media relations", // Relations avec les médias
    "analyst relations", // Relations avec les analystes
    "government relations", // Relations gouvernementales
    "lobbying", // Lobbying
    "corporate communications", // Communications d'entreprise
    "internal communications", // Communications internes
    "external communications", // Communications externes
    "crisis communications", // Communications de crise
    "change communications", // Communications de changement
    "employee communications", // Communications aux employés
    "employer branding", // Marque employeur
    "recruitment marketing", // Marketing de recrutement
    "candidate experience", // Expérience candidat
    "talent acquisition strategy", // Stratégie d'acquisition de talents
    "talent pipeline", // Réservoir de talents
    "recruitment funnel", // Entonnoir de recrutement
    "onboarding experience", // Expérience d'intégration
    "employee development", // Développement des employés
    "learning and development (L&D)", // Apprentissage et développement (L&D)
    "training programs", // Programmes de formation
    "skill gaps", // Lacunes en compétences
    "reskilling initiatives", // Initiatives de reconversion
    "upskilling programs", // Programmes de perfectionnement
    "career pathing", // Parcours de carrière
    "mentorship programs", // Programmes de mentorat
    "coaching culture", // Culture de coaching
    "performance reviews", // Évaluations de performance
    "feedback loops", // Boucles de rétroaction
    "360-degree feedback", // Rétroaction à 360 degrés
    "employee engagement surveys", // Enquêtes d'engagement des employés
    "employee recognition", // Reconnaissance des employés
    "employee wellbeing", // Bien-être des employés
    "mental health support", // Soutien à la santé mentale
    "diversity, equity, and inclusion (DEI)", // Diversité, équité et inclusion (DEI)
    "belonging", // Appartenance
    "inclusive culture", // Culture inclusive
    "unconscious bias", // Biais inconscient
    "microaggressions", // Microagressions
    "allyship", // Alliance
    "employee resource groups (ERGs)", // Groupes de ressources pour employés (ERG)
    "flexible work arrangements", // Modalités de travail flexibles
    "remote-first", // Télétravail d'abord
    "hybrid work model", // Modèle de travail hybride
    "digital workspace", // Espace de travail numérique
    "collaboration tools", // Outils de collaboration
    "virtual team", // Équipe virtuelle
    "distributed workforce", // Main-d'œuvre distribuée
    "future of work", // Avenir du travail
    "workplace transformation", // Transformation du lieu de travail
    "employee experience (EX)", // Expérience employé (EX)
    "human-centered design", // Conception centrée sur l'humain
    "design thinking workshops", // Ateliers de design thinking
    "innovation labs", // Laboratoires d'innovation
    "intrapreneurship programs", // Programmes d'intrapreneuriat
    "startup culture", // Culture startup
    "lean methodology", // Méthodologie lean
    "agile development", // Développement agile
    "scrum master", // Scrum Master
    "product owner", // Product Owner
    "daily stand-up", // Stand-up quotidien
    "sprint review", // Revue de sprint
    "sprint retrospective", // Rétrospective de sprint
    "product backlog", // Backlog produit
    "sprint backlog", // Backlog de sprint
    "user stories", // User stories
    "epics", // Épopées
    "themes", // Thèmes
    "roadmap planning", // Planification de la feuille de route
    "release planning", // Planification de la release
    "continuous integration", // Intégration continue
    "continuous delivery", // Livraison continue
    "DevOps pipeline", // Pipeline DevOps
    "automated testing", // Tests automatisés
    "test-driven development (TDD)", // Développement piloté par les tests (TDD)
    "behavior-driven development (BDD)", // Développement piloté par le comportement (BDD)
    "domain-driven design (DDD)", // Conception pilotée par le domaine (DDD)
    "microservices architecture", // Architecture microservices
    "container orchestration", // Orchestration de conteneurs
    "serverless computing", // Informatique sans serveur
    "event-driven architecture", // Architecture événementielle
    "API economy", // Économie des API
    "platform as a service (PaaS)", // Plateforme en tant que service (PaaS)
    "infrastructure as a service (IaaS)", // Infrastructure en tant que service (IaaS)
    "software as a service (SaaS)", // Logiciel en tant que service (SaaS)
    "cloud migration", // Migration vers le cloud
    "cloud optimization", // Optimisation du cloud
    "cloud security", // Sécurité du cloud
    "data governance", // Gouvernance des données
    "data quality", // Qualité des données
    "data lineage", // Lignage des données
    "master data management (MDM)", // Gestion des données de référence (MDM)
    "data warehousing", // Entrepôt de données
    "data lake", // Lac de données
    "data mesh", // Maillage de données
    "data fabric", // Tissu de données
    "business intelligence (BI)", // Intelligence d'affaires (BI)
    "data analytics", // Analyse de données
    "machine learning operations (MLOps)", // Opérations d'apprentissage automatique (MLOps)
    "model governance", // Gouvernance des modèles
    "model interpretability", // Interprétabilité des modèles
    "ethical AI principles", // Principes d'IA éthique
    "responsible AI frameworks", // Cadres d'IA responsable
    "AI governance strategy", // Stratégie de gouvernance de l'IA
    "AI risk management", // Gestion des risques liés à l'IA
    "AI compliance", // Conformité à l'IA
    "regulatory sandbox", // Bac à sable réglementaire
    "proof of concept (POC)", // Preuve de concept (POC)
    "minimum viable product (MVP)", // Produit minimum viable (MVP)
    "pilot program", // Programme pilote
    "scaling up", // Mise à l'échelle
    "go-to-market strategy", // Stratégie de commercialisation
    "product launch", // Lancement de produit
    "market penetration", // Pénétration du marché
    "market expansion", // Expansion du marché
    "diversification strategy", // Stratégie de diversification
    "competitive intelligence", // Renseignement concurrentiel
    "market research", // Étude de marché
    "consumer insights", // Connaissances des consommateurs
    "brand equity", // Capital de marque
    "brand loyalty", // Fidélité à la marque
    "customer advocacy", // Plaidoyer client
    "net promoter score (NPS)", // Net Promoter Score (NPS)
    "customer lifetime value (CLTV)", // Valeur vie client (CLTV)
    "customer acquisition cost (CAC)", // Coût d'acquisition client (CAC)
    "churn rate", // Taux de désabonnement
    "retention rate", // Taux de rétention
    "customer satisfaction (CSAT)", // Satisfaction client (CSAT)
    "customer effort score (CES)", // Score d'effort client (CES)
    "voice of the customer (VoC)", // Voix du client (VoC)
    "omnichannel experience", // Expérience omnicanal
    "seamless customer journey", // Parcours client fluide
    "frictionless experience", // Expérience sans friction
    "personalized experience", // Expérience personnalisée
    "customer-centric culture", // Culture centrée sur le client
    "service design", // Conception de services
    "user experience (UX) design", // Conception d'expérience utilisateur (UX)
    "user interface (UI) design", // Conception d'interface utilisateur (UI)
    "design system", // Système de conception
    "component library", // Bibliothèque de composants
    "style guide", // Guide de style
    "brand guidelines", // Directives de marque
    "visual identity", // Identité visuelle
    "tone of voice", // Ton de voix
    "messaging framework", // Cadre de messagerie
    "storytelling", // Storytelling
    "narrative", // Récit
    "brand purpose", // Raison d'être de la marque
    "corporate social responsibility (CSR)", // Responsabilité sociale des entreprises (RSE)
    "environmental, social, and governance (ESG)", // Environnemental, social et gouvernance (ESG)
    "sustainability initiatives", // Initiatives de développement durable
    "green initiatives", // Initiatives vertes
    "circular economy principles", // Principes de l'économie circulaire
    "waste reduction", // Réduction des déchets
    "resource efficiency", // Efficacité des ressources
    "renewable energy adoption", // Adoption des énergies renouvelables
    "carbon footprint reduction", // Réduction de l'empreinte carbone
    "ethical sourcing", // Approvisionnement éthique
    "fair labor practices", // Pratiques de travail équitables
    "community engagement", // Engagement communautaire
    "philanthropy", // Philanthropie
    "volunteer programs", // Programmes de bénévolat
    "social impact assessment", // Évaluation de l'impact social
    "environmental impact assessment", // Évaluation de l'impact environnemental
    "materiality assessment", // Évaluation de la matérialité
    "stakeholder dialogue", // Dialogue avec les parties prenantes
    "integrated reporting", // Rapports intégrés
    "sustainable finance", // Finance durable
    "green bonds", // Obligations vertes
    "social bonds", // Obligations sociales
    "sustainability-linked loans", // Prêts liés à la durabilité
    "impact investing funds", // Fonds d'investissement à impact
    "ESG ratings", // Notes ESG
    "carbon credits", // Crédits carbone
    "emission trading schemes", // Systèmes d'échange de quotas d'émission
    "climate resilience", // Résilience climatique
    "nature-based solutions", // Solutions basées sur la nature
    "biodiversity conservation", // Conservation de la biodiversité
    "eco-design", // Éco-conception
    "life cycle assessment (LCA)", // Analyse du cycle de vie (ACV)
    "cradle-to-cradle", // Du berceau au berceau
    "net positive", // Net positif
    "regenerative business", // Entreprise régénératrice
    "conscious consumption", // Consommation consciente
    "ethical consumerism", // Consommation éthique
    "mindful living", // Vie en pleine conscience
    "wellness programs", // Programmes de bien-être
    "employee assistance programs (EAP)", // Programmes d'aide aux employés (PAE)
    "mental well-being", // Bien-être mental
    "burnout prevention", // Prévention de l'épuisement professionnel
    "stress management", // Gestion du stress
    "resilience training", // Formation à la résilience
    "mindfulness at work", // Pleine conscience au travail
    "emotional intelligence (EQ)", // Intelligence émotionnelle (QE)
    "empathy in leadership", // Empathie dans le leadership
    "psychological safety", // Sécurité psychologique
    "inclusive leadership", // Leadership inclusif
    "servant leadership", // Leadership de serviteur
    "authentic leadership", // Leadership authentique
    "transformational leadership", // Leadership transformationnel
    "situational leadership", // Leadership situationnel
    "adaptive leadership", // Leadership adaptatif
    "growth mindset culture", // Culture de la mentalité de croissance
    "learning culture", // Culture d'apprentissage
    "innovation culture", // Culture de l'innovation
    "performance culture", // Culture de la performance
    "accountability culture", // Culture de la responsabilité
    "transparency culture", // Culture de la transparence
    "feedback culture", // Culture du feedback
    "recognition culture", // Culture de la reconnaissance
    "employee experience culture", // Culture de l'expérience employé
    "customer experience culture", // Culture de l'expérience client
    "purpose-driven culture", // Culture axée sur la raison d'être
    "values-driven culture", // Culture axée sur les valeurs
    "agile culture", // Culture agile
    "DevOps culture", // Culture DevOps
    "lean culture", // Culture lean
    "startup culture", // Culture startup
    "corporate culture", // Culture d'entreprise
    "organizational culture assessment", // Évaluation de la culture organisationnelle
    "culture change management", // Gestion du changement culturel
    "cultural transformation", // Transformation culturelle
    "culture by design", // Culture par conception
    "culture eats strategy for breakfast", // La culture mange la stratégie au petit-déjeuner
    "walk the talk", // Joindre le geste à la parole
    "lead by example", // Montrer l'exemple
    "inspire and empower", // Inspirer et autonomiser
    "foster collaboration", // Favoriser la collaboration
    "build trust", // Bâtir la confiance
    "drive engagement", // Stimuler l'engagement
    "cultivate talent", // Cultiver les talents
    "nurture innovation", // Favoriser l'innovation
    "embrace change", // Accepter le changement
    "disrupt the status quo", // Bouleverser le statu quo
    "think big", // Voir grand
    "dream big", // Rêver grand
    "aim high", // Viser haut
    "reach for the stars", // Atteindre les étoiles
    "push the boundaries", // Repousser les limites
    "break new ground", // Innover, défricher
    "pioneer the future", // Pionnier de l'avenir
    "shape the future", // Façonner l'avenir
    "future-proof your business", // Pérenniser votre entreprise
    "stay ahead of the curve", // Garder une longueur d'avance
    "be a game-changer", // Changer la donne
    "make an impact", // Avoir un impact
    "drive value", // Créer de la valeur
    "unlock potential", // Libérer le potentiel
    "maximize ROI", // Maximiser le retour sur investissement
    "optimize performance", // Optimiser les performances
    "streamline processes", // Rationaliser les processus
    "enhance efficiency", // Améliorer l'efficacité
    "boost productivity", // Stimuler la productivité
    "reduce costs", // Réduire les coûts
    "mitigate risks", // Atténuer les risques
    "ensure compliance", // Assurer la conformité
    "achieve excellence", // Atteindre l'excellence
    "deliver results", // Produire des résultats
    "drive growth", // Stimuler la croissance
    "accelerate progress", // Accélérer les progrès
    "scale rapidly", // Développer rapidement
    "expand globally", // Étendre à l'échelle mondiale
    "dominate the market", // Dominer le marché
    "be a market leader", // Être un leader du marché
    "set the standard", // Établir la norme
    "define the future", // Définir l'avenir
    "reimagine everything", // Réimaginer tout
    "disrupt the industry", // Disrupter l'industrie
    "revolutionize the space", // Révolutionner le domaine
    "transform the landscape", // Transformer le paysage
    "shape the narrative", // Façonner le récit
    "tell your story", // Racontez votre histoire
    "build your brand", // Construire votre marque
    "create a legacy", // Créer un héritage
    "leave a mark", // Laisser une marque
    "make a difference", // Faire une différence
    "add value", // Ajouter de la valeur
    "drive success", // Conduire au succès
    "foster innovation", // Favoriser l'innovation
    "empower your team", // Autonomiser votre équipe
    "cultivate talent", // Cultiver les talents
    "build a winning culture", // Construire une culture gagnante
    "prioritize well-being", // Prioriser le bien-être
    "champion diversity", // Défendre la diversité
    "promote inclusion", // Promouvoir l'inclusion
    "embrace sustainability", // Adopter la durabilité
    "act ethically", // Agir de manière éthique
    "lead with integrity", // Diriger avec intégrité
    "be authentic", // Être authentique
    "foster trust", // Favoriser la confiance
    "drive transparency", // Favoriser la transparence
    "ensure accountability", // Assurer la responsabilité
    "be agile", // Être agile
    "be resilient", // Être résilient
    "adapt and evolve", // S'adapter et évoluer
    "continuous learning", // Apprentissage continu
    "lifelong learning", // Apprentissage tout au long de la vie
    "upskill and reskill", // Perfectionner et reconvertir
    "embrace change", // Accepter le changement
    "navigate uncertainty", // Naviguer dans l'incertitude
    "thrive in ambiguity", // Prospérer dans l'ambiguïté
    "build bridges", // Construire des ponts
    "foster collaboration", // Favoriser la collaboration
    "cross-functional synergy", // Synergie transversale
    "break down silos", // Abattre les silos
    "co-create value", // Co-créer de la valeur
    "leverage collective intelligence", // Tirer parti de l'intelligence collective
    "drive stakeholder engagement", // Stimuler l'engagement des parties prenantes
    "deliver exceptional results", // Fournir des résultats exceptionnels
    "exceed expectations", // Dépasser les attentes
    "go above and beyond", // Se surpasser
    "strive for excellence", // Viser l'excellence
    "be a trusted advisor", // Être un conseiller de confiance
    "provide strategic guidance", // Fournir des conseils stratégiques
    "offer actionable insights", // Offrir des informations exploitables
    "drive informed decisions", // Conduire à des décisions éclairées
    "be data-driven", // Être axé sur les données
    "leverage analytics", // Tirer parti de l'analyse
    "gain competitive advantage", // Obtenir un avantage concurrentiel
    "capture market share", // Capturer des parts de marché
    "unlock new opportunities", // Débloquer de nouvelles opportunités
    "explore uncharted territory", // Explorer un territoire inexploré
    "push boundaries", // Repousser les limites
    "challenge the norm", // Remettre en question la norme
    "think outside the box", // Sortir des sentiers battus
    "foster a culture of innovation", // Favoriser une culture de l'innovation
    "embrace disruption", // Embrasser la disruption
    "drive transformation", // Conduire la transformation
    "lead the way", // Montrer la voie
    "pave the path", // Ouvrir la voie
    "set the trend", // Lancer la tendance
    "be a thought leader", // Être un leader d'opinion
    "share your wisdom", // Partager votre sagesse
    "inspire others", // Inspirer les autres
    "make a positive impact", // Avoir un impact positif
    "contribute to the greater good", // Contribuer au bien commun
    "build a better future", // Construire un avenir meilleur
    "leave a positive legacy", // Laisser un héritage positif
    "be a force for good", // Être une force pour le bien
    "drive positive change", // Conduire un changement positif
    "transform lives", // Transformer des vies
    "shape destinies", // Façonner des destins
    "unleash potential", // Libérer le potentiel
    "empower individuals", // Autonomiser les individus
    "build stronger communities", // Bâtir des communautés plus fortes
    "foster global collaboration", // Favoriser la collaboration mondiale
    "address grand challenges", // Relever de grands défis
    "solve complex problems", // Résoudre des problèmes complexes
    "create shared value", // Créer de la valeur partagée
    "drive collective impact", // Conduire un impact collectif
    "be a catalyst for change", // Être un catalyseur de changement
    "foster a culture of innovation", // Favoriser une culture de l'innovation
    "embrace the future", // Embrasser l'avenir
    "navigate the complexities", // Naviguer dans les complexités
    "thrive in uncertainty", // Prospérer dans l'incertitude
    "build resilience", // Renforcer la résilience
    "foster adaptability", // Favoriser l'adaptabilité
    "drive continuous improvement", // Favoriser l'amélioration continue
    "optimize for impact", // Optimiser pour l'impact
    "maximize reach", // Maximiser la portée
    "amplify your message", // Amplifier votre message
    "ignite conversations", // Animer les conversations
    "spark engagement", // Susciter l'engagement
    "build meaningful connections", // Créer des liens significatifs
    "foster authentic relationships", // Favoriser des relations authentiques
    "cultivate your network", // Cultiver votre réseau
    "expand your influence", // Développer votre influence
    "position yourself as an expert", // Vous positionner comme un expert
    "build your personal brand", // Construire votre marque personnelle
    "showcase your expertise", // Mettre en valeur votre expertise
    "share your insights", // Partager vos idées
    "educate and inform", // Éduquer et informer
    "inspire action", // Inspirer l'action
    "drive change", // Conduire le changement
    "make a difference", // Faire une différence
    "leave your mark", // Laisser votre marque
    "contribute to the dialogue", // Contribuer au dialogue
    "shape the conversation", // Façonner la conversation
    "be a voice for good", // Être une voix pour le bien
    "champion causes", // Défendre des causes
    "advocate for change", // Plaider pour le changement
    "mobilize action", // Mobiliser l'action
    "drive collective impact", // Conduire un impact collectif
    "build a movement", // Construire un mouvement
    "inspire a generation", // Inspirer une génération
    "shape the future", // Façonner l'avenir
    "create a better world", // Créer un monde meilleur
    "be the change", // Être le changement
    "lead with purpose", // Diriger avec un but
    "live your values", // Vivre vos valeurs
    "act with integrity", // Agir avec intégrité
    "foster trust", // Favoriser la confiance
    "build strong relationships", // Construire des relations solides
    "drive collaboration", // Favoriser la collaboration
    "empower others", // Autonomiser les autres
    "foster growth", // Favoriser la croissance
    "nurture innovation", // Favoriser l'innovation
    "embrace challenges", // Relever les défis
    "seize opportunities", // Saisir les opportunités
    "deliver excellence", // Offrir l'excellence
    "achieve success", // Atteindre le succès
    "make a lasting impact", // Faire un impact durable
    "leave a legacy", // Laisser un héritage
    "be remembered for good", // Être rappelé pour le bien
    "create a positive ripple effect", // Créer un effet d'entraînement positif
    "inspire future generations", // Inspirer les générations futures
    "shape the course of history", // Façonner le cours de l'histoire
    "leave the world a better place", // Laisser un monde meilleur
    "be a force for good", // Être une force pour le bien
    "drive positive change", // Conduire un changement positif
    "transform lives", // Transformer des vies
    "shape destinies", // Façonner des destins
    "unleash human potential", // Libérer le potentiel humain
    "build thriving communities", // Bâtir des communautés florissantes
    "foster global prosperity", // Favoriser la prospérité mondiale
    "address humanity's grand challenges", // Relever les grands défis de l'humanité
    "solve complex global problems", // Résoudre des problèmes mondiaux complexes
    "create shared value for all", // Créer de la valeur partagée pour tous
    "drive collective impact for a sustainable future", // Conduire un impact collectif pour un avenir durable
    "be a catalyst for positive global transformation", // Être un catalyseur de transformation mondiale positive
    "foster a culture of continuous innovation and adaptation", // Favoriser une culture d'innovation et d'adaptation continues
    "embrace the opportunities of the future with courage and vision", // Embrasser les opportunités de l'avenir avec courage et vision
    "navigate the complexities of the modern world with wisdom and integrity", // Naviguer dans les complexités du monde moderne avec sagesse et intégrité
    "thrive amidst uncertainty by building resilience and fostering agility", // Prospérer au milieu de l'incertitude en renforçant la résilience et en favorisant l'agilité
    "build bridges of understanding and collaboration across divides", // Construire des ponts de compréhension et de collaboration au-delà des divisions
    "foster a global community of shared purpose and collective action", // Favoriser une communauté mondiale de but partagé et d'action collective
    "drive sustainable development and inclusive growth for all", // Favoriser le développement durable et la croissance inclusive pour tous
    "lead with empathy, compassion, and a commitment to human flourishing", // Diriger avec empathie, compassion et un engagement envers l'épanouissement humain
    "inspire hope and empower individuals to realize their full potential", // Inspirer l'espoir et autonomiser les individus à réaliser leur plein potentiel
    "shape a future where all can thrive in peace and prosperity", // Façonner un avenir où tous peuvent prospérer dans la paix et la prospérité
    "leave a legacy of positive change and lasting impact for generations to come", // Laisser un héritage de changement positif et d'impact durable pour les générations futures
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
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojiMatches = text.match(emojiRegex);
  if (emojiMatches && emojiMatches.length > 5) {
    // Plus de 5 emojis
    score += emojiMatches.length * 2;
  }

  // Répétition de mots ou phrases simples (peut indiquer un contenu creux)
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);
  const wordCounts = {};
  words.forEach((word) => {
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  });
  for (const word in wordCounts) {
    if (wordCounts[word] > 3) {
      // Si un mot est répété plus de 3 fois
      score += (wordCounts[word] - 3) * 5;
    }
  }

  // Détection de phrases génériques ou "creuses"
  const genericPhrases = [
    "hâte de voir vos commentaires",
    "qu'en pensez-vous",
    "n'hésitez pas à partager",
    "je suis ravi de partager",
    "une pensée pour",
    "un grand merci à",
    "continuons la conversation",
    "ensemble nous pouvons",
    "découvrez comment",
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
    color = "#4CAF50"; // Vert (peu de bullshit)
    message = "Bullshit Score: Low";
  } else if (score < 60) {
    color = "#FFC107"; // Orange (moyen)
    message = "Bullshit Score: Medium";
  } else {
    color = "#F44336"; // Rouge (beaucoup de bullshit)
    message = "Bullshit Score: HIGH! 🚩"; // Ajout d'un drapeau pour souligner
  }
  return { color, message };
}

// Fonction pour traiter un post et ajouter le score
function processPost(postElement) {
  // Utiliser un attribut pour marquer les posts traités et éviter les doublons
  if (postElement.dataset.bullshitProcessed) {
    return;
  }

  let postText = "";
  // Cibler le contenu principal du post (peut varier selon les mises à jour de LinkedIn)
  // On cherche un élément de texte large dans le post
  const textElement = postElement.querySelector(
    "div.feed-shared-update-v2__description-wrapper, span.break-words, div.feed-shared-text"
  );

  if (textElement) {
    postText = textElement.innerText;
  } else {
    // Fallback pour les commentaires ou d'autres formats de contenu
    const commentTextElement = postElement.querySelector(
      "div.comments-view__comment-item-content, div.comment-item__content"
    );
    if (commentTextElement) {
      postText = commentTextElement.innerText;
    }
  }

  if (postText.trim() === "") {
    // Si le post n'a pas de texte significatif (ex: juste une image/vidéo sans description), on ne l'évalue pas.
    return;
  }

  const score = calculateBullshitScore(postText);
  const { color, message } = getScoreInfo(score);

  const scoreDisplay = document.createElement("div");
  scoreDisplay.classList.add("bullshit-score-display");
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
  let insertPoint = postElement.querySelector(
    ".feed-shared-social-actions, .comments-view__comment-action-bar"
  );

  // Cibler spécifiquement le bouton d'identité comme vous l'avez demandé
  const identityButton = postElement.querySelector(
    ".social-actions-button.content-admin-identity-toggle-button"
  );

  if (identityButton) {
    // Insérer juste après le bouton d'identité
    if (
      !identityButton.nextElementSibling?.classList.contains(
        "bullshit-score-display"
      )
    ) {
      identityButton.parentNode.insertBefore(
        scoreDisplay,
        identityButton.nextSibling
      );
      postElement.dataset.bullshitProcessed = true;
    }
  } else if (insertPoint) {
    // Fallback: si le bouton d'identité n'est pas trouvé, insérer au début de la barre d'actions sociales
    if (!insertPoint.querySelector(".bullshit-score-display")) {
      insertPoint.prepend(scoreDisplay);
      postElement.dataset.bullshitProcessed = true;
    }
  } else {
    // Dernier recours: si aucune des cibles n'est trouvée, chercher un endroit dans l'en-tête du post
    const headerElement = postElement.querySelector(
      ".feed-shared-actor__meta, .comments-view__comment-meta"
    );
    if (
      headerElement &&
      !headerElement.querySelector(".bullshit-score-display")
    ) {
      headerElement.appendChild(scoreDisplay);
      postElement.dataset.bullshitProcessed = true;
    }
  }
}

// Fonction pour observer les changements dans le DOM et détecter de nouveaux posts
function observePosts() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          // Vérifier si le nœud ajouté est un post principal ou un commentaire
          if (node.nodeType === 1) {
            // S'assurer que c'est un élément HTML
            // Sélecteurs plus robustes pour les posts principaux
            if (
              node.matches(
                'div[data-urn*="urn:li:activity"], article.feed-shared-update-v2'
              )
            ) {
              processPost(node);
            }
            // Sélecteurs pour les commentaires ou réponses
            if (
              node.matches("div.comments-view__comment-item, li.comment-item")
            ) {
              processPost(node);
            }
            // Pour les cas où les éléments de post sont ajoutés comme enfants dans une zone plus grande (ex: défilement)
            const newPosts = node.querySelectorAll(
              'div[data-urn*="urn:li:activity"], article.feed-shared-update-v2, div.comments-view__comment-item, li.comment-item'
            );
            newPosts.forEach((post) => processPost(post));
          }
        });
      }
    });
  });

  // Cible le flux d'actualités principal de LinkedIn et d'autres zones où les posts/commentaires peuvent apparaître
  // On observe un élément parent large et stable pour capturer les ajouts
  const feedContainer = document.querySelector(
    '.scaffold-layout__main, main[role="main"]'
  );
  if (feedContainer) {
    observer.observe(feedContainer, { childList: true, subtree: true });
    console.log(
      "MutationObserver initialisé sur le conteneur du fil d'actualité."
    );
  } else {
    console.warn(
      "Conteneur du fil d'actualité LinkedIn introuvable. Le détecteur de bullshit pourrait ne pas fonctionner sur toutes les pages."
    );
    // Fallback: observer le corps du document si le conteneur spécifique n'est pas trouvé
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

// Lancer le traitement des posts déjà présents lors du chargement initial
document
  .querySelectorAll(
    'div[data-urn*="urn:li:activity"], article.feed-shared-update-v2, div.comments-view__comment-item, li.comment-item'
  )
  .forEach((post) => processPost(post));

// Lancer l'observation pour les posts qui se chargent dynamiquement
observePosts();
