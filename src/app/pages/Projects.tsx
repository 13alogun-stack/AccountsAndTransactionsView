import { useState } from 'react';
import { Link } from 'react-router';
import { Grid3X3, List, Plus, Filter, ArrowUpRight } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { ProjectStatus, ProjectCategory } from '../types';

const STATUS_LABELS: Record<ProjectStatus, string> = {
  active: 'Active',
  completed: 'Completed',
  paused: 'Paused',
  planned: 'Planned',
  archived: 'Archived',
};

const STATUS_COLORS: Record<ProjectStatus, string> = {
  active: 'var(--os-green)',
  completed: 'var(--os-text-muted)',
  paused: 'var(--os-yellow)',
  planned: 'var(--os-blue)',
  archived: 'var(--os-text-muted)',
};

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  brand: 'Brand',
  product: 'Product',
  web: 'Web',
  motion: 'Motion',
  campaign: 'Campaign',
  system: 'System',
  concept: 'Concept',
  poster: 'Poster',
};

export default function Projects() {
  const { projects } = useApp();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<ProjectCategory | 'all'>('all');

  const filtered = projects.filter(p => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    return true;
  });

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--os-text-primary)' }}>
              Project Brain
            </h1>
            <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', marginTop: 3 }}>
              {projects.length} projects &nbsp;·&nbsp; {projects.filter(p => p.status === 'active').length} active
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost" style={{ padding: '6px 10px' }}>
              <Filter size={13} />
              Filter
            </button>
            <div
              className="flex items-center"
              style={{
                background: 'var(--os-surface-raised)',
                border: '1px solid var(--os-border)',
                borderRadius: 8,
                padding: 2,
              }}
            >
              <button
                onClick={() => setView('grid')}
                style={{
                  padding: '5px 8px',
                  borderRadius: 6,
                  border: 'none',
                  background: view === 'grid' ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: view === 'grid' ? 'var(--os-text-primary)' : 'var(--os-text-muted)',
                  cursor: 'pointer',
                }}
              >
                <Grid3X3 size={13} />
              </button>
              <button
                onClick={() => setView('list')}
                style={{
                  padding: '5px 8px',
                  borderRadius: 6,
                  border: 'none',
                  background: view === 'list' ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: view === 'list' ? 'var(--os-text-primary)' : 'var(--os-text-muted)',
                  cursor: 'pointer',
                }}
              >
                <List size={13} />
              </button>
            </div>
            <button className="btn-gold">
              <Plus size={13} />
              Add Project
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-4" style={{ overflowX: 'auto' }}>
          {(['all', 'active', 'completed', 'paused', 'planned'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: filterStatus === s ? 'rgba(201,168,68,0.4)' : 'var(--os-border)',
                background: filterStatus === s ? 'var(--os-gold-muted)' : 'transparent',
                color: filterStatus === s ? 'var(--os-gold)' : 'var(--os-text-secondary)',
                fontSize: 12,
                fontWeight: 450,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {s === 'all' ? 'All Projects' : STATUS_LABELS[s]}
            </button>
          ))}
          <div style={{ width: 1, height: 16, background: 'var(--os-border)', flexShrink: 0 }} />
          {(['all', 'brand', 'product', 'web', 'poster'] as const).map(c => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: filterCategory === c ? 'rgba(99,102,241,0.4)' : 'var(--os-border)',
                background: filterCategory === c ? 'var(--os-blue-muted)' : 'transparent',
                color: filterCategory === c ? 'var(--os-blue)' : 'var(--os-text-secondary)',
                fontSize: 12,
                fontWeight: 450,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {c === 'all' ? 'All Types' : CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      <div className="page-content">
        {view === 'grid' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 14,
            }}
          >
            {filtered.map(proj => (
              <Link key={proj.id} to={`/projects/${proj.id}`} style={{ textDecoration: 'none' }}>
                <div
                  className="os-card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s, transform 0.15s',
                    background: 'linear-gradient(135deg, #111118 0%, #1a1a24 100%)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.14)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--os-border)';
                  }}
                >
                  {/* Color block header */}
                  <div
                    className="project-color-header"
                    style={{ background: `linear-gradient(135deg, ${proj.color}cc 0%, ${proj.color}66 100%)` }}
                  >
                    <span className="project-color-header-text">{proj.title}</span>
                  </div>
                  <div style={{ padding: '14px 16px 6px' }}>
                    <p style={{ fontSize: 11.5, color: 'var(--os-text-muted)', marginBottom: 12 }}>{proj.client} · {proj.year}</p>
                  </div>
                  <div style={{ padding: '0 16px 16px' }}>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div style={{ flex: 1 }} />
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            padding: '2px 7px',
                            borderRadius: 5,
                            background: `${STATUS_COLORS[proj.status]}18`,
                            color: STATUS_COLORS[proj.status],
                            flexShrink: 0,
                            letterSpacing: '0.02em',
                          }}
                        >
                          {STATUS_LABELS[proj.status]}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            padding: '2px 7px',
                            borderRadius: 5,
                            background: 'rgba(255,255,255,0.05)',
                            color: 'var(--os-text-muted)',
                            flexShrink: 0,
                            letterSpacing: '0.02em',
                          }}
                        >
                          {CATEGORY_LABELS[proj.category]}
                        </span>
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: 12,
                        color: 'var(--os-text-secondary)',
                        lineHeight: 1.5,
                        marginBottom: 12,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {proj.description}
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap mb-3">
                      {proj.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="os-tag">{tag}</span>
                      ))}
                    </div>

                    {(proj as any).budget && (
                      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--os-gold)', letterSpacing: '-0.02em', marginBottom: 10 }}>
                        {(proj as any).budget}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div className="os-progress" style={{ flex: 1, height: 8, borderRadius: 4 }}>
                            <div
                              className="os-progress-fill"
                              style={{
                                width: `${proj.portfolioReadiness}%`,
                                background: proj.portfolioReadiness >= 80 ? 'var(--os-green)' : 'var(--os-gold)',
                                height: '100%',
                                borderRadius: 4,
                              }}
                            />
                          </div>
                          <span style={{ fontSize: 10, color: 'var(--os-text-muted)', width: 28 }}>
                            {proj.portfolioReadiness}%
                          </span>
                        </div>
                        <p style={{ fontSize: 10, color: 'var(--os-text-muted)', marginTop: 3 }}>Portfolio readiness</p>
                      </div>
                      <ArrowUpRight size={13} style={{ color: 'var(--os-text-muted)', flexShrink: 0, marginLeft: 8 }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="os-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--os-border)' }}>
                  {['Project', 'Client', 'Type', 'Status', 'Portfolio %', 'Next Action'].map(h => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 16px',
                        textAlign: 'left',
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: 'var(--os-text-muted)',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((proj, i) => (
                  <tr
                    key={proj.id}
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid var(--os-border)' : 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = 'transparent')}
                    onClick={() => window.location.href = `/projects/${proj.id}`}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-2.5">
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: proj.color }} />
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--os-text-primary)' }}>{proj.title}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12.5, color: 'var(--os-text-secondary)' }}>{proj.client}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="os-tag" style={{ fontSize: 10.5 }}>{CATEGORY_LABELS[proj.category]}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 11.5, color: STATUS_COLORS[proj.status], fontWeight: 500 }}>
                        {STATUS_LABELS[proj.status]}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-2">
                        <div className="os-progress" style={{ width: 60 }}>
                          <div
                            className="os-progress-fill"
                            style={{
                              width: `${proj.portfolioReadiness}%`,
                              background: proj.portfolioReadiness >= 80 ? 'var(--os-green)' : 'var(--os-gold)',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 11.5, color: 'var(--os-text-muted)' }}>{proj.portfolioReadiness}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--os-text-muted)', maxWidth: 200 }}>
                      <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {proj.nextAction || '—'}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
