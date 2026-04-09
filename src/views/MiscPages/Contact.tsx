import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-slate-50 dark:bg-slate-950"
        >
            {/* Header */}
            <div className="bg-slate-900 pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-slate-950/80 to-slate-900" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                            Contact Us
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
                            Let's Connect
                        </h1>
                        <p className="text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
                            Have a question or ready to start your property journey? Our team of premier agents is here to help.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-10"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
                                Reach Our Team
                            </h2>
                        </div>

                        {[
                            {
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                                title: 'HQ Location',
                                content: '123 Luxury Ave, Beverly Hills, CA 90210',
                            },
                            {
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                ),
                                title: 'Phone Support',
                                content: '+1 (800) 555-LUXE',
                            },
                            {
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                ),
                                title: 'Email Inquiries',
                                content: 'hello@auraproperty.com',
                            },
                        ].map(item => (
                            <div key={item.title} className="flex gap-5 group">
                                <div className="w-12 h-12 bg-white dark:bg-slate-900 text-brand-primary dark:text-brand-primary-dark border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-slate-900 dark:text-slate-100 font-bold whitespace-pre-line">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 shadow-xl text-center"
                            >
                                <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-brand-primary dark:text-brand-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                    Inquiry Received
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto font-light">
                                    Thank you for reaching out. A specialist will be in touch with you shortly.
                                </p>
                                <Button onClick={() => setSubmitted(false)} variant="outline" className="px-10">
                                    Send Another Request
                                </Button>
                            </motion.div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6 sm:space-y-8"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Jane Doe"
                                            className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-brand-primary-dark/30 focus:border-brand-primary dark:focus:border-brand-primary-dark transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="jane@auraproperty.com"
                                            className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-brand-primary-dark/30 focus:border-brand-primary dark:focus:border-brand-primary-dark transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-brand-primary-dark/30 focus:border-brand-primary dark:focus:border-brand-primary-dark transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                                            Service Type
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-brand-primary-dark/30 focus:border-brand-primary dark:focus:border-brand-primary-dark transition-all"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="buying">Purchase Inquiry</option>
                                            <option value="renting">Lease Inquiry</option>
                                            <option value="selling">Disposition</option>
                                            <option value="general">Portfolio Mgmt</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                                        Detailed Requirements *
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your property goals..."
                                        className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-brand-primary-dark/30 focus:border-brand-primary dark:focus:border-brand-primary-dark transition-all resize-none"
                                    />
                                </div>

                                <Button type="submit" variant="primary" size="lg" loading={loading} fullWidth className="py-4">
                                    {loading ? 'Processing...' : 'Submit Inquiry'}
                                </Button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Contact;

