import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  Project,
  Opportunity,
  Reference,
  FinanceItem,
  LearningGoal,
  AgentTask,
  Memory,
} from '../types';
import {
  SAMPLE_PROJECTS,
  SAMPLE_OPPORTUNITIES,
  SAMPLE_REFERENCES,
  SAMPLE_FINANCE,
  SAMPLE_LEARNING,
  SAMPLE_AGENT_TASKS,
  SAMPLE_MEMORIES,
} from '../data/sample';

interface AppState {
  projects: Project[];
  opportunities: Opportunity[];
  references: Reference[];
  financeItems: FinanceItem[];
  learningGoals: LearningGoal[];
  agentTasks: AgentTask[];
  memories: Memory[];
  commandBarOpen: boolean;
}

interface AppContextValue extends AppState {
  setCommandBarOpen: (open: boolean) => void;
  addAgentTask: (task: Omit<AgentTask, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateAgentTask: (id: string, updates: Partial<AgentTask>) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [projects] = useState<Project[]>(SAMPLE_PROJECTS);
  const [opportunities] = useState<Opportunity[]>(SAMPLE_OPPORTUNITIES);
  const [references] = useState<Reference[]>(SAMPLE_REFERENCES);
  const [financeItems] = useState<FinanceItem[]>(SAMPLE_FINANCE);
  const [learningGoals] = useState<LearningGoal[]>(SAMPLE_LEARNING);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>(SAMPLE_AGENT_TASKS);
  const [memories] = useState<Memory[]>(SAMPLE_MEMORIES);
  const [commandBarOpen, setCommandBarOpen] = useState(false);

  const addAgentTask = (task: Omit<AgentTask, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newTask: AgentTask = {
      ...task,
      id: `at${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setAgentTasks(prev => [newTask, ...prev]);
  };

  const updateAgentTask = (id: string, updates: Partial<AgentTask>) => {
    setAgentTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : t))
    );
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
        commandBarOpen,
        setCommandBarOpen,
        addAgentTask,
        updateAgentTask,
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
