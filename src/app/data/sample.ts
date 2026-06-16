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
    title: 'Your Project — Add from ibrabalogun.com',
    client: 'Add client name',
    year: 2024,
    role: 'Designer',
    status: 'active',
    category: 'brand',
    industry: 'TBD',
    description:
      'Pull your real project from your portfolio site. Paste the name, client, role, and description here to replace this placeholder.',
    tools: ['Figma'],
    tags: ['portfolio'],
    color: '#2dce89',
    designLanguageTags: ['premium-digital'],
    portfolioReadiness: 0,
    nextAction: 'Add your real project data',
    teamSize: 1,
    featured: true,
  },
  {
    id: 'p2',
    title: 'SHN Navigation Redesign',
    client: 'SHN',
    year: 2024,
    role: 'Senior Product Designer',
    status: 'completed',
    category: 'product',
    industry: 'Healthcare',
    description:
      'Redesigned the core navigation architecture for a health network platform serving 200k+ patients. Simplified information architecture, improved accessibility, and reduced task completion time by 28%.',
    tools: ['Figma', 'Maze', 'FullStory'],
    tags: ['product', 'navigation', 'IA', 'accessibility', 'healthcare'],
    color: '#6366f1',
    designLanguageTags: ['clear-hierarchy', 'accessible-first', 'modular-systems', 'warm-corporate-clarity'],
    caseStudyDraft:
      'The existing navigation created cognitive overload for both patients and clinicians. We ran 3 rounds of usability testing and landed on a unified mental model that served both user types.',
    portfolioReadiness: 88,
    nextAction: 'Polish Webflow case study page — add prototype video',
    metrics: '28% reduction in task completion time, 91 SUS score',
    teamSize: 4,
    featured: true,
  },
  {
    id: 'p3',
    title: 'DX Studio — Brand & Website',
    client: 'DX Studio (Self)',
    year: 2025,
    role: 'Creative Director',
    status: 'active',
    category: 'web',
    industry: 'Design Studio',
    description:
      'Brand identity and website for DX Studio, a multidisciplinary design studio. Positioning: premium creative partner for ambitious brands and products. Building a public-facing presence that matches the quality of the work.',
    tools: ['Figma', 'Webflow', 'Spline', 'Framer'],
    tags: ['studio', 'brand', 'web', 'identity', 'self-initiated'],
    color: '#c9a844',
    designLanguageTags: ['culture-led-brand-energy', 'editorial', 'premium-digital', 'expressive-typography'],
    portfolioReadiness: 40,
    nextAction: 'Finalise homepage — need hero and services section',
    teamSize: 1,
    featured: false,
  },
  {
    id: 'p4',
    title: 'Zenith Bank App Redesign',
    client: 'Zenith Bank',
    year: 2023,
    role: 'Lead Product Designer',
    status: 'completed',
    category: 'product',
    industry: 'Finance',
    description:
      'Led end-to-end redesign of the consumer mobile banking app. Introduced a refreshed design system, improved onboarding, and rebuilt the transaction experience from scratch.',
    tools: ['Figma', 'Principle', 'Zeroheight'],
    tags: ['product', 'mobile', 'banking', 'design-system', 'fintech'],
    color: '#f4b942',
    designLanguageTags: ['polished-saas-storytelling', 'high-contrast-hierarchy', 'modular-systems'],
    portfolioReadiness: 95,
    metrics: '4.6★ App Store rating post-launch (from 3.2)',
    teamSize: 6,
    featured: true,
  },
  {
    id: 'p5',
    title: 'Wellnest — Health Tracking App',
    client: 'Wellnest',
    year: 2023,
    role: 'Brand & Product Design',
    status: 'completed',
    category: 'product',
    industry: 'Health & Wellness',
    description:
      'Designed the brand identity, design system, and core app screens for a health tracking startup. Focused on creating warmth and calm in a category typically dominated by aggressive visual languages.',
    tools: ['Figma', 'Principle', 'Lottie'],
    tags: ['product', 'brand', 'health', 'mobile', 'motion'],
    color: '#14b8a6',
    designLanguageTags: ['warm-corporate-clarity', 'clean-expressive', 'motion-aware', 'art-directed-mockups'],
    portfolioReadiness: 80,
    featured: false,
  },
  {
    id: 'p6',
    title: 'Posters — Type & Culture Series',
    client: 'Self-initiated',
    year: 2025,
    role: 'Art Director',
    status: 'active',
    category: 'poster',
    industry: 'Self-initiated',
    description:
      'Ongoing series of editorial posters exploring culture, identity, and typography. Experimental space for pushing visual language and staying connected to craft.',
    tools: ['Figma', 'Illustrator', 'Photoshop'],
    tags: ['poster', 'editorial', 'typography', 'experimental', 'culture'],
    color: '#a855f7',
    designLanguageTags: ['expressive-typography', 'high-contrast', 'editorial', 'culture-led'],
    portfolioReadiness: 60,
    nextAction: 'Publish 3 posters to portfolio — needs write-up',
  },
];

export const SAMPLE_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'o1',
    title: 'Senior Brand Designer',
    company: 'Stripe',
    type: 'full-time',
    location: 'San Francisco, CA / Remote',
    remote: true,
    source: 'LinkedIn',
    status: 'applied',
    fitScore: 8,
    rateOrSalary: '$135k – $165k',
    notes: 'Strong fit — they want someone who can lead brand campaigns and work closely with growth. Portfolio shows relevant fintech + brand work.',
    followUpDate: '2025-06-20',
    relatedProjects: ['p4', 'p1'],
    nextAction: 'Follow up with recruiter — sent portfolio June 1',
    createdAt: '2025-05-28',
    tags: ['brand', 'senior', 'full-time', 'high-value'],
  },
  {
    id: 'o2',
    title: 'Creative Director (Fractional)',
    company: 'TechFlow AI',
    type: 'fractional',
    location: 'Remote',
    remote: true,
    source: 'Referral — Dayo A.',
    status: 'interviewing',
    fitScore: 9,
    rateOrSalary: '$90/hr, 20 hrs/wk',
    notes: 'Series B AI platform. Looking for fractional CD for 6 months to establish visual identity and design culture. Strong match.',
    followUpDate: '2025-06-15',
    relatedProjects: ['p1', 'p3'],
    nextAction: 'Prepare portfolio presentation for call Thursday',
    createdAt: '2025-06-01',
    tags: ['CD', 'fractional', 'AI', 'high-value'],
  },
  {
    id: 'o3',
    title: 'Head of Design',
    company: 'Kuda Bank',
    type: 'full-time',
    location: 'Lagos / Remote',
    remote: true,
    source: 'Job board',
    status: 'interested',
    fitScore: 7,
    rateOrSalary: '$130k + equity',
    notes: 'Great brand, moving fast. Role is product + brand hybrid which is perfect. Concerns about org size — need to ask about team.',
    followUpDate: '2025-06-18',
    relatedProjects: ['p4', 'p2'],
    nextAction: 'Draft tailored cover message',
    createdAt: '2025-06-05',
    tags: ['head-of-design', 'fintech', 'africa'],
  },
  {
    id: 'o4',
    title: 'Senior Product Designer',
    company: 'Linear',
    type: 'full-time',
    location: 'Remote',
    remote: true,
    source: 'Direct application',
    status: 'applied',
    fitScore: 9,
    rateOrSalary: '$145k – $175k',
    notes: 'Dream company — tools for builders. Team is tiny and design matters deeply. Would need to show strong systems and craft work.',
    relatedProjects: ['p2', 'p4'],
    nextAction: 'Awaiting response — applied June 3',
    createdAt: '2025-06-03',
    tags: ['senior', 'product', 'tools', 'dream-role'],
  },
  {
    id: 'o5',
    title: 'Brand Design Lead',
    company: 'Vercel',
    type: 'full-time',
    location: 'Remote',
    remote: true,
    source: 'Twitter DM',
    status: 'replied',
    fitScore: 8,
    rateOrSalary: '$130k – $155k',
    notes: 'Design system is class. Role is focused on brand campaigns and docs. Strong visual fit with my work style.',
    followUpDate: '2025-06-16',
    relatedProjects: ['p1', 'p3'],
    nextAction: 'Schedule screening call',
    createdAt: '2025-06-07',
    tags: ['brand', 'lead', 'developer-tools'],
  },
  {
    id: 'o6',
    title: 'Brand Design Project — Website Redesign',
    company: 'Northstar Capital',
    type: 'freelance',
    location: 'Remote',
    remote: true,
    source: 'Inbound enquiry',
    status: 'proposal',
    fitScore: 6,
    rateOrSalary: '$18k project budget',
    notes: 'VC firm wanting a full website redesign. Conservative brand. Manageable scope. Would be 6–8 weeks.',
    nextAction: 'Send proposal by June 17',
    createdAt: '2025-06-09',
    tags: ['freelance', 'web', 'VC', 'inbound'],
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
    amount: 7500,
    currency: 'CAD',
    date: '2026-06-15',
    status: 'paid',
    client: 'Loblaw Companies',
    notes: 'Bi-weekly salary deposit — connect bank account to track automatically',
    category: 'Salary',
  },
  {
    id: 'f2',
    type: 'retainer',
    amount: 7500,
    currency: 'CAD',
    date: '2026-06-01',
    status: 'paid',
    client: 'Loblaw Companies',
    notes: 'Bi-weekly salary deposit',
    category: 'Salary',
  },
  {
    id: 'f3',
    type: 'subscription',
    amount: 49,
    currency: 'USD',
    date: '2026-06-01',
    status: 'recurring',
    notes: 'Figma Professional',
    category: 'Tools',
  },
  {
    id: 'f4',
    type: 'subscription',
    amount: 20,
    currency: 'USD',
    date: '2026-06-01',
    status: 'recurring',
    notes: 'Claude Pro',
    category: 'Tools',
  },
  {
    id: 'f5',
    type: 'subscription',
    amount: 14,
    currency: 'USD',
    date: '2026-06-01',
    status: 'recurring',
    notes: 'Framer',
    category: 'Tools',
  },
];

export const SAMPLE_LEARNING: LearningGoal[] = [
  {
    id: 'l1',
    skill: '3D Design — Spline',
    reason: 'Need 3D for premium web experiences and hero sections. Clients are asking for it and it differentiates the work.',
    currentLevel: 2,
    targetLevel: 4,
    category: 'Technical Craft',
    resources: [
      { title: 'Spline Official Tutorials', type: 'video' },
      { title: 'Design with 3D — course by Thomas Remy', type: 'course' },
    ],
    projectToPractice: 'DX Studio hero section',
    deadline: '2025-08-01',
    progress: 20,
    priority: 'high',
    notes: 'Already started basic Spline tutorials. Next: build a simple 3D scene and export to web.',
  },
  {
    id: 'l2',
    skill: 'AI-Assisted Creative Workflows',
    reason: 'AI is reshaping the pipeline. Need to be the designer who uses AI strategically, not the one who is replaced by it.',
    currentLevel: 3,
    targetLevel: 5,
    category: 'AI & Tools',
    resources: [
      { title: 'Anthropic Prompting Guide', type: 'article' },
      { title: 'Midjourney for Designers', type: 'course' },
    ],
    projectToPractice: 'Carbon Fight moodboard generation pipeline',
    progress: 50,
    priority: 'high',
    notes: 'Using Claude for case study writing, Midjourney for moodboarding. Need to document the workflow.',
  },
  {
    id: 'l3',
    skill: 'Creative Direction Frameworks',
    reason: 'Moving toward CD roles. Need to be able to articulate and run a creative direction process, not just execute.',
    currentLevel: 3,
    targetLevel: 5,
    category: 'Leadership',
    resources: [
      { title: 'How Brands Grow — book', type: 'book' },
      { title: 'The Brand Gap — book', type: 'book' },
      { title: 'Masters of Scale podcast', type: 'article' },
    ],
    progress: 35,
    priority: 'high',
    notes: 'Started reading The Brand Gap. Need to create my own CD process doc.',
  },
  {
    id: 'l4',
    skill: 'Studio Business Development',
    reason: 'DX Studio needs a repeatable BD process. Need to get comfortable with scoping, proposals, and closing.',
    currentLevel: 2,
    targetLevel: 4,
    category: 'Business',
    resources: [
      { title: 'Win Without Pitching Manifesto — Blair Enns', type: 'book' },
      { title: 'Proposal Secrets — course', type: 'course' },
    ],
    projectToPractice: 'Northstar Capital proposal',
    progress: 15,
    priority: 'medium',
  },
  {
    id: 'l5',
    skill: 'Motion Design — Advanced Techniques',
    reason: 'Motion is increasingly expected at the CD level. Need to move from basic transitions to directing motion systems.',
    currentLevel: 3,
    targetLevel: 4,
    category: 'Technical Craft',
    resources: [
      { title: 'School of Motion — Advanced After Effects', type: 'course' },
      { title: 'Motion Design Theory — YouTube series', type: 'video' },
    ],
    progress: 40,
    priority: 'medium',
  },
  {
    id: 'l6',
    skill: 'Portfolio Storytelling',
    reason: 'The quality of the work is there. The quality of the case study presentation needs to match it.',
    currentLevel: 3,
    targetLevel: 5,
    category: 'Communication',
    resources: [
      { title: 'How to write a case study — Own notes', type: 'article' },
      { title: 'Portfolio by Femke van Schoonhoven — course', type: 'course' },
    ],
    projectToPractice: 'Carbon Fight and SHN case studies',
    progress: 30,
    priority: 'high',
    notes: 'Need to finish both case studies this month. Using Ibra OS to structure them.',
  },
];

export const SAMPLE_AGENT_TASKS: AgentTask[] = [
  {
    id: 'at1',
    title: 'Carbon Fight — Full Case Study Draft',
    agentType: 'portfolio',
    status: 'review',
    prompt:
      'Using the Carbon Fight project notes, metrics, and design decisions, write a complete portfolio case study. Include: project overview, problem statement, process (research → ideation → design → dev handoff), key design decisions with rationale, final screens, and measurable outcomes. Write in my voice — direct, confident, strategic.',
    output:
      '## Carbon Fight — Designing for Climate Urgency\n\n**Overview**\nCarbon Fight is a marketplace for verified carbon credits, built for enterprise buyers who need transparency and speed. The brief: build a brand and web experience that communicated both credibility (this is real, institutional-grade) and urgency (the planet needs this).\n\n**The Problem**\nCarbon offset markets have a trust problem. Greenwashing scandals have made buyers skeptical. Every competitor looked like a generic fintech — sterile blues, stock photography, abstract globe icons. There was a real opportunity to build a brand that felt as serious as the problem it was solving.\n\n**Design Direction**\nWe established two principles early: *earned restraint* and *numbers as story*. The brand would not shout — it would show its work. The primary visual language was built on data — real metrics, real verification marks, real certificates — all presented with the same rigour you\'d expect from a financial instrument...',
    sourceIds: ['p1'],
    reviewNotes: 'Good direction. Need to add: Phase 2 screen walkthrough and the 40% signup stat prominently in the intro.',
    createdAt: '2025-06-10',
    updatedAt: '2025-06-11',
    tags: ['case-study', 'portfolio', 'carbon-fight'],
    priority: 'high',
  },
  {
    id: 'at2',
    title: 'TechFlow AI — Portfolio Pieces to Send',
    agentType: 'opportunity',
    status: 'completed',
    prompt: 'For the TechFlow AI fractional CD opportunity, which 3 projects from my portfolio best support this application? Explain why each is relevant and what angle to use when presenting them.',
    output:
      '**Recommended portfolio pieces for TechFlow AI:**\n\n1. **Carbon Fight** — Best proof of brand building from scratch. TechFlow needs a visual identity established. Show the full system — logo, colour, type, motion.\n\n2. **SHN Navigation Redesign** — Shows systems thinking at scale. A fractional CD needs to think about how design decisions compound. The IA work is directly relevant.\n\n3. **DX Studio** — Shows your own creative direction. A CD who is actively running their own studio demonstrates confidence and business awareness. Use this to show positioning work, not just execution.\n\n**Angle:** Frame as "I build design cultures, not just deliverables." TechFlow is Series B — they need someone who can set standards and build a team, not just produce work.',
    sourceIds: ['o2', 'p1', 'p2', 'p3'],
    createdAt: '2025-06-08',
    updatedAt: '2025-06-08',
    tags: ['opportunity', 'portfolio-selection', 'techflow'],
    priority: 'high',
  },
  {
    id: 'at3',
    title: 'DX Studio — Homepage Concept Directions',
    agentType: 'creative_director',
    status: 'queued',
    prompt: 'Generate 3 homepage concept directions for DX Studio. One baseline (clean, professional, immediately legible), one sharp (stronger POV, editorial), one wild (experimental, polarising, memorable). For each: concept, visual language, typography, colour, hero structure, and references.',
    createdAt: '2025-06-12',
    updatedAt: '2025-06-12',
    tags: ['creative-direction', 'dx-studio', 'homepage', 'baseline-wild'],
    priority: 'medium',
  },
  {
    id: 'at4',
    title: 'Northstar Capital — Proposal + Estimate',
    agentType: 'production',
    status: 'in_progress',
    prompt: 'Create a professional project proposal for the Northstar Capital website redesign. Budget: $18k. Scope: full website redesign, 6–8 weeks. Include: project overview, deliverables, timeline, investment breakdown, and terms. Write in a confident, senior studio voice.',
    sourceIds: ['o6'],
    createdAt: '2025-06-11',
    updatedAt: '2025-06-13',
    tags: ['proposal', 'freelance', 'northstar'],
    priority: 'high',
  },
  {
    id: 'at5',
    title: 'Design Language Extraction — Carbon Fight',
    agentType: 'memory',
    status: 'completed',
    prompt: 'Analyse the Carbon Fight project and extract a reusable design language profile: layout system, colour palette logic, type style, motion principles, art direction rules, and 5 prompt rules for future use.',
    output:
      '**Carbon Fight — Design Language Profile**\n\n**Layout System:** Grid-first, generous whitespace, data tables as design elements, horizontal scroll for timeline sequences.\n\n**Colour Logic:** Forest green (#2dce89) as primary action, off-black (#0d0d14) as dominant, warm white (#f5f5ef) for editorial sections. Never use pure black or pure white.\n\n**Type Style:** Monument Grotesk for display (tight tracking, large scale), Inter for body and data, tabular numbers everywhere.\n\n**Motion Principles:** Count-up animations for numbers, slide-up for section reveals, no parallax.\n\n**Prompt Rules:**\n1. "Design like a Bloomberg terminal that wants to be trusted"\n2. "Make the data the hero — never hide it"\n3. "One accent colour, used sparingly and with purpose"\n4. "Certifications and verification marks should be visible and legible"\n5. "Trust is earned through specificity — no vague claims"',
    sourceIds: ['p1'],
    createdAt: '2025-06-05',
    updatedAt: '2025-06-06',
    tags: ['design-language', 'memory', 'carbon-fight'],
    priority: 'low',
  },
];

export const SAMPLE_MEMORIES: Memory[] = [
  {
    id: 'm1',
    type: 'pricing',
    source: 'Personal notes',
    content: 'Minimum acceptable rate for any freelance/contract work: $65/hr. Target rate: $75–85/hr. For projects, minimum budget: $10k. Any opportunity below these thresholds needs exceptional other benefits (equity, portfolio value, relationship) to justify.',
    tags: ['pricing', 'rates', 'freelance'],
    confidence: 100,
    lastUpdated: '2025-06-01',
  },
  {
    id: 'm2',
    type: 'design_language',
    source: 'Reflection — SHN project',
    content: 'My strongest work has a shared quality: the constraint is visible in the final design. Whether it\'s a healthcare accessibility requirement or a startup budget — the constraint shapes the work and makes it feel earned rather than arbitrary.',
    tags: ['design-language', 'craft', 'process'],
    confidence: 85,
    lastUpdated: '2025-05-15',
  },
  {
    id: 'm3',
    type: 'preference',
    source: 'Conversation — portfolio review',
    content: 'Prefer fractional CD or senior brand roles over pure IC product roles. Want to work at the intersection of brand direction + product design. Ideal: a company where the design function has real influence and isn\'t just serving requests.',
    tags: ['career', 'goals', 'role-preference'],
    confidence: 90,
    lastUpdated: '2025-06-02',
  },
  {
    id: 'm4',
    type: 'prompt',
    source: 'Agent task — Carbon Fight',
    content: 'Best prompt for extracting design language: "Act as a senior creative director reviewing this project. Extract: (1) Layout system and spatial logic, (2) Colour palette with usage rules, (3) Typography system with scale and weight decisions, (4) Motion principles, (5) 5 reusable prompt rules that capture the feeling of this work."',
    tags: ['prompt', 'design-language', 'template'],
    confidence: 95,
    lastUpdated: '2025-06-06',
  },
  {
    id: 'm5',
    type: 'lesson',
    source: 'Project retrospective — Zenith Bank',
    content: 'On the Zenith Bank project, we underscoped the design system work by 40%. In future, any project involving more than 30 components should have a dedicated system sprint budget of 2–3 weeks built in. Never estimate system work as a percentage of screen count.',
    tags: ['lesson', 'scoping', 'design-systems'],
    confidence: 95,
    lastUpdated: '2025-04-30',
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

// Connect your bank account to replace with live figures
export const MONTHLY_TARGET = 15000;
export const RATE_FLOOR = 65;
export const RATE_TARGET = 80;
