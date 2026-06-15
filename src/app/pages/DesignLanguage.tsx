import { useState } from 'react';
import { Bot, Plus, Sparkles, BookOpen } from 'lucide-react';
import { DESIGN_PRINCIPLES, DESIGN_LANGUAGE_TAGS, SAMPLE_REFERENCES } from '../data/sample';
import type { DesignLanguageTag } from '../types';

const categoryColor: Record<DesignLanguageTag['category'], string> = {
  layout: 'var(--os-blue)',
  typography: 'var(--os-purple)',
  color: 'var(--os-teal)',
  motion: 'var(--os-green)',
  tone: 'var(--os-gold)',
  craft: 'var(--os-red)',
};

const categoryBg: Record<DesignLanguageTag['category'], string> = {
  layout: 'var(--os-blue-muted)',
  typography: 'var(--os-purple-muted)',
  color: 'var(--os-teal-muted)',
  motion: 'var(--os-green-muted)',
  tone: 'var(--os-gold-muted)',
  craft: 'var(--os-red-muted)',
};

const AVOIDED_STYLES = [
  'Generic stock photography',
  'Flat corporate illustration (generic)',
  'Over-animated micro-interactions',
  'Pure-black backgrounds (too harsh)',
  'Sans-serif everything (no contrast)',
  'Drop shadows on everything',
  'Gradient-heavy UI without restraint',
  'Dark patterns in any form',
];

const PROMPT_RULES = [
  { label: 'For any visual direction', rule: '"Premium, editorial, and calm — not decorative. Think Linear meets editorial magazine."' },
  { label: 'For type choices', rule: '"Strong typographic hierarchy. Large, tight headings. Tabular numbers. System-aware."' },
  { label: 'For colour', rule: '"Restrained palette. One accent, used sparingly. Dark or light — commit to one."' },
  { label: 'For motion', rule: '"Motion that explains or guides. Never for effect. Reveal, don\'t distract."' },
  { label: 'For case study writing', rule: '"Strategic, direct, first-person. Explain the problem before the solution. Lead with outcome."' },
  { label: 'For critique', rule: '"What is the hierarchy? Is there a clear point of view? Does restraint make this stronger or weaker?"' },
];

export default function DesignLanguage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const categories = ['all', 'layout', 'typography', 'color', 'motion', 'tone', 'craft'] as const;

  const filteredTags = activeCategory === 'all'
    ? DESIGN_LANGUAGE_TAGS
    : DESIGN_LANGUAGE_TAGS.filter(t => t.category === activeCategory);

  const approvedRefs = SAMPLE_REFERENCES.filter(r => r.tags.includes('premium') || r.tags.includes('clean'));

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--os-text-primary)' }}>
              Design Language Memory
            </h1>
            <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', marginTop: 3 }}>
              {DESIGN_LANGUAGE_TAGS.length} language tags &nbsp;·&nbsp; {DESIGN_PRINCIPLES.length} principles
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost">
              <Bot size={13} />
              Extract from project
            </button>
            <button className="btn-gold">
              <Sparkles size={13} />
              Generate direction
            </button>
          </div>
        </div>
      </div>

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Design Principles */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: 7 }}>
              <BookOpen size={14} style={{ color: 'var(--os-gold)' }} />
              Core Principles
            </h2>
            <button className="btn-ghost" style={{ fontSize: 12 }}>
              <Plus size={12} />
              Add principle
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {DESIGN_PRINCIPLES.map(principle => (
              <div
                key={principle.id}
                className="os-card"
                style={{ padding: 18, cursor: 'pointer', transition: 'border-color 0.15s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,68,0.25)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--os-border)')}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: 'var(--os-gold-muted)',
                    border: '1px solid rgba(201,168,68,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                  }}
                >
                  <Sparkles size={11} style={{ color: 'var(--os-gold)' }} />
                </div>
                <h3 style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em', marginBottom: 6 }}>
                  {principle.title}
                </h3>
                <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', lineHeight: 1.6 }}>
                  {principle.description}
                </p>
                {principle.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {principle.tags.map(tag => (
                      <span key={tag} className="os-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visual Language Tags */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
              Visual Language Tags
            </h2>
            <div className="flex items-center gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '3px 10px',
                    borderRadius: 20,
                    border: '1px solid',
                    borderColor: activeCategory === cat ? (cat === 'all' ? 'rgba(201,168,68,0.4)' : `${categoryColor[cat as Exclude<typeof cat, 'all'>]}40`) : 'var(--os-border)',
                    background: activeCategory === cat ? (cat === 'all' ? 'var(--os-gold-muted)' : categoryBg[cat as Exclude<typeof cat, 'all'>]) : 'transparent',
                    color: activeCategory === cat ? (cat === 'all' ? 'var(--os-gold)' : categoryColor[cat as Exclude<typeof cat, 'all'>]) : 'var(--os-text-secondary)',
                    fontSize: 11.5,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                    textTransform: 'capitalize',
                    fontWeight: activeCategory === cat ? 500 : 400,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {filteredTags.map(tag => (
              <div
                key={tag.id}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  border: `1px solid ${categoryColor[tag.category]}30`,
                  background: categoryBg[tag.category],
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = `${categoryColor[tag.category]}60`)}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = `${categoryColor[tag.category]}30`)}
                title={tag.description}
              >
                <span style={{ fontSize: 12, fontWeight: 500, color: categoryColor[tag.category] }}>
                  {tag.label}
                </span>
                <span
                  style={{
                    fontSize: 9.5,
                    padding: '1px 5px',
                    borderRadius: 4,
                    background: `${categoryColor[tag.category]}20`,
                    color: categoryColor[tag.category],
                    marginLeft: 6,
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  {tag.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Rules */}
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em', marginBottom: 12 }}>
            Prompt Rules
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 10 }}>
            {PROMPT_RULES.map((rule, i) => (
              <div
                key={i}
                className="os-card"
                style={{ padding: '14px 16px', cursor: 'pointer', transition: 'border-color 0.15s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--os-border)')}
              >
                <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {rule.label}
                </p>
                <p style={{ fontSize: 13, color: 'var(--os-text-primary)', lineHeight: 1.55, fontStyle: 'italic' }}>
                  {rule.rule}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Avoided Styles */}
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em', marginBottom: 12 }}>
            Styles to Avoid
          </h2>
          <div className="os-card" style={{ padding: '14px 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              {AVOIDED_STYLES.map(style => (
                <div
                  key={style}
                  className="flex items-center gap-2.5 py-2.5"
                  style={{ borderBottom: '1px solid var(--os-border)' }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      border: '1.5px solid var(--os-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 8, color: 'var(--os-red)', fontWeight: 800, lineHeight: 1 }}>✕</span>
                  </div>
                  <span style={{ fontSize: 12.5, color: 'var(--os-text-secondary)' }}>{style}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Actions */}
        <div
          className="os-card"
          style={{
            padding: '18px 20px',
            background: 'linear-gradient(135deg, rgba(201,168,68,0.04) 0%, var(--os-surface) 100%)',
            border: '1px solid rgba(201,168,68,0.12)',
          }}
        >
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-gold)', marginBottom: 12 }}>
            Creative Director Agent
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              'Create a moodboard in my design language',
              'Generate baseline and wild directions',
              'Critique this design like me',
              'Extract design language from project',
              'Create a poster in my visual style',
              'Make this feel more senior',
            ].map(action => (
              <button
                key={action}
                className="btn-ghost"
                style={{ justifyContent: 'flex-start', fontSize: 12 }}
              >
                <Bot size={12} style={{ flexShrink: 0 }} />
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
