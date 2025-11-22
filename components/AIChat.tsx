import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { createChatSession } from '../services/geminiService';
import { Chat, GenerateContentResponse } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const AIChat: React.FC = () => {
  const { content } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when opening or when content changes
  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
      try {
        chatSessionRef.current = createChatSession(content);
        setMessages([
           { id: 'init', role: 'model', text: `Hi! I'm ${content.personalInfo.name}'s AI assistant. Ask me anything about my projects, skills, or experience.` }
        ]);
      } catch (e) {
        console.error("Failed to init chat", e);
      }
    }
  }, [isOpen, content]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chatSessionRef.current) return;

    const userText = input;
    setInput('');
    setIsLoading(true);

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);

    try {
      const result = await chatSessionRef.current.sendMessageStream({ message: userText });
      
      const aiMsgId = (Date.now() + 1).toString();
      // Add placeholder for streaming
      setMessages(prev => [...prev, { id: aiMsgId, role: 'model', text: '' }]);

      let fullText = '';
      for await (const chunk of result) {
         const c = chunk as GenerateContentResponse;
         const text = c.text || '';
         fullText += text;
         
         setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, text: fullText } : msg
         ));
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Sorry, I encountered an connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-[90] p-4 rounded-full shadow-2xl transition-all duration-300 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
         <div className="absolute inset-0 bg-stone-900 dark:bg-stone-100 opacity-80 group-hover:opacity-100 rounded-full transition-opacity" />
         <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
         <Sparkles className="relative z-10 text-white dark:text-stone-900 w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] w-[90vw] md:w-[400px] max-h-[600px] h-[80vh] flex flex-col shadow-2xl rounded-3xl overflow-hidden"
          >
             {/* Liquid Glass Background */}
             <div className="absolute inset-0 liquid-card bg-white/80 dark:bg-stone-900/80 pointer-events-none" />
             
             {/* Header */}
             <div className="relative z-10 flex justify-between items-center p-4 border-b border-stone-200/50 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-2">
                   <div className="p-2 bg-blue-500/20 rounded-full">
                     <Sparkles size={16} className="text-blue-600 dark:text-blue-400" />
                   </div>
                   <div>
                      <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">Portfolio AI</h3>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-stone-500 dark:text-stone-400">Online</span>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-stone-200/50 dark:hover:bg-white/10 rounded-full transition-colors text-stone-500 dark:text-stone-400"
                >
                  <X size={20} />
                </button>
             </div>

             {/* Messages Area */}
             <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm
                      ${msg.role === 'user' 
                        ? 'bg-stone-900 text-white rounded-tr-none dark:bg-stone-100 dark:text-stone-900' 
                        : 'bg-white text-stone-800 rounded-tl-none border border-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700'}
                    `}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white dark:bg-stone-800 p-3 rounded-2xl rounded-tl-none border border-stone-200 dark:border-stone-700 flex gap-1">
                       <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                       <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                       <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
             </div>

             {/* Input Area */}
             <div className="relative z-10 p-4 bg-white/50 dark:bg-black/20 backdrop-blur-md border-t border-stone-200/50 dark:border-white/10">
               <form onSubmit={handleSubmit} className="relative">
                 <input
                   type="text"
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   placeholder="Ask about my work..."
                   className="w-full pl-4 pr-12 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm shadow-inner transition-all"
                   disabled={isLoading}
                 />
                 <button 
                   type="submit"
                   disabled={!input.trim() || isLoading}
                   className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all shadow-md"
                 >
                   {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                 </button>
               </form>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
