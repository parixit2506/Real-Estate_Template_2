import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFAQs } from '@/utilities/useFAQs';
import Button from '@/components/ui/Button';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group transition-colors"
                aria-expanded={isOpen}
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand-primary dark:text-brand-primary-dark' : 'text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary-dark'}`}>
                    {question}
                </span>
                <span className={`ml-4 shrink-0 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all ${isOpen ? 'bg-brand-primary border-brand-primary text-white rotate-45' : 'text-slate-400 group-hover:border-brand-primary dark:group-hover:border-brand-primary-dark group-hover:text-brand-primary dark:group-hover:text-brand-primary-dark'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [openId, setOpenId] = useState<string | null>(null);
    const { faqs, categories } = useFAQs(activeCategory, searchQuery);

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-white dark:bg-slate-950"
        >
            {/* Page Header */}
            <div className="bg-slate-900 pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-slate-950/80 to-slate-900" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                            Support & Knowledge
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-6 tracking-tight">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto font-light mb-12">
                            Everything you need to know about the luxury real estate process. Find answers to common questions about buying, selling, and leasing.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-slate-500 group-focus-within:text-brand-primary-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search queries, terms, or topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-brand-primary-dark/60 transition-all placeholder-slate-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Controls & Results */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-12 justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${activeCategory === cat
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105'
                                : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 p-2 sm:p-10 shadow-sm">
                    {faqs.length > 0 ? (
                        faqs.map((faq) => (
                            <FAQItem
                                key={faq.id}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openId === faq.id}
                                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center section-padding">
                            <div className="text-4xl mb-6 opacity-20">🔍</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-light">Try adjusting your search or category filters.</p>
                        </div>
                    )}
                </div>

                {/* Still have questions? */}
                <div className="mt-16 sm:mt-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 sm:p-12 border border-slate-100 dark:border-slate-800">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Still have questions?</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-light mb-8 max-w-sm mx-auto">
                        Can't find the answer you're looking for? Our dedicated team of experts is here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button href="/contact" variant="primary" size="lg">
                            Contact Us
                        </Button>
                        <Button href="/about" variant="outline" size="lg">
                            More About Us
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FAQ;

