import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PropertyGallery from '@/components/sections/PropertyGallery';
import PropertyCard from '@/components/cards/PropertyCard';
import Button from '@/components/ui/Button';
import { useProperty, useProperties } from '@/utilities/useProperties';
import { useAgent } from '@/utilities/useAgents';
import { optimizeUnsplashUrl } from '@/utilities/imageOptimizer';

const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { property } = useProperty(id ?? '');
    const { properties: allProperties } = useProperties();
    const { agent } = useAgent(property?.agentId ?? '');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const heroImageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 pt-20">
                <div className="text-center">
                    <div className="text-6xl mb-6 opacity-20">🏛️</div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                        Property Not Found
                    </h2>
                    <Button href="/properties" variant="primary">
                        Return to Collection
                    </Button>
                </div>
            </div>
        );
    }

    const relatedProperties = allProperties
        .filter(p => String(p.id) !== String(property.id))
        .slice(0, 3);

    return (
        <div ref={containerRef} className="bg-white dark:bg-slate-950 min-h-screen selection:bg-brand-primary/10 dark:selection:bg-brand-primary-dark/20">
            {/* Minimalist Hero */}
            <section className="relative h-[65vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] overflow-hidden">
                <motion.div
                    style={{ scale: heroImageScale, opacity: heroOpacity }}
                    className="absolute inset-0"
                >
                    <img
                        src={optimizeUnsplashUrl(property.image, 1600)}
                        alt={property.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
                </motion.div>

                <div className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-white/70">
                                    {property.type} • {property.status}
                                </span>
                                <div className="h-px w-8 sm:w-12 bg-white/30" />
                                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.4em] text-white/70">
                                    ID: {property.id}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-6 sm:mb-8">
                                {property.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-white/90">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs sm:text-sm font-medium tracking-tight">{property.location}, {property.region}</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="flex gap-0.5 text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${i < Math.floor(property.rating) ? 'fill-current' : 'opacity-20'}`} viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase opacity-70">Excellence Score {property.rating}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Narrative Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-20 sm:space-y-24 lg:space-y-32">

                        {/* Summary Stats - More spacing, cleaner lines */}
                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 border-b border-slate-100 dark:border-slate-800 pb-10 sm:pb-16">
                            {[
                                { label: 'Beds', value: property.beds, detail: 'Guest Suites' },
                                { label: 'Baths', value: property.baths, detail: 'En-suites' },
                                { label: 'Size', value: property.sqft, detail: 'Interior SF' },
                                { label: 'Year', value: property.yearBuilt, detail: 'Architecture' },
                            ].map((stat) => (
                                <div key={stat.label} className="space-y-1 sm:space-y-2">
                                    <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-light text-slate-900 dark:text-white leading-none">{stat.value}</div>
                                    <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                                    <div className="text-[10px] sm:text-xs text-slate-300 dark:text-slate-600 font-medium whitespace-nowrap">{stat.detail}</div>
                                </div>
                            ))}
                        </div>

                        {/* Description Section */}
                        <section className="relative">
                            <div className="max-w-3xl space-y-8 sm:space-y-10">
                                <div>
                                    <span className="text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-[0.4em] block mb-4 sm:mb-6">Introduction</span>
                                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                                        Refined aesthetics <br />
                                        <span className="text-slate-300 dark:text-slate-700 font-serif italic font-normal">curated for the discerning.</span>
                                    </h2>
                                </div>
                                <div className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                    {property.description}
                                </div>
                            </div>
                        </section>

                        {/* Gallery Section - Full width look */}
                        <section className="space-y-6 lg:space-y-8">
                            <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">The Collection</h3>
                            <PropertyGallery image={property.image} title={property.title} gallery={property.gallery} />
                        </section>

                        {/* Features & Amenities - Unified cleaner grid */}
                        <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16 pt-16 border-t border-slate-50 dark:border-slate-900">
                            <div className="space-y-8 sm:space-y-10">
                                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em]">Key Features</h3>
                                <div className="space-y-2 sm:space-y-4">
                                    {property.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-4 sm:gap-6 py-3 sm:py-4 border-b border-slate-50 dark:border-slate-900 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 px-2 transition-colors -mx-2 rounded-lg">
                                            <span className="text-brand-primary dark:text-brand-primary-dark text-xs opacity-50 dark:opacity-70 font-bold">0{i + 1}</span>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-8 sm:space-y-10">
                                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em]">Amenities</h3>
                                <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-5 sm:gap-y-6">
                                    {property.amenities.slice(0, 10).map((amenity, i) => (
                                        <div key={i} className="flex items-center gap-2 sm:gap-3 group/amenity">
                                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-brand-primary/40 group-hover/amenity:bg-brand-primary transition-colors shrink-0" />
                                            <span className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Quiet Luxury Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
                        <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 lg:p-8 xl:p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-8 lg:space-y-10">

                            {/* Investment Profile Section */}
                            <div className="pb-8 border-b border-slate-100 dark:border-slate-800 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-4 bg-brand-primary/60 rounded-full" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Asset Overview</span>
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                                        Market Stable
                                    </span>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] opacity-80">Acquisition Price</div>
                                    <div className="text-4xl lg:text-3xl xl:text-5xl font-light text-slate-900 dark:text-white tracking-tight">
                                        {property.price}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group/item transition-all hover:border-brand-primary/30">
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 shadow-xs">Yield (Est.)</div>
                                        <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">4.2% / Yr</div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group/item transition-all hover:border-brand-primary/30">
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 shadow-xs">Security</div>
                                        <div className="text-base font-bold text-slate-900 dark:text-white leading-tight">Tier 1</div>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons - Elegant & Reserved */}
                            <div className="space-y-4">
                                <Button href="/contact" variant="primary" fullWidth className="py-4.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold hover:scale-[1.02] shadow-xl shadow-brand-primary/10 transition-all">
                                    Secure Private Handover
                                </Button>
                                <Button href="/contact" variant="outline" fullWidth className="py-4.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold border-slate-200 text-slate-900 dark:text-white dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                    Request Dossier
                                </Button>
                            </div>

                            {/* Agent Section - Softened */}
                            {agent && (
                                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img
                                                src={agent.image}
                                                alt={agent.name}
                                                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-50 dark:ring-slate-900 shadow-lg"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-slate-900 dark:text-white mb-0.5">{agent.name}</h4>
                                            <p className="text-[10px] text-brand-primary dark:text-brand-primary-dark font-bold uppercase tracking-widest">{agent.role}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mt-6">
                                        <a href={`tel:${agent.phone || '#'}`} className="flex items-center justify-center py-3 rounded-xl border border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-primary hover:border-brand-primary/30 transition-all">
                                            Voice
                                        </a>
                                        <a href={`mailto:${agent.email || '#'}`} className="flex items-center justify-center py-3 rounded-xl border border-slate-100 dark:border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-primary hover:border-brand-primary/30 transition-all">
                                            Email
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Listing Verification */}
                            <div className="flex items-center justify-center gap-3 py-3 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Verified Portfolio Asset</span>
                            </div>
                        </div>

                        {/* Minimal Back Button */}
                        <Link
                            to="/properties"
                            className="flex items-center justify-center gap-3 py-12 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 hover:text-brand-primary dark:hover:text-brand-primary-dark transition-all group"
                        >
                            <span className="w-8 h-px bg-slate-200 group-hover:bg-brand-primary dark:group-hover:bg-brand-primary-dark transition-all" />
                            Return to Collection
                        </Link>
                    </div>
                </div>
            </div>

            {/* Other Properties */}
            {relatedProperties.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                        <div className="max-w-xl">
                            <span className="text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-[0.4em] block mb-3">
                                Private Selection
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                                Complementary residential <br className="hidden sm:block" />
                                <span className="text-slate-300 dark:text-slate-700 font-serif italic font-normal">opportunities.</span>
                            </h2>
                        </div>
                        <Button
                            href="/properties"
                            variant="outline"
                            className="text-[10px] font-bold uppercase tracking-[0.3em] px-8"
                        >
                            View All Collection
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                        {relatedProperties.map((p, index) => (
                            <PropertyCard key={p.id} property={p} index={index} />
                        ))}
                    </div>
                </div>
            )}

            {/* Subtle Mobile Bar */}
            <div className="lg:hidden fixed bottom-6 left-4 right-4 z-40">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2rem] p-3 pl-8 flex items-center justify-between border border-slate-100 dark:border-white/5 shadow-2xl">
                    <div className="text-slate-900 dark:text-white shrink-0">
                        <div className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-0.5">Price</div>
                        <div className="text-base sm:text-lg font-bold tracking-tight">{property.price}</div>
                    </div>
                    <Button href="/contact" variant="primary" size="md" className="rounded-2xl px-10 py-4 text-[10px] uppercase tracking-widest font-bold shadow-lg shadow-brand-primary/10">
                        Enquire
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;

