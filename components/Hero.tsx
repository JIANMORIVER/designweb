import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import Editable from './Editable';
import Magnetic from './Magnetic';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { content, updatePersonalInfo } = useContent();
  const { personalInfo } = content;
  
  // Scroll Parallax Hooks
  const { scrollY } = useScroll();
  const yContent = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityContent = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden transition-colors duration-500">
      
      {/* Content Layer */}
      <motion.div 
        style={{ y: yContent, opacity: opacityContent }}
        className="z-10 text-center w-full max-w-4xl relative flex flex-col items-center"
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-12"
        >
          <h1 className="font-display text-7xl md:text-9xl font-bold text-stone-900 dark:text-white tracking-tighter leading-[0.9] drop-shadow-xl dark:drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-colors duration-500 select-none cursor-default">
            <Editable 
              value={personalInfo.name} 
              onSave={(val) => updatePersonalInfo('name', val)}
              label="Name"
            />
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl text-stone-500 dark:text-stone-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed py-2 rounded-xl transition-colors duration-500"
        >
          <Editable 
            value={personalInfo.tagline} 
            onSave={(val) => updatePersonalInfo('tagline', val)}
            type="textarea"
            label="Tagline"
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.4 }}
           className="flex flex-wrap gap-6 justify-center items-center relative z-40" 
        >
           {Object.entries(personalInfo.socials).map(([platform, url]) => (
             <Magnetic key={platform} strength={0.4}>
               <div className="group relative px-12 py-5 liquid-nav-container hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden rounded-full backdrop-blur-xl">
                 <Editable
                   value={url}
                   onSave={(val) => updatePersonalInfo('socials', { ...personalInfo.socials, [platform]: val })}
                   label={`${platform} Link`}
                 >
                   <a 
                     href={url} 
                     target="_blank" 
                     rel="noreferrer"
                     className="text-base font-bold uppercase tracking-widest text-stone-600 dark:text-stone-200 group-hover:text-stone-900 dark:group-hover:text-white transition-colors block relative z-10"
                     onClick={(e) => e.preventDefault()}
                   >
                     {platform}
                   </a>
                 </Editable>
               </div>
             </Magnetic>
           ))}
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ opacity: opacityContent }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 z-30"
      >
        <Magnetic strength={0.5}>
           <div className="p-4 rounded-full liquid-nav-container text-stone-400 animate-bounce cursor-pointer hover:text-stone-600 dark:hover:text-white transition-colors">
             <ArrowDown size={24} />
           </div>
        </Magnetic>
      </motion.div>
    </section>
  );
};

export default Hero;