import { motion } from 'framer-motion';
import { useAgents } from '@/utilities/useAgents';
import Button from '@/components/ui/Button';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const Agents = () => {
    const { agents } = useAgents();

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                            Our Experts
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-4 tracking-tight">
                            Meet Our Agents
                        </h1>
                        <p className="text-slate-400 max-w-xl font-light">
                            Dedicated professionals with unrivaled market expertise and a commitment to exceptional service.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Agents Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {agents.map((agent, i) => (
                        <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="group"
                        >
                            <div className="relative overflow-hidden rounded-2xl aspect-3/4 mb-6 shadow-lg border border-slate-100 dark:border-slate-800">
                                <img
                                    src={agent.image}
                                    alt={agent.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                    <div className="flex gap-4 items-center justify-center">
                                        <a href={`mailto:${agent.email}`} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-primary-dark transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </a>
                                        <a href={`tel:${agent.phone}`} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand-primary-dark transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand-primary dark:group-hover:text-brand-primary-dark transition-colors">
                                    {agent.name}
                                </h3>
                                <p className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-wider mb-4">
                                    {agent.role}
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                                    {agent.description}
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {agent.specialties.map(spec => (
                                        <span key={spec} className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <section className="section-padding bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        Want to Join Our Elite Team?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-10 font-light leading-relaxed">
                        We are always looking for passionate professionals to help redefine the luxury real estate experience.
                    </p>
                    <Button href="/contact" variant="primary" size="lg">
                        Apply Now
                    </Button>
                </div>
            </section>
        </motion.div>
    );
};

export default Agents;

