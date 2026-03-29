import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useLocation } from 'react-router-dom';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/properties', label: 'Properties' },
    { to: '/agents', label: 'Agents' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    // Pages that have a light background at the top, requiring dark text for the navbar
    const isLightHeaderPage = ['/blog', '/profile', '/login', '/signup'].includes(pathname);
    const forceSolid = scrolled || isLightHeaderPage;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Scroll lock when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [menuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 transition-[background-color,border-color,shadow] duration-300 ${menuOpen ? 'z-[100] bg-slate-50 dark:bg-slate-950' : 'z-50'
                } ${forceSolid && !menuOpen
                    ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm'
                    : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    {/* <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </div>
                        <span
                            className={`text-xl font-bold tracking-tight transition-colors ${forceSolid || menuOpen
                                ? 'text-slate-900 dark:text-white'
                                : 'text-white'
                                }`}
                        >
                            Luxe<span className={forceSolid || menuOpen ? 'text-brand-primary' : 'text-white'}>Estate</span>
                        </span>
                    </Link> */}
                    <Link
                        to="/"
                        className="flex items-center hover:opacity-80 transition-all duration-300 relative z-[110]"
                    >
                        <div className="relative w-32 h-13">
                            <img
                                src={isDark ? '/For Dark Theme.svg' : '/For Light Theme.svg'}
                                className={'absolute inset-0 w-full h-full object-contain transition-opacity duration-300'}
                                alt="AuraProperties Logo"
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === '/'}
                                className={({ isActive }) =>
                                    `text-sm tracking-wide transition-all relative group ${forceSolid
                                        ? isActive
                                            ? 'text-brand-primary dark:text-brand-primary-dark font-semibold'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-brand-primary dark:hover:text-brand-primary-dark'
                                        : isActive
                                            ? 'text-white font-semibold underline underline-offset-8 decoration-2 decoration-brand-primary'
                                            : 'text-white/80 hover:text-white'
                                    }`
                                }
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-primary transition-all group-hover:w-full ${forceSolid ? 'w-0' : 'hidden'}`} />
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            type="button"
                            aria-label="Toggle theme"
                            className={`p-2 rounded-full transition-all cursor-pointer relative z-[110] ${forceSolid || menuOpen
                                ? 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.3, ease: 'backOut' }}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.3, ease: 'backOut' }}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                        </svg>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Login link */}
                        <Link
                            to="/login"
                            className={`hidden sm:inline-block text-sm font-semibold transition-colors ${forceSolid || menuOpen
                                ? 'text-slate-600 dark:text-slate-400 hover:text-brand-primary'
                                : 'text-white/80 hover:text-white'
                                }`}
                        >
                            Sign In
                        </Link>

                        {/* Profile Button */}
                        <Link
                            to="/profile"
                            className={`hidden lg:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-lg transition-all hover:scale-105 active:scale-95 shadow-lg ${forceSolid
                                ? 'bg-brand-primary text-white shadow-brand-primary/20'
                                : 'bg-white text-brand-primary shadow-white/10'}`}
                        >
                            <span className="flex items-center gap-2">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" alt="" className="w-5 h-5 rounded-full" />
                                Profile
                            </span>
                        </Link>

                        {/* Mobile Hamburger */}
                        <motion.button
                            onClick={() => setMenuOpen(o => !o)}
                            aria-label="Toggle menu"
                            initial={false}
                            animate={menuOpen ? 'open' : 'closed'}
                            onPointerDown={(e) => e.stopPropagation()}
                            className={`lg:hidden p-2 transition-colors relative z-[110] flex items-center justify-center touch-none ${forceSolid || menuOpen
                                ? 'text-slate-900 dark:text-white'
                                : 'text-white'
                                }`}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <motion.path
                                    variants={{
                                        closed: { d: 'M 4 6 L 20 6', opacity: 1 },
                                        open: { d: 'M 5 19 L 19 5', opacity: 1 }
                                    }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <motion.path
                                    variants={{
                                        closed: { d: 'M 4 12 L 14 12', opacity: 1 },
                                        open: { d: 'M 12 12 L 12 12', opacity: 0 }
                                    }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <motion.path
                                    variants={{
                                        closed: { d: 'M 4 18 L 20 18', opacity: 1 },
                                        open: { d: 'M 5 5 L 19 19', opacity: 1 }
                                    }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[90] lg:hidden bg-slate-50/100 dark:bg-slate-950/100 flex flex-col"
                    >
                        {/* Scroll Wrapper */}
                        <div
                            className="h-full w-full overflow-y-auto pt-32 px-8 pb-12 flex flex-col"
                            data-lenis-prevent
                        >
                            {/* Decorative Background Elements */}
                            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[40%] bg-brand-primary/10 dark:bg-brand-primary/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[40%] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

                            <div className="flex flex-col gap-6 w-full max-w-lg mx-auto flex-grow">

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="mb-4"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-2 block">
                                        Navigation
                                    </span>
                                    <div className="h-px w-12 bg-brand-primary/30" />
                                </motion.div>

                                <nav className="flex flex-col items-start gap-2">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.to}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.15 + i * 0.08, ease: 'easeOut' }}
                                            className="w-full"
                                        >
                                            <NavLink
                                                to={link.to}
                                                end={link.to === '/'}
                                                onClick={() => setMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `group relative py-1 text-4xl sm:text-5xl font-bold tracking-tight transition-all block ${isActive
                                                        ? 'text-brand-primary dark:text-brand-primary-dark translate-x-2'
                                                        : 'text-slate-800 dark:text-slate-100 hover:text-brand-primary dark:hover:text-brand-primary-dark hover:translate-x-2'
                                                    }`
                                                }
                                            >
                                                {link.label}
                                                <span className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-primary scale-0 group-hover:scale-100 transition-transform duration-300" />
                                            </NavLink>
                                        </motion.div>
                                    ))}
                                </nav>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.4 }}
                                    className="mt-auto pt-12 flex flex-col gap-8"
                                >
                                    <div className="flex flex-col gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                                            Quick Actions
                                        </span>
                                        <div className="flex flex-col gap-3">
                                            <Link
                                                to="/profile"
                                                onClick={() => setMenuOpen(false)}
                                                className="inline-flex items-center justify-center px-8 py-4 bg-brand-primary text-white text-base font-bold rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" alt="" className="w-6 h-6 rounded-full border border-white/20" />
                                                    View Profile
                                                </span>
                                            </Link>
                                            <Link
                                                to="/login"
                                                onClick={() => setMenuOpen(false)}
                                                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-base font-bold rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign In / Register
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">Email</span>
                                                <a href="mailto:hello@luxeestate.com" className="text-lg font-medium text-slate-800 dark:text-slate-300 hover:text-brand-primary transition-colors">hello@luxeestate.com</a>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-1">Phone</span>
                                                <a href="tel:+1234567890" className="text-lg font-medium text-slate-800 dark:text-slate-300 hover:text-brand-primary transition-colors">+1 (234) 567-890</a>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-4 pt-2">
                                            <span className="text-xs text-slate-400">© 2026 LuxeEstate Properties. All rights reserved.</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;

