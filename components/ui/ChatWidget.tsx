"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUICK_OPTIONS = [
  { label: "Lobbying & Government Relations", icon: "🏛️" },
  { label: "Political Campaign", icon: "🗳️" },
  { label: "Communications & PR", icon: "📡" },
  { label: "Schedule a Meeting", icon: "📅" },
];

interface Message {
  id: number;
  text: string;
  from: "bot" | "user";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! Welcome to The Advance Group. How can we help you today?",
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(2);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextMessageId.current++, text, from: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowQuick(false);

    // Auto-reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId.current++,
          text: `Thanks for reaching out about "${text}". A member of our team will follow up with you shortly. You can also reach us at (212) 239-7323 or Info@TheAdvanceGroup.com.`,
          from: "bot",
        },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center shadow-2xl shadow-navy/30 hover:scale-105 active:scale-95 transition-transform"
        whileHover={{ boxShadow: "0 8px 40px rgba(28, 46, 36, 0.4)" }}
        aria-label="Chat with TAG"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="18" x2="6" y1="6" y2="18" />
              <line x1="6" x2="18" y1="6" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl shadow-navy/20 border border-navy/10 bg-white flex flex-col"
            style={{ maxHeight: "min(520px, calc(100vh - 8rem))" }}
          >
            {/* Header */}
            <div className="bg-navy px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-serif font-bold text-sm">TAG</span>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">The Advance Group</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-white/50 text-[10px] uppercase tracking-wider">Online now</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12" /></svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-ivory/50" style={{ minHeight: 200 }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i === messages.length - 1 ? 0.1 : 0 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-navy text-white rounded-2xl rounded-br-md"
                        : "bg-white text-navy border border-navy/5 rounded-2xl rounded-bl-md shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Quick options */}
              {showQuick && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {QUICK_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => sendMessage(opt.label)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-gold/20 text-navy text-xs font-medium hover:border-gold hover:bg-gold/5 transition-colors"
                    >
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 bg-white border-t border-navy/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-ivory border border-navy/10 rounded-full px-4 py-2.5 text-sm text-navy placeholder:text-steel/50 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-navy hover:bg-gold/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                </button>
              </form>
              <p className="text-center text-[10px] text-steel/40 mt-2">
                Powered by TAG &middot; We typically reply within 24h
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
