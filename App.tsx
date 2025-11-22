
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import Resume from './components/Resume';
import { ContentProvider, useContent } from './contexts/ContentContext';
import { Settings, Save, RotateCcw } from 'lucide-react';

const EditControls: React.FC = () => {
  const { isEditMode, toggleEditMode, resetContent } = useContent();
  
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
       {isEditMode && (
         <button 
           onClick={resetContent}
           className="bg-red-500 text-white p-3 rounded-full shadow-xl hover:bg-red-600 transition-all hover:scale-110"
           title="Reset to Default Content"
         >
           <RotateCcw size={20} />
         </button>
       )}
       <button 
         onClick={toggleEditMode}
         className={`${isEditMode ? 'bg-blue-600 text-white' : 'bg-stone-900 text-stone-400'} p-3 rounded-full shadow-xl hover:scale-110 transition-all`}
         title={isEditMode ? "Finish Editing" : "Edit Content"}
       >
         {isEditMode ? <Save size={20} /> : <Settings size={20} />}
       </button>
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="font-sans text-stone-900 bg-stone-50 antialiased selection:bg-stone-900 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <PortfolioGrid />
        <Resume />
      </main>

      <footer id="contact" className="bg-stone-900 text-stone-400 py-12 text-center">
        <p className="font-display text-stone-100 text-lg mb-4">Let's create something together.</p>
        <p className="text-sm">© {new Date().getFullYear()} Industrial Design Portfolio.</p>
      </footer>

      <EditControls />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
};

export default App;
