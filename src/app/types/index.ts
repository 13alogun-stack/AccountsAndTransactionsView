export type ProjectStatus = 'active' | 'completed' | 'paused' | 'planned' | 'archived';
export type ProjectCategory = 'brand' | 'product' | 'web' | 'motion' | 'campaign' | 'system' | 'concept' | 'poster';

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
  tools: string[];
  tags: string[];
  thumbnail?: string;
  color: string;
  designLanguageTags: string[];
  caseStudyDraft?: string;
  portfolioReadiness: number;
  nextAction?: string;
  figmaLink?: string;
  metrics?: string;
  teamSize?: number;
  featured?: boolean;
}

export type OpportunityStatus =
  | 'found'
  | 'interested'
  | 'applied'
  | 'replied'
  | 'interviewing'
  | 'follow_up'
  | 'proposal'
  | 'won'
  | 'lost'
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
  rateOrSalary?: string;
  notes?: string;
  outreachDraft?: string;
  followUpDate?: string;
  relatedProjects?: string[];
  nextAction?: string;
  createdAt: string;
  tags?: string[];
}

export interface Reference {
  id: string;
  title: string;
  source: string;
  imageUrl?: string;
  url?: string;
  tags: string[];
  mood: string[];
  category: 'web' | 'brand' | 'poster' | 'product' | 'type' | 'motion' | 'editorial' | 'campaign' | 'system';
  whyItWorks: string;
  relatedProjects?: string[];
  colorLanguage?: string;
  typographyNotes?: string;
  savedAt: string;
  color: string;
}

export interface DesignPrinciple {
  id: string;
  title: string;
  description: string;
  examples?: string[];
  tags?: string[];
}

export interface DesignLanguageTag {
  id: string;
  label: string;
  category: 'layout' | 'typography' | 'color' | 'motion' | 'tone' | 'craft';
  description?: string;
}

export interface FinanceItem {
  id: string;
  type: 'invoice' | 'expense' | 'retainer' | 'subscription';
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
}

export type AgentType =
  | 'creative_director'
  | 'portfolio'
  | 'opportunity'
  | 'finance'
  | 'learning'
  | 'production'
  | 'memory';

export type AgentTaskStatus = 'queued' | 'in_progress' | 'review' | 'completed' | 'archived';

export interface AgentTask {
  id: string;
  title: string;
  agentType: AgentType;
  status: AgentTaskStatus;
  prompt: string;
  output?: string;
  sourceIds?: string[];
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface Memory {
  id: string;
  type: 'project' | 'design_language' | 'preference' | 'prompt' | 'opportunity' | 'lesson' | 'pricing';
  source: string;
  content: string;
  tags: string[];
  confidence: number;
  lastUpdated: string;
}
