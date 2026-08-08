import { useState } from 'react';
import { Inbox, Zap, Brain, Bot, Check, X, ArrowDown } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { DumpItem } from '../types';

export default function Dump() {
  const { dumps, addDump, updateDump, deleteDump, addPriority, addMemory, addAgentTask } = useApp();
  const [text, setText] = useState('');
  const [flash, setFlash] = useState<string | null>(null);

  const inbox = dumps.filter(d => d.status === 'inbox');
  const handled = dumps.filter(d => d.status !== 'inbox').slice(0, 10);

  const dump = () => {
    if (!text.trim()) return;
    addDump(text);
    setText('');
  };

  const notify = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 1800);
  };

  const toToday = (d: DumpItem) => {
    addPriority(d.text, 'medium');
    updateDump(d.id, { status: 'triaged', triagedTo: 'priority' });
    notify('→ Added to Today');
  };

  const toMemory = (d: DumpItem) => {
    addMemory({ type: 'lesson', source: 'Brain dump', content: d.text, tags: ['dump'], confidence: 80 });
    updateDump(d.id, { status: 'triaged', triagedTo: 'memory' });
    notify('→ Saved as memory');
  };

  const toTask = (d: DumpItem) => {
    addAgentTask({
      title: d.text.slice(0, 80),
      agentType: 'creative_director',
      status: 'queued',
      prompt: d.text,
      tags: ['dump'],
      priority: 'medium',
    });
    updateDump(d.id, { status: 'triaged', triagedTo: 'task' });
    notify('→ Queued as agent task');
  };

  return (
    <div className="os-page" style={{ maxWidth: 760 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--os-orange)', marginBottom: 8 }}>
          Capture first, sort later
        </p>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--os-text-primary)' }}>
          Dump
        </h1>
        <p className="os-page-subtitle" style={{ marginTop: 8 }}>
          {inbox.length === 0 ? 'Inbox zero' : `${inbox.length} in inbox`} · one thought per line · nothing is lost on reload
        </p>
      </div>

      {/* Capture box */}
      <div className="os-card" style={{ padding: 16, marginBottom: 20 }}>
        <textarea
          className="os-textarea"
          rows={4}
          autoFocus
          placeholder={'Empty your head — one thought per line\n\ncall recruiter back\nidea: poster series with PC photography\nlook into RGD renewal deadline'}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) dump(); }}
          style={{ border: 'none', background: 'transparent', fontSize: 14, lineHeight: 1.7 }}
        />
        <div className="flex items-center justify-between" style={{ marginTop: 8 }}>
          <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>⌘↵ to dump</span>
          <button className="os-btn-primary" onClick={dump} disabled={!text.trim()}>
            <ArrowDown size={14} /> Dump it
          </button>
        </div>
      </div>

      {flash && (
        <div style={{ position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)', background: 'var(--os-surface-overlay)', border: '1px solid var(--os-border-strong)', borderRadius: 10, padding: '8px 16px', fontSize: 13, color: 'var(--os-green)', zIndex: 100 }}>
          {flash}
        </div>
      )}

      {/* Inbox */}
      {inbox.length === 0 ? (
        <div className="os-empty" style={{ padding: '32px 0' }}>
          <Inbox size={26} style={{ color: 'var(--os-text-muted)', marginBottom: 10 }} />
          <p style={{ color: 'var(--os-text-muted)', fontSize: 13 }}>Head empty. Nice.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {inbox.map(d => (
            <div key={d.id} className="os-card" style={{ padding: '12px 14px' }}>
              <p style={{ fontSize: 13.5, color: 'var(--os-text-primary)', lineHeight: 1.5, marginBottom: 10 }}>
                {d.text}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="os-btn-secondary" style={{ fontSize: 11.5, padding: '4px 10px' }} onClick={() => toToday(d)}>
                  <Zap size={11} /> Today
                </button>
                <button className="os-btn-secondary" style={{ fontSize: 11.5, padding: '4px 10px' }} onClick={() => toMemory(d)}>
                  <Brain size={11} /> Memory
                </button>
                <button className="os-btn-secondary" style={{ fontSize: 11.5, padding: '4px 10px' }} onClick={() => toTask(d)}>
                  <Bot size={11} /> Agent task
                </button>
                <button
                  className="os-btn-secondary"
                  style={{ fontSize: 11.5, padding: '4px 10px' }}
                  onClick={() => { updateDump(d.id, { status: 'done' }); notify('Done'); }}
                >
                  <Check size={11} /> Done
                </button>
                <button className="os-icon-btn" style={{ marginLeft: 'auto', opacity: 0.5 }} onClick={() => deleteDump(d.id)}>
                  <X size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recently handled */}
      {handled.length > 0 && (
        <div style={{ marginTop: 28 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--os-text-muted)', marginBottom: 8 }}>
            Recently handled
          </p>
          {handled.map(d => (
            <div key={d.id} className="flex items-center gap-2" style={{ padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: 12, color: 'var(--os-text-muted)', textDecoration: 'line-through', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {d.text}
              </span>
              <span style={{ fontSize: 10, color: 'var(--os-text-muted)', flexShrink: 0, textTransform: 'capitalize' }}>
                {d.triagedTo ?? 'done'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
