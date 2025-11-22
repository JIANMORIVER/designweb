import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import Editable from './Editable';
import { Mail, ExternalLink } from 'lucide-react';

const Resume: React.FC = () => {
  const { content, updatePersonalInfo, updateResumeItem, updateSkill } = useContent();
  const { resume, skills, personalInfo } = content;

  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Experience & Skills */}
        <div className="lg:col-span-7">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold mb-8 text-stone-900 dark:text-stone-100"
          >
            Experience & Background
          </motion.h2>
          
          <div className="space-y-6 mb-16">
            {resume.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="liquid-card p-8 rounded-3xl"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                   <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                     <Editable value={item.role} onSave={(v) => updateResumeItem(item.id, 'role', v)} label="Role" />
                   </h3>
                   <div className="text-sm font-bold font-mono text-stone-400 uppercase tracking-wider mt-1 md:mt-0">
                     <Editable value={item.year} onSave={(v) => updateResumeItem(item.id, 'year', v)} label="Year" />
                   </div>
                </div>
                <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-4">
                  <Editable value={item.company} onSave={(v) => updateResumeItem(item.id, 'company', v)} label="Company" />
                </h4>
                <div className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  <Editable value={item.description} onSave={(v) => updateResumeItem(item.id, 'description', v)} type="textarea" label="Description" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-card p-8 rounded-3xl"
          >
            <h3 className="font-display text-2xl font-bold mb-8 text-stone-900 dark:text-stone-100">Software Proficiency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-stone-700 dark:text-stone-200">
                      <Editable value={skill.name} onSave={(v) => updateSkill(idx, 'name', v)} label="Skill Name" />
                    </span>
                    <span className="text-stone-400 font-mono">
                       <Editable value={skill.level.toString()} onSave={(v) => updateSkill(idx, 'level', parseInt(v))} label="Level (0-100)" />%
                    </span>
                  </div>
                  <div className="w-full bg-black/5 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      className="bg-stone-900 dark:bg-white h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sticky About Section */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-32">
            <div className="liquid-card p-8 md:p-10 rounded-3xl">
              <h3 className="font-display text-2xl font-bold mb-6 text-stone-900 dark:text-stone-100">About Me</h3>
              <div className="text-stone-600 dark:text-stone-300 leading-loose mb-8 text-lg">
                 <Editable value={personalInfo.about} onSave={(v) => updatePersonalInfo('about', v)} type="textarea" label="About" />
              </div>
              
              <div className="space-y-6 border-t border-stone-200/50 dark:border-white/10 pt-8">
                <div>
                   <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Contact</h4>
                   <div className="flex items-center gap-3 text-stone-900 dark:text-stone-100 font-bold text-lg group cursor-pointer">
                     <div className="p-2 rounded-full bg-stone-100 dark:bg-white/10 group-hover:scale-110 transition-transform">
                        <Mail size={20} />
                     </div>
                     <Editable value={personalInfo.email} onSave={(v) => updatePersonalInfo('email', v)} label="Email" />
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Socials</h4>
                   <div className="flex flex-col gap-3">
                     {Object.entries(personalInfo.socials).map(([platform, url]) => (
                       <a 
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 text-stone-700 dark:text-stone-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                       >
                         <div className="p-2 rounded-full bg-stone-100 dark:bg-white/10 group-hover:scale-110 transition-transform">
                            <ExternalLink size={16} />
                         </div>
                         <span className="capitalize font-medium">{platform}</span>
                       </a>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Resume;