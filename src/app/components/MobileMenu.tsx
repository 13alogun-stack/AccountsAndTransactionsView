import { Link, useLocation } from 'react-router';
import { Palette, Image, DollarSign, BookOpen, Search, FileText, Zap, Brain } from 'lucide-react';
import { useApp } from '../store/AppContext';

const MORE_NAV = [
  { path: '/design-language', label: 'Design Language', icon: Palette, description: 'Visual language & principles' },
  { path: '/moodboards', label: 'Moodboards', icon: Image, description: 'References & inspiration' },
  { path: '/finance', label: 'Finance', icon: DollarSign, description: 'Income, rates & invoices' },
  { path: '/learning', label: 'Learning', icon: BookOpen, description: 'Skills & goals' },
  { path: '/documents', label: 'Documents', icon: FileText, description: 'Case studies, briefs, proposals' },
  { path: '/prompts', label: 'Prompts', icon: Zap, description: 'Reusable AI prompt library' },
  { path: '/memories', label: 'Memory', icon: Brain, description: 'Lessons, decisions & context' },
];

interface Props {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: Props) {
  const location = useLocation();
  const { setCommandBarOpen } = useApp();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="animate-in"
        style={{
          background: 'var(--os-surface)',
          borderTop: '1px solid var(--os-border-strong)',
          borderRadius: '20px 20px 0 0',
          padding: '20px 20px calc(20px + var(--safe-bottom))',
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.15)',
            margin: '0 auto 20px',
          }}
        />

        {/* Search */}
        <button
          onClick={() => { setCommandBarOpen(true); onClose(); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            width: '100%',
            padding: '12px 14px',
            background: 'var(--os-surface-raised)',
            border: '1px solid var(--os-border)',
            borderRadius: 12,
            color: 'var(--os-text-muted)',
            fontSize: 14,
            fontFamily: 'inherit',
            cursor: 'pointer',
            marginBottom: 16,
          }}
        >
          <Search size={16} />
          <span>Search or ask Ibra OS...</span>
          <span
            style={{
              marginLeft: 'auto',
              fontSize: 10,
              padding: '2px 6px',
              borderRadius: 5,
              background: 'rgba(255,255,255,0.05)',
              color: 'var(--os-text-muted)',
            }}
          >
            ⌘K
          </span>
        </button>

        {/* More navigation items */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {MORE_NAV.map(({ path, label, icon: Icon, description }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  padding: '14px',
                  background: isActive ? 'var(--os-gold-muted)' : 'var(--os-surface-raised)',
                  border: `1px solid ${isActive ? 'rgba(201,168,68,0.2)' : 'var(--os-border)'}`,
                  borderRadius: 12,
                }}
              >
                <Icon
                  size={20}
                  style={{ color: isActive ? 'var(--os-gold)' : 'var(--os-text-secondary)' }}
                  strokeWidth={1.8}
                />
                <div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: isActive ? 'var(--os-gold)' : 'var(--os-text-primary)',
                      marginBottom: 2,
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--os-text-muted)', lineHeight: 1.3 }}>
                    {description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Profile */}
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            background: 'var(--os-surface-raised)',
            borderRadius: 12,
            border: '1px solid var(--os-border)',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--os-gold)',
              color: '#0a0a0f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            IB
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
              Ibra Balogun
            </p>
            <p style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>Creative Director · DX Studio</p>
          </div>
        </div>
      </div>
    </div>
  );
}
