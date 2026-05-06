"use client";

import { useChat } from '@ai-sdk/react';
import type { UIMessage } from '@ai-sdk/react';
import { Bot, User, Send, Sparkles, Activity, Apple } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Chat() {
  const { messages, status, sendMessage, stop } = useChat();
  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
    setInput('');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-zinc-100 p-4 md:p-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-4xl h-[90vh] flex flex-col relative z-10 border border-white/10 rounded-3xl bg-white/[0.02] shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <Apple className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">NutriMind AI</h1>
              <p className="text-xs text-zinc-400 font-medium">Your Personal Health Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-300">Online</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
              <div className="p-4 bg-emerald-500/10 rounded-2xl mb-4 border border-emerald-500/20">
                <Sparkles className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to NutriMind</h2>
              <p className="text-zinc-400 max-w-sm text-sm">Ask me about healthy recipes, diet plans, nutritional values, or lifestyle habits.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8 w-full max-w-xl">
                {[
                  "Plan a high-protein vegetarian diet",
                  "What are the benefits of intermittent fasting?",
                  "Give me a 15-minute healthy breakfast recipe",
                  "How to improve my gut health?"
                ].map((suggestion, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setInput(suggestion);
                      sendMessage({ role: 'user', parts: [{ type: 'text', text: suggestion }] });
                      setInput('');
                    }}
                    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all text-left text-sm text-zinc-300 group"
                  >
                    <span className="text-emerald-400 mr-2 group-hover:text-emerald-300">→</span>
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((message: any) => {
              const textContent = message.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('\n') || '';
              return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                }`}>
                  {message.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                
                <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  <div className={`p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-500/10 border border-blue-500/20 text-zinc-100 rounded-tr-sm'
                      : 'bg-white/5 border border-white/10 text-zinc-200 rounded-tl-sm prose prose-invert prose-emerald max-w-none'
                  }`}>
                    {message.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{textContent}</p>
                    ) : (
                      <ReactMarkdown
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-xl font-bold text-emerald-400 mb-2 mt-4" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-lg font-bold text-emerald-400 mb-2 mt-3" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-base font-bold text-emerald-300 mb-2 mt-2" {...props} />,
                          p: ({node, ...props}) => <p className="mb-3 leading-relaxed text-sm" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 text-sm space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 text-sm space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="text-zinc-300 marker:text-emerald-500" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                        }}
                      >
                        {textContent}
                      </ReactMarkdown>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1.5 px-1 font-medium">
                    {message.role === 'user' ? 'You' : 'NutriMind'} • Just now
                  </span>
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex gap-4 flex-row"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/[0.02] border-t border-white/5">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything about nutrition..."
              className="w-full bg-black/40 border border-white/10 text-white rounded-full pl-6 pr-14 py-4 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-500 shadow-inner"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-2.5 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.4)]"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-[10px] text-zinc-500">NutriMind can make mistakes. Consider verifying important health information.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
