import { useState } from 'react';
import { Plus, MapPin, Globe, DollarSign, Bot, ChevronRight, ExternalLink } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { OpportunityStatus } from '../types';

const PIPELINE_STAGES: { status: OpportunityStatus; label: string; color: string }[] = [
  { status: 'interested', label: 'Interested', color: 'var(--os-text-muted)' },
  { status: 'applied', label: 'Applied', color: 'var(--os-blue)' },
  { status: 'replied', label: 'Replied', color: 'var(--os-purple)' },
  { status: 'interviewing', label: 'Interviewing', color: 'var(--os-gold)' },
  { status: 'follow_up', label: 'Follow Up', color: 'var(--os-yellow)' },
  { status: 'proposal', label: 'Proposal', color: 'var(--os-teal)' },
];

const typeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  contract: 'Contract',
  freelance: 'Freelance',
  fractional: 'Fractional',
};

const typeColors: Record<string, string> = {
  'full-time': 'var(--os-blue)',
  contract: 'var(--os-purple)',
  freelance: 'var(--os-teal)',
  fractional: 'var(--os-gold)',
};

function FitBadge({ score }: { score: number }) {
  const color = score >= 8 ? 'var(--os-green)' : score >= 6 ? 'var(--os-yellow)' : 'var(--os-red)';
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: '2px 7px',
        borderRadius: 5,
        background: `${color}18`,
        color,
        flexShrink: 0,
      }}
    >
      {score}/10
    </span>
  );
}

const FitRing = ({ score }: { score: number }) => {
  const r = 14, circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  return (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r={r} fill="none" stroke="#2a2a3a" strokeWidth="3" />
      <circle
        cx="18" cy="18" r={r} fill="none" stroke="#c9a844" strokeWidth="3"
        strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 18 18)"
      />
      <text x="18" y="22" textAnchor="middle" fill="#e8e8f0" fontSize="9" fontWeight="bold">{score}</text>
    </svg>
  );
};

export default function Opportunities() {
  const { opportunities } = useApp();
  const [view, setView] = useState<'board' | 'list'>('board');
  const [selected, setSelected] = useState<string | null>(null);

  const won = opportunities.filter(o => o.status === 'won');
  const active = opportunities.filter(o =>
    ['found', 'interested', 'applied', 'replied', 'interviewing', 'follow_up', 'proposal'].includes(o.status)
  );
  const avgFit = active.reduce((s, o) => s + o.fitScore, 0) / (active.length || 1);

  const selectedOpp = opportunities.find(o => o.id === selected);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--os-text-primary)' }}>
              Opportunity Tracker
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <span style={{ fontSize: 12.5, color: 'var(--os-text-secondary)' }}>
                {active.length} active &nbsp;·&nbsp; Avg fit {avgFit.toFixed(1)}/10
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center"
              style={{
                background: 'var(--os-surface-raised)',
                border: '1px solid var(--os-border)',
                borderRadius: 8,
                padding: 2,
              }}
            >
              {['board', 'list'].map(v => (
                <button
                  key={v}
                  onClick={() => setView(v as 'board' | 'list')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 6,
                    border: 'none',
                    background: view === v ? 'rgba(255,255,255,0.08)' : 'transparent',
                    color: view === v ? 'var(--os-text-primary)' : 'var(--os-text-muted)',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontFamily: 'inherit',
                    fontWeight: view === v ? 500 : 400,
                    textTransform: 'capitalize',
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
            <button className="btn-gold">
              <Plus size={13} />
              Add Opportunity
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 mt-4">
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>Active</p>
            <p style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}>{active.length}</p>
          </div>
          <div style={{ width: 1, height: 28, background: 'var(--os-border)' }} />
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>Interviewing</p>
            <p style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-gold)' }}>
              {opportunities.filter(o => o.status === 'interviewing').length}
            </p>
          </div>
          <div style={{ width: 1, height: 28, background: 'var(--os-border)' }} />
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>Proposals Out</p>
            <p style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-teal)' }}>
              {opportunities.filter(o => o.status === 'proposal').length}
            </p>
          </div>
          <div style={{ width: 1, height: 28, background: 'var(--os-border)' }} />
          <div>
            <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>Rate Floor</p>
            <p style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}>$65/hr</p>
          </div>
        </div>
      </div>

      <div className="page-content">
        {view === 'board' ? (
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 20 }}>
            {PIPELINE_STAGES.map(stage => {
              const stageOpps = opportunities.filter(o => o.status === stage.status);
              return (
                <div key={stage.status} className="kanban-column" style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Column header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: stage.color }} />
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--os-text-primary)' }}>{stage.label}</span>
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '1px 6px',
                        borderRadius: 999,
                        background: 'rgba(255,255,255,0.06)',
                        color: 'var(--os-text-muted)',
                      }}
                    >
                      {stageOpps.length}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    {stageOpps.map(opp => (
                      <div
                        key={opp.id}
                        onClick={() => setSelected(selected === opp.id ? null : opp.id)}
                        style={{
                          padding: '12px',
                          background: selected === opp.id
                            ? 'linear-gradient(135deg, #1a1a24 0%, #20202e 100%)'
                            : 'linear-gradient(135deg, #111118 0%, #1a1a24 100%)',
                          border: `1px solid ${selected === opp.id ? 'rgba(201,168,68,0.3)' : 'var(--os-border)'}`,
                          borderRadius: 10,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 7,
                              background: 'var(--os-surface)',
                              border: '1px solid var(--os-border)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 10,
                              fontWeight: 700,
                              color: 'var(--os-text-secondary)',
                              flexShrink: 0,
                            }}
                          >
                            {opp.company.slice(0, 2).toUpperCase()}
                          </div>
                          <FitRing score={Math.round(opp.fitScore * 10)} />
                        </div>
                        <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--os-text-primary)', lineHeight: 1.3, marginBottom: 3 }}>
                          {opp.title}
                        </p>
                        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--os-text-secondary)', marginBottom: 6 }}>{opp.company}</p>
                        <div className="flex items-center gap-2">
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 500,
                              padding: '1px 6px',
                              borderRadius: 4,
                              background: `${typeColors[opp.type]}18`,
                              color: typeColors[opp.type],
                            }}
                          >
                            {typeLabels[opp.type]}
                          </span>
                          {opp.remote && (
                            <div className="flex items-center gap-1">
                              <Globe size={10} style={{ color: 'var(--os-text-muted)' }} />
                              <span style={{ fontSize: 10, color: 'var(--os-text-muted)' }}>Remote</span>
                            </div>
                          )}
                        </div>
                        {opp.rateOrSalary && (
                          <p style={{ fontSize: 11, color: 'var(--os-green)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
                            <DollarSign size={10} />
                            {opp.rateOrSalary}
                          </p>
                        )}
                        {opp.nextAction && (
                          <div
                            style={{
                              marginTop: 8,
                              padding: '6px 8px',
                              background: 'var(--os-gold-muted)',
                              borderRadius: 6,
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 4,
                            }}
                          >
                            <ChevronRight size={10} style={{ color: 'var(--os-gold)', marginTop: 1, flexShrink: 0 }} />
                            <p style={{ fontSize: 10.5, color: 'var(--os-gold)', lineHeight: 1.3 }}>
                              {opp.nextAction}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    {stageOpps.length === 0 && (
                      <div
                        style={{
                          padding: '20px 12px',
                          textAlign: 'center',
                          color: 'var(--os-text-muted)',
                          fontSize: 11.5,
                          border: '1px dashed var(--os-border)',
                          borderRadius: 8,
                        }}
                      >
                        None here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="os-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--os-border)' }}>
                  {['Opportunity', 'Company', 'Type', 'Status', 'Fit', 'Rate / Salary', 'Follow Up'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {opportunities.filter(o => !['won', 'lost', 'archived'].includes(o.status)).map((opp, i, arr) => (
                  <tr
                    key={opp.id}
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--os-border)' : 'none', cursor: 'pointer' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--os-text-primary)' }}>{opp.title}</p>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12.5, color: 'var(--os-text-secondary)' }}>{opp.company}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 7px', borderRadius: 5, background: `${typeColors[opp.type]}18`, color: typeColors[opp.type] }}>
                        {typeLabels[opp.type]}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12.5, color: 'var(--os-text-secondary)', textTransform: 'capitalize' }}>
                      {opp.status.replace('_', ' ')}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <FitBadge score={opp.fitScore} />
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12.5, color: 'var(--os-green)' }}>
                      {opp.rateOrSalary || '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--os-text-muted)' }}>
                      {opp.followUpDate || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Selected opportunity detail */}
        {selectedOpp && view === 'board' && (
          <div
            className="os-card animate-in"
            style={{ padding: 20, marginTop: 20 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.02em' }}>
                  {selectedOpp.title}
                </h2>
                <p style={{ fontSize: 13, color: 'var(--os-text-secondary)', marginTop: 2 }}>
                  {selectedOpp.company} &nbsp;·&nbsp; {selectedOpp.location}
                </p>
              </div>
              <button className="btn-gold">
                <Bot size={12} />
                Agent
              </button>
            </div>

            {selectedOpp.notes && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Notes</p>
                <p style={{ fontSize: 13, color: 'var(--os-text-secondary)', lineHeight: 1.6 }}>{selectedOpp.notes}</p>
              </div>
            )}

            {selectedOpp.nextAction && (
              <div
                style={{
                  padding: '10px 14px',
                  background: 'var(--os-gold-muted)',
                  borderRadius: 8,
                  border: '1px solid rgba(201,168,68,0.15)',
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-gold)', marginBottom: 2 }}>Next Action</p>
                <p style={{ fontSize: 13, color: 'var(--os-text-secondary)' }}>{selectedOpp.nextAction}</p>
              </div>
            )}

            <div className="flex gap-2 mt-4">
              <button className="btn-ghost">Draft outreach</button>
              <button className="btn-ghost">Score against goals</button>
              <button className="btn-gold">
                <Bot size={12} />
                Prep talking points
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
