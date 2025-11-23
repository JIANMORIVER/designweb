
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import Resume from './components/Resume';
import MouseTrail from './components/MouseTrail';
import BackgroundOrbs from './components/BackgroundOrbs';
import { ContentProvider } from './contexts/ContentContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Globe } from 'lucide-react';

const AppContent: React.FC = () => {
  const { t, toggleLanguage, language } = useLanguage();
  
  return (
    <div className="font-sans min-h-screen antialiased selection:bg-stone-900 selection:text-white dark:selection:bg-stone-100 dark:selection:text-stone-900 transition-colors duration-500 relative">
      
      {/* Layer 0: Fixed Background Effects (z-index managed internally) */}
      <BackgroundOrbs />
      <MouseTrail />
      
      {/* Layer 1: Navigation (Fixed High Z) */}
      <Navbar />
      
      {/* Layer 2: Main Scrollable Content (Relative z-10) */}
      <main className="relative z-10">
        <Hero />
        <PortfolioGrid />
        <Resume />
      </main>

      <footer id="contact" className="bg-stone-900 dark:bg-black text-stone-400 py-12 text-center transition-colors duration-500 relative z-10 flex flex-col items-center justify-center">
        <p className="font-display text-stone-100 text-lg mb-4">{t('footer.slogan')}</p>
        <p className="text-sm mb-6">© {new Date().getFullYear()} {t('footer.copyright')}.</p>
        
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800 dark:bg-stone-900 text-stone-300 hover:bg-stone-700 transition-colors text-sm font-medium"
        >
          <Globe size={14} />
          {language === 'zh' ? 'English' : '中文'}
        </button>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ContentProvider>
          <AppContent />
        </ContentProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
