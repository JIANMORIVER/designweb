
import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import Editable from './Editable';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { content, updatePersonalInfo } = useContent();
  const { personalInfo } = content;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-stone-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-stone-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />

      <div className="z-10 text-center max-w-4xl">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold text-stone-900 tracking-tight">
            <Editable 
              value={personalInfo.name} 
              onSave={(val) => updatePersonalInfo('name', val)}
              label="Name"
            />
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-xl md:text-2xl text-stone-600 font-light mb-8">
            <Editable 
              value={personalInfo.tagline} 
              onSave={(val) => updatePersonalInfo('tagline', val)}
              type="textarea"
              label="Tagline"
            />
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.6 }}
           className="flex gap-4 justify-center"
        >
           {Object.entries(personalInfo.socials).map(([platform, url]) => (
             <Editable
               key={platform}
               value={url}
               onSave={(val) => updatePersonalInfo('socials', { ...personalInfo.socials, [platform]: val })}
               label={`${platform} Link`}
             >
               <a 
                 href={url} 
                 target="_blank" 
                 rel="noreferrer"
                 className="text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900 border-b border-transparent hover:border-stone-900 transition-all pointer-events-none" // Disable link click in edit mode via pointer-events or handling
                 onClick={(e) => e.preventDefault()} // Just in case
               >
                 {platform}
               </a>
             </Editable>
           ))}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 animate-bounce"
      >
        <ArrowDown className="text-stone-400" size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
