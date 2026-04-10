import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    return (
        <footer className="relative bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-900 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/5 dark:bg-brand-primary/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-600/5 blur-[120px] rounded-full -z-10" />

            {/* Newsletter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12 border-b border-slate-100 dark:border-slate-900/50">
                <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] -z-10 group-hover:bg-brand-primary/20 transition-all duration-700" />

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                                Join our exclusive <span className="text-brand-primary">Inner Circle</span>
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                                Get early access to off-market listings, luxury real estate insights, and definitive market analysis delivered to your inbox.
                            </p>
                        </div>
                        <form className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto mt-2 lg:mt-0" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-primary/50 transition-all w-full sm:min-w-[300px]"
                            />
                            <button className="px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap w-full sm:w-auto">
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left max-w-sm mx-auto md:mx-0">
                        <Link to="/" className="inline-block hover:opacity-80 transition-all duration-300">
                            <div className="relative w-40 h-16 mb-6">
                                <img
                                    src={isDark ? '/For Dark Theme.svg' : '/For Light Theme.svg'}
                                    className={'absolute inset-0 w-full h-full object-contain transition-opacity duration-300'}
                                    alt="Logo Light"
                                />
                            </div>
                        </Link>
                        <p className="text-base text-slate-600 dark:text-slate-500 leading-relaxed mb-8 font-light">
                            Definining modern luxury living since 2010. We specialize in curating the world's most exceptional properties for the most discerning clients.
                        </p>
                        <div className="flex gap-5 justify-center md:justify-start">
                            {[
                                { name: 'twitter', href: 'https://x.com/drpsolutions16', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" /> },
                                { name: 'instagram', href: 'https://www.instagram.com/drp_solution/', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /> },
                                { name: 'linkedin', href: 'https://www.linkedin.com/company/drpsolutions-tech', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
                                { name: 'facebook', href: '#', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> }
                            ].map(social => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="w-11 h-11 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 group shadow-sm hover:bg-brand-primary hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/30 hover:-translate-y-1"
                                >
                                    <svg className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                                        {social.icon}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-slate-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-[0.2em]">
                            Our Directory
                        </h3>
                        <ul className="space-y-4 w-full">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/properties', label: 'Listings' },
                                { to: '/agents', label: 'Agents' },
                                { to: '/about', label: 'About Us' },
                                { to: '/blog', label: 'Insights' },
                                { to: '/contact', label: 'Support' },
                            ].map(link => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-[15px] text-slate-600 dark:text-slate-500 hover:text-brand-primary dark:hover:text-brand-primary-dark transition-all duration-300 ease-in-out flex items-center justify-center md:justify-start group"
                                    >
                                        <span className="w-0 group-hover:w-4 h-0.5 bg-brand-primary mr-0 group-hover:mr-2 transition-all duration-300 ease-in-out hidden md:block" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-slate-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-[0.2em]">
                            Categories
                        </h3>
                        <ul className="space-y-4 w-full">
                            {['Modern Villas', 'Luxury Penthouse', 'Urban Condos', 'Exclusive Lofts', 'Waterfront'].map(type => (
                                <li key={type}>
                                    <Link
                                        to="/properties"
                                        className="text-[15px] text-slate-600 dark:text-slate-500 hover:text-brand-primary dark:hover:text-brand-primary-dark transition-all duration-300 ease-in-out flex items-center justify-center md:justify-start group"
                                    >
                                        <span className="w-0 group-hover:w-4 h-0.5 bg-brand-primary mr-0 group-hover:mr-2 transition-all duration-300 ease-in-out hidden md:block" />
                                        {type}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-slate-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-[0.2em]">
                            International Offices
                        </h3>
                        <div className="space-y-6 w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-800/50">
                                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-light leading-relaxed">
                                    <span className="block font-bold text-slate-900 dark:text-white mb-0.5 uppercase tracking-wider text-[10px]">Headquarters</span>
                                    123 Luxury Avenue, Suite 500<br />Beverly Hills, CA 90210
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-800/50 group-hover:border-brand-primary/30 transition-colors">
                                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <a href="tel:+18005555893" className="text-sm font-medium hover:text-brand-primary transition-colors duration-300 text-slate-800 dark:text-slate-300">
                                    +1 (800) 555-LUXE
                                </a>
                            </div>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-800/50 group-hover:border-brand-primary/30 transition-colors">
                                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <a href="mailto:concierge@auraproperty.com" className="text-sm font-medium hover:text-brand-primary transition-colors duration-300 text-slate-800 dark:text-slate-300">
                                    concierge@auraproperty.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col items-center md:flex-row md:justify-between gap-10">
                    <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                        <div className="space-y-2.5">
                            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 font-bold leading-relaxed px-4 sm:px-0">
                                © {currentYear} DRP Solutions. All Rights Reserved
                            </p>
                            <p className="text-[8px] sm:text-[9px] text-slate-400/60 font-medium tracking-wide uppercase">
                                Licensed Estate Agent 123-456-789. All rights reserved.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 px-4 sm:px-0">
                        {['Privacy Charter', 'Governance', 'Terms of Use', 'Accessibility'].map(item => (
                            <a key={item} href="#" className="text-[10px] sm:text-[11px] uppercase tracking-[0.1em] text-slate-500 dark:text-slate-500 font-bold hover:text-brand-primary transition-all duration-500 ease-in-out relative group">
                                {item}
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[1px] bg-brand-primary group-hover:w-full transition-all duration-500 ease-in-out" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

