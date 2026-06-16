import { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Loader2, Check, Plus, BookOpen } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { Project, Opportunity } from '../types';
import {
  summarizeProject,
  generateCaseStudy,
  generateDeckOutline,
  generateWebsitePrompt,
  extractDesignLanguage,
  generateBaselineAndWild,
  scoreOpportunityFit,
  draftOutreach,
  type AIResult,
} from '../ai/mockAI';

interface ProjectAction {
  label: string;
  description: string;
  fn: () => Promise<AIResult>;
  docType?: string;
}

interface Props {
  project?: Project;
  opportunity?: Opportunity;
}

export function AIActionPanel({ project, opportunity }: Props) {
  const { projects, addDocument, addMemory, addAgentTask } = useApp();
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<AIResult | null>(null);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const projectActions: ProjectAction[] = project
    ? [
        {
          label: 'Summarize project',
          description: 'Quick overview and status',
          fn: () => summarizeProject(project),
        },
        {
          label: 'Generate case study',
          description: 'Full portfolio case study draft',
          fn: () => generateCaseStudy(project),
          docType: 'case_study',
        },
        {
          label: 'Generate deck outline',
          description: 'Slide-by-slide presentation structure',
          fn: () => generateDeckOutline(project),
          docType: 'deck_outline',
        },
        {
          label: 'Website / Webflow prompt',
          description: 'Build prompt for Webflow or Replit',
          fn: () => generateWebsitePrompt(project),
        },
        {
          label: 'Extract design language',
          description: 'Pull visual principles for memory',
          fn: () => extractDesignLanguage(project),
        },
        {
          label: 'Baseline + Wild directions',
          description: 'Two creative routes for this project',
          fn: () => generateBaselineAndWild(project),
        },
      ]
    : [];

  const oppActions: ProjectAction[] = opportunity
    ? [
        {
          label: 'Score fit',
          description: 'Rate this opportunity against your profile',
          fn: () => scoreOpportunityFit(opportunity, projects),
        },
        {
          label: 'Draft outreach',
          description: 'Write a tailored intro email',
          fn: () => draftOutreach(opportunity, projects),
          docType: 'outreach',
        },
      ]
    : [];

  const actions = [...projectActions, ...oppActions];

  const run = async (action: ProjectAction) => {
    setLoading(action.label);
    setActiveAction(action.label);
    setResult(null);
    setSaved(false);
    try {
      const r = await action.fn();
      setResult(r);
    } finally {
      setLoading(null);
    }
  };

  const saveAsDocument = () => {
    if (!result || !activeAction) return;
    const action = actions.find(a => a.label === activeAction);
    addDocument({
      title: `${project?.title ?? opportunity?.title ?? 'Output'} — ${activeAction}`,
      type: (action?.docType as any) ?? 'draft',
      content: result.output,
      status: 'draft',
      relatedProject: project?.id,
      relatedOpportunity: opportunity?.id,
      tags: ['ai-generated', ...(project?.tags?.slice(0, 2) ?? [])],
    });
    setSaved(true);
  };

  const saveAsMemory = () => {
    if (!result || !activeAction) return;
    addMemory({
      type: 'design_language',
      source: `AI · ${activeAction} · ${project?.title ?? opportunity?.title}`,
      content: result.output.slice(0, 500),
      tags: ['ai-generated', activeAction.toLowerCase().replace(/\s+/g, '-')],
      confidence: Math.round(result.confidence * 100),
    });
    setSaved(true);
  };

  const queueAsAgentTask = () => {
    if (!result || !activeAction) return;
    addAgentTask({
      title: `Review: ${activeAction} — ${project?.title ?? opportunity?.title}`,
      agentType: activeAction.includes('case study') || activeAction.includes('outreach') ? 'portfolio' : 'creative_director',
      status: 'review',
      prompt: activeAction,
      output: result.output,
      relatedProject: project?.id,
      sourceIds: project ? [project.id] : [],
      tags: ['ai-generated'],
      priority: 'medium',
    });
    setSaved(true);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={13} style={{ color: 'var(--os-orange)' }} />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--os-text-muted)',
          }}
        >
          AI Actions
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {actions.map(action => (
          <div key={action.label}>
            <button
              onClick={() => activeAction === action.label ? setActiveAction(null) : run(action)}
              disabled={loading !== null}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                background:
                  activeAction === action.label
                    ? 'rgba(232,80,4,0.1)'
                    : 'var(--os-surface-raised)',
                border: `1px solid ${activeAction === action.label ? 'rgba(232,80,4,0.3)' : 'var(--os-border)'}`,
                borderRadius: 8,
                cursor: loading ? 'wait' : 'pointer',
                transition: 'all 0.15s',
                textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
                  {action.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 1 }}>
                  {action.description}
                </div>
              </div>
              <div style={{ flexShrink: 0, marginLeft: 8, color: 'var(--os-text-muted)' }}>
                {loading === action.label ? (
                  <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                ) : activeAction === action.label && result ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </div>
            </button>

            {/* Result panel */}
            {activeAction === action.label && result && (
              <div className="ai-output-panel" style={{ marginTop: 6 }}>
                <pre
                  style={{
                    fontSize: 12,
                    lineHeight: 1.75,
                    color: 'var(--os-text-secondary)',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit',
                    margin: 0,
                    maxHeight: 320,
                    overflowY: 'auto',
                  }}
                >
                  {result.output}
                </pre>

                {result.suggestedNextActions.length > 0 && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-text-muted)', marginBottom: 6 }}>
                      Suggested next
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.suggestedNextActions.map(a => (
                        <span key={a} style={{ fontSize: 11, color: 'var(--os-text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 6 }}>
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2" style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {saved ? (
                    <span className="flex items-center gap-1" style={{ fontSize: 12, color: '#2dce89' }}>
                      <Check size={12} /> Saved
                    </span>
                  ) : (
                    <>
                      <button className="os-btn-primary" style={{ fontSize: 12, padding: '5px 10px' }} onClick={saveAsDocument}>
                        <Plus size={12} /> Save as doc
                      </button>
                      <button className="os-btn-secondary" style={{ fontSize: 12, padding: '5px 10px' }} onClick={saveAsMemory}>
                        <BookOpen size={12} /> Save as memory
                      </button>
                      <button className="os-btn-secondary" style={{ fontSize: 12, padding: '5px 10px' }} onClick={queueAsAgentTask}>
                        Queue for review
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
