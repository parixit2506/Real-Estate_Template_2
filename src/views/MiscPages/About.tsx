import { motion } from 'framer-motion';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const team = [
    {
        name: 'Alexandra Chen',
        role: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        bio: '15+ years in luxury real estate. Passionate about connecting people with their dream homes.',
    },
    {
        name: 'Marcus Johnson',
        role: 'Head of Sales',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        bio: 'Expert in high-value transactions with a track record of $500M+ in closed deals.',
    },
    {
        name: 'Sofia Martinez',
        role: 'Lead Agent',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        bio: 'Specializes in waterfront and luxury properties across Florida and the Carolinas.',
    },
];

const About = () => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-white dark:bg-slate-950"
        >
            {/* Hero */}
            <div className="relative bg-slate-900 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80)',
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-slate-950/50 to-slate-950" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                            Our Legacy
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
                            About LuxeEstate
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            We believe everyone deserves a place they love to call home. Since 2010, we've
                            helped thousands of families find their perfect property through definitive expertise.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Mission */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                                Our Philosophy
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 mb-8">
                                Redefining the Real Estate Experience
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-light">
                                At LuxeEstate, we combine deep market expertise with cutting-edge technology to
                                deliver an unparalleled real estate experience. Our team of dedicated professionals
                                is committed to finding you the perfect property.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                                We pride ourselves on transparency, integrity, and personalized service. Every
                                client is unique, and we tailor our approach to meet your specific needs and goals.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative mt-8 lg:mt-0 pb-10 sm:pb-0"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                                alt="Our office"
                                className="rounded-2xl shadow-xl w-full object-cover h-64 sm:h-80 lg:h-96"
                            />
                            <div className="absolute -bottom-6 left-2 sm:-bottom-8 sm:-left-8 bg-brand-primary text-white p-6 sm:p-10 rounded-2xl shadow-2xl">
                                <div className="text-3xl sm:text-4xl font-bold mb-1">15+</div>
                                <div className="text-xs font-bold uppercase tracking-widest opacity-80">Years of Excellence</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 text-center">
                        {[
                            { value: '$2B+', label: 'Properties Sold' },
                            { value: '500+', label: 'Happy Clients' },
                            { value: '50+', label: 'Expert Agents' },
                            { value: '25', label: 'Cities Covered' },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                            Global Leadership
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3">
                            Meet Our Team
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="group"
                            >
                                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-4/5">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand-primary dark:group-hover:text-brand-primary-dark transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                                    {member.bio}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default About;

