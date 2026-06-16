import { createContext, useContext, useState, type ReactNode } from 'react';
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
} from '../data/sample';

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
function genId(prefix: string) { return `${prefix}${Date.now()}`; }

export function AppProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(SAMPLE_PROJECTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(SAMPLE_OPPORTUNITIES);
  const [references] = useState<Reference[]>(SAMPLE_REFERENCES);
  const [financeItems] = useState<FinanceItem[]>(SAMPLE_FINANCE);
  const [learningGoals] = useState<LearningGoal[]>(SAMPLE_LEARNING);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>(SAMPLE_AGENT_TASKS);
  const [memories, setMemories] = useState<Memory[]>(SAMPLE_MEMORIES);
  const [documents, setDocuments] = useState<Document[]>(SAMPLE_DOCUMENTS);
  const [prompts, setPrompts] = useState<Prompt[]>(SAMPLE_PROMPTS);
  const [designLanguageProfile, setDesignLanguageProfile] = useState<DesignLanguageProfile>(DESIGN_LANGUAGE_PROFILE);
  const [commandBarOpen, setCommandBarOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');

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
    const newPrompt: Prompt = { ...prompt, id: genId('pr'), createdAt: nowDate() };
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
