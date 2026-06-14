import { useLocation } from 'react-router';
import { Search } from 'lucide-react';
import { useApp } from '../store/AppContext';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Ibra OS',
  '/projects': 'Projects',
  '/opportunities': 'Opportunities',
  '/design-language': 'Design Language',
  '/moodboards': 'Moodboards',
  '/finance': 'Finance',
  '/learning': 'Learning',
  '/agents': 'Agents',
};

export default function MobileHeader() {
  const location = useLocation();
  const { setCommandBarOpen } = useApp();

  const isProjectDetail = location.pathname.startsWith('/projects/') && location.pathname !== '/projects';
  const title = isProjectDetail ? 'Project' : (PAGE_TITLES[location.pathname] ?? 'Ibra OS');

  return (
    <header className="mobile-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 7,
            background: 'var(--os-gold-muted)',
            border: '1px solid rgba(201,168,68,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 9,
            fontWeight: 800,
            color: 'var(--os-gold)',
            letterSpacing: '-0.01em',
          }}
        >
          IB
        </div>
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--os-text-primary)',
          }}
        >
          {title}
        </span>
      </div>

      <button
        onClick={() => setCommandBarOpen(true)}
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: 'var(--os-surface-raised)',
          border: '1px solid var(--os-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--os-text-muted)',
        }}
      >
        <Search size={15} />
      </button>
    </header>
  );
}
