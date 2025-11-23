import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Copy, Check } from 'lucide-react';

import { CONTACT_NUMBERS } from '../constants';


const StickyContact: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (number: string, id: string) => {
        navigator.clipboard.writeText(number.replace(/\s/g, ''));
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden w-80 max-h-[70vh] flex flex-col origin-bottom-left"
                    >
                        {/* Header matching AIChat */}
                        <div className="bg-yellow-500 p-4 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2 text-slate-900">
                                <Phone size={24} />
                                <div>
                                    <h3 className="font-bold text-sm">أرقام التواصل</h3>
                                    <p className="text-xs opacity-80">متاح 8:00 - 16:30</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-slate-900 hover:bg-yellow-400 p-1  transition"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-4 overflow-y-auto custom-scrollbar space-y-3">
                            {CONTACT_NUMBERS.map((contact) => (
                                <motion.div
                                    key={contact.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="bg-slate-900/50 hover:bg-slate-900 p-3 rounded-xl transition-colors group"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 bg-slate-800 ${contact.color}`}>
                                            {contact.icon}
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-sm font-medium">{contact.label}</p>
                                            <a href={`tel:${contact.number.replace(/\s/g, '')}`} className="text-white font-bold font-mono tracking-wider hover:text-yellow-400 transition-colors">
                                                {contact.number}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <a
                                            href={`tel:${contact.number.replace(/\s/g, '')}`}
                                            className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-slate-900 text-xs font-bold py-2 flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Phone size={14} />
                                            اتصال
                                        </a>
                                        <button
                                            onClick={() => handleCopy(contact.number, contact.id)}
                                            className="w-10 bg-slate-700 hover:bg-slate-600 text-slate-300 flex items-center justify-center transition-colors"
                                            title="نسخ الرقم"
                                        >
                                            {copiedId === contact.id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-3 bg-slate-900/50 border-t border-slate-700 text-center shrink-0">
                            <p className="text-xs text-slate-500">يمكنك أيضاً مراسلتنا عبر الواتساب</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center justify-center w-14 h-14 bg-yellow-500 hover:bg-yellow-400 text-slate-900  shadow-lg shadow-yellow-500/20 transition-all relative z-50"
            >
                {isOpen ? <X size={28} /> : <Phone size={28} />}

                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full  bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex  h-4 w-4 bg-red-500"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default StickyContact;
