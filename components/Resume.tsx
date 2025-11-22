
import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';
import Editable from './Editable';
import { Mail, ExternalLink } from 'lucide-react';

const Resume: React.FC = () => {
  const { content, updatePersonalInfo, updateResumeItem, updateSkill } = useContent();
  const { resume, skills, personalInfo } = content;

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Experience & Skills (Takes up 7 columns) */}
        <div className="lg:col-span-7">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold mb-8 text-stone-900"
          >
            Experience & Background
          </motion.h2>
          
          <div className="space-y-12 mb-16">
            {resume.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border-l-2 border-stone-200 pl-8 relative group"
              >
                <span className="absolute -left-[9px] top-0 w-4 h-4 bg-stone-100 border-2 border-stone-300 group-hover:border-stone-800 transition-colors rounded-full" />
                <div className="text-sm font-bold text-stone-400 mb-1 block uppercase tracking-wider">
                  <Editable value={item.year} onSave={(v) => updateResumeItem(item.id, 'year', v)} label="Year" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-1">
                  <Editable value={item.role} onSave={(v) => updateResumeItem(item.id, 'role', v)} label="Role" />
                </h3>
                <h4 className="text-lg font-medium text-stone-600 mb-3">
                  <Editable value={item.company} onSave={(v) => updateResumeItem(item.id, 'company', v)} label="Company" />
                </h4>
                <div className="text-stone-500 leading-relaxed">
                  <Editable value={item.description} onSave={(v) => updateResumeItem(item.id, 'description', v)} type="textarea" label="Description" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold mb-8 text-stone-900">Software Proficiency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-stone-700">
                      <Editable value={skill.name} onSave={(v) => updateSkill(idx, 'name', v)} label="Skill Name" />
                    </span>
                    <span className="text-stone-400">
                       <Editable value={skill.level.toString()} onSave={(v) => updateSkill(idx, 'level', parseInt(v))} label="Level (0-100)" />%
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      className="bg-stone-800 h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sticky About Section (Takes up 5 columns) */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-32">
            <div className="bg-stone-100 p-8 md:p-10 rounded-3xl border border-stone-200">
              <h3 className="font-display text-2xl font-bold mb-6">About Me</h3>
              <div className="text-stone-600 leading-loose mb-8 text-lg">
                 <Editable value={personalInfo.about} onSave={(v) => updatePersonalInfo('about', v)} type="textarea" label="About" />
              </div>
              
              <div className="space-y-6 border-t border-stone-200 pt-8">
                <div>
                   <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Contact</h4>
                   <div className="flex items-center gap-2 text-stone-900 font-bold text-lg">
                     <Mail size={20} />
                     <Editable value={personalInfo.email} onSave={(v) => updatePersonalInfo('email', v)} label="Email" />
                   </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Socials</h4>
                   <div className="flex flex-col gap-2">
                     {Object.entries(personalInfo.socials).map(([platform, url]) => (
                       <div key={platform} className="flex items-center gap-2 text-stone-700">
                         <ExternalLink size={16} />
                         <span className="capitalize">{platform}</span>
                       </div>
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
