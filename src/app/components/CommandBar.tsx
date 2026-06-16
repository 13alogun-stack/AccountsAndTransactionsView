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
  ArrowRight,
  FileText,
  Zap,
  Brain,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { answerQuestion } from '../ai/mockAI';

const QUICK_COMMANDS = [
  { label: 'Home', icon: Home, action: '/' },
  { label: 'Projects', icon: FolderOpen, action: '/projects' },
  { label: 'Opportunities', icon: Briefcase, action: '/opportunities' },
  { label: 'Design Language', icon: Palette, action: '/design-language' },
  { label: 'Moodboards', icon: Image, action: '/moodboards' },
  { label: 'Finance', icon: DollarSign, action: '/finance' },
  { label: 'Learning', icon: BookOpen, action: '/learning' },
  { label: 'Documents', icon: FileText, action: '/documents' },
  { label: 'Prompts', icon: Zap, action: '/prompts' },
  { label: 'Memory', icon: Brain, action: '/memories' },
  { label: 'Agent Command Centre', icon: Bot, action: '/agents' },
];

const AI_SUGGESTIONS = [
  'What should I work on today?',
  'Which projects are portfolio-ready?',
  'Which opportunities need follow-up?',
  'What should I charge for this project?',
  'Create a case study from PC Masterbrand',
  'Generate baseline and wild directions for DX Studio',
];

export default function CommandBar() {
  const { commandBarOpen, setCommandBarOpen, projects, opportunities, documents, memories, searchAll } = useApp();
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [aiMode, setAiMode] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
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
      setAiMode(false);
      setAiAnswer(null);
    }
  }, [commandBarOpen]);

  const filteredCommands = QUICK_COMMANDS.filter(c =>
    !query || c.label.toLowerCase().includes(query.toLowerCase())
  );

  const searchResults = query ? searchAll(query) : [];

  const isAiQuery = query.startsWith('?') || query.toLowerCase().startsWith('what') ||
    query.toLowerCase().startsWith('which') || query.toLowerCase().startsWith('how') ||
    query.toLowerCase().startsWith('create') || query.toLowerCase().startsWith('generate') ||
    query.toLowerCase().startsWith('draft') || query.toLowerCase().startsWith('should');

  const handleNavigate = (path: string) => {
    navigate(path);
    setCommandBarOpen(false);
  };

  const runAI = async () => {
    if (!query.trim()) return;
    setAiLoading(true);
    setAiAnswer(null);
    setAiMode(true);
    try {
      const result = await answerQuestion(query, { projects, opportunities, memories });
      setAiAnswer(result.output);
    } finally {
      setAiLoading(false);
    }
  };

  if (!commandBarOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={e => { if (e.target === e.currentTarget) setCommandBarOpen(false); }}
    >
      <div
        className="w-full max-w-xl rounded-xl overflow-hidden animate-in"
        style={{
          background: 'var(--os-surface-overlay)',
          border: '1px solid var(--os-border-strong)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-4"
          style={{ borderBottom: '1px solid var(--os-border)', height: 52 }}
        >
          {aiLoading ? (
            <Loader2 size={15} style={{ color: 'var(--os-orange)', flexShrink: 0, animation: 'spin 1s linear infinite' }} />
          ) : isAiQuery && query ? (
            <Sparkles size={15} style={{ color: 'var(--os-orange)', flexShrink: 0 }} />
          ) : (
            <Search size={15} style={{ color: 'var(--os-text-muted)', flexShrink: 0 }} />
          )}
          <input
            ref={inputRef}
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setActiveIdx(0);
              setAiMode(false);
              setAiAnswer(null);
            }}
            placeholder="Search or ask Ibra OS anything..."
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
              if (e.key === 'Enter') {
                if (isAiQuery) { runAI(); return; }
                if (filteredCommands[activeIdx]) handleNavigate(filteredCommands[activeIdx].action);
              }
              if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => i + 1); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => Math.max(0, i - 1)); }
            }}
          />
          {isAiQuery && query && !aiMode && (
            <button
              onClick={runAI}
              style={{
                padding: '4px 10px',
                background: 'rgba(232,80,4,0.15)',
                border: '1px solid rgba(232,80,4,0.3)',
                borderRadius: 6,
                fontSize: 11,
                color: 'var(--os-orange)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              Ask ↵
            </button>
          )}
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
              flexShrink: 0,
            }}
          >
            ESC
          </button>
        </div>

        <div style={{ maxHeight: 420, overflowY: 'auto', padding: '8px 0' }}>
          {/* AI answer */}
          {aiMode && (
            <div style={{ padding: '12px 16px' }}>
              {aiLoading ? (
                <div className="flex items-center gap-2" style={{ color: 'var(--os-text-muted)', fontSize: 13 }}>
                  <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
                  Thinking...
                </div>
              ) : aiAnswer ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={12} style={{ color: 'var(--os-orange)', flexShrink: 0 }} />
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-orange)' }}>
                      Ibra OS
                    </span>
                  </div>
                  <pre
                    style={{
                      fontSize: 13,
                      lineHeight: 1.7,
                      color: 'var(--os-text-primary)',
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'inherit',
                      margin: 0,
                    }}
                  >
                    {aiAnswer}
                  </pre>
                </div>
              ) : null}
            </div>
          )}

          {/* Search results */}
          {!aiMode && searchResults.length > 0 && (
            <div>
              <p className="cmd-section-label">Results</p>
              {searchResults.map(r => (
                <button
                  key={r.id}
                  onClick={() => handleNavigate(r.path)}
                  className="cmd-item"
                >
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '2px 5px',
                      borderRadius: 4,
                      background: 'rgba(255,255,255,0.07)',
                      color: 'var(--os-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      flexShrink: 0,
                    }}
                  >
                    {r.type.replace(/_/g, ' ')}
                  </span>
                  <span style={{ flex: 1, color: 'var(--os-text-primary)' }}>{r.title}</span>
                  {r.subtitle && <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>{r.subtitle}</span>}
                  <ArrowRight size={12} style={{ color: 'var(--os-text-muted)', flexShrink: 0 }} />
                </button>
              ))}
            </div>
          )}

          {/* Quick nav */}
          {!aiMode && (
            <div style={{ marginTop: searchResults.length > 0 ? 8 : 0 }}>
              {!query && <p className="cmd-section-label">Navigate</p>}
              {filteredCommands.slice(0, query ? 4 : 8).map((cmd, i) => (
                <button
                  key={cmd.action}
                  onClick={() => handleNavigate(cmd.action)}
                  className="cmd-item"
                  style={{ background: i === activeIdx ? 'rgba(255,255,255,0.05)' : undefined }}
                >
                  <cmd.icon size={14} style={{ color: 'var(--os-text-muted)', flexShrink: 0 }} />
                  <span style={{ flex: 1, color: 'var(--os-text-primary)' }}>{cmd.label}</span>
                  <ArrowRight size={12} style={{ color: 'var(--os-text-muted)' }} />
                </button>
              ))}
            </div>
          )}

          {/* AI Suggestions */}
          {!query && !aiMode && (
            <div style={{ marginTop: 8 }}>
              <p className="cmd-section-label">Ask Ibra OS</p>
              {AI_SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="cmd-item"
                >
                  <span
                    style={{
                      fontSize: 10,
                      padding: '2px 6px',
                      borderRadius: 5,
                      background: 'rgba(232,80,4,0.12)',
                      color: 'var(--os-orange)',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    Ask
                  </span>
                  <span style={{ color: 'var(--os-text-secondary)' }}>{s}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .cmd-section-label {
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            color: var(--os-text-muted);
            padding: 4px 16px 6px;
          }
          .cmd-item {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            padding: 8px 16px;
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 13px;
            font-family: inherit;
            text-align: left;
            transition: background 0.1s;
          }
          .cmd-item:hover { background: rgba(255,255,255,0.05); }
        `}</style>
      </div>
    </div>
  );
}
