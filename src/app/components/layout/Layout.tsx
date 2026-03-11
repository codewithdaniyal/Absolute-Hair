import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
