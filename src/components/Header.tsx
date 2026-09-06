import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string, sectionId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsAdminLoggedIn(localStorage.getItem('midblend_admin_auth') === 'true');
    };
    checkAuth();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (currentPath === '/') {
        const sections = ['home', 'about', 'what-we-do', 'for-brands', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuth);
    };
  }, [currentPath]);

  const navItems = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About', sectionId: 'about' },
    { label: 'What We Do', sectionId: 'what-we-do' },
    { label: 'For Brands', sectionId: 'for-brands' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate('/', sectionId);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate('/apply.html');
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-[#050505]/85 backdrop-blur-md border-b border-white/10 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Hidden Secret Admin Dot Trigger */}
          <div className="flex items-center gap-1.5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/', 'home');
              }}
              id="brand-logo-link"
              className="text-2xl font-black tracking-tighter text-white uppercase hover:text-gray-100 transition-colors"
            >
              MIDBLEND
            </a>
            {/* Hidden Secret Click Trigger: Clicking the glowing dot opens the admin portal */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNavigate('/admin');
              }}
              title="MIDBLEND"
              aria-label="Secret Admin Access"
              className="w-2 h-2 rounded-full bg-[#D4FF00] hover:scale-150 transition-all cursor-pointer focus:outline-none shadow-[0_0_8px_#D4FF00]"
            />
          </div>

          {/* Desktop Center Navigation */}
          <nav id="desktop-navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = currentPath === '/' && activeSection === item.sectionId;
              return (
                <a
                  key={item.sectionId}
                  href={`#${item.sectionId}`}
                  onClick={(e) => handleLinkClick(e, item.sectionId)}
                  id={`nav-link-${item.sectionId}`}
                  className={`text-sm font-medium uppercase tracking-widest transition-colors ${
                    isActive
                      ? 'text-[#D4FF00] border-b-2 border-[#D4FF00] pb-1'
                      : 'text-gray-400 hover:text-white pb-1'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Header Right CTA (Admin badge visible ONLY when logged in) */}
          <div className="hidden md:flex items-center gap-3">
            {isAdminLoggedIn && (
              <a
                href="/admin"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/admin');
                }}
                title="Creator Applications Portal"
                id="header-admin-link"
                className="text-xs font-bold uppercase tracking-wider text-[#D4FF00] bg-[#D4FF00]/10 hover:bg-[#D4FF00]/20 px-3 py-1.5 rounded-lg border border-[#D4FF00]/30 transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
                <span>Admin</span>
              </a>
            )}
            <a
              href="/apply.html"
              onClick={handleApplyClick}
              id="header-apply-cta"
              className="px-6 py-2 bg-[#D4FF00] text-black font-bold uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-transform shadow-lg shadow-[#D4FF00]/15"
            >
              Apply →
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="/apply.html"
              onClick={handleApplyClick}
              id="mobile-header-apply"
              className="bg-[#D4FF00] text-black font-bold uppercase text-[10px] tracking-widest px-3 py-1.5 rounded-full"
            >
              Apply →
            </a>
            <button
              type="button"
              id="mobile-menu-button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white bg-[#111111] border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4FF00]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-4 pt-3 pb-6 transition-all duration-300 ease-out"
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={(e) => handleLinkClick(e, item.sectionId)}
                id={`mobile-nav-${item.sectionId}`}
                className="px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-gray-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                {activeSection === item.sectionId && currentPath === '/' && (
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
                )}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <a
                href="/apply.html"
                onClick={handleApplyClick}
                id="mobile-nav-apply-btn"
                className="w-full flex items-center justify-center gap-2 bg-[#D4FF00] text-black font-extrabold uppercase text-xs tracking-widest py-3 px-4 rounded-xl shadow-lg shadow-[#D4FF00]/15"
              >
                <span>Apply as Creator →</span>
              </a>

              {isAdminLoggedIn && (
                <a
                  href="/admin"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    onNavigate('/admin');
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#111111] border border-[#D4FF00]/30 text-[#D4FF00] font-bold uppercase text-xs tracking-wider py-2.5 px-4 rounded-xl hover:bg-[#D4FF00]/10"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]" />
                  <span>Admin Dashboard</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
