import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  Project,
  Opportunity,
  Reference,
  FinanceItem,
  LearningGoal,
  AgentTask,
  Memory,
  Document,
  Prompt,
  DesignLanguageProfile,
  DumpItem,
  Priority,
} from '../types';
import {
  SAMPLE_PROJECTS,
  SAMPLE_OPPORTUNITIES,
  SAMPLE_REFERENCES,
  SAMPLE_FINANCE,
  SAMPLE_LEARNING,
  SAMPLE_AGENT_TASKS,
  SAMPLE_MEMORIES,
  SAMPLE_DOCUMENTS,
  SAMPLE_PROMPTS,
  DESIGN_LANGUAGE_PROFILE,
  MONTHLY_TARGET,
} from '../data/sample';

// ─── Persistence ──────────────────────────────────────────────────────────────
// Everything the user creates/edits survives reload. localStorage only — no
// backend, no sync, no cost. Therapy data has its own key (see Therapy.tsx).
const STORE_KEY = 'ibra-os-data-v1';

interface PersistShape {
  projects?: Project[];
  opportunities?: Opportunity[];
  agentTasks?: AgentTask[];
  memories?: Memory[];
  documents?: Document[];
  prompts?: Prompt[];
  designLanguageProfile?: DesignLanguageProfile;
  dumps?: DumpItem[];
  priorities?: Priority[];
}

function loadPersisted(): PersistShape {
  try {
    const s = localStorage.getItem(STORE_KEY);
    return s ? JSON.parse(s) : {};
  } catch {
    return {};
  }
}

const DEFAULT_PRIORITIES: Priority[] = [
  { id: 'pr1', label: 'Write one paragraph of the PCMB case study', urgency: 'high', project: 'Portfolio', done: false, createdAt: '2026-06-30' },
  { id: 'pr2', label: 'Decide DX Studio homepage direction — baseline or wild', urgency: 'high', project: 'Studio', done: false, createdAt: '2026-06-30' },
  { id: 'pr3', label: 'Follow up with Vercel — screening call', urgency: 'high', project: 'Opportunity', done: false, createdAt: '2026-06-30' },
  { id: 'pr4', label: 'Document SHN provider portal decisions', urgency: 'medium', project: 'SHN · Loblaw', done: false, createdAt: '2026-06-30' },
  { id: 'pr5', label: 'Figure out the monthly savings target', urgency: 'low', project: 'Finance', done: false, createdAt: '2026-06-30' },
];

interface AppState {
  projects: Project[];
  opportunities: Opportunity[];
  references: Reference[];
  financeItems: FinanceItem[];
  learningGoals: LearningGoal[];
  agentTasks: AgentTask[];
  memories: Memory[];
  documents: Document[];
  prompts: Prompt[];
  designLanguageProfile: DesignLanguageProfile;
  dumps: DumpItem[];
  priorities: Priority[];
  commandBarOpen: boolean;
  globalQuery: string;
}

interface AppContextValue extends AppState {
  setCommandBarOpen: (open: boolean) => void;
  setGlobalQuery: (q: string) => void;

  // Agent tasks
  addAgentTask: (task: Omit<AgentTask, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAgentTask: (id: string, updates: Partial<AgentTask>) => void;

  // Documents
  addDocument: (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => Document;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;

  // Prompts
  addPrompt: (prompt: Omit<Prompt, 'id' | 'createdAt'>) => Prompt;
  updatePrompt: (id: string, updates: Partial<Prompt>) => void;
  deletePrompt: (id: string) => void;

  // Memories
  addMemory: (memory: Omit<Memory, 'id' | 'lastUpdated'>) => Memory;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;

  // Projects (add/update)
  addProject: (project: Omit<Project, 'id'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;

  // Opportunities (add/update)
  addOpportunity: (opp: Omit<Opportunity, 'id' | 'createdAt'>) => Opportunity;
  updateOpportunity: (id: string, updates: Partial<Opportunity>) => void;

  // Design Language
  updateDesignLanguageProfile: (updates: Partial<DesignLanguageProfile>) => void;

  // Dump / capture
  addDump: (text: string) => void;
  updateDump: (id: string, updates: Partial<DumpItem>) => void;
  deleteDump: (id: string) => void;

  // Priorities (Today / Focus)
  addPriority: (label: string, urgency?: Priority['urgency'], project?: string) => void;
  togglePriority: (id: string) => void;
  deletePriority: (id: string) => void;

  // Context brief for pasting into Claude/ChatGPT
  buildContextBrief: () => string;

  // Search
  searchAll: (query: string) => SearchResult[];
}

export interface SearchResult {
  id: string;
  type: 'project' | 'opportunity' | 'document' | 'prompt' | 'memory' | 'reference' | 'agent_task';
  title: string;
  subtitle?: string;
  path: string;
}

const AppContext = createContext<AppContextValue | null>(null);

function nowDate() { return new Date().toISOString().split('T')[0]; }
function genId(prefix: string) { return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`; }

export function AppProvider({ children }: { children: ReactNode }) {
  const [persisted] = useState<PersistShape>(loadPersisted);

  const [projects, setProjects] = useState<Project[]>(() => persisted.projects ?? SAMPLE_PROJECTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => persisted.opportunities ?? SAMPLE_OPPORTUNITIES);
  const [references] = useState<Reference[]>(SAMPLE_REFERENCES);
  const [financeItems] = useState<FinanceItem[]>(SAMPLE_FINANCE);
  const [learningGoals] = useState<LearningGoal[]>(SAMPLE_LEARNING);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>(() => persisted.agentTasks ?? SAMPLE_AGENT_TASKS);
  const [memories, setMemories] = useState<Memory[]>(() => persisted.memories ?? SAMPLE_MEMORIES);
  const [documents, setDocuments] = useState<Document[]>(() => persisted.documents ?? SAMPLE_DOCUMENTS);
  const [prompts, setPrompts] = useState<Prompt[]>(() => persisted.prompts ?? SAMPLE_PROMPTS);
  const [designLanguageProfile, setDesignLanguageProfile] = useState<DesignLanguageProfile>(
    () => persisted.designLanguageProfile ?? DESIGN_LANGUAGE_PROFILE
  );
  const [dumps, setDumps] = useState<DumpItem[]>(() => persisted.dumps ?? []);
  const [priorities, setPriorities] = useState<Priority[]>(() => persisted.priorities ?? DEFAULT_PRIORITIES);
  const [commandBarOpen, setCommandBarOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        projects, opportunities, agentTasks, memories, documents, prompts,
        designLanguageProfile, dumps, priorities,
      }));
    } catch { /* quota — ignore */ }
  }, [projects, opportunities, agentTasks, memories, documents, prompts, designLanguageProfile, dumps, priorities]);

  // ─── Agent tasks ────────────────────────────────────────────────────────────
  const addAgentTask = (task: Omit<AgentTask, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = nowDate();
    setAgentTasks(prev => [{ ...task, id: genId('at'), createdAt: now, updatedAt: now }, ...prev]);
  };

  const updateAgentTask = (id: string, updates: Partial<AgentTask>) => {
    setAgentTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates, updatedAt: nowDate() } : t));
  };

  // ─── Documents ──────────────────────────────────────────────────────────────
  const addDocument = (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = nowDate();
    const newDoc: Document = { ...doc, id: genId('doc'), createdAt: now, updatedAt: now };
    setDocuments(prev => [newDoc, ...prev]);
    return newDoc;
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(d => d.id === id ? { ...d, ...updates, updatedAt: nowDate() } : d));
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  // ─── Prompts ────────────────────────────────────────────────────────────────
  const addPrompt = (prompt: Omit<Prompt, 'id' | 'createdAt'>) => {
    const newPrompt: Prompt = { ...prompt, id: genId('pm'), createdAt: nowDate() };
    setPrompts(prev => [newPrompt, ...prev]);
    return newPrompt;
  };

  const updatePrompt = (id: string, updates: Partial<Prompt>) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deletePrompt = (id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  // ─── Memories ───────────────────────────────────────────────────────────────
  const addMemory = (memory: Omit<Memory, 'id' | 'lastUpdated'>) => {
    const newMem: Memory = { ...memory, id: genId('m'), lastUpdated: nowDate() };
    setMemories(prev => [newMem, ...prev]);
    return newMem;
  };

  const updateMemory = (id: string, updates: Partial<Memory>) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, ...updates, lastUpdated: nowDate() } : m));
  };

  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
  };

  // ─── Projects ───────────────────────────────────────────────────────────────
  const addProject = (project: Omit<Project, 'id'>) => {
    const newP: Project = { ...project, id: genId('p') };
    setProjects(prev => [newP, ...prev]);
    return newP;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  // ─── Opportunities ──────────────────────────────────────────────────────────
  const addOpportunity = (opp: Omit<Opportunity, 'id' | 'createdAt'>) => {
    const newOpp: Opportunity = { ...opp, id: genId('o'), createdAt: nowDate() };
    setOpportunities(prev => [newOpp, ...prev]);
    return newOpp;
  };

  const updateOpportunity = (id: string, updates: Partial<Opportunity>) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  // ─── Design Language ────────────────────────────────────────────────────────
  const updateDesignLanguageProfile = (updates: Partial<DesignLanguageProfile>) => {
    setDesignLanguageProfile(prev => ({ ...prev, ...updates, lastUpdated: nowDate() }));
  };

  // ─── Dump / capture ─────────────────────────────────────────────────────────
  const addDump = (text: string) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;
    const now = nowDate();
    setDumps(prev => [
      ...lines.map(l => ({ id: genId('du'), text: l, createdAt: now, status: 'inbox' as const })),
      ...prev,
    ]);
  };

  const updateDump = (id: string, updates: Partial<DumpItem>) => {
    setDumps(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const deleteDump = (id: string) => {
    setDumps(prev => prev.filter(d => d.id !== id));
  };

  // ─── Priorities (Today / Focus) ─────────────────────────────────────────────
  const addPriority = (label: string, urgency: Priority['urgency'] = 'medium', project?: string) => {
    if (!label.trim()) return;
    setPriorities(prev => [
      { id: genId('pri'), label: label.trim(), urgency, project, done: false, createdAt: nowDate() },
      ...prev,
    ]);
  };

  const togglePriority = (id: string) => {
    setPriorities(prev => prev.map(p => p.id === id ? { ...p, done: !p.done } : p));
  };

  const deletePriority = (id: string) => {
    setPriorities(prev => prev.filter(p => p.id !== id));
  };

  // ─── Context brief — paste into Claude/ChatGPT ──────────────────────────────
  // The free "talk to it": the OS is the memory, your existing AI chat is the
  // brain. Excludes therapy data by design.
  const buildContextBrief = (): string => {
    const now = new Date();
    const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const paid = financeItems
      .filter(f => f.status === 'paid' && f.date.startsWith(ym))
      .reduce((s, f) => s + f.amount, 0);
    const openPr = priorities.filter(p => !p.done);
    const inbox = dumps.filter(d => d.status === 'inbox');
    const active = projects.filter(p => p.status === 'active');
    const pipeline = opportunities.filter(o =>
      ['applied', 'replied', 'interviewing', 'follow_up', 'proposal'].includes(o.status));
    const review = agentTasks.filter(t => t.status === 'review');

    const lines: string[] = [
      `IBRA OS BRIEF — ${now.toLocaleDateString('en-CA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
      '',
      `TODAY (${openPr.length} open):`,
      ...openPr.slice(0, 8).map(p => `- [${p.urgency.toUpperCase()}] ${p.label}${p.project ? ` (${p.project})` : ''}`),
      '',
      `INBOX (${inbox.length} untriaged):`,
      ...inbox.slice(0, 6).map(d => `- ${d.text}`),
      '',
      `ACTIVE PROJECTS:`,
      ...active.map(p => `- ${p.title} (${p.client}) — ${p.portfolioReadiness}% ready — next: ${p.nextAction ?? '—'}`),
      '',
      `PIPELINE (${pipeline.length}):`,
      ...pipeline.slice(0, 6).map(o => `- ${o.title} @ ${o.company} — ${o.status.replace('_', ' ')} — fit ${o.fitScore}/10`),
      '',
      `FINANCE: $${paid.toLocaleString()} of $${MONTHLY_TARGET.toLocaleString()} this month (${Math.round((paid / MONTHLY_TARGET) * 100)}%)`,
      `AGENT QUEUE: ${review.length} awaiting review`,
      '',
      `RECENT MEMORIES:`,
      ...memories.slice(0, 4).map(m => `- [${m.type}] ${m.content.slice(0, 120)}`),
      '',
      'Use this as my current context. I am Ibra — multidisciplinary designer, Toronto, DX Studio at Loblaw Digital.',
    ];
    return lines.join('\n');
  };

  // ─── Global search ──────────────────────────────────────────────────────────
  const searchAll = (query: string): SearchResult[] => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    projects.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) {
        results.push({ id: p.id, type: 'project', title: p.title, subtitle: p.client, path: `/projects/${p.id}` });
      }
    });

    opportunities.forEach(o => {
      if (o.title.toLowerCase().includes(q) || o.company.toLowerCase().includes(q)) {
        results.push({ id: o.id, type: 'opportunity', title: o.title, subtitle: o.company, path: '/opportunities' });
      }
    });

    documents.forEach(d => {
      if (d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q)) {
        results.push({ id: d.id, type: 'document', title: d.title, subtitle: d.type.replace(/_/g, ' '), path: '/documents' });
      }
    });

    prompts.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.promptText.toLowerCase().includes(q)) {
        results.push({ id: p.id, type: 'prompt', title: p.title, subtitle: p.category, path: '/prompts' });
      }
    });

    memories.forEach(m => {
      if (m.content.toLowerCase().includes(q) || m.tags.some(t => t.includes(q))) {
        results.push({ id: m.id, type: 'memory', title: m.source, subtitle: m.content.slice(0, 60) + '...', path: '/memories' });
      }
    });

    agentTasks.forEach(t => {
      if (t.title.toLowerCase().includes(q)) {
        results.push({ id: t.id, type: 'agent_task', title: t.title, subtitle: t.agentType.replace(/_/g, ' '), path: '/agents' });
      }
    });

    return results.slice(0, 20);
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        opportunities,
        references,
        financeItems,
        learningGoals,
        agentTasks,
        memories,
        documents,
        prompts,
        designLanguageProfile,
        dumps,
        priorities,
        commandBarOpen,
        globalQuery,
        setCommandBarOpen,
        setGlobalQuery,
        addAgentTask,
        updateAgentTask,
        addDocument,
        updateDocument,
        deleteDocument,
        addPrompt,
        updatePrompt,
        deletePrompt,
        addMemory,
        updateMemory,
        deleteMemory,
        addProject,
        updateProject,
        addOpportunity,
        updateOpportunity,
        updateDesignLanguageProfile,
        addDump,
        updateDump,
        deleteDump,
        addPriority,
        togglePriority,
        deletePriority,
        buildContextBrief,
        searchAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
