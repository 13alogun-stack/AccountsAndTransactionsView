import { type ReactNode } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import MobileHeader from './MobileHeader';
import CommandBar from './CommandBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="os-layout">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile header (shown on mobile only via CSS) */}
      <MobileHeader />

      <main className="os-main">
        {children}
      </main>

      {/* Mobile bottom nav (shown on mobile only via CSS) */}
      <BottomNav />

      <CommandBar />
    </div>
  );
}
