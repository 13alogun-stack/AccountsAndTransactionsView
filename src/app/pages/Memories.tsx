import { useState } from 'react';
import { Brain, Plus, Search, X, Check, Pencil, Trash2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { Memory, MemoryType } from '../types';

const TYPE_LABELS: Record<MemoryType, string> = {
  user_profile: 'Profile',
  project: 'Project',
  design_language: 'Design Language',
  preference: 'Preference',
  prompt: 'Prompt',
  opportunity: 'Opportunity',
  finance: 'Finance',
  learning: 'Learning',
  lesson: 'Lesson',
  decision: 'Decision',
  workflow: 'Workflow',
  pricing: 'Pricing',
};

const TYPE_COLORS: Record<MemoryType, string> = {
  user_profile: '#E85004',
  project: '#2dce89',
  design_language: '#a259ff',
  preference: '#f5c252',
  prompt: '#29b6f6',
  opportunity: '#ef5350',
  finance: '#66bb6a',
  learning: '#ffa726',
  lesson: '#ec407a',
  decision: '#26c6da',
  workflow: '#ab47bc',
  pricing: '#ff7043',
};

const ALL_TYPES: MemoryType[] = [
  'user_profile', 'project', 'design_language', 'preference', 'prompt',
  'opportunity', 'finance', 'learning', 'lesson', 'decision', 'workflow', 'pricing',
];

export default function Memories() {
  const { memories, addMemory, updateMemory, deleteMemory } = useApp();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<MemoryType | 'all'>('all');
  const [editor, setEditor] = useState<{
    open: boolean;
    memory: Partial<Memory> | null;
    isNew: boolean;
  }>({ open: false, memory: null, isNew: false });

  const filtered = memories.filter(m => {
    const matchSearch = !search ||
      m.content.toLowerCase().includes(search.toLowerCase()) ||
      m.source.toLowerCase().includes(search.toLowerCase()) ||
      m.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchType = filterType === 'all' || m.type === filterType;
    return matchSearch && matchType;
  });

  const openNew = () => {
    setEditor({
      open: true,
      isNew: true,
      memory: { type: 'lesson', source: '', content: '', tags: [], confidence: 80 },
    });
  };

  const openEdit = (m: Memory) => {
    setEditor({ open: true, isNew: false, memory: { ...m } });
  };

  const save = () => {
    if (!editor.memory?.content?.trim() || !editor.memory?.source?.trim()) return;
    if (editor.isNew) {
      addMemory(editor.memory as Omit<Memory, 'id' | 'lastUpdated'>);
    } else if (editor.memory?.id) {
      updateMemory(editor.memory.id, editor.memory);
    }
    setEditor({ open: false, memory: null, isNew: false });
  };

  const grouped = ALL_TYPES.reduce<Record<string, Memory[]>>((acc, t) => {
    const items = filtered.filter(m => m.type === t);
    if (items.length > 0) acc[t] = items;
    return acc;
  }, {});

  return (
    <div className="os-page">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div className="flex items-end justify-between mb-2">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--os-orange)', marginBottom: 8 }}>
              Context layer
            </p>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--os-text-primary)' }}>
              Memory
            </h1>
            <p className="os-page-subtitle" style={{ marginTop: 8 }}>{memories.length} stored memories · what the OS remembers about you</p>
          </div>
          <button className="os-btn-primary" onClick={openNew}>
            <Plus size={14} /> Add Memory
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap mt-4">
          <div className="os-search" style={{ minWidth: 220 }}>
            <Search size={13} style={{ color: 'var(--os-text-muted)', flexShrink: 0 }} />
            <input
              placeholder="Search memories..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: 'var(--os-text-primary)', flex: 1 }}
            />
          </div>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value as MemoryType | 'all')}
            className="os-select"
          >
            <option value="all">All types</option>
            {ALL_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
          </select>
        </div>

        {/* Confidence legend */}
        <div className="flex items-center gap-4 mt-4">
          <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>Confidence:</span>
          {[['High', '90–100', '#2dce89'], ['Good', '70–89', '#f5c252'], ['Low', '<70', '#888']].map(([label, range, color]) => (
            <div key={label} className="flex items-center gap-1">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: color as string, display: 'inline-block' }} />
              <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>{label} ({range})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Memories grouped by type */}
      {Object.keys(grouped).length === 0 ? (
        <div className="os-empty">
          <Brain size={28} style={{ color: 'var(--os-text-muted)', marginBottom: 12 }} />
          <p style={{ color: 'var(--os-text-muted)', fontSize: 14 }}>No memories yet</p>
          <p style={{ color: 'var(--os-text-muted)', fontSize: 12, marginTop: 4 }}>Store lessons, decisions, preferences, pricing logic, and design rules</p>
          <button className="os-btn-primary" style={{ marginTop: 16 }} onClick={openNew}>
            <Plus size={13} /> Add first memory
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {(Object.keys(grouped) as MemoryType[]).map(type => (
            <div key={type}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: TYPE_COLORS[type],
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
                  {TYPE_LABELS[type]}
                </span>
                <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>({grouped[type].length})</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {grouped[type].map(m => (
                  <div key={m.id} className="os-card">
                    <div className="flex items-start justify-between gap-4">
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Source + confidence */}
                        <div className="flex items-center gap-2 mb-2">
                          <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>
                            From: <span style={{ color: 'var(--os-text-secondary)' }}>{m.source}</span>
                          </span>
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              padding: '1px 6px',
                              borderRadius: 999,
                              background:
                                m.confidence >= 90
                                  ? 'rgba(45,206,137,0.15)'
                                  : m.confidence >= 70
                                  ? 'rgba(245,194,82,0.15)'
                                  : 'rgba(255,255,255,0.06)',
                              color:
                                m.confidence >= 90
                                  ? '#2dce89'
                                  : m.confidence >= 70
                                  ? '#f5c252'
                                  : '#888',
                            }}
                          >
                            {m.confidence}% confidence
                          </span>
                        </div>

                        <p
                          style={{
                            fontSize: 13,
                            lineHeight: 1.65,
                            color: 'var(--os-text-primary)',
                          }}
                        >
                          {m.content}
                        </p>

                        {m.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {m.tags.map(t => <span key={t} className="os-tag">{t}</span>)}
                          </div>
                        )}

                        <p style={{ fontSize: 10, color: 'var(--os-text-muted)', marginTop: 8 }}>
                          Updated {m.lastUpdated}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1" style={{ flexShrink: 0 }}>
                        <button className="os-icon-btn" onClick={() => openEdit(m)}>
                          <Pencil size={13} />
                        </button>
                        <button
                          className="os-icon-btn os-icon-btn-danger"
                          onClick={() => deleteMemory(m.id)}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor modal */}
      {editor.open && editor.memory && (
        <div className="os-modal-overlay" onClick={() => setEditor({ open: false, memory: null, isNew: false })}>
          <div className="os-modal" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2
                style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}
              >
                {editor.isNew ? 'Add Memory' : 'Edit Memory'}
              </h2>
              <button className="os-icon-btn" onClick={() => setEditor({ open: false, memory: null, isNew: false })}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="flex gap-2">
                <select
                  value={editor.memory.type ?? 'lesson'}
                  onChange={e => setEditor(s => ({ ...s, memory: { ...s.memory!, type: e.target.value as MemoryType } }))}
                  className="os-select"
                  style={{ flex: 1 }}
                >
                  {ALL_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
                </select>
                <input
                  placeholder="Source (project, conversation, etc.)"
                  value={editor.memory.source ?? ''}
                  onChange={e => setEditor(s => ({ ...s, memory: { ...s.memory!, source: e.target.value } }))}
                  className="os-input"
                  style={{ flex: 2 }}
                />
              </div>

              <textarea
                placeholder="Memory content — what do you want to remember?"
                value={editor.memory.content ?? ''}
                onChange={e => setEditor(s => ({ ...s, memory: { ...s.memory!, content: e.target.value } }))}
                className="os-textarea"
                rows={5}
              />

              <div className="flex gap-2 items-center">
                <label style={{ fontSize: 12, color: 'var(--os-text-muted)', flexShrink: 0 }}>
                  Confidence:
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editor.memory.confidence ?? 80}
                  onChange={e => setEditor(s => ({ ...s, memory: { ...s.memory!, confidence: Number(e.target.value) } }))}
                  style={{ flex: 1 }}
                />
                <span style={{ fontSize: 12, color: 'var(--os-text-secondary)', minWidth: 30 }}>
                  {editor.memory.confidence ?? 80}%
                </span>
              </div>

              <input
                placeholder="Tags (comma-separated)"
                value={(editor.memory.tags ?? []).join(', ')}
                onChange={e => setEditor(s => ({
                  ...s,
                  memory: { ...s.memory!, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) },
                }))}
                className="os-input"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button className="os-btn-secondary" onClick={() => setEditor({ open: false, memory: null, isNew: false })}>
                Cancel
              </button>
              <button className="os-btn-primary" onClick={save}>
                <Check size={13} /> {editor.isNew ? 'Add Memory' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
