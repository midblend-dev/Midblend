/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HeroStats } from './components/HeroStats';
import { WhatWeDo } from './components/WhatWeDo';
import { ForBrands } from './components/ForBrands';
import { CreatorCategories } from './components/CreatorCategories';
import { TrustedBrands } from './components/TrustedBrands';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApplyPage } from './pages/ApplyPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');

  // Initialize and handle browser back/forward buttons
  useEffect(() => {
    const checkPath = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname.includes('/admin') || hash === '#admin') {
        setCurrentPath('/admin');
      } else if (pathname.endsWith('apply.html') || pathname.endsWith('/apply') || hash === '#apply') {
        setCurrentPath('/apply.html');
      } else {
        setCurrentPath('/');
      }
    };

    checkPath();
    window.addEventListener('popstate', checkPath);
    window.addEventListener('hashchange', checkPath);
    return () => {
      window.removeEventListener('popstate', checkPath);
      window.removeEventListener('hashchange', checkPath);
    };
  }, []);

  const handleNavigate = (path: string, sectionId?: string) => {
    if (path === '/admin') {
      window.history.pushState({}, '', '/admin');
      setCurrentPath('/admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/apply.html') {
      window.history.pushState({}, '', '/apply.html');
      setCurrentPath('/apply.html');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');

      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            const headerOffset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (currentPath !== '/') {
      handleNavigate('/', sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Render Admin Dashboard directly without public marketing chrome
  if (currentPath === '/admin') {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f4f4f5] selection:bg-[#d4ff00] selection:text-black">
        <AdminDashboardPage
          onBackToHome={() => handleNavigate('/')}
          onOpenApplyPage={() => handleNavigate('/apply.html')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#d4ff00] selection:text-black">
      {/* Sticky Top Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main View Router */}
      <main>
        {currentPath === '/apply.html' ? (
          <ApplyPage onBackToHome={() => handleNavigate('/', 'home')} />
        ) : (
          <>
            {/* Hero Section */}
            <Hero
              onApplyClick={() => handleNavigate('/apply.html')}
              onForBrandsClick={() => scrollToSection('for-brands')}
            />

            {/* Statistics Banner */}
            <HeroStats />

            {/* What We Do Services */}
            <WhatWeDo onLearnMoreClick={() => scrollToSection('about')} />

            {/* For Brands Feature Section */}
            <ForBrands onWorkWithUsClick={() => scrollToSection('contact')} />

            {/* Creator Categories Section */}
            <CreatorCategories />

            {/* Trusted Brands Wordmarks */}
            <TrustedBrands />

            {/* About MIDBLEND Section */}
            <AboutSection />

            {/* Contact / CTA Section */}
            <ContactSection onApplyClick={() => handleNavigate('/apply.html')} />
          </>
        )}
      </main>

      {/* Global Agency Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
