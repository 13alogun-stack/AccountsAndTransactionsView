import { useState } from 'react';
import {
  Bot,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Send,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { AgentType, AgentTask } from '../types';

const AGENT_TYPES: { type: AgentType; label: string; description: string; color: string; actions: string[] }[] = [
  {
    type: 'creative_director',
    label: 'Creative Director',
    description: 'Art direction, moodboards, critiques, visual systems, baseline/wild directions',
    color: 'var(--os-gold)',
    actions: [
      'Generate baseline and wild directions',
      'Create a moodboard in my design language',
      'Critique this design',
      'Create 3 art directions for a project',
    ],
  },
  {
    type: 'portfolio',
    label: 'Portfolio Agent',
    description: 'Case studies, project summaries, portfolio page structures, Webflow CMS prep',
    color: 'var(--os-blue)',
    actions: [
      'Turn a project into a case study',
      'Prepare portfolio page structure',
      'Write a project summary',
      'Check what assets are missing',
    ],
  },
  {
    type: 'opportunity',
    label: 'Opportunity Agent',
    description: 'Job tracking, applications, outreach, follow-ups, role fit scoring',
    color: 'var(--os-purple)',
    actions: [
      'Score this opportunity against my goals',
      'Draft an outreach email',
      'Which portfolio pieces to send?',
      'Prepare interview talking points',
    ],
  },
  {
    type: 'finance',
    label: 'Finance Agent',
    description: 'Rate suggestions, project budgets, income tracking, proposal estimates',
    color: 'var(--os-green)',
    actions: [
      'Is this opportunity worth my time?',
      'What should I charge for this?',
      'Create a proposal estimate',
      'Show income vs. target',
    ],
  },
  {
    type: 'production',
    label: 'Production Agent',
    description: 'Docs, decks, proposals, prompts, Webflow build instructions',
    color: 'var(--os-teal)',
    actions: [
      'Create a deck from this project',
      'Write a statement of work',
      'Generate Claude-ready prompts',
      'Create a Webflow CMS structure',
    ],
  },
  {
    type: 'memory',
    label: 'Memory Curator',
    description: 'Cleans notes, tags projects, summarises conversations, maintains design-language profile',
    color: 'var(--os-red)',
    actions: [
      'Summarize this conversation',
      'Extract design language from project',
      'Clean and tag my notes',
      'Update my positioning statement',
    ],
  },
];

const statusConfig: Record<string, { label: string; color: string; Icon: typeof Clock }> = {
  queued: { label: 'Queued', color: 'var(--os-text-muted)', Icon: Clock },
  in_progress: { label: 'In Progress', color: 'var(--os-blue)', Icon: Loader2 },
  review: { label: 'Needs Review', color: 'var(--os-gold)', Icon: AlertCircle },
  completed: { label: 'Completed', color: 'var(--os-green)', Icon: CheckCircle2 },
};

const priorityColor: Record<string, string> = {
  high: 'var(--os-red)',
  medium: 'var(--os-yellow)',
  low: 'var(--os-text-muted)',
};

function TaskCard({ task, onExpand, expanded }: { task: AgentTask; expanded: boolean; onExpand: () => void }) {
  const status = statusConfig[task.status];
  const StatusIcon = status.Icon;
  const agent = AGENT_TYPES.find(a => a.type === task.agentType);

  return (
    <div
      className="os-card"
      style={{
        overflow: 'hidden',
        transition: 'border-color 0.15s',
        borderColor: expanded ? 'rgba(255,255,255,0.12)' : 'var(--os-border)',
      }}
    >
      <div
        onClick={onExpand}
        style={{ padding: '14px 16px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 12 }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: `${agent?.color}18`,
            border: `1px solid ${agent?.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Bot size={13} style={{ color: agent?.color }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex items-start justify-between gap-2">
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
              {task.title}
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 4,
                  background: `${priorityColor[task.priority]}18`,
                  color: priorityColor[task.priority],
                  textTransform: 'capitalize',
                }}
              >
                {task.priority}
              </span>
              <div className="flex items-center gap-1">
                <StatusIcon size={12} style={{ color: status.color }} />
                <span style={{ fontSize: 11, color: status.color, fontWeight: 500 }}>{status.label}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span style={{ fontSize: 11, color: agent?.color || 'var(--os-text-muted)', fontWeight: 500 }}>
              {agent?.label}
            </span>
            <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>·</span>
            <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>{task.createdAt}</span>
          </div>
        </div>

        {expanded ? (
          <ChevronUp size={14} style={{ color: 'var(--os-text-muted)', flexShrink: 0, marginTop: 2 }} />
        ) : (
          <ChevronDown size={14} style={{ color: 'var(--os-text-muted)', flexShrink: 0, marginTop: 2 }} />
        )}
      </div>

      {expanded && (
        <div style={{ borderTop: '1px solid var(--os-border)', padding: '16px' }}>
          {/* Prompt */}
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
              Prompt
            </p>
            <div
              style={{
                padding: '10px 12px',
                background: 'var(--os-surface-overlay)',
                borderRadius: 8,
                border: '1px solid var(--os-border)',
              }}
            >
              <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                {task.prompt}
              </p>
            </div>
          </div>

          {/* Output */}
          {task.output && (
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                Output
              </p>
              <div
                style={{
                  padding: '12px',
                  background: 'var(--os-surface-raised)',
                  borderRadius: 8,
                  border: '1px solid var(--os-border)',
                  maxHeight: 240,
                  overflowY: 'auto',
                }}
              >
                <p
                  style={{
                    fontSize: 12.5,
                    color: 'var(--os-text-secondary)',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {task.output}
                </p>
              </div>
            </div>
          )}

          {/* Review notes */}
          {task.reviewNotes && (
            <div
              style={{
                marginBottom: 14,
                padding: '10px 12px',
                background: 'var(--os-yellow-muted)',
                borderRadius: 8,
                border: '1px solid rgba(244,185,66,0.15)',
              }}
            >
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-yellow)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
                Review Notes
              </p>
              <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)' }}>{task.reviewNotes}</p>
            </div>
          )}

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {task.tags.map(tag => (
              <span key={tag} className="os-tag" style={{ fontSize: 10.5 }}>{tag}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4">
            {task.status === 'review' && (
              <button className="btn-gold" style={{ fontSize: 12 }}>
                <CheckCircle2 size={12} />
                Approve & save
              </button>
            )}
            {task.status !== 'completed' && task.status !== 'archived' && (
              <button className="btn-ghost" style={{ fontSize: 12 }}>
                <Send size={12} />
                Send to Claude
              </button>
            )}
            <button className="btn-ghost" style={{ fontSize: 12 }}>
              Export output
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Agents() {
  const { agentTasks, addAgentTask } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>('at1');
  const [showNewTask, setShowNewTask] = useState(false);
  const [newPrompt, setNewPrompt] = useState('');
  const [newAgent, setNewAgent] = useState<AgentType>('production');
  const [newTitle, setNewTitle] = useState('');
  const [activeTab, setActiveTab] = useState<'tasks' | 'agents'>('tasks');

  const statusGroups = {
    review: agentTasks.filter(t => t.status === 'review'),
    in_progress: agentTasks.filter(t => t.status === 'in_progress'),
    queued: agentTasks.filter(t => t.status === 'queued'),
    completed: agentTasks.filter(t => t.status === 'completed'),
  };

  const handleCreateTask = () => {
    if (!newTitle.trim() || !newPrompt.trim()) return;
    addAgentTask({
      title: newTitle,
      agentType: newAgent,
      status: 'queued',
      prompt: newPrompt,
      tags: [],
      priority: 'medium',
    });
    setNewTitle('');
    setNewPrompt('');
    setShowNewTask(false);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--os-text-primary)' }}>
              Agent Command Centre
            </h1>
            <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', marginTop: 3 }}>
              {statusGroups.review.length} need review &nbsp;·&nbsp; {statusGroups.in_progress.length} in progress
            </p>
          </div>
          <button className="btn-gold" onClick={() => setShowNewTask(true)}>
            <Plus size={13} />
            New Task
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mt-4">
          {['tasks', 'agents'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'tasks' | 'agents')}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                border: 'none',
                background: activeTab === tab ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: activeTab === tab ? 'var(--os-text-primary)' : 'var(--os-text-muted)',
                fontSize: 13,
                fontWeight: activeTab === tab ? 500 : 400,
                cursor: 'pointer',
                fontFamily: 'inherit',
                textTransform: 'capitalize',
                transition: 'all 0.15s',
              }}
            >
              {tab === 'tasks' ? 'Task Queue' : 'Agent Types'}
            </button>
          ))}
        </div>
      </div>

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* New task form */}
        {showNewTask && (
          <div
            className="os-card animate-in"
            style={{
              padding: 20,
              border: '1px solid rgba(201,168,68,0.2)',
              background: 'linear-gradient(135deg, rgba(201,168,68,0.03) 0%, var(--os-surface) 100%)',
            }}
          >
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-gold)', marginBottom: 14 }}>
              Create New Task
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Task title..."
                style={{
                  padding: '9px 12px',
                  background: 'var(--os-surface-overlay)',
                  border: '1px solid var(--os-border)',
                  borderRadius: 8,
                  color: 'var(--os-text-primary)',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  outline: 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 10 }}>
                <textarea
                  value={newPrompt}
                  onChange={e => setNewPrompt(e.target.value)}
                  placeholder="Describe what you want the agent to do..."
                  rows={3}
                  style={{
                    padding: '9px 12px',
                    background: 'var(--os-surface-overlay)',
                    border: '1px solid var(--os-border)',
                    borderRadius: 8,
                    color: 'var(--os-text-primary)',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    outline: 'none',
                    resize: 'none',
                    width: '100%',
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Agent</p>
                  <select
                    value={newAgent}
                    onChange={e => setNewAgent(e.target.value as AgentType)}
                    style={{
                      padding: '8px 10px',
                      background: 'var(--os-surface-overlay)',
                      border: '1px solid var(--os-border)',
                      borderRadius: 8,
                      color: 'var(--os-text-primary)',
                      fontSize: 12.5,
                      fontFamily: 'inherit',
                      outline: 'none',
                      cursor: 'pointer',
                      flex: 1,
                    }}
                  >
                    {AGENT_TYPES.map(a => (
                      <option key={a.type} value={a.type}>{a.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-gold" onClick={handleCreateTask}>
                  <Send size={12} />
                  Queue Task
                </button>
                <button className="btn-ghost" onClick={() => setShowNewTask(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Needs review */}
            {statusGroups.review.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--os-gold)' }} />
                  <p style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--os-gold)' }}>
                    Needs Review ({statusGroups.review.length})
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {statusGroups.review.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      expanded={expandedId === task.id}
                      onExpand={() => setExpandedId(expandedId === task.id ? null : task.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* In progress */}
            {statusGroups.in_progress.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--os-blue)' }} />
                  <p style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--os-blue)' }}>
                    In Progress ({statusGroups.in_progress.length})
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {statusGroups.in_progress.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      expanded={expandedId === task.id}
                      onExpand={() => setExpandedId(expandedId === task.id ? null : task.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Queued */}
            {statusGroups.queued.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--os-text-muted)' }} />
                  <p style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--os-text-secondary)' }}>
                    Queued ({statusGroups.queued.length})
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {statusGroups.queued.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      expanded={expandedId === task.id}
                      onExpand={() => setExpandedId(expandedId === task.id ? null : task.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed */}
            {statusGroups.completed.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--os-green)' }} />
                  <p style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--os-green)' }}>
                    Completed ({statusGroups.completed.length})
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {statusGroups.completed.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      expanded={expandedId === task.id}
                      onExpand={() => setExpandedId(expandedId === task.id ? null : task.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'agents' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {AGENT_TYPES.map(agent => (
              <div
                key={agent.type}
                className="os-card"
                style={{
                  padding: 18,
                  transition: 'border-color 0.15s',
                  cursor: 'default',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = `${agent.color}30`)}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--os-border)')}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 9,
                      background: `${agent.color}18`,
                      border: `1px solid ${agent.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Bot size={14} style={{ color: agent.color }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)' }}>{agent.label}</p>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'var(--os-text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
                  {agent.description}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {agent.actions.map(action => (
                    <button
                      key={action}
                      onClick={() => {
                        setNewAgent(agent.type);
                        setNewPrompt(action);
                        setNewTitle(action);
                        setShowNewTask(true);
                        setActiveTab('tasks');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                        padding: '6px 8px',
                        borderRadius: 7,
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        color: 'var(--os-text-muted)',
                        fontSize: 11.5,
                        fontFamily: 'inherit',
                        textAlign: 'left',
                        transition: 'all 0.1s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = `${agent.color}12`;
                        (e.currentTarget as HTMLButtonElement).style.color = agent.color;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                        (e.currentTarget as HTMLButtonElement).style.color = 'var(--os-text-muted)';
                      }}
                    >
                      <Sparkles size={11} />
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
