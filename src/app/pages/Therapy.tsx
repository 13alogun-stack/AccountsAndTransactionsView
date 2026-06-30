import { useState, useEffect } from 'react';
import {
  HeartPulse, Plus, Upload, Download, X, Check, Pencil, Trash2,
  Calendar, ChevronDown, ChevronUp, CircleDot, Brain, Target, Star,
} from 'lucide-react';
import type {
  TherapyData, TherapySession, TherapyFramework, TherapyActionItem,
  TherapyExercise, TherapySessionStatus,
} from '../types';

const STORAGE_KEY = 'ibra-os-therapy';

const EMPTY: TherapyData = { sessions: [], frameworks: [], actionItems: [], exercises: [] };

function loadData(): TherapyData {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (!s) return EMPTY;
    const parsed = JSON.parse(s);
    return {
      sessions: parsed.sessions ?? [],
      frameworks: parsed.frameworks ?? [],
      actionItems: parsed.actionItems ?? [],
      exercises: parsed.exercises ?? [],
    };
  } catch {
    return EMPTY;
  }
}

function saveData(data: TherapyData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota errors */
  }
}

const STATUS_COLORS: Record<TherapySessionStatus, string> = {
  scheduled: 'var(--os-blue)',
  completed: 'var(--os-green)',
  cancelled: 'var(--os-text-muted)',
};

function genId(prefix: string) {
  return `${prefix}${Date.now()}${Math.floor(performance.now())}`;
}

export default function Therapy() {
  const [data, setData] = useState<TherapyData>(loadData);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [importOpen, setImportOpen] = useState(false);
  const [editor, setEditor] = useState<{ open: boolean; session: Partial<TherapySession> | null; isNew: boolean }>({
    open: false, session: null, isNew: false,
  });

  // Persist on every change
  useEffect(() => { saveData(data); }, [data]);

  const sessions = [...data.sessions].sort((a, b) => b.date.localeCompare(a.date));
  const openItems = data.actionItems.filter(a => !a.done);
  const doneItems = data.actionItems.filter(a => a.done);

  const isEmpty = data.sessions.length === 0 && data.frameworks.length === 0
    && data.actionItems.length === 0 && data.exercises.length === 0;

  // ── Action item toggle ──────────────────────────────────────────────────────
  const toggleItem = (id: string) =>
    setData(d => ({ ...d, actionItems: d.actionItems.map(a => a.id === id ? { ...a, done: !a.done } : a) }));

  const deleteItem = (id: string) =>
    setData(d => ({ ...d, actionItems: d.actionItems.filter(a => a.id !== id) }));

  const addItem = (text: string) => {
    if (!text.trim()) return;
    setData(d => ({ ...d, actionItems: [{ id: genId('ai'), text: text.trim(), done: false }, ...d.actionItems] }));
  };

  const deleteSession = (id: string) =>
    setData(d => ({ ...d, sessions: d.sessions.filter(s => s.id !== id) }));

  const toggleExercise = (id: string) =>
    setData(d => ({ ...d, exercises: d.exercises.map(e => e.id === id ? { ...e, done: !e.done } : e) }));

  const deleteExercise = (id: string) =>
    setData(d => ({ ...d, exercises: d.exercises.filter(e => e.id !== id) }));

  // ── Save session from editor ────────────────────────────────────────────────
  const saveSession = () => {
    const s = editor.session;
    if (!s?.title?.trim() || !s?.date) return;
    if (editor.isNew) {
      const newSession: TherapySession = {
        id: genId('ts'),
        date: s.date,
        therapist: s.therapist || 'Darrell',
        title: s.title,
        status: s.status || 'completed',
        themes: s.themes || [],
        insights: s.insights || [],
        homework: s.homework || [],
        reflection: s.reflection,
        selfRatings: s.selfRatings,
      };
      // Homework items become action items too
      const newActionItems = (newSession.homework || []).map(text => ({
        id: genId('ai'), text, done: false, sessionId: newSession.id,
      }));
      setData(d => ({ ...d, sessions: [newSession, ...d.sessions], actionItems: [...newActionItems, ...d.actionItems] }));
    } else if (s.id) {
      setData(d => ({ ...d, sessions: d.sessions.map(x => x.id === s.id ? { ...x, ...s } as TherapySession : x) }));
    }
    setEditor({ open: false, session: null, isNew: false });
  };

  // ── Import / Export ─────────────────────────────────────────────────────────
  const doImport = (raw: string, mode: 'replace' | 'merge') => {
    try {
      const parsed = JSON.parse(raw);
      const incoming: TherapyData = {
        sessions: parsed.sessions ?? [],
        frameworks: parsed.frameworks ?? [],
        actionItems: parsed.actionItems ?? [],
        exercises: parsed.exercises ?? [],
      };
      if (mode === 'replace') {
        setData(incoming);
      } else {
        setData(d => {
          const sIds = new Set(d.sessions.map(s => s.id));
          const fIds = new Set(d.frameworks.map(f => f.id));
          const aIds = new Set(d.actionItems.map(a => a.id));
          const eIds = new Set(d.exercises.map(e => e.id));
          return {
            sessions: [...incoming.sessions.filter(s => !sIds.has(s.id)), ...d.sessions],
            frameworks: [...incoming.frameworks.filter(f => !fIds.has(f.id)), ...d.frameworks],
            actionItems: [...incoming.actionItems.filter(a => !aIds.has(a.id)), ...d.actionItems],
            exercises: [...incoming.exercises.filter(e => !eIds.has(e.id)), ...d.exercises],
          };
        });
      }
      setImportOpen(false);
    } catch {
      alert('Could not parse that JSON. Check the file and try again.');
    }
  };

  const doExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ibra-therapy-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="os-page">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div className="flex items-end justify-between mb-2 flex-wrap gap-3">
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--os-orange)', marginBottom: 8 }}>
              Health · private
            </p>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--os-text-primary)' }}>
              Therapy
            </h1>
            <p className="os-page-subtitle" style={{ marginTop: 8 }}>
              {data.sessions.length} session{data.sessions.length === 1 ? '' : 's'} · {openItems.length} open action{openItems.length === 1 ? '' : 's'} · stored only on this device
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="os-btn-secondary" onClick={() => setImportOpen(true)}>
              <Upload size={14} /> Import
            </button>
            {!isEmpty && (
              <button className="os-btn-secondary" onClick={doExport}>
                <Download size={14} /> Export
              </button>
            )}
            <button
              className="os-btn-primary"
              onClick={() => setEditor({
                open: true, isNew: true,
                session: { date: new Date().toISOString().split('T')[0], therapist: 'Darrell', status: 'completed', themes: [], insights: [], homework: [] },
              })}
            >
              <Plus size={14} /> Add Session
            </button>
          </div>
        </div>

        {/* Privacy banner */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(232,80,4,0.06)', border: '1px solid rgba(232,80,4,0.15)',
            borderRadius: 8, padding: '8px 12px', marginTop: 12,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--os-orange)', flexShrink: 0 }} />
          <p style={{ fontSize: 11.5, color: 'var(--os-text-secondary)' }}>
            Private — this stays in your browser only. Nothing here is committed or deployed. Use Export to back it up.
          </p>
        </div>
      </div>

      {isEmpty ? (
        <div className="os-empty">
          <HeartPulse size={28} style={{ color: 'var(--os-text-muted)', marginBottom: 12 }} />
          <p style={{ color: 'var(--os-text-muted)', fontSize: 14 }}>No sessions yet</p>
          <p style={{ color: 'var(--os-text-muted)', fontSize: 12, marginTop: 4 }}>
            Import your session pack, or add a session manually.
          </p>
          <div className="flex gap-2" style={{ marginTop: 16 }}>
            <button className="os-btn-secondary" onClick={() => setImportOpen(true)}>
              <Upload size={13} /> Import pack
            </button>
            <button
              className="os-btn-primary"
              onClick={() => setEditor({
                open: true, isNew: true,
                session: { date: new Date().toISOString().split('T')[0], therapist: 'Darrell', status: 'completed', themes: [], insights: [], homework: [] },
              })}
            >
              <Plus size={13} /> Add first session
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 20, alignItems: 'start' }}>
          {/* ── Main column — sessions ─────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
              Sessions
            </p>
            {sessions.map(s => {
              const isOpen = expanded === s.id;
              return (
                <div key={s.id} className="os-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <button
                    onClick={() => setExpanded(isOpen ? null : s.id)}
                    style={{
                      width: '100%', textAlign: 'left', background: 'none', border: 'none',
                      padding: '16px 18px', cursor: 'pointer', fontFamily: 'inherit',
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                    }}
                  >
                    <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: STATUS_COLORS[s.status], flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 4 }}>
                        <Calendar size={12} style={{ color: 'var(--os-text-muted)' }} />
                        <span style={{ fontSize: 11, color: 'var(--os-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                          {new Date(s.date + 'T00:00:00').toLocaleDateString('en-CA', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span style={{ fontSize: 10, color: 'var(--os-text-muted)' }}>· {s.therapist}</span>
                      </div>
                      <p style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}>
                        {s.title}
                      </p>
                      {s.themes.length > 0 && (
                        <div className="flex flex-wrap gap-1.5" style={{ marginTop: 8 }}>
                          {s.themes.map(t => <span key={t} className="os-tag">{t}</span>)}
                        </div>
                      )}
                    </div>
                    <div style={{ flexShrink: 0, color: 'var(--os-text-muted)', marginTop: 2 }}>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 18px 18px 34px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {s.selfRatings && s.selfRatings.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {s.selfRatings.map(r => (
                            <div key={r.label} style={{ background: 'var(--os-surface-raised)', borderRadius: 8, padding: '8px 12px', minWidth: 110 }}>
                              <p style={{ fontSize: 10, color: 'var(--os-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{r.label}</p>
                              <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--os-gold)', letterSpacing: '-0.03em' }}>
                                {r.value}<span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>/10</span>
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {s.insights.length > 0 && (
                        <Section title="Key insights">
                          <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, listStyle: 'none', padding: 0, margin: 0 }}>
                            {s.insights.map((ins, i) => (
                              <li key={i} style={{ display: 'flex', gap: 10 }}>
                                <CircleDot size={13} style={{ color: 'var(--os-orange)', marginTop: 3, flexShrink: 0 }} />
                                <span style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--os-text-primary)' }}>{ins}</span>
                              </li>
                            ))}
                          </ul>
                        </Section>
                      )}

                      {s.homework.length > 0 && (
                        <Section title="Homework">
                          <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, listStyle: 'none', padding: 0, margin: 0 }}>
                            {s.homework.map((h, i) => (
                              <li key={i} style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--os-text-secondary)', paddingLeft: 14, position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: 'var(--os-gold)' }}>→</span>{h}
                              </li>
                            ))}
                          </ul>
                        </Section>
                      )}

                      {s.reflection && (
                        <Section title="Reflection">
                          <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--os-text-secondary)', fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                            {s.reflection}
                          </p>
                        </Section>
                      )}

                      <div className="flex gap-2" style={{ marginTop: 2 }}>
                        <button
                          className="os-btn-secondary"
                          style={{ fontSize: 12, padding: '5px 10px' }}
                          onClick={() => setEditor({ open: true, isNew: false, session: { ...s } })}
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          className="os-icon-btn os-icon-btn-danger"
                          onClick={() => { if (confirm('Delete this session?')) deleteSession(s.id); }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ── Frameworks ──────────────────────────────────────────── */}
            {data.frameworks.length > 0 && (
              <>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--os-text-muted)', marginTop: 12 }}>
                  Frameworks
                </p>
                {data.frameworks.map(f => (
                  <div key={f.id} className="os-card" style={{ padding: 18 }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
                      <Brain size={14} style={{ color: 'var(--os-purple)' }} />
                      <h3 style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--os-text-primary)' }}>{f.name}</h3>
                    </div>
                    <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--os-text-secondary)' }}>{f.summary}</p>
                    {f.poles && f.poles.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                        {f.poles.map((p, i) => (
                          <div key={i} className="flex items-center gap-2" style={{ fontSize: 12 }}>
                            <span style={{ color: 'var(--os-green)', fontWeight: 600, minWidth: 0, flex: 1 }}>{p.healthyVirtue}</span>
                            <span style={{ color: 'var(--os-text-muted)', flexShrink: 0 }}>→</span>
                            <span style={{ color: 'var(--os-red)', fontWeight: 600, minWidth: 0, flex: 1, textAlign: 'right' }}>{p.excess}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {f.notes && <p style={{ fontSize: 12, color: 'var(--os-text-muted)', marginTop: 10, lineHeight: 1.55, whiteSpace: 'pre-line' }}>{f.notes}</p>}
                  </div>
                ))}
              </>
            )}

            {/* ── Exercises / practices ───────────────────────────────── */}
            {data.exercises.length > 0 && (
              <>
                <div className="flex items-center justify-between" style={{ marginTop: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
                    Exercises & practices
                  </p>
                  <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>
                    {data.exercises.filter(e => e.done).length}/{data.exercises.length} done
                  </span>
                </div>
                {data.exercises.map(ex => {
                  const effortColor = ex.effort === 'low' ? 'var(--os-green)' : ex.effort === 'high' ? 'var(--os-red)' : 'var(--os-yellow)';
                  return (
                    <div
                      key={ex.id}
                      className="os-card"
                      style={{
                        padding: 18,
                        borderColor: ex.recommended ? 'rgba(232,80,4,0.3)' : undefined,
                        opacity: ex.done ? 0.6 : 1,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleExercise(ex.id)}
                          title={ex.done ? 'Mark not done' : 'Mark done'}
                          style={{
                            width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                            border: `1.5px solid ${ex.done ? 'var(--os-green)' : 'var(--os-text-muted)'}`,
                            background: ex.done ? 'var(--os-green)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                          }}
                        >
                          {ex.done && <Check size={13} color="#0a0a0f" />}
                        </button>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 4 }}>
                            <Target size={13} style={{ color: 'var(--os-orange)', flexShrink: 0 }} />
                            <h3 style={{
                              fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em',
                              color: 'var(--os-text-primary)',
                              textDecoration: ex.done ? 'line-through' : 'none',
                            }}>
                              {ex.title}
                            </h3>
                            {ex.recommended && (
                              <span className="flex items-center gap-1" style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--os-orange)', background: 'rgba(232,80,4,0.12)', padding: '2px 6px', borderRadius: 4 }}>
                                <Star size={9} /> Start here
                              </span>
                            )}
                            {ex.effort && (
                              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: effortColor }}>
                                {ex.effort} effort
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--os-text-secondary)', marginBottom: 8 }}>
                            <span style={{ color: 'var(--os-text-muted)', fontWeight: 600 }}>Why · </span>{ex.why}
                          </p>
                          <p style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--os-text-primary)' }}>
                            <span style={{ color: 'var(--os-text-muted)', fontWeight: 600 }}>How · </span>{ex.how}
                          </p>
                        </div>
                        <button className="os-icon-btn" style={{ opacity: 0.4, flexShrink: 0, padding: 2 }} onClick={() => deleteExercise(ex.id)}>
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* ── Sidebar — action items ─────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'sticky', top: 0 }}>
            <div className="os-card" style={{ padding: 18 }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
                  Action items
                </p>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--os-orange)' }}>{openItems.length} open</span>
              </div>

              <QuickAdd onAdd={addItem} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 10 }}>
                {openItems.map(item => (
                  <ActionRow key={item.id} item={item} onToggle={toggleItem} onDelete={deleteItem} />
                ))}
                {doneItems.length > 0 && (
                  <>
                    <p style={{ fontSize: 10, color: 'var(--os-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 10, marginBottom: 2 }}>
                      Done ({doneItems.length})
                    </p>
                    {doneItems.map(item => (
                      <ActionRow key={item.id} item={item} onToggle={toggleItem} onDelete={deleteItem} />
                    ))}
                  </>
                )}
                {data.actionItems.length === 0 && (
                  <p style={{ fontSize: 12, color: 'var(--os-text-muted)', textAlign: 'center', padding: '12px 0' }}>
                    No action items yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session editor modal */}
      {editor.open && editor.session && (
        <SessionEditor
          state={editor}
          onChange={session => setEditor(e => ({ ...e, session }))}
          onSave={saveSession}
          onClose={() => setEditor({ open: false, session: null, isNew: false })}
        />
      )}

      {/* Import modal */}
      {importOpen && <ImportModal onClose={() => setImportOpen(false)} onImport={doImport} hasData={!isEmpty} />}
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--os-text-muted)', marginBottom: 8 }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function ActionRow({ item, onToggle, onDelete }: { item: TherapyActionItem; onToggle: (id: string) => void; onDelete: (id: string) => void }) {
  return (
    <div className="flex items-start gap-2 group" style={{ padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <button
        onClick={() => onToggle(item.id)}
        style={{
          width: 16, height: 16, borderRadius: 5, flexShrink: 0, marginTop: 1,
          border: `1.5px solid ${item.done ? 'var(--os-green)' : 'var(--os-text-muted)'}`,
          background: item.done ? 'var(--os-green)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        {item.done && <Check size={11} color="#0a0a0f" />}
      </button>
      <span
        style={{
          flex: 1, fontSize: 12.5, lineHeight: 1.45,
          color: item.done ? 'var(--os-text-muted)' : 'var(--os-text-primary)',
          textDecoration: item.done ? 'line-through' : 'none',
        }}
      >
        {item.text}
      </span>
      <button
        className="os-icon-btn"
        style={{ opacity: 0.4, flexShrink: 0, padding: 2 }}
        onClick={() => onDelete(item.id)}
      >
        <X size={12} />
      </button>
    </div>
  );
}

function QuickAdd({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <div className="flex gap-1.5">
      <input
        className="os-input"
        style={{ flex: 1, fontSize: 12, padding: '6px 10px' }}
        placeholder="Add action item..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { onAdd(text); setText(''); } }}
      />
      <button className="os-btn-secondary" style={{ padding: '6px 10px' }} onClick={() => { onAdd(text); setText(''); }}>
        <Plus size={13} />
      </button>
    </div>
  );
}

// ── Session editor ───────────────────────────────────────────────────────────
function SessionEditor({
  state, onChange, onSave, onClose,
}: {
  state: { session: Partial<TherapySession> | null; isNew: boolean };
  onChange: (s: Partial<TherapySession>) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const s = state.session!;
  const listField = (key: 'themes' | 'insights' | 'homework') => (s[key] ?? []).join('\n');
  const setListField = (key: 'themes' | 'insights' | 'homework', val: string) =>
    onChange({ ...s, [key]: val.split('\n').map(x => x.trim()).filter(Boolean) });

  return (
    <div className="os-modal-overlay" onClick={onClose}>
      <div className="os-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 620, width: '90vw' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}>
            {state.isNew ? 'Add Session' : 'Edit Session'}
          </h2>
          <button className="os-icon-btn" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '70vh', overflowY: 'auto', paddingRight: 4 }}>
          <div className="flex gap-2">
            <input
              type="date"
              className="os-input"
              style={{ flex: 1 }}
              value={s.date ?? ''}
              onChange={e => onChange({ ...s, date: e.target.value })}
            />
            <input
              className="os-input"
              style={{ flex: 1 }}
              placeholder="Therapist"
              value={s.therapist ?? ''}
              onChange={e => onChange({ ...s, therapist: e.target.value })}
            />
            <select
              className="os-select"
              value={s.status ?? 'completed'}
              onChange={e => onChange({ ...s, status: e.target.value as TherapySessionStatus })}
            >
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <input
            className="os-input"
            placeholder="Session title"
            value={s.title ?? ''}
            onChange={e => onChange({ ...s, title: e.target.value })}
          />

          <Field label="Themes (one per line)">
            <textarea className="os-textarea" rows={2} value={listField('themes')} onChange={e => setListField('themes', e.target.value)} />
          </Field>
          <Field label="Key insights (one per line)">
            <textarea className="os-textarea" rows={4} value={listField('insights')} onChange={e => setListField('insights', e.target.value)} />
          </Field>
          <Field label="Homework (one per line — becomes action items for new sessions)">
            <textarea className="os-textarea" rows={3} value={listField('homework')} onChange={e => setListField('homework', e.target.value)} />
          </Field>
          <Field label="Reflection">
            <textarea className="os-textarea" rows={3} value={s.reflection ?? ''} onChange={e => onChange({ ...s, reflection: e.target.value })} />
          </Field>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="os-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="os-btn-primary" onClick={onSave}>
            <Check size={13} /> {state.isNew ? 'Add Session' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: 11, color: 'var(--os-text-muted)', display: 'block', marginBottom: 4 }}>{label}</label>
      {children}
    </div>
  );
}

// ── Import modal ─────────────────────────────────────────────────────────────
function ImportModal({
  onClose, onImport, hasData,
}: {
  onClose: () => void;
  onImport: (raw: string, mode: 'replace' | 'merge') => void;
  hasData: boolean;
}) {
  const [raw, setRaw] = useState('');

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setRaw(String(reader.result ?? ''));
    reader.readAsText(file);
  };

  return (
    <div className="os-modal-overlay" onClick={onClose}>
      <div className="os-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 620, width: '90vw' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Upload size={16} style={{ color: 'var(--os-orange)' }} />
            <h2 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}>Import session pack</h2>
          </div>
          <button className="os-icon-btn" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', lineHeight: 1.6 }}>
            Load a therapy JSON pack (sessions, frameworks, action items). It's saved only in this browser.
            Choose a <code>.json</code> file or paste the contents below.
          </p>

          <label className="os-btn-secondary" style={{ alignSelf: 'flex-start', cursor: 'pointer' }}>
            <Upload size={13} /> Choose file
            <input type="file" accept="application/json,.json" onChange={onFile} style={{ display: 'none' }} />
          </label>

          <textarea
            className="os-textarea"
            rows={8}
            placeholder='{ "sessions": [...], "frameworks": [...], "actionItems": [...] }'
            value={raw}
            onChange={e => setRaw(e.target.value)}
            style={{ fontFamily: 'monospace', fontSize: 11.5 }}
          />

          <div className="flex justify-end gap-2">
            <button className="os-btn-secondary" onClick={onClose}>Cancel</button>
            {hasData && (
              <button className="os-btn-secondary" onClick={() => onImport(raw, 'merge')} disabled={!raw.trim()}>
                Merge
              </button>
            )}
            <button className="os-btn-primary" onClick={() => onImport(raw, 'replace')} disabled={!raw.trim()}>
              <Check size={13} /> {hasData ? 'Replace all' : 'Import'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
