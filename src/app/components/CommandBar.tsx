import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  Home,
  FolderOpen,
  Briefcase,
  Palette,
  Image,
  DollarSign,
  BookOpen,
  Bot,
  Search,
  X,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../store/AppContext';

const QUICK_COMMANDS = [
  { label: 'Go to Home', icon: Home, action: '/' },
  { label: 'View Projects', icon: FolderOpen, action: '/projects' },
  { label: 'Open Opportunities', icon: Briefcase, action: '/opportunities' },
  { label: 'Design Language', icon: Palette, action: '/design-language' },
  { label: 'Moodboards', icon: Image, action: '/moodboards' },
  { label: 'Finance Overview', icon: DollarSign, action: '/finance' },
  { label: 'Learning Goals', icon: BookOpen, action: '/learning' },
  { label: 'Agent Command Centre', icon: Bot, action: '/agents' },
];

const SUGGESTIONS = [
  'Turn Carbon Fight into a case study',
  'Draft outreach for TechFlow opportunity',
  'Create a moodboard for premium SaaS style',
  'What should I focus on today?',
  'Generate baseline and wild directions for DX Studio',
  'What should I charge for this project?',
];

export default function CommandBar() {
  const { commandBarOpen, setCommandBarOpen, projects, opportunities } = useApp();
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandBarOpen(!commandBarOpen);
      }
      if (e.key === 'Escape') setCommandBarOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [commandBarOpen, setCommandBarOpen]);

  useEffect(() => {
    if (commandBarOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setActiveIdx(0);
    }
  }, [commandBarOpen]);

  const filteredCommands = QUICK_COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const matchedProjects = projects.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.client.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const matchedOpps = opportunities.filter(o =>
    o.title.toLowerCase().includes(query.toLowerCase()) ||
    o.company.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 2);

  const handleNavigate = (path: string) => {
    navigate(path);
    setCommandBarOpen(false);
  };

  if (!commandBarOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-28"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) setCommandBarOpen(false); }}
    >
      <div
        className="w-full max-w-xl rounded-xl overflow-hidden animate-in"
        style={{
          background: 'var(--os-surface-overlay)',
          border: '1px solid var(--os-border-strong)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
        }}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-4"
          style={{ borderBottom: '1px solid var(--os-border)', height: 52 }}
        >
          <Search size={15} style={{ color: 'var(--os-text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
            placeholder="Search projects, ask Ibra OS..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 14,
              color: 'var(--os-text-primary)',
              fontFamily: 'inherit',
            }}
            onKeyDown={e => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => i + 1); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(0, i - 1)); }
              if (e.key === 'Enter' && filteredCommands[activeIdx]) {
                handleNavigate(filteredCommands[activeIdx].action);
              }
            }}
          />
          <button
            onClick={() => setCommandBarOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: 'none',
              borderRadius: 6,
              padding: '3px 7px',
              fontSize: 10,
              color: 'var(--os-text-muted)',
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            ESC
          </button>
        </div>

        <div style={{ maxHeight: 360, overflowY: 'auto', padding: '8px 0' }}>
          {/* Quick nav */}
          {filteredCommands.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--os-text-muted)',
                  padding: '4px 16px 6px',
                }}
              >
                Navigate
              </p>
              {filteredCommands.slice(0, 5).map((cmd, i) => (
                <button
                  key={cmd.action}
                  onClick={() => handleNavigate(cmd.action)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '8px 16px',
                    background: i === activeIdx ? 'rgba(255,255,255,0.05)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--os-text-primary)',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = i === activeIdx ? 'rgba(255,255,255,0.05)' : 'transparent')}
                >
                  <cmd.icon size={14} style={{ color: 'var(--os-text-muted)', flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{cmd.label}</span>
                  <ArrowRight size={12} style={{ color: 'var(--os-text-muted)' }} />
                </button>
              ))}
            </div>
          )}

          {/* Projects */}
          {matchedProjects.length > 0 && query && (
            <div style={{ marginTop: 8 }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--os-text-muted)',
                  padding: '4px 16px 6px',
                }}
              >
                Projects
              </p>
              {matchedProjects.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleNavigate(`/projects/${p.id}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '8px 16px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--os-text-primary)',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: p.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ flex: 1 }}>{p.title}</span>
                  <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>{p.client}</span>
                </button>
              ))}
            </div>
          )}

          {/* Opportunities */}
          {matchedOpps.length > 0 && query && (
            <div style={{ marginTop: 8 }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--os-text-muted)',
                  padding: '4px 16px 6px',
                }}
              >
                Opportunities
              </p>
              {matchedOpps.map(o => (
                <button
                  key={o.id}
                  onClick={() => handleNavigate('/opportunities')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '8px 16px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--os-text-primary)',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                >
                  <span style={{ flex: 1 }}>{o.title}</span>
                  <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>{o.company}</span>
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {!query && (
            <div style={{ marginTop: 8 }}>
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  color: 'var(--os-text-muted)',
                  padding: '4px 16px 6px',
                }}
              >
                Ask Ibra OS
              </p>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '8px 16px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--os-text-secondary)',
                    fontSize: 13,
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'transparent')}
                >
                  <span
                    style={{
                      fontSize: 10,
                      padding: '2px 6px',
                      borderRadius: 5,
                      background: 'var(--os-gold-muted)',
                      color: 'var(--os-gold)',
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    Ask
                  </span>
                  <span>{s}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
