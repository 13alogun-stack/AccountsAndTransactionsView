import { Link, useLocation } from 'react-router';
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
  ChevronRight,
  FileText,
  Zap,
  Brain,
  HeartPulse,
} from 'lucide-react';
import { useApp } from '../store/AppContext';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/projects', label: 'Projects', icon: FolderOpen },
  { path: '/opportunities', label: 'Opportunities', icon: Briefcase },
  { path: '/design-language', label: 'Design Language', icon: Palette },
  { path: '/moodboards', label: 'Moodboards', icon: Image },
  { path: '/finance', label: 'Finance', icon: DollarSign },
  { path: '/learning', label: 'Learning', icon: BookOpen },
  { path: '/documents', label: 'Documents', icon: FileText },
  { path: '/prompts', label: 'Prompts', icon: Zap },
  { path: '/memories', label: 'Memory', icon: Brain },
  { path: '/therapy', label: 'Therapy', icon: HeartPulse },
  { path: '/agents', label: 'Agents', icon: Bot },
];

export default function Sidebar() {
  const location = useLocation();
  const { opportunities, agentTasks, documents, setCommandBarOpen } = useApp();

  const activeOpps = opportunities.filter(o =>
    ['applied', 'replied', 'interviewing', 'follow_up', 'proposal'].includes(o.status)
  ).length;

  const pendingTasks = agentTasks.filter(t => ['queued', 'in_progress', 'review'].includes(t.status)).length;

  const draftDocs = documents.filter(d => d.status === 'in_progress').length;

  return (
    <aside className="os-sidebar">
      {/* Wordmark */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--os-gold-muted)', border: '1px solid rgba(201,168,68,0.25)' }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--os-gold)', letterSpacing: '-0.02em' }}>IB</span>
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--os-text-primary)',
            }}
          >
            Ibra OS
          </span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '2px 5px',
              borderRadius: 4,
              background: 'rgba(232,80,4,0.15)',
              color: 'var(--os-orange)',
            }}
          >
            V2
          </span>
        </div>
        <p style={{ fontSize: 10.5, color: 'var(--os-text-muted)', letterSpacing: '0.01em', paddingLeft: 32 }}>
          Personal Creative OS
        </p>
      </div>

      {/* Search / Command */}
      <div className="px-3 mb-3">
        <button
          className="command-bar w-full"
          onClick={() => setCommandBarOpen(true)}
          style={{ textAlign: 'left' }}
        >
          <Search size={13} strokeWidth={2} />
          <span style={{ flex: 1 }}>Ask Ibra OS...</span>
          <span
            style={{
              fontSize: 10,
              padding: '2px 5px',
              borderRadius: 5,
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--os-text-muted)',
              letterSpacing: '0.02em',
            }}
          >
            ⌘K
          </span>
        </button>
      </div>

      <div className="os-divider mx-3" />

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2">
        {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
          const isActive =
            path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

          const badge =
            path === '/opportunities'
              ? activeOpps > 0 ? activeOpps : undefined
              : path === '/agents'
              ? pendingTasks > 0 ? pendingTasks : undefined
              : path === '/documents'
              ? draftDocs > 0 ? draftDocs : undefined
              : undefined;

          return (
            <Link key={path} to={path} className={`nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={14} strokeWidth={isActive ? 2.2 : 1.8} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge !== undefined && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: 999,
                    background: isActive ? 'rgba(201,168,68,0.2)' : 'rgba(255,255,255,0.08)',
                    color: isActive ? 'var(--os-gold)' : 'var(--os-text-secondary)',
                  }}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="os-divider mx-3" />

      {/* Profile */}
      <div className="px-3 py-4">
        <div
          className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer"
          style={{ transition: 'background 0.1s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)')}
          onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--os-gold)', color: '#0a0a0f', fontSize: 11, fontWeight: 700 }}
          >
            IB
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
              Ibra Balogun
            </p>
            <p style={{ fontSize: 10.5, color: 'var(--os-text-muted)', marginTop: 1 }}>Creative Director · RGD</p>
          </div>
          <ChevronRight size={12} style={{ color: 'var(--os-text-muted)', flexShrink: 0 }} />
        </div>
      </div>
    </aside>
  );
}
