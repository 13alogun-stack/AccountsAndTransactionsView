// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectStatus =
  | 'idea'
  | 'active'
  | 'paused'
  | 'needs_assets'
  | 'needs_writing'
  | 'portfolio_ready'
  | 'published'
  | 'completed'
  | 'archived';

export type ProjectCategory =
  | 'brand'
  | 'product'
  | 'web'
  | 'motion'
  | 'campaign'
  | 'system'
  | 'concept'
  | 'poster'
  | 'editorial'
  | '3d';

export interface Project {
  id: string;
  title: string;
  client: string;
  year: number;
  role: string;
  status: ProjectStatus;
  category: ProjectCategory;
  industry: string;
  description: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  tools: string[];
  tags: string[];
  thumbnail?: string;
  color: string;
  designLanguageTags: string[];
  caseStudyDraft?: string;
  portfolioReadiness: number;
  nextAction?: string;
  figmaLink?: string;
  webflowLink?: string;
  screenshots?: string[];
  relatedReferences?: string[];
  relatedDocuments?: string[];
  relatedOpportunities?: string[];
  metrics?: string;
  teamSize?: number;
  featured?: boolean;
  missingAssets?: string[];
}

// ─── Opportunities ────────────────────────────────────────────────────────────

export type OpportunityStatus =
  | 'found'
  | 'considering'
  | 'interested'
  | 'applied'
  | 'replied'
  | 'interviewing'
  | 'follow_up'
  | 'proposal'
  | 'won'
  | 'lost'
  | 'closed'
  | 'archived';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  contact?: string;
  email?: string;
  type: 'full-time' | 'contract' | 'freelance' | 'fractional';
  location: string;
  remote: boolean;
  source: string;
  status: OpportunityStatus;
  fitScore: number;
  excitementScore?: number;
  riskScore?: number;
  rateOrSalary?: string;
  minRate?: number;
  targetRate?: number;
  notes?: string;
  outreachDraft?: string;
  followUpDate?: string;
  relatedProjects?: string[];
  suggestedPortfolioPieces?: string[];
  interviewNotes?: string;
  proposalStatus?: string;
  nextAction?: string;
  createdAt: string;
  tags?: string[];
}

// ─── References / Moodboards ─────────────────────────────────────────────────

export interface Reference {
  id: string;
  title: string;
  source: string;
  imageUrl?: string;
  url?: string;
  tags: string[];
  mood: string[];
  category:
    | 'web'
    | 'brand'
    | 'poster'
    | 'product'
    | 'type'
    | 'motion'
    | 'editorial'
    | 'campaign'
    | 'system'
    | 'photography'
    | '3d'
    | 'illustration'
    | 'deck'
    | 'app_ui';
  whyItWorks: string;
  relatedProjects?: string[];
  colorLanguage?: string;
  typographyNotes?: string;
  layoutNotes?: string;
  motionNotes?: string;
  usableFor?: string[];
  savedAt: string;
  color: string;
  approval?: 'approved' | 'almost' | 'rejected' | 'reference' | 'wild' | 'baseline';
}

// ─── Design Language ──────────────────────────────────────────────────────────

export interface DesignPrinciple {
  id: string;
  title: string;
  description: string;
  examples?: string[];
  tags?: string[];
  category?: 'layout' | 'typography' | 'color' | 'motion' | 'tone' | 'craft' | 'process';
}

export interface DesignLanguageTag {
  id: string;
  label: string;
  category: 'layout' | 'typography' | 'color' | 'motion' | 'tone' | 'craft';
  description?: string;
}

export interface DesignLanguageProfile {
  visualPrinciples: string[];
  layoutPreferences: string[];
  typographyPreferences: string[];
  colorPreferences: string[];
  motionPreferences: string[];
  artDirectionPatterns: string[];
  portfolioStyle: string;
  caseStudyWritingStyle: string;
  designRules: string[];
  toAvoid: string[];
  favouriteMoves: string[];
  outputQualityStandards: string[];
  approvedExamples: string[];
  rejectedExamples: string[];
  lastUpdated: string;
}

// ─── Finance ─────────────────────────────────────────────────────────────────

export interface FinanceItem {
  id: string;
  label?: string;
  type: 'invoice' | 'expense' | 'retainer' | 'subscription' | 'salary' | 'freelance';
  amount: number;
  currency: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue' | 'recurring';
  project?: string;
  client?: string;
  notes?: string;
  dueDate?: string;
  category?: string;
}

// ─── Learning ─────────────────────────────────────────────────────────────────

export interface LearningGoal {
  id: string;
  skill: string;
  reason: string;
  currentLevel: number;
  targetLevel: number;
  category: string;
  resources: { title: string; type: 'video' | 'course' | 'article' | 'book'; url?: string }[];
  projectToPractice?: string;
  deadline?: string;
  progress: number;
  notes?: string;
  priority: 'high' | 'medium' | 'low';
  outputCreated?: string[];
}

// ─── Documents ────────────────────────────────────────────────────────────────

export type DocumentType =
  | 'case_study'
  | 'deck_outline'
  | 'brief'
  | 'proposal'
  | 'sow'
  | 'strategy'
  | 'prd'
  | 'portfolio_copy'
  | 'outreach'
  | 'interview_prep'
  | 'learning_plan'
  | 'weekly_review'
  | 'prompt_pack'
  | 'invoice_notes'
  | 'brand_guidelines'
  | 'webflow_cms'
  | 'standup'
  | 'draft';

export type DocumentStatus = 'draft' | 'in_progress' | 'review' | 'final' | 'archived';

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  content: string;
  status: DocumentStatus;
  relatedProject?: string;
  relatedOpportunity?: string;
  relatedReferences?: string[];
  tags: string[];
  exportFormat?: 'markdown' | 'pdf' | 'docx' | 'ppt';
  versionHistory?: { date: string; summary: string }[];
  createdAt: string;
  updatedAt: string;
}

// ─── Prompts ─────────────────────────────────────────────────────────────────

export type PromptCategory =
  | 'claude'
  | 'chatgpt'
  | 'replit'
  | 'figma'
  | 'webflow'
  | 'image_gen'
  | 'mockups'
  | 'case_studies'
  | 'decks'
  | 'outreach'
  | 'proposals'
  | 'portfolio'
  | 'moodboards'
  | 'design_critique'
  | 'ai_workflow';

export interface Prompt {
  id: string;
  title: string;
  category: PromptCategory;
  promptText: string;
  tool?: string;
  relatedProject?: string;
  tags: string[];
  resultQuality?: 'excellent' | 'good' | 'ok' | 'poor';
  notes?: string;
  lastUsedAt?: string;
  createdAt: string;
}

// ─── Agent Tasks ──────────────────────────────────────────────────────────────

export type AgentType =
  | 'creative_director'
  | 'portfolio'
  | 'opportunity'
  | 'finance'
  | 'learning'
  | 'production'
  | 'memory';

export type AgentTaskStatus = 'draft' | 'queued' | 'in_progress' | 'review' | 'approved' | 'revised' | 'completed' | 'archived';

export interface AgentTask {
  id: string;
  title: string;
  agentType: AgentType;
  status: AgentTaskStatus;
  prompt: string;
  output?: string;
  sourceIds?: string[];
  relatedProject?: string;
  relatedReferences?: string[];
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
}

// ─── Memory ───────────────────────────────────────────────────────────────────

export type MemoryType =
  | 'user_profile'
  | 'project'
  | 'design_language'
  | 'preference'
  | 'prompt'
  | 'opportunity'
  | 'finance'
  | 'learning'
  | 'lesson'
  | 'decision'
  | 'workflow'
  | 'pricing';

export interface Memory {
  id: string;
  type: MemoryType;
  source: string;
  content: string;
  tags: string[];
  confidence: number;
  lastUpdated: string;
  relatedEntityId?: string;
}

// ─── AI Output ────────────────────────────────────────────────────────────────

export interface AIOutput {
  id: string;
  type: string;
  input: Record<string, unknown>;
  output: string;
  sources: string[];
  relatedItems: string[];
  suggestedNextActions: string[];
  confidence: number;
  createdAt: string;
  savedAsDocumentId?: string;
  savedAsMemoryId?: string;
}

// ─── Therapy / Health ─────────────────────────────────────────────────────────
// NOTE: All therapy data is personal and lives ONLY in browser localStorage
// (key: 'ibra-os-therapy'). It is never seeded into committed sample data and
// never deployed publicly. Same handling as the KOHO finance import.

export type TherapySessionStatus = 'scheduled' | 'completed' | 'cancelled';

export interface TherapyActionItem {
  id: string;
  text: string;
  done: boolean;
  sessionId?: string;
}

export interface TherapyFrameworkPole {
  healthyVirtue: string;
  excess: string;
}

export interface TherapyFramework {
  id: string;
  name: string;
  summary: string;
  poles?: TherapyFrameworkPole[];
  notes?: string;
  sessionId?: string;
}

export interface TherapySelfRating {
  label: string;
  value: number; // 0–10
}

export interface TherapyExercise {
  id: string;
  title: string;
  why: string;
  how: string;
  effort?: 'low' | 'medium' | 'high';
  recommended?: boolean;
  done?: boolean;
}

export interface TherapySession {
  id: string;
  date: string;
  therapist: string;
  title: string;
  status: TherapySessionStatus;
  themes: string[];
  insights: string[];
  homework: string[];
  reflection?: string;
  selfRatings?: TherapySelfRating[];
}

export interface TherapyData {
  sessions: TherapySession[];
  frameworks: TherapyFramework[];
  actionItems: TherapyActionItem[];
  exercises: TherapyExercise[];
}

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface FileLink {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'figma' | 'video' | 'doc' | 'other';
  url: string;
  relatedEntityId?: string;
  uploadedAt: string;
}

export interface Tag {
  id: string;
  label: string;
  color?: string;
  category?: string;
}
