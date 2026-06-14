import { useState } from 'react';
import { Plus, ExternalLink, Bot, Filter } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { Reference } from '../types';

const CATEGORIES = ['all', 'web', 'brand', 'poster', 'product', 'editorial', 'system'] as const;
type CategoryFilter = typeof CATEGORIES[number];

const categoryColors: Record<string, string> = {
  web: 'var(--os-blue)',
  brand: 'var(--os-purple)',
  poster: 'var(--os-red)',
  product: 'var(--os-teal)',
  editorial: 'var(--os-gold)',
  system: 'var(--os-green)',
  type: 'var(--os-yellow)',
  motion: 'var(--os-blue)',
  campaign: 'var(--os-red)',
};

function ReferenceCard({ ref: r, onSelect }: { ref: Reference; onSelect: () => void }) {
  return (
    <div
      onClick={onSelect}
      style={{
        cursor: 'pointer',
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid var(--os-border)',
        background: 'var(--os-surface)',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.14)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--os-border)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Color swatch as placeholder thumbnail */}
      <div
        style={{
          height: 120,
          background: `linear-gradient(135deg, ${r.color}60 0%, ${r.color}20 50%, var(--os-surface-overlay) 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: '-0.06em',
            color: `${r.color}90`,
          }}
        >
          {r.source.split('.')[0].slice(0, 3).toUpperCase()}
        </div>
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '2px 7px',
            borderRadius: 5,
            background: `${categoryColors[r.category] || 'var(--os-text-muted)'}20`,
            color: categoryColors[r.category] || 'var(--os-text-muted)',
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {r.category}
        </div>
      </div>
      <div style={{ padding: '12px' }}>
        <p style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--os-text-primary)', marginBottom: 2, letterSpacing: '-0.01em' }}>
          {r.title}
        </p>
        <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginBottom: 8 }}>{r.source}</p>
        <div className="flex flex-wrap gap-1">
          {r.mood.slice(0, 3).map(m => (
            <span key={m} className="os-tag" style={{ fontSize: 10 }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Moodboards() {
  const { references } = useApp();
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selected, setSelected] = useState<Reference | null>(null);

  const filtered = filter === 'all' ? references : references.filter(r => r.category === filter);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--os-text-primary)' }}>
              Moodboard Library
            </h1>
            <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', marginTop: 3 }}>
              {references.length} references saved
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost">
              <Bot size={13} />
              Generate moodboard
            </button>
            <button className="btn-gold">
              <Plus size={13} />
              Save reference
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 mt-4" style={{ overflowX: 'auto' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: filter === cat ? 'rgba(201,168,68,0.4)' : 'var(--os-border)',
                background: filter === cat ? 'var(--os-gold-muted)' : 'transparent',
                color: filter === cat ? 'var(--os-gold)' : 'var(--os-text-secondary)',
                fontSize: 12,
                fontWeight: filter === cat ? 500 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
                textTransform: 'capitalize',
              }}
            >
              {cat === 'all' ? 'All References' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="page-content" style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 320px' : '1fr', gap: 20 }}>
        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12,
            alignContent: 'start',
          }}
        >
          {filtered.map(ref => (
            <ReferenceCard
              key={ref.id}
              ref={ref}
              onSelect={() => setSelected(selected?.id === ref.id ? null : ref)}
            />
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="os-card" style={{ overflow: 'hidden' }}>
              <div
                style={{
                  height: 80,
                  background: `linear-gradient(135deg, ${selected.color}60 0%, ${selected.color}20 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: 20, fontWeight: 800, color: `${selected.color}aa`, letterSpacing: '-0.04em' }}>
                  {selected.source.split('.')[0].toUpperCase()}
                </span>
              </div>
              <div style={{ padding: 16 }}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
                    {selected.title}
                  </h3>
                  {selected.url && (
                    <button className="btn-ghost" style={{ padding: '4px 8px', fontSize: 11, flexShrink: 0 }}>
                      <ExternalLink size={11} />
                    </button>
                  )}
                </div>
                <p style={{ fontSize: 11.5, color: 'var(--os-text-muted)', marginBottom: 10 }}>{selected.source}</p>

                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Why It Works
                  </p>
                  <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', lineHeight: 1.6 }}>
                    {selected.whyItWorks}
                  </p>
                </div>

                {selected.colorLanguage && (
                  <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                      Colour
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--os-text-secondary)' }}>{selected.colorLanguage}</p>
                  </div>
                )}

                {selected.typographyNotes && (
                  <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
                      Typography
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--os-text-secondary)' }}>{selected.typographyNotes}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selected.tags.map(t => (
                    <span key={t} className="os-tag" style={{ fontSize: 10 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="os-card" style={{ padding: 14 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 10 }}>
                Agent Actions
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  'Turn this into a direction',
                  'Generate baseline & wild from this',
                  'Find similar references',
                  'Apply this to a project',
                ].map(action => (
                  <button
                    key={action}
                    className="btn-ghost"
                    style={{ fontSize: 11.5, justifyContent: 'flex-start' }}
                  >
                    <Bot size={11} />
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
