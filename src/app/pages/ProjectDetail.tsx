import { useParams, Link } from 'react-router';
import {
  ArrowLeft,
  ExternalLink,
  Bot,
  FileText,
  Tag,
  Target,
  ChevronRight,
  Figma,
  Zap,
} from 'lucide-react';
import { useApp } from '../store/AppContext';

const AGENT_ACTIONS = [
  'Turn this project into a case study',
  'Create a deck from this project',
  'Extract the design language',
  'Generate a portfolio thumbnail concept',
  'Write a LinkedIn post about this',
  'Suggest what is missing for portfolio',
  'Create baseline and wild directions',
  'Compare to another project',
];

const STATUS_COLORS: Record<string, string> = {
  active: 'var(--os-green)',
  completed: 'var(--os-text-muted)',
  paused: 'var(--os-yellow)',
  planned: 'var(--os-blue)',
  archived: 'var(--os-text-muted)',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useApp();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div style={{ padding: 40 }}>
        <Link to="/projects" style={{ color: 'var(--os-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <ArrowLeft size={14} /> Back to Projects
        </Link>
        <p style={{ color: 'var(--os-text-secondary)', marginTop: 40, textAlign: 'center' }}>Project not found.</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <Link
          to="/projects"
          style={{
            color: 'var(--os-text-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            marginBottom: 16,
          }}
        >
          <ArrowLeft size={12} /> Projects
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: project.color,
                marginTop: 7,
                flexShrink: 0,
              }}
            />
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--os-text-primary)' }}>
                {project.title}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span style={{ fontSize: 12.5, color: 'var(--os-text-secondary)' }}>
                  {project.client} · {project.year}
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 5,
                    background: `${STATUS_COLORS[project.status]}18`,
                    color: STATUS_COLORS[project.status],
                    letterSpacing: '0.02em',
                  }}
                >
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {project.figmaLink && (
              <button className="btn-ghost">
                <Figma size={13} />
                Figma
                <ExternalLink size={11} />
              </button>
            )}
            <button className="btn-gold">
              <Bot size={13} />
              Ask Agent
            </button>
          </div>
        </div>
      </div>

      <div className="page-content" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        {/* Main column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Summary */}
          <div className="os-card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
              Summary
            </h3>
            <p style={{ fontSize: 13.5, color: 'var(--os-text-secondary)', lineHeight: 1.7 }}>
              {project.description}
            </p>
            {project.metrics && (
              <div
                style={{
                  marginTop: 14,
                  padding: '10px 14px',
                  background: 'var(--os-green-muted)',
                  borderRadius: 8,
                  border: '1px solid rgba(45,206,137,0.15)',
                }}
              >
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--os-green)', marginBottom: 2 }}>
                  Outcome
                </p>
                <p style={{ fontSize: 13, color: 'var(--os-text-secondary)' }}>{project.metrics}</p>
              </div>
            )}
          </div>

          {/* Case Study Draft */}
          {project.caseStudyDraft && (
            <div className="os-card" style={{ padding: 20 }}>
              <div className="flex items-center justify-between mb-3">
                <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Case Study Draft
                </h3>
                <span
                  style={{
                    fontSize: 10,
                    padding: '2px 7px',
                    borderRadius: 5,
                    background: 'var(--os-yellow-muted)',
                    color: 'var(--os-yellow)',
                    fontWeight: 500,
                  }}
                >
                  Draft
                </span>
              </div>
              <p style={{ fontSize: 13.5, color: 'var(--os-text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {project.caseStudyDraft}
              </p>
              <div className="flex gap-2 mt-3">
                <button className="btn-ghost">Edit draft</button>
                <button className="btn-gold">
                  <Bot size={12} />
                  Expand with Agent
                </button>
              </div>
            </div>
          )}

          {/* Design Language */}
          <div className="os-card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>
              Design Language Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.designLanguageTags.map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 20,
                    fontSize: 11.5,
                    background: 'var(--os-gold-muted)',
                    color: 'var(--os-gold)',
                    border: '1px solid rgba(201,168,68,0.2)',
                  }}
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Tags */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="os-card" style={{ padding: 16 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
                Tools
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map(t => (
                  <span key={t} className="os-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="os-card" style={{ padding: 16 }}>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(t => (
                  <span key={t} className="os-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Portfolio readiness */}
          <div className="os-card" style={{ padding: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
              Portfolio Readiness
            </p>
            <div style={{ display: 'flex', align: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: project.portfolioReadiness >= 80 ? 'var(--os-green)' : project.portfolioReadiness >= 50 ? 'var(--os-gold)' : 'var(--os-red)',
                }}
              >
                {project.portfolioReadiness}%
              </span>
            </div>
            <div className="os-progress" style={{ height: 4 }}>
              <div
                className="os-progress-fill"
                style={{
                  width: `${project.portfolioReadiness}%`,
                  background: project.portfolioReadiness >= 80 ? 'var(--os-green)' : project.portfolioReadiness >= 50 ? 'var(--os-gold)' : 'var(--os-red)',
                }}
              />
            </div>
          </div>

          {/* Next action */}
          {project.nextAction && (
            <div className="os-card" style={{ padding: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
                Next Action
              </p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <Target size={13} style={{ color: 'var(--os-gold)', marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontSize: 12.5, color: 'var(--os-text-primary)', lineHeight: 1.5 }}>{project.nextAction}</p>
              </div>
            </div>
          )}

          {/* Project meta */}
          <div className="os-card" style={{ padding: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
              Details
            </p>
            {[
              { label: 'Role', value: project.role },
              { label: 'Industry', value: project.industry },
              { label: 'Category', value: project.category },
              { label: 'Year', value: String(project.year) },
              ...(project.teamSize ? [{ label: 'Team', value: `${project.teamSize} people` }] : []),
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--os-border)' }}>
                <span style={{ fontSize: 11.5, color: 'var(--os-text-muted)' }}>{item.label}</span>
                <span style={{ fontSize: 12.5, color: 'var(--os-text-primary)', fontWeight: 450 }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Agent Actions */}
          <div className="os-card" style={{ padding: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
              Agent Actions
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {AGENT_ACTIONS.map(action => (
                <button
                  key={action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 7,
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: 'var(--os-text-secondary)',
                    fontSize: 12,
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    transition: 'background 0.1s, color 0.1s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'var(--os-gold-muted)';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--os-gold)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = 'var(--os-text-secondary)';
                  }}
                >
                  <span>{action}</span>
                  <ChevronRight size={12} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
