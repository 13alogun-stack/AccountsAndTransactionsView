import { useState } from 'react';
import { Zap, Plus, Search, Copy, Check, X, Pencil, Trash2, Star } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { Prompt, PromptCategory } from '../types';

const CATEGORY_LABELS: Record<PromptCategory, string> = {
  claude: 'Claude',
  chatgpt: 'ChatGPT',
  replit: 'Replit',
  figma: 'Figma',
  webflow: 'Webflow',
  image_gen: 'Image Gen',
  mockups: 'Mockups',
  case_studies: 'Case Studies',
  decks: 'Decks',
  outreach: 'Outreach',
  proposals: 'Proposals',
  portfolio: 'Portfolio',
  moodboards: 'Moodboards',
  design_critique: 'Design Critique',
  ai_workflow: 'AI Workflow',
};

const CATEGORY_COLORS: Record<PromptCategory, string> = {
  claude: '#E85004',
  chatgpt: '#10a37f',
  replit: '#f5a623',
  figma: '#a259ff',
  webflow: '#4353ff',
  image_gen: '#e040fb',
  mockups: '#29b6f6',
  case_studies: '#2dce89',
  decks: '#ffd54f',
  outreach: '#ef5350',
  proposals: '#ff7043',
  portfolio: '#26c6da',
  moodboards: '#ec407a',
  design_critique: '#ab47bc',
  ai_workflow: '#E85004',
};

const QUALITY_LABELS = { excellent: '★★★', good: '★★', ok: '★', poor: '☆' };

const ALL_CATEGORIES: PromptCategory[] = [
  'claude', 'chatgpt', 'replit', 'figma', 'webflow', 'image_gen', 'mockups',
  'case_studies', 'decks', 'outreach', 'proposals', 'portfolio', 'moodboards',
  'design_critique', 'ai_workflow',
];

export default function Prompts() {
  const { prompts, addPrompt, updatePrompt, deletePrompt, projects } = useApp();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<PromptCategory | 'all'>('all');
  const [copied, setCopied] = useState<string | null>(null);
  const [editor, setEditor] = useState<{ open: boolean; prompt: Partial<Prompt> | null; isNew: boolean }>({
    open: false,
    prompt: null,
    isNew: false,
  });
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = prompts.filter(p => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.promptText.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  const copyPrompt = (p: Prompt) => {
    navigator.clipboard.writeText(p.promptText);
    setCopied(p.id);
    updatePrompt(p.id, { lastUsedAt: new Date().toISOString().split('T')[0] });
    setTimeout(() => setCopied(null), 2000);
  };

  const openNew = () => {
    setEditor({
      open: true,
      isNew: true,
      prompt: { title: '', category: 'claude', promptText: '', tags: [], resultQuality: 'good' },
    });
  };

  const openEdit = (p: Prompt) => {
    setEditor({ open: true, isNew: false, prompt: { ...p } });
  };

  const saveEditor = () => {
    if (!editor.prompt?.title?.trim() || !editor.prompt?.promptText?.trim()) return;
    if (editor.isNew) {
      addPrompt(editor.prompt as Omit<Prompt, 'id' | 'createdAt'>);
    } else if (editor.prompt?.id) {
      updatePrompt(editor.prompt.id, editor.prompt);
    }
    setEditor({ open: false, prompt: null, isNew: false });
  };

  const grouped = ALL_CATEGORIES.reduce<Record<string, Prompt[]>>((acc, cat) => {
    const items = filtered.filter(p => p.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div className="os-page">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div className="flex items-end justify-between mb-2">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--os-orange)', marginBottom: 8 }}>
              Reusable
            </p>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--os-text-primary)' }}>
              Prompt Library
            </h1>
            <p className="os-page-subtitle" style={{ marginTop: 8 }}>{prompts.length} prompts · {prompts.filter(p => p.resultQuality === 'excellent').length} excellent</p>
          </div>
          <button className="os-btn-primary" onClick={openNew}>
            <Plus size={14} /> New Prompt
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap mt-4">
          <div className="os-search" style={{ minWidth: 220 }}>
            <Search size={13} style={{ color: 'var(--os-text-muted)', flexShrink: 0 }} />
            <input
              placeholder="Search prompts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: 'var(--os-text-primary)', flex: 1 }}
            />
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value as PromptCategory | 'all')}
            className="os-select"
          >
            <option value="all">All tools</option>
            {ALL_CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
          </select>
        </div>
      </div>

      {/* Category groups */}
      {Object.keys(grouped).length === 0 ? (
        <div className="os-empty">
          <Zap size={28} style={{ color: 'var(--os-text-muted)', marginBottom: 12 }} />
          <p style={{ color: 'var(--os-text-muted)', fontSize: 14 }}>No prompts yet</p>
          <p style={{ color: 'var(--os-text-muted)', fontSize: 12, marginTop: 4 }}>Save your best reusable prompts here</p>
          <button className="os-btn-primary" style={{ marginTop: 16 }} onClick={openNew}>
            <Plus size={13} /> Add first prompt
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {(Object.keys(grouped) as PromptCategory[]).map(cat => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: CATEGORY_COLORS[cat],
                    flexShrink: 0,
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--os-text-muted)',
                  }}
                >
                  {CATEGORY_LABELS[cat]}
                </span>
                <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>({grouped[cat].length})</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {grouped[cat].map(p => (
                  <div key={p.id} className="os-card">
                    {/* Title row */}
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    >
                      <div className="flex items-center gap-2">
                        <h3
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                            color: 'var(--os-text-primary)',
                          }}
                        >
                          {p.title}
                        </h3>
                        {p.resultQuality && (
                          <span
                            style={{
                              fontSize: 11,
                              color: p.resultQuality === 'excellent' ? '#f5c252' : 'var(--os-text-muted)',
                            }}
                          >
                            {QUALITY_LABELS[p.resultQuality]}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        {p.lastUsedAt && (
                          <span style={{ fontSize: 10, color: 'var(--os-text-muted)' }}>
                            Last used {p.lastUsedAt}
                          </span>
                        )}
                        <button
                          className="os-icon-btn"
                          onClick={() => copyPrompt(p)}
                          title="Copy prompt"
                        >
                          {copied === p.id ? <Check size={13} style={{ color: '#2dce89' }} /> : <Copy size={13} />}
                        </button>
                        <button className="os-icon-btn" onClick={() => openEdit(p)}>
                          <Pencil size={13} />
                        </button>
                        <button
                          className="os-icon-btn os-icon-btn-danger"
                          onClick={() => deletePrompt(p.id)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    {p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.tags.map(t => <span key={t} className="os-tag">{t}</span>)}
                      </div>
                    )}

                    {/* Expanded prompt text */}
                    {expanded === p.id && (
                      <div style={{ marginTop: 12 }}>
                        <pre
                          style={{
                            fontSize: 12,
                            lineHeight: 1.7,
                            color: 'var(--os-text-secondary)',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 8,
                            padding: '12px 14px',
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'var(--font-mono, monospace)',
                            overflow: 'auto',
                          }}
                        >
                          {p.promptText}
                        </pre>
                        {p.notes && (
                          <p
                            style={{
                              fontSize: 12,
                              color: 'var(--os-text-muted)',
                              marginTop: 8,
                              fontStyle: 'italic',
                              borderLeft: '2px solid rgba(255,255,255,0.08)',
                              paddingLeft: 10,
                            }}
                          >
                            {p.notes}
                          </p>
                        )}
                        <div className="flex justify-end mt-3">
                          <button
                            className="os-btn-primary"
                            style={{ fontSize: 12 }}
                            onClick={() => copyPrompt(p)}
                          >
                            {copied === p.id ? <Check size={12} /> : <Copy size={12} />}
                            {copied === p.id ? 'Copied!' : 'Copy prompt'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor modal */}
      {editor.open && editor.prompt && (
        <div className="os-modal-overlay" onClick={() => setEditor({ open: false, prompt: null, isNew: false })}>
          <div className="os-modal os-modal-wide" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}>
                {editor.isNew ? 'New Prompt' : 'Edit Prompt'}
              </h2>
              <button className="os-icon-btn" onClick={() => setEditor({ open: false, prompt: null, isNew: false })}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                placeholder="Prompt title..."
                value={editor.prompt.title ?? ''}
                onChange={e => setEditor(s => ({ ...s, prompt: { ...s.prompt!, title: e.target.value } }))}
                className="os-input"
              />

              <div className="flex gap-2">
                <select
                  value={editor.prompt.category ?? 'claude'}
                  onChange={e => setEditor(s => ({ ...s, prompt: { ...s.prompt!, category: e.target.value as PromptCategory } }))}
                  className="os-select"
                  style={{ flex: 1 }}
                >
                  {ALL_CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
                </select>
                <select
                  value={editor.prompt.resultQuality ?? 'good'}
                  onChange={e => setEditor(s => ({ ...s, prompt: { ...s.prompt!, resultQuality: e.target.value as Prompt['resultQuality'] } }))}
                  className="os-select"
                  style={{ flex: 1 }}
                >
                  <option value="excellent">★★★ Excellent</option>
                  <option value="good">★★ Good</option>
                  <option value="ok">★ OK</option>
                  <option value="poor">☆ Poor</option>
                </select>
                <select
                  value={editor.prompt.relatedProject ?? ''}
                  onChange={e => setEditor(s => ({ ...s, prompt: { ...s.prompt!, relatedProject: e.target.value || undefined } }))}
                  className="os-select"
                  style={{ flex: 1 }}
                >
                  <option value="">No project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>

              <textarea
                placeholder="Prompt text — use [PLACEHOLDER] for variables..."
                value={editor.prompt.promptText ?? ''}
                onChange={e => setEditor(s => ({ ...s, prompt: { ...s.prompt!, promptText: e.target.value } }))}
                className="os-textarea"
                rows={10}
                style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 12 }}
              />

              <textarea
                placeholder="Notes — when this works best, how to use it..."
                value={editor.prompt.notes ?? ''}
                onChange={e => setEditor(s => ({ ...s, prompt: { ...s.prompt!, notes: e.target.value } }))}
                className="os-textarea"
                rows={3}
              />

              <input
                placeholder="Tags (comma-separated)"
                value={(editor.prompt.tags ?? []).join(', ')}
                onChange={e => setEditor(s => ({
                  ...s,
                  prompt: { ...s.prompt!, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) },
                }))}
                className="os-input"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button className="os-btn-secondary" onClick={() => setEditor({ open: false, prompt: null, isNew: false })}>
                Cancel
              </button>
              <button className="os-btn-primary" onClick={saveEditor}>
                <Check size={13} /> {editor.isNew ? 'Save Prompt' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
