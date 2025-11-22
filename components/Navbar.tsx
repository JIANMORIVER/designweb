import React from 'react';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="bg-stone-900/80 backdrop-blur-md text-stone-100 px-6 py-3 rounded-full shadow-xl pointer-events-auto flex gap-8 items-center border border-stone-700/50">
        {NAV_LINKS.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            className="text-sm font-medium hover:text-stone-300 transition-colors relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
          </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;