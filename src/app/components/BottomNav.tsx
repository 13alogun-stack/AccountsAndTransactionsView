import { Link, useLocation } from 'react-router';
import { Home, FolderOpen, Briefcase, Bot, Grid3X3 } from 'lucide-react';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const PRIMARY_NAV = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/projects', label: 'Projects', icon: FolderOpen },
  { path: '/opportunities', label: 'Opps', icon: Briefcase },
  { path: '/agents', label: 'Agents', icon: Bot },
];

export default function BottomNav() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(17, 17, 24, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'stretch',
          paddingBottom: 'var(--safe-bottom)',
          height: 'calc(56px + var(--safe-bottom))',
        }}
      >
        {PRIMARY_NAV.map(({ path, label, icon: Icon }) => {
          const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
          return (
            <Link
              key={path}
              to={path}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                textDecoration: 'none',
                color: isActive ? 'var(--os-gold)' : 'var(--os-text-muted)',
                paddingTop: 8,
                transition: 'color 0.15s',
              }}
            >
              <Icon size={21} strokeWidth={isActive ? 2.2 : 1.6} />
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* More button */}
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            background: 'none',
            border: 'none',
            color: menuOpen ? 'var(--os-gold)' : 'var(--os-text-muted)',
            paddingTop: 8,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'color 0.15s',
          }}
        >
          <Grid3X3 size={21} strokeWidth={menuOpen ? 2.2 : 1.6} />
          <span style={{ fontSize: 9.5, fontWeight: menuOpen ? 600 : 400, letterSpacing: '0.02em' }}>
            More
          </span>
        </button>
      </nav>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}
