import { type ReactNode } from 'react';
import Sidebar from './Sidebar';
import CommandBar from './CommandBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="os-layout">
      <Sidebar />
      <main className="os-main">
        {children}
      </main>
      <CommandBar />
    </div>
  );
}
