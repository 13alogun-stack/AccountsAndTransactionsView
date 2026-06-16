import type {
  Project,
  Opportunity,
  Reference,
  DesignPrinciple,
  DesignLanguageTag,
  DesignLanguageProfile,
  FinanceItem,
  LearningGoal,
  AgentTask,
  Memory,
  Document,
  Prompt,
} from '../types';

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'PC Masterbrand — Web Experience',
    client: 'President\'s Choice / Loblaw Digital',
    year: 2025,
    role: 'Product Designer',
    status: 'completed',
    category: 'product',
    industry: 'Retail / CPG',
    description:
      'Created a modular, bilingual (EN/FR) web experience uniting PC Express, PC Health, and PC Financial under one cohesive digital ecosystem. Led design QA and art direction with content, dev, and external partners including Zulu, Disney, and Marvel.',
    tools: ['Figma', 'Webflow'],
    tags: ['product', 'web', 'bilingual', 'design-system', 'retail'],
    color: '#e63329',
    designLanguageTags: ['modular-systems', 'accessible-first', 'warm-corporate-clarity', 'clear-hierarchy'],
    portfolioReadiness: 75,
    nextAction: 'Write case study — document modular system decisions',
    metrics: 'Unified 3 sub-brands under one digital ecosystem',
    teamSize: 5,
    featured: true,
  },
  {
    id: 'p2',
    title: 'SHN — Specialty Health Network',
    client: 'Loblaw Digital',
    year: 2026,
    role: 'Product Designer',
    status: 'active',
    category: 'product',
    industry: 'Health & Pharmacy',
    description:
      'Product/UX design for SHN (Specialty Health Network) within the Loblaw ecosystem. Current active project — designing digital product experiences for a specialized health platform. Working with content, dev, and cross-functional partners.',
    tools: ['Figma'],
    tags: ['product', 'UX', 'health', 'accessibility', 'digital'],
    color: '#2dce89',
    designLanguageTags: ['clear-hierarchy', 'accessible-first', 'warm-corporate-clarity', 'modular-systems'],
    portfolioReadiness: 25,
    nextAction: 'Document work-in-progress — start capturing decisions and screens now',
    teamSize: 4,
    featured: false,
  },
  {
    id: 'p3',
    title: 'eBay & Logitech Social',
    client: 'eBay + Logitech / DEPT',
    year: 2024,
    role: 'Senior Designer',
    status: 'completed',
    category: 'brand',
    industry: 'E-Commerce / Tech',
    description:
      'Led creative direction and execution for monthly social content across eBay and Logitech. Designed influencer campaigns, developed storyboards, and collaborated with motion designers and copywriters to create motion assets for both accounts.',
    tools: ['Figma', 'After Effects', 'Adobe Creative Suite'],
    tags: ['social', 'motion', 'brand', 'influencer', 'campaign'],
    color: '#e53238',
    designLanguageTags: ['motion-aware', 'strong-typography', 'culture-led-brand-energy'],
    portfolioReadiness: 65,
    nextAction: 'Package best social assets for portfolio deck',
    teamSize: 3,
    featured: true,
  },
  {
    id: 'p4',
    title: 'Google & Barclays Digital',
    client: 'Google + Barclays / HUGE',
    year: 2023,
    role: 'Senior Visual Designer',
    status: 'completed',
    category: 'product',
    industry: 'Tech / Finance',
    description:
      'Redesigned and optimized digital experiences for Google and Barclays — translating design systems into responsive web solutions that enhanced usability and visual appeal. Presented concepts directly to stakeholders.',
    tools: ['Figma', 'Sketch', 'Zeroheight'],
    tags: ['product', 'web', 'design-system', 'enterprise'],
    color: '#4285f4',
    designLanguageTags: ['modular-systems', 'clear-hierarchy', 'accessible-first', 'premium-digital'],
    portfolioReadiness: 70,
    nextAction: 'Get signoff on what\'s shareable from HUGE NDA',
    metrics: 'Improved usability and visual appeal across responsive web',
    teamSize: 6,
    featured: true,
  },
  {
    id: 'p5',
    title: 'Adobe Motion Design System',
    client: 'Adobe',
    year: 2022,
    role: 'Experience / Motion Designer',
    status: 'completed',
    category: 'product',
    industry: 'Software / Creative Tools',
    description:
      'Developed a comprehensive motion design system showcasing 40+ product features, transforming static content into dynamic, web-friendly assets. Aligned with Adobe\'s global brand strategy to elevate the online user experience for small businesses and content creators.',
    tools: ['After Effects', 'Adobe Creative Suite', 'Figma'],
    tags: ['motion', 'design-system', 'animation', 'brand'],
    color: '#ff0000',
    designLanguageTags: ['motion-aware', 'editorial-product-storytelling', 'premium-digital'],
    portfolioReadiness: 80,
    nextAction: 'Recreate case study — strong story for Adobe Express interview',
    metrics: '10% increase in feature engagement rates',
    teamSize: 3,
    featured: true,
  },
  {
    id: 'p6',
    title: 'Overtime Elite x Klarna Pop Up',
    client: 'Overtime Elite / Klarna',
    year: 2021,
    role: 'Experience Designer',
    status: 'completed',
    category: 'brand',
    industry: 'Sports / Retail',
    description:
      'Designed OOH campaign visuals for the Overtime Elite x Klarna pop-up activation — including posters, floor graphics, and window displays to maximize brand visibility at the event.',
    tools: ['Illustrator', 'Photoshop', 'Figma'],
    tags: ['OOH', 'experiential', 'brand', 'campaign', 'retail'],
    color: '#14b8a6',
    designLanguageTags: ['expressive-typography', 'culture-led-brand-energy', 'high-contrast'],
    portfolioReadiness: 60,
    nextAction: 'Photograph and document the installation for case study',
    teamSize: 2,
    featured: false,
  },
];

export const SAMPLE_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'o1',
    title: 'Designer — Adobe Express',
    company: 'Adobe',
    type: 'full-time',
    location: 'Remote / San Jose',
    remote: true,
    source: 'Recruiter outreach',
    status: 'closed',
    fitScore: 10,
    rateOrSalary: 'TBC',
    notes: 'Interviewed April 2026 — did not get the role. Built full interview deck covering Systems, Motion, and AI-First Design. Strong process. Prior Adobe experience (2022) was relevant. Keep the deck — it\'s good work and reusable for the next one.',
    relatedProjects: ['p5', 'p3'],
    nextAction: 'Repurpose interview deck for portfolio — turn it into a case study',
    createdAt: '2026-01-01',
    tags: ['closed', 'motion', 'adobe', 'systems', 'ai-first'],
  },
  {
    id: 'o2',
    title: 'Add opportunity',
    company: 'Add company',
    type: 'full-time',
    location: 'Remote',
    remote: true,
    source: 'Add source',
    status: 'considering',
    fitScore: 7,
    rateOrSalary: 'TBC',
    notes: 'Add notes about this opportunity — why it fits, what to watch for.',
    nextAction: 'Add next step',
    createdAt: '2026-06-15',
    tags: ['brand', 'senior'],
  },
  {
    id: 'o3',
    title: 'Add opportunity',
    company: 'Add company',
    type: 'full-time',
    location: 'Remote',
    remote: true,
    source: 'Add source',
    status: 'interested',
    fitScore: 7,
    rateOrSalary: 'TBC',
    notes: 'Add notes about this opportunity.',
    nextAction: 'Add next step',
    createdAt: '2026-06-15',
    tags: ['brand', 'senior'],
  },
];

export const SAMPLE_REFERENCES: Reference[] = [
  {
    id: 'r1',
    title: 'Linear — Product Website',
    source: 'linear.app',
    url: 'https://linear.app',
    tags: ['clean', 'premium', 'saas', 'dark', 'product', 'minimal'],
    mood: ['sharp', 'confident', 'focused'],
    category: 'web',
    whyItWorks: 'The restraint is what makes it feel premium. Every element earns its place. The motion is functional, not decorative. Typography does heavy lifting.',
    colorLanguage: 'Deep dark with precise purple accents',
    typographyNotes: 'Large, tight, lowercase — creates a confident informality that tech-native audiences respond to',
    savedAt: '2025-05-20',
    color: '#6366f1',
    relatedProjects: ['p3', 'p4'],
  },
  {
    id: 'r2',
    title: 'Stripe Identity System',
    source: 'stripe.com',
    url: 'https://stripe.com',
    tags: ['brand', 'fintech', 'bold', 'editorial', 'system'],
    mood: ['bold', 'trusted', 'editorial'],
    category: 'brand',
    whyItWorks: 'Stripe proved you can be both serious (fintech) and expressive (gradient world). The underlying grid discipline makes the experimentation feel structured rather than chaotic.',
    colorLanguage: 'Gradient-forward, violets and blues, expanding to full spectrum campaigns',
    typographyNotes: 'Sohne and custom type — owned typographic voice',
    savedAt: '2025-05-15',
    color: '#6772e5',
    relatedProjects: ['p1', 'p4'],
  },
  {
    id: 'r3',
    title: 'Arc Browser — Brand',
    source: 'arc.net',
    url: 'https://arc.net',
    tags: ['brand', 'browser', 'culture', 'warm', 'playful', 'premium'],
    mood: ['warm', 'expressive', 'culture-forward'],
    category: 'brand',
    whyItWorks: 'Arc built a brand that feels like a person, not a product. Every touchpoint — from the website to the changelog — has a consistent voice that feels like they actually enjoy the work.',
    colorLanguage: 'Warm purples, cream, and seasonal palettes',
    typographyNotes: 'Mix of editorial serif and humanist sans — creates warmth and intelligence',
    savedAt: '2025-05-22',
    color: '#c084fc',
    relatedProjects: ['p3'],
  },
  {
    id: 'r4',
    title: 'Raycast — Website',
    source: 'raycast.com',
    url: 'https://raycast.com',
    tags: ['dark', 'premium', 'developer-tool', 'glass', 'editorial'],
    mood: ['premium', 'technical', 'focused'],
    category: 'product',
    whyItWorks: 'Glass morphism done right — structured rather than decorative. The command palette as hero is a masterstroke of showing-not-telling.',
    colorLanguage: 'Very dark with orange accents, glass surfaces',
    typographyNotes: 'Large, tight tracking, strong hierarchy — functional elegance',
    savedAt: '2025-05-10',
    color: '#ff6363',
    relatedProjects: ['p3'],
  },
  {
    id: 'r5',
    title: 'Cosmos — Poster Series',
    source: 'cosmos.so',
    tags: ['editorial', 'poster', 'culture', 'experimental', 'typography'],
    mood: ['editorial', 'experimental', 'cultured'],
    category: 'editorial',
    whyItWorks: 'Strong point of view. Every board has a curatorial intelligence behind it. Not just aesthetics — argument.',
    savedAt: '2025-06-01',
    color: '#f0f0f0',
    relatedProjects: ['p6'],
  },
  {
    id: 'r6',
    title: 'Figma — Design System Docs',
    source: 'figma.com/design',
    url: 'https://figma.com',
    tags: ['system', 'documentation', 'clean', 'structured'],
    mood: ['methodical', 'clear', 'trusted'],
    category: 'system',
    whyItWorks: 'The system is the product. Every component decision is justified. The documentation teaches while it guides.',
    savedAt: '2025-04-30',
    color: '#1abcfe',
    relatedProjects: ['p2', 'p4'],
  },
  {
    id: 'r7',
    title: 'Vercel — Campaign Pages',
    source: 'vercel.com/ship',
    tags: ['campaign', 'dark', 'developer', 'editorial', 'clean'],
    mood: ['sharp', 'technical', 'bold'],
    category: 'campaign',
    whyItWorks: 'Campaign design that respects the audience. Information-dense but visually clear. The interactivity justifies itself.',
    colorLanguage: 'Black, white, and minimal pops of product UI',
    savedAt: '2025-05-18',
    color: '#ffffff',
    relatedProjects: ['p3'],
  },
  {
    id: 'r8',
    title: 'Readwise Reader — UI',
    source: 'readwise.io/read',
    tags: ['reading', 'focus', 'warm', 'editorial', 'minimal'],
    mood: ['focused', 'calm', 'warm'],
    category: 'product',
    whyItWorks: 'Proves that dark mode can feel warm rather than cold. The typography choices create a reading experience that feels premium without being precious.',
    colorLanguage: 'Warm dark backgrounds with amber and sepia accents',
    typographyNotes: 'Serif body + strong sans UI — creates the right tension',
    savedAt: '2025-06-04',
    color: '#d4a843',
    relatedProjects: ['p3'],
  },
];

export const DESIGN_PRINCIPLES: DesignPrinciple[] = [
  {
    id: 'dp1',
    title: 'Typography earns trust',
    description:
      'Strong, deliberate type choices do more for credibility than decoration. Get the type right — scale, weight, spacing, rhythm — and the rest follows.',
    tags: ['typography', 'hierarchy', 'trust'],
  },
  {
    id: 'dp2',
    title: 'Motion should be purposeful',
    description:
      'Animation that explains something, guides attention, or gives feedback is useful. Animation that just runs because it can, is noise. Every motion needs a job.',
    tags: ['motion', 'intent', 'user-experience'],
  },
  {
    id: 'dp3',
    title: 'Restraint is the hardest craft',
    description:
      'Knowing what to leave out is the real skill. When a design looks complete, ask what you can remove. Premium work looks like it cost someone something to not add more.',
    tags: ['minimalism', 'craft', 'editing'],
  },
  {
    id: 'dp4',
    title: 'Systems over one-offs',
    description:
      'A great logo is worth less than a great system. Design decisions that scale — that hold across 100 touchpoints — are the decisions that matter.',
    tags: ['systems', 'scalability', 'architecture'],
  },
  {
    id: 'dp5',
    title: 'The story is the design',
    description:
      'Portfolio work, case studies, presentations — the framing of the work IS part of the work. How you explain the decision is as important as the decision itself.',
    tags: ['storytelling', 'portfolio', 'communication'],
  },
  {
    id: 'dp6',
    title: 'Baseline and wild',
    description:
      'Always generate the safe, polished direction AND the more ambitious, ownable direction. The best solutions often live between them.',
    tags: ['creative-process', 'exploration', 'direction'],
  },
];

export const DESIGN_LANGUAGE_TAGS: DesignLanguageTag[] = [
  { id: 'dl1', label: 'Premium digital experience', category: 'tone', description: 'Elevated, considered, not trying too hard' },
  { id: 'dl2', label: 'Editorial product storytelling', category: 'layout', description: 'Long-form, opinionated visual narratives' },
  { id: 'dl3', label: 'Clean but expressive', category: 'tone', description: 'Minimal without being cold or empty' },
  { id: 'dl4', label: 'Strong typography', category: 'typography', description: 'Type as the primary visual element' },
  { id: 'dl5', label: 'Modular systems', category: 'layout', description: 'Grids, components, and consistent spatial logic' },
  { id: 'dl6', label: 'Warm corporate clarity', category: 'color', description: 'Professional but not sterile or cold' },
  { id: 'dl7', label: 'Culture-led brand energy', category: 'tone', description: 'Design that feels like it has a perspective and personality' },
  { id: 'dl8', label: 'High-contrast visual hierarchy', category: 'layout', description: 'Immediate reading order, no ambiguity' },
  { id: 'dl9', label: 'Motion-aware layouts', category: 'motion', description: 'Design that anticipates and accounts for animation' },
  { id: 'dl10', label: 'Polished SaaS/product storytelling', category: 'craft', description: 'UI screenshots as art, screens in context' },
  { id: 'dl11', label: 'Art-directed mockups', category: 'craft', description: 'Mockups chosen and framed with intention' },
  { id: 'dl12', label: 'Portfolio-first framing', category: 'tone', description: 'Every deliverable legible as a case study' },
  { id: 'dl13', label: 'Expressive typography', category: 'typography', description: 'Type used as texture, layout element, and voice' },
  { id: 'dl14', label: 'Accessible-first', category: 'craft', description: 'Contrast, readability, and inclusion built in from day one' },
];

export const SAMPLE_FINANCE: FinanceItem[] = [
  {
    id: 'f1',
    type: 'retainer',
    amount: 1271,
    currency: 'CAD',
    date: '2026-06-11',
    status: 'paid',
    client: 'Insight Global Canada',
    project: 'Weekly Payroll',
    notes: 'Weekly payroll (KOHO)',
    category: 'Salary',
  },
  {
    id: 'f2',
    type: 'retainer',
    amount: 1271,
    currency: 'CAD',
    date: '2026-06-04',
    status: 'paid',
    client: 'Insight Global Canada',
    project: 'Weekly Payroll',
    notes: 'Weekly payroll (KOHO)',
    category: 'Salary',
  },
  {
    id: 'f3',
    type: 'subscription',
    amount: 31.64,
    currency: 'CAD',
    date: '',
    status: 'recurring',
    client: 'Anthropic',
    project: 'Claude.ai',
    notes: 'Claude Pro',
    category: 'Tools',
  },
  {
    id: 'f4',
    type: 'subscription',
    amount: 31.30,
    currency: 'CAD',
    date: '',
    status: 'recurring',
    client: 'OpenAI',
    project: 'ChatGPT',
    notes: 'ChatGPT Plus',
    category: 'Tools',
  },
  {
    id: 'f5',
    type: 'subscription',
    amount: 14.34,
    currency: 'CAD',
    date: '',
    status: 'recurring',
    client: 'Spotify',
    project: 'Spotify',
    notes: 'Spotify',
    category: 'Tools',
  },
  {
    id: 'f6',
    type: 'subscription',
    amount: 45.19,
    currency: 'CAD',
    date: '',
    status: 'recurring',
    client: 'DAZN',
    project: 'DAZN',
    notes: 'DAZN',
    category: 'Entertainment',
  },
  {
    id: 'f7',
    type: 'subscription',
    amount: 141.00,
    currency: 'CAD',
    date: '',
    status: 'recurring',
    client: 'Bell Canada',
    project: 'Bell Canada',
    notes: 'Bell Canada (phone)',
    category: 'Bills',
  },
  {
    id: 'f8',
    type: 'subscription',
    amount: 32.02,
    currency: 'CAD',
    date: '',
    status: 'recurring',
    client: 'Mockuuups',
    project: 'Mockuuups',
    notes: 'Mockuuups (design tool)',
    category: 'Tools',
  },
];

export const SAMPLE_LEARNING: LearningGoal[] = [
  {
    id: 'l1',
    skill: 'AI-First Design Practice',
    reason: 'Your interview deck literally says "AI-FIRST DESIGN" — this is the positioning. Need to go deep on AI tooling, prompting as a creative act, and building AI into the design pipeline systematically.',
    currentLevel: 3,
    targetLevel: 5,
    category: 'AI & Tools',
    resources: [
      { title: 'Anthropic Prompting Guide', type: 'article' },
      { title: 'Using AI in the Creative Process — Figma Config talks', type: 'video' },
      { title: 'Adobe Firefly for Designers', type: 'course' },
    ],
    projectToPractice: 'Adobe Express interview deck — AI workflow demo',
    progress: 45,
    priority: 'high',
    notes: 'Already using Claude and Midjourney. Need to document the workflow and make it presentable as a methodology.',
  },
  {
    id: 'l2',
    skill: 'Portfolio Case Study Writing',
    reason: 'The work is real and strong — Adobe, HUGE, DEPT, Loblaw. None of it is documented. This is the single biggest gap between where you are and where you could be. Without case studies, the track record is invisible.',
    currentLevel: 2,
    targetLevel: 5,
    category: 'Communication',
    resources: [
      { title: 'Portfolio by Femke van Schoonhoven', type: 'course' },
      { title: 'UX Portfolio Formula', type: 'article' },
    ],
    projectToPractice: 'PC Masterbrand + Adobe Motion System — start with these two',
    progress: 10,
    priority: 'high',
    notes: 'Actually working on this now. Most urgent thing.',
  },
  {
    id: 'l3',
    skill: 'Motion Systems — Cinema 4D',
    reason: 'Already have After Effects. Cinema 4D is the gap for premium 3D motion. Comes up at the level you\'re targeting.',
    currentLevel: 2,
    targetLevel: 4,
    category: 'Technical Craft',
    resources: [
      { title: 'School of Motion — Cinema 4D Basecamp', type: 'course' },
      { title: 'Greyscalegorilla Plus', type: 'course' },
    ],
    projectToPractice: 'Rebuild Adobe motion system case study in 3D',
    progress: 20,
    priority: 'medium',
    notes: 'Not actively learning this right now. On the list but not the current focus.',
  },
  {
    id: 'l4',
    skill: 'Design Systems Leadership',
    reason: 'Already doing modular systems work at Loblaw. Need to go from executing systems to owning and documenting the philosophy behind them — required for senior/lead roles.',
    currentLevel: 3,
    targetLevel: 5,
    category: 'Leadership',
    resources: [
      { title: 'Design Systems — Alla Kholmatova', type: 'book' },
      { title: 'Nathan Curtis — EightShapes writing', type: 'article' },
    ],
    progress: 35,
    priority: 'medium',
  },
  {
    id: 'l5',
    skill: 'Creative Direction — Brand Voice',
    reason: 'Certified RGD. Background spans brand + product + motion. The next level is owning the creative direction — not just executing it.',
    currentLevel: 3,
    targetLevel: 5,
    category: 'Leadership',
    resources: [
      { title: 'The Brand Gap — Marty Neumeier', type: 'book' },
      { title: 'Win Without Pitching — Blair Enns', type: 'book' },
    ],
    progress: 30,
    priority: 'medium',
    notes: 'Read half of Brand Gap. Need to document a real creative direction process.',
  },
];

export const SAMPLE_AGENT_TASKS: AgentTask[] = [
  {
    id: 'at1',
    title: 'Adobe Motion System — Case Study Draft',
    agentType: 'portfolio',
    status: 'in_progress',
    prompt:
      'Using the Adobe Motion Design System project (2022) — 40+ product features, 10% engagement increase, aligned with global brand strategy — write a complete portfolio case study. Include: project context (Adobe, small business + creator audience), the problem (static content not performing), the system I built (principles, component types, motion rules), key decisions, and outcomes. Write in my voice — direct, strategic, no fluff. This needs to be ready for the Adobe Express interview.',
    sourceIds: ['p5'],
    createdAt: '2026-06-01',
    updatedAt: '2026-06-14',
    tags: ['case-study', 'portfolio', 'adobe', 'motion', 'interview-prep'],
    priority: 'high',
  },
  {
    id: 'at2',
    title: 'Adobe Express Interview — Portfolio Picks',
    agentType: 'opportunity',
    status: 'completed',
    prompt: 'For the Adobe Express Designer role (2026), which 3 projects from my portfolio best support this application? Explain why each is relevant and the angle to use when presenting.',
    output:
      '**Recommended portfolio pieces for Adobe Express:**\n\n1. **Adobe Motion Design System (2022)** — Direct prior Adobe experience. Show the full system: principles, component types, motion rules, and the measurable outcome (10% engagement lift). This is the strongest signal — you\'ve shipped motion systems for Adobe before.\n\n2. **eBay & Logitech Social at DEPT (2024)** — Proves you can operate at volume without losing quality. Adobe Express serves content creators — monthly social at scale is directly relevant. Lead with the storyboarding and motion asset work.\n\n3. **PC Masterbrand at Loblaw (2025)** — Shows systems thinking at enterprise scale. Bilingual, multi-brand, modular — this demonstrates that you design for complexity. Art direction across Zulu, Disney, and Marvel partnerships signals stakeholder management.\n\n**Angle:** Frame as "I\'ve already shipped motion systems for Adobe. Here\'s what I\'d bring to Express." Adobe Express is a creation tool for non-designers — your systems thinking + AI-first positioning is exactly the gap they\'re trying to fill.',
    sourceIds: ['o1', 'p5', 'p3', 'p1'],
    createdAt: '2026-06-01',
    updatedAt: '2026-06-10',
    tags: ['opportunity', 'portfolio-selection', 'adobe', 'interview-prep'],
    priority: 'high',
  },
  {
    id: 'at3',
    title: 'AI-First Design Workflow — Documentation',
    agentType: 'creative_director',
    status: 'queued',
    prompt: 'Document my current AI-first design workflow as a shareable methodology. Sections: (1) Where AI enters the process (ideation, generation, QA, copy), (2) Tools used and how (Claude, Midjourney, Firefly, Figma AI), (3) What it replaces vs. what it amplifies, (4) Real examples from Loblaw and DEPT work, (5) How this is different from "using AI as a shortcut." The output should be presentable as part of the Adobe Express interview and portfolio.',
    createdAt: '2026-06-12',
    updatedAt: '2026-06-12',
    tags: ['ai-first', 'methodology', 'interview-prep', 'portfolio'],
    priority: 'high',
  },
  {
    id: 'at4',
    title: 'PC Masterbrand — Case Study Draft',
    agentType: 'portfolio',
    status: 'queued',
    prompt: 'Write a case study for the PC Masterbrand web experience project at Loblaw Digital (2025). Key details: unified PC Express, PC Health, and PC Financial under one digital ecosystem; bilingual EN/FR; modular design system; art direction with external partners including Zulu, Disney, and Marvel. Include: the design challenge (sub-brand fragmentation), the approach (modular components, bilingual-first thinking), the art direction decisions, and the outcome. Write in a direct, senior voice.',
    sourceIds: ['p1'],
    createdAt: '2026-06-10',
    updatedAt: '2026-06-10',
    tags: ['case-study', 'portfolio', 'loblaw', 'systems'],
    priority: 'medium',
  },
  {
    id: 'at5',
    title: 'Design Language Extraction — Adobe Motion System',
    agentType: 'memory',
    status: 'completed',
    prompt: 'Analyse the Adobe Motion Design System project and extract a reusable design language profile: motion principles, component taxonomy, timing and easing logic, brand alignment rules, and 5 reusable prompt rules for future motion work.',
    output:
      '**Adobe Motion Design System — Design Language Profile**\n\n**Motion Principles:** Feature-first (motion explains, never decorates), brand-consistent (Adobe warm palette, no jarring transitions), performance-aware (web-optimised assets for creator audiences).\n\n**Component Taxonomy:** Hero reveals, feature explainers, UI demo loops, social-ready cuts, tutorial transitions.\n\n**Timing Logic:** Fast enters (200–300ms ease-out), slow exits (400–500ms ease-in), hold on key moments (600ms+).\n\n**Brand Alignment:** Adobe red used sparingly for CTA moments only. Typography always legible against motion. Never obscure product UI.\n\n**Prompt Rules:**\n1. "Motion should make the product feel inevitable"\n2. "The feature is the hero — the motion serves it"\n3. "If you can\'t describe what the motion is communicating, cut it"\n4. "Design for the pause frame — every hold should be a screenshot-worthy moment"\n5. "Small business audience: confidence, not cleverness"',
    sourceIds: ['p5'],
    createdAt: '2026-06-05',
    updatedAt: '2026-06-06',
    tags: ['design-language', 'memory', 'adobe', 'motion'],
    priority: 'low',
  },
];

export const SAMPLE_MEMORIES: Memory[] = [
  {
    id: 'm1',
    type: 'pricing',
    source: 'Personal notes',
    content: 'Minimum acceptable rate for any freelance/contract work: $65/hr CAD. Target rate: $75–85/hr. For projects, minimum budget: $10k. Any opportunity below these thresholds needs exceptional other benefits (equity, portfolio value, relationship) to justify. Currently employed at Loblaw — freelance is additive, not survival.',
    tags: ['pricing', 'rates', 'freelance'],
    confidence: 100,
    lastUpdated: '2026-06-16',
  },
  {
    id: 'm2',
    type: 'lesson',
    source: 'Career check-in — June 2026',
    content: 'Income from Insight Global/Loblaw feels low for this career stage. Strong track record: Adobe, HUGE, DEPT, Loblaw. Not saving enough month to month — spending is the main issue (food/entertainment/cannabis running over). No clear savings target or system in place. This needs to change before the next move.',
    tags: ['finance', 'income', 'savings', 'career'],
    confidence: 100,
    lastUpdated: '2026-06-16',
  },
  {
    id: 'm3',
    type: 'preference',
    source: 'Career reflection — June 2026',
    content: 'Two live questions: (1) What kind of role do I actually want next — senior IC, lead, creative director, something else? (2) Is freelance viable? Background spans Adobe, HUGE, DEPT, Loblaw. Certified RGD. Multidisciplinary. The track record is there. The question is direction and packaging — which the portfolio work would answer.',
    tags: ['career', 'goals', 'role-preference', 'freelance'],
    confidence: 90,
    lastUpdated: '2026-06-16',
  },
  {
    id: 'm4',
    type: 'prompt',
    source: 'Working method',
    content: 'Best prompt for extracting design language from a motion project: "Act as a senior motion director reviewing this project. Extract: (1) Motion principles — what is motion communicating vs. decorating, (2) Timing and easing logic, (3) Component taxonomy — what types of motion assets were produced, (4) Brand alignment rules, (5) 5 reusable prompt rules that capture the feeling of this system."',
    tags: ['prompt', 'design-language', 'motion', 'template'],
    confidence: 95,
    lastUpdated: '2026-06-06',
  },
  {
    id: 'm5',
    type: 'design_language',
    source: 'Reflection — PC Masterbrand project',
    content: 'My strongest work has a shared quality: the constraint is visible in the final design. The bilingual requirement on PC Masterbrand shaped every component decision — it forced a modularity that made the system stronger. Constraints don\'t limit good design; they define it.',
    tags: ['design-language', 'craft', 'process', 'systems'],
    confidence: 85,
    lastUpdated: '2026-05-15',
  },
];

export const SAMPLE_DOCUMENTS: Document[] = [
  {
    id: 'doc1',
    title: 'PC Masterbrand — Case Study Draft',
    type: 'case_study',
    status: 'in_progress',
    relatedProject: 'p1',
    tags: ['case-study', 'portfolio', 'loblaw', 'pcmb'],
    content: `# PC Masterbrand — Web Experience

## Overview
Created a modular, bilingual (EN/FR) web experience uniting PC Express, PC Health, and PC Financial under one cohesive digital ecosystem.

## The Problem
President's Choice had three digital sub-brands — PC Express, PC Health, PC Financial — each with its own design language, tech stack, and visual tone. Users navigating between them experienced a fractured, inconsistent journey. The brief: build one unified web system that honoured each brand's function while creating a recognizable PC digital identity.

## My Role
Senior Product Designer. Led visual design direction, design QA, and cross-functional coordination with content, dev, and external partners (Zulu, Disney, Marvel).

## Process

### Audit + Discovery
Mapped all existing touchpoints across the three sub-brands. Identified 47 inconsistencies in type usage, colour application, and component structure.

### System Design
Built a shared component library that could flex across all three sub-brands while maintaining brand coherence at the PC masterbrand level.

### Art Direction
Established a visual hierarchy system that let product photography, campaign content, and utility UI coexist without conflict.

## Outcome
Unified 3 sub-brands under one digital ecosystem. Reduced design QA cycles by 60%. Established component standards adopted by 5 product teams.

## Tools
Figma · Webflow · Storybook

---
*Next: Add final screen showcase and metrics section*`,
    createdAt: '2026-06-01',
    updatedAt: '2026-06-14',
  },
  {
    id: 'doc2',
    title: 'SHN — Project Brief',
    type: 'brief',
    status: 'final',
    relatedProject: 'p2',
    tags: ['shn', 'brief', 'loblaw', 'health'],
    content: `# SHN — Specialty Health Network · Project Brief

**Client:** Loblaw Digital
**Project:** SHN Digital Product Design
**Role:** Product Designer
**Start:** January 2026
**Status:** Active

## Brief
Design the digital product experience for SHN (Specialty Health Network), a Loblaw initiative connecting patients to specialty pharmacy services.

## Core User Needs
1. Patients need to easily understand what SHN does and whether they qualify
2. Healthcare providers need clear referral pathways
3. Loblaw needs trust signals that differentiate SHN from general pharmacy

## Design Principles for this Project
- Clarity over cleverness — every screen should have one clear next step
- Accessible by default — WCAG AA minimum, AAA target for key flows
- Warm but clinical — not cold healthcare sterile, not consumer casual

## Deliverables
- Patient-facing web experience
- Provider portal flows
- Design system component additions
- Handoff documentation

## Current Status
Early design phase. Exploration complete, moving into structured flows.`,
    createdAt: '2026-01-15',
    updatedAt: '2026-06-10',
  },
  {
    id: 'doc3',
    title: 'DX Studio — Homepage Brief',
    type: 'brief',
    status: 'draft',
    tags: ['dx-studio', 'homepage', 'brand', 'brief'],
    content: `# DX Studio — Homepage Brief

## What is DX Studio
A boutique creative studio run by Ibra Balogun. Specializes in brand systems, digital experiences, and AI-assisted creative production for growth-stage companies.

## Homepage Goal
Convert: "I've heard of DX Studio" → "I want to work with them."

## Audience
- Founders at Series A–B startups
- Marketing leads at scale-ups looking for brand elevation
- Design leaders scoping fractional CD partnerships

## Tone
Confident. Not loud. Specific about what we do and what we don't. No buzzwords.

## Page Structure (Draft)
1. Hero — One line. DX Studio name. What we do.
2. Work — 3 project thumbnails. Purposefully edited.
3. Services — 3 offerings max. Priced or range-noted.
4. Process — 3 steps. Brief → Design → Launch.
5. Studio note — Direct from Ibra. Not a bio. A positioning statement.
6. Contact — One CTA. Simple.

## Design Direction
TBD — waiting on baseline/wild directions from Agent.`,
    createdAt: '2026-05-20',
    updatedAt: '2026-06-12',
  },
  {
    id: 'doc4',
    title: 'Northstar Capital — Website Proposal',
    type: 'proposal',
    status: 'review',
    relatedOpportunity: 'o6',
    tags: ['proposal', 'freelance', 'northstar', 'web'],
    content: `# Website Redesign Proposal
## Northstar Capital × DX Studio

**Prepared by:** Ibraheem Balogun, DX Studio
**Date:** June 2026
**Project Budget:** $18,000 CAD

---

## Project Overview
A full website redesign for Northstar Capital — a Toronto-based VC firm investing in climate tech and frontier software.

## Scope of Work

**Phase 1 — Discovery (Week 1–2)**
- Stakeholder interviews
- Competitive landscape audit
- Brand direction alignment session
- Information architecture mapping

**Phase 2 — Design (Week 3–6)**
- Homepage and inner page design (Figma)
- Mobile-first, responsive
- Component library
- Copy direction and headline frameworks

**Phase 3 — Build + Launch (Week 7–8)**
- Webflow build
- CMS configuration
- QA and browser testing
- Launch support

## Investment
| Phase | Hours | Rate | Total |
|-------|-------|------|-------|
| Discovery | 20h | $80/hr | $1,600 |
| Design | 100h | $80/hr | $8,000 |
| Build | 80h | $80/hr | $6,400 |
| PM & Comms | 25h | $80/hr | $2,000 |
| **Total** | | | **$18,000** |

## Terms
- 50% ($9,000) upfront to begin
- 50% ($9,000) on final delivery
- Payment: e-Transfer or wire
- Net-15 from invoice

---
*Ready to send pending one review*`,
    createdAt: '2026-06-13',
    updatedAt: '2026-06-15',
  },
  {
    id: 'doc5',
    title: 'Weekly Review — June 16, 2026',
    type: 'weekly_review',
    status: 'draft',
    tags: ['weekly-review', 'reflection', 'june-2026'],
    content: `# Weekly Review — June 16, 2026

## What moved this week
- SHN: Provider portal flows in review with PM
- Ibra OS: Launched V2 rebuild — major step forward
- Finance: Insight Global payroll confirmed, KOHO imports done

## What didn't move (and why)
- PC Masterbrand case study: Didn't write a word. The block is still "I don't know where to start."
- DX Studio homepage: No decisions made on direction yet.

## Numbers
- Income this month: ~$2,542 confirmed
- Tools spending: ~$264/mo CAD equivalent
- Pipeline: 2 active opps (Vercel, Northstar)

## Next week focus
1. Write one paragraph of the PCMB case study. One paragraph.
2. Make a call on DX Studio direction — baseline or wild.
3. Follow up with Vercel — screening call should be booked.

## Reflection
The OS feels more real now. The data is real, the projects are real. The next move is making the output real — actually writing case studies, actually closing opps.`,
    createdAt: '2026-06-16',
    updatedAt: '2026-06-16',
  },
];

export const SAMPLE_PROMPTS: Prompt[] = [
  {
    id: 'pr1',
    title: 'Extract Design Language from Project',
    category: 'claude',
    promptText: `Act as a senior creative director reviewing a design project. Extract a reusable design language profile with:

1. Layout system and spatial logic (grid, spacing, proportions)
2. Colour palette with usage rules (not just colours — the logic behind them)
3. Typography system (scale, weight decisions, how type carries hierarchy)
4. Motion principles (if any — how things move and why)
5. Art direction rules (what makes this feel like this)
6. 5 reusable "prompt rules" — sentences that capture the feeling of this work

For each item, include: what it is, why it was chosen, and how to apply it again.
Be specific. No design jargon without follow-up substance.

Project context: [PROJECT_NAME] for [CLIENT] — [ONE_LINE_DESCRIPTION]`,
    tool: 'Claude',
    tags: ['design-language', 'template', 'extraction', 'creative-direction'],
    resultQuality: 'excellent',
    notes: 'Best used after a project is complete or in late stage. Works best when you paste in actual design decisions, not just a brief.',
    lastUsedAt: '2026-06-06',
    createdAt: '2026-05-15',
  },
  {
    id: 'pr2',
    title: 'Generate Case Study — Senior Designer Voice',
    category: 'claude',
    promptText: `Write a portfolio case study for [PROJECT_NAME].

Voice: Senior designer. Confident, direct, specific. No buzzwords. No "I was responsible for." Show thinking, not just output.

Structure:
1. Hook — one sentence that makes someone want to read on
2. Context — what was the brief, who was the client, what constraints existed
3. My role — specific, not generic
4. The real problem — not the brief, the actual design problem underneath
5. Key decisions — 3 decisions, each with rationale
6. What I made — describe the actual output in design terms
7. Outcome — specific, not vague ("improved conversion" → "23% lift in checkout completion")
8. What I'd do differently — one honest reflection

Project notes: [PROJECT_NOTES]
Key metrics: [METRICS]
Tools: [TOOLS]`,
    tool: 'Claude',
    tags: ['case-study', 'portfolio', 'writing', 'template'],
    resultQuality: 'excellent',
    notes: 'Works extremely well. The "what I\'d do differently" section elevates the whole piece.',
    lastUsedAt: '2026-06-10',
    createdAt: '2026-05-20',
  },
  {
    id: 'pr3',
    title: 'Baseline + Wild Creative Directions',
    category: 'claude',
    promptText: `Generate two creative directions for [PROJECT/BRIEF].

BASELINE
Clean. Professional. Client-ready. Strong but safe.
- Visual language
- Typography approach
- Colour system
- Layout structure
- Hero concept
- Reference feeling (name 2 things it feels like)

WILD
Ownable. Expressive. Art-directed. Memorable.
- Visual language
- Typography approach
- Colour system
- Layout structure
- Hero concept
- Reference feeling (name 2 things it feels like)

For each: include a one-sentence positioning statement that captures the direction.

Brief: [BRIEF]
Audience: [AUDIENCE]
Constraints: [CONSTRAINTS]`,
    tool: 'Claude',
    tags: ['creative-direction', 'baseline-wild', 'directions', 'template'],
    resultQuality: 'excellent',
    notes: 'Always generate both. The Wild direction often contains the most interesting ideas, even if Baseline gets used.',
    createdAt: '2026-05-25',
  },
  {
    id: 'pr4',
    title: 'Webflow Build Prompt — Portfolio Case Study',
    category: 'webflow',
    promptText: `Build a Webflow portfolio case study page for [PROJECT_NAME].

Design direction:
- Hero: Full-width, [COLOR] as accent, large display type
- Font: Use a clean sans-serif for body, something with weight for display
- Palette: [BASE_PALETTE]
- Style: [DESIGN_LANGUAGE_TAGS]

Page sections:
1. Hero — Project title + client + year + one-line hook (full viewport)
2. Context — 2-col: brief left / role + tools right
3. Process — 3-step horizontal with numbered labels
4. Visual showcase — Full-width image or mockup grid
5. Outcome — Metric callout + 3 bullet points
6. Next project CTA — Link to adjacent project

Webflow notes:
- Set up as CMS collection item for easy duplication
- All images: max 2000px width, WebP format
- Smooth scroll, no jarring transitions
- Mobile-first layout — test at 375px first`,
    tool: 'Webflow',
    tags: ['webflow', 'portfolio', 'case-study', 'build', 'template'],
    resultQuality: 'good',
    createdAt: '2026-06-01',
  },
  {
    id: 'pr5',
    title: 'Outreach Email — Senior Design Role',
    category: 'outreach',
    promptText: `Write a cold outreach email for a senior design role.

Tone: Direct, confident, human. Not a cover letter. Not a sales pitch. A message from a serious designer who has done their homework.

Structure:
1. Opening — specific observation about the company (not "I love what you're doing")
2. Why this role — one reason, specific
3. Most relevant work — 2 projects max, one sentence each
4. Ask — one specific, low-friction ask

Keep it under 150 words. Every sentence should earn its place.

Role: [ROLE_TITLE] at [COMPANY]
What I know about them: [COMPANY_NOTES]
My most relevant projects: [PROJECT_1], [PROJECT_2]
Contact name: [CONTACT_NAME]`,
    tool: 'Claude',
    tags: ['outreach', 'email', 'opportunities', 'template'],
    resultQuality: 'good',
    notes: 'Works best when you actually know something specific about the company. Generic inputs = generic output.',
    createdAt: '2026-06-05',
  },
  {
    id: 'pr6',
    title: 'Replit — Portfolio Site Generator',
    category: 'replit',
    promptText: `Build a single-page portfolio website using React and Tailwind.

Designer: Ibraheem (Ibra) Balogun — Senior Designer / Creative Director, Toronto
Style: Premium, editorial, dark-mode-first

Sections:
1. Nav — Name left, "Available for work" status dot right
2. Hero — Full viewport. Name, title, one-line positioning. Subtle grid or noise texture.
3. Work — 3 project cards, hover reveals case study link. Show: name, client, year, category tag.
4. About — 2 sentences. Not a bio. A positioning statement.
5. Contact — Email link + LinkedIn. Simple.

Design tokens:
- Background: #0a0a0f
- Text primary: #f5f5ef
- Accent: #E85004 (warm orange)
- Type: System font stack or Inter
- Spacing: 8px grid

Code it clean. One file if possible. Comment the section breaks.`,
    tool: 'Replit',
    tags: ['replit', 'portfolio', 'website', 'react', 'tailwind'],
    resultQuality: 'good',
    createdAt: '2026-06-08',
  },
];

export const DESIGN_LANGUAGE_PROFILE: DesignLanguageProfile = {
  visualPrinciples: [
    'The constraint should be visible in the final design — it makes work feel earned',
    'Every element earns its place — remove anything that doesn\'t work harder than its weight',
    'Strong visual hierarchy before anything else — the reading order must be unambiguous',
    'Restraint as a creative tool — say more with less',
  ],
  layoutPreferences: [
    'Modular grid systems — consistent spatial logic across every surface',
    'Generous whitespace — breathing room is a design tool, not waste',
    'Editorial page structure — section transitions as narrative beats',
    'Full-width hero moments alternating with narrow prose columns',
  ],
  typographyPreferences: [
    'Type carries the hierarchy — size, weight, and tracking do the work',
    'Tight tracking for display type — headings should feel composed',
    'One type family maximum on most projects — clarity over variety',
    'Numbers in tabular figures — data should align',
  ],
  colorPreferences: [
    'Restrained palette — 2 to 3 colours max, each with a defined role',
    'Dark bases work best — content sits on canvas, not in a bright void',
    'One warm accent — orange (#E85004) or a brand-specific equivalent',
    'Colour used purposefully — as signal, not decoration',
  ],
  motionPreferences: [
    'Functional motion only — transitions should guide, not entertain',
    'Count-up animations for numbers and metrics',
    'Slide-up reveals for section entries',
    'No parallax — too distracting',
  ],
  artDirectionPatterns: [
    'Numbers as heroes — large-scale metrics carry emotional weight',
    'Data as design — tables and charts styled as primary visual elements',
    'Mockups with intention — device frames chosen and scaled deliberately',
    'Earned restraint — not minimal because it\'s easy, minimal because it\'s the right answer',
  ],
  portfolioStyle: 'Editorial. Confident narrative. The process is explained but the craft leads. Strong hero image, specific design decisions, real metrics.',
  caseStudyWritingStyle: 'Direct, first-person, specific. No "I was responsible for." Show thinking. "I decided X because Y — the outcome was Z." Honest about trade-offs.',
  designRules: [
    'Never use pure black or pure white — always a touch of warmth or coolness',
    'Accessibility minimum: WCAG AA. Target AAA for key user flows',
    'Components before custom — build on a system before introducing something new',
    '4px or 8px grid. Always.',
    'Never present work without a brief — context makes design legible',
  ],
  toAvoid: [
    'Generic stock photography — ever',
    'Random gradients with no rationale',
    'Decorative elements that don\'t communicate',
    'More than 3 font weights on a single page',
    'Animations that loop or auto-play without user intent',
    'Vague outcome statements — "improved UX" means nothing',
  ],
  favouriteMoves: [
    'Large editorial numbers — letting a single metric own the screen',
    'Colour-block section dividers — hard cut between content types',
    'Subtle noise or grain texture over flat dark backgrounds',
    'Type as texture — oversized letterforms used as background element',
    'Social proof blocks with specific quotes, not paraphrased summaries',
  ],
  outputQualityStandards: [
    'Every screen should be presentable as a case study frame',
    'Designs reviewed at 100% zoom — details matter',
    'Handoff docs reviewed by dev before calling a component complete',
    'QA pass required on all responsive breakpoints',
  ],
  approvedExamples: ['Linear', 'Stripe', 'Cosmos', 'Readwise', 'Vercel', 'Cron'],
  rejectedExamples: ['Generic SaaS blue-purple gradients', 'Toy-like AI interfaces', 'Over-illustrated dashboards'],
  lastUpdated: '2026-06-16',
};

// KOHO monthly target
export const MONTHLY_TARGET = 6000;
export const RATE_FLOOR = 65;
export const RATE_TARGET = 85;
