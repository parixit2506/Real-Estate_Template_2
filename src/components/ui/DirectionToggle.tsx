import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useDirection } from '@/context/DirectionContext';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/utilities/cn';

export default function DirectionToggle() {
    const { dir, toggleDir, isRTL } = useDirection();
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const isLight = theme === 'light';

    return (
        <div
            className={cn(
                'fixed top-1/2 -translate-y-1/2 z-[9999] flex items-center transition-all duration-500',
                isRTL ? 'left-0' : 'right-0'
            )}
        >
            {/* Arrow button — themed, flush with screen edge */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    'relative flex items-center justify-center w-9 h-12 sm:w-10 sm:h-14 z-30',
                    'border shadow-xl transition-all duration-300 active:scale-95',
                    isLight
                        ? 'bg-white border-slate-200 text-brand-primary hover:bg-slate-50'
                        : 'bg-slate-900 border-slate-700 text-brand-primary-dark hover:bg-slate-800',
                    isRTL ? 'rounded-r-2xl' : 'rounded-l-2xl'
                )}
                aria-label="Toggle direction menu"
            >
                <motion.div
                    animate={{ rotate: (isOpen ? 180 : 0) * (isRTL ? -1 : 1) }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                </motion.div>
            </button>


            {/* Slide-out LTR/RTL panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: isRTL ? -40 : 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: isRTL ? -40 : 40, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                            'absolute h-9 sm:h-10 flex items-center shadow-xl z-10 whitespace-nowrap',
                            'border transition-colors duration-300 backdrop-blur-md',
                            isLight
                                ? 'bg-white/95 border-slate-200'
                                : 'bg-slate-900/95 border-slate-700',
                            isRTL
                                ? 'left-0 pl-12 pr-5 rounded-r-2xl'
                                : 'right-0 pr-12 pl-5 rounded-l-2xl'
                        )}
                    >
                        <button
                            onClick={toggleDir}
                            className={cn(
                                'flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase transition-colors',
                                isLight ? 'text-slate-700' : 'text-slate-300'
                            )}
                        >
                            <span className={cn(
                                'transition-all duration-300',
                                dir === 'ltr'
                                    ? isLight ? 'text-brand-primary' : 'text-brand-primary-dark'
                                    : 'opacity-30'
                            )}>LTR</span>
                            <span className={cn(
                                'w-1 h-1 rounded-full',
                                isLight ? 'bg-slate-300' : 'bg-slate-600'
                            )} />
                            <span className={cn(
                                'transition-all duration-300',
                                dir === 'rtl'
                                    ? isLight ? 'text-brand-primary' : 'text-brand-primary-dark'
                                    : 'opacity-30'
                            )}>RTL</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}



