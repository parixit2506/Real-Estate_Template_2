import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import PropertyCard from '@/components/cards/PropertyCard';
import Button from '@/components/ui/Button';
import { useFeaturedProperties, usePropertyStats, useVillas, useDestinations, useProperties } from '@/utilities/useProperties';
import { useRecentPosts } from '@/utilities/useBlog';
import { useAgents } from '@/utilities/useAgents';
import { useTestimonials } from '@/utilities/useTestimonials';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const Home = () => {
    const navigate = useNavigate();
    const [locationQuery, setLocationQuery] = useState('');
    const [budgetRange, setBudgetRange] = useState<'any' | '0-5000000' | '5000000-10000000' | '10000000-20000000' | '20000000+'>(
        'any'
    );
    const [propertyStyle, setPropertyStyle] = useState<'all' | 'villa' | 'penthouse' | 'loft' | 'chalet' | 'mansion'>('all');
    const [isYearly, setIsYearly] = useState(false);
    const { properties: featured } = useFeaturedProperties(6);
    const stats = usePropertyStats();
    const { posts: recentPosts } = useRecentPosts(3);
    const { properties: villas } = useVillas(3);
    const { destinations } = useDestinations(6);
    const { agents } = useAgents();
    const { properties: curatedSelection } = useProperties({ sortBy: 'rating' });
    const { testimonials } = useTestimonials(6);

    // Carousel Pagination Dots Component to isolate state and prevent main Home component re-renders
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CarouselDots = ({ api, itemsCount }: { api: any, itemsCount: number }) => {
        const [selectedIndex, setSelectedIndex] = useState(0);

        const onSelect = useCallback(() => {
            if (!api) return;
            setSelectedIndex(api.selectedScrollSnap());
        }, [api]);

        useEffect(() => {
            if (!api) return;
            onSelect();
            api.on('select', onSelect);
            return () => api.off('select', onSelect);
        }, [api, onSelect]);

        if (!api) return null;

        return (
            <div className="flex justify-center gap-2 mt-2 pb-6">
                {Array.from({ length: itemsCount }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api.scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? 'w-6 bg-brand-primary' : 'bg-brand-primary/20'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        );
    };

    // Higher duration and friction for a more premium "glide" feel
    const smoothOptions = {
        loop: true,
        align: 'center' as const,
        duration: 60, // Slower, more fluid glide
        friction: 0.92, // More natural weight and settle
        skipSnaps: false
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(smoothOptions, [
        Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
    ]);

    const [pkgRef, pkgApi] = useEmblaCarousel(smoothOptions, [
        Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
    ]);

    const [villaRef, villaApi] = useEmblaCarousel(smoothOptions, [
        Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })
    ]);

    const [testiRef, testiApi] = useEmblaCarousel(smoothOptions, [
        Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
    ]);

    const [blogRef, blogApi] = useEmblaCarousel(smoothOptions, [
        Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })
    ]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();
        const q = locationQuery.trim();
        if (q) params.set('search', q);
        if (propertyStyle !== 'all') params.set('style', propertyStyle);

        if (budgetRange !== 'any') {
            if (budgetRange === '20000000+') {
                params.set('minPrice', '20000000');
            } else {
                const [min, max] = budgetRange.split('-');
                if (min) params.set('minPrice', min);
                if (max) params.set('maxPrice', max);
            }
        }

        const qs = params.toString();
        navigate(qs ? `/properties?${qs}` : '/properties');
    };

    const popularSearches: Array<{ label: string; params: Record<string, string> }> = [
        { label: 'London · Villas', params: { search: 'London', style: 'villa' } },
        { label: 'New York · Penthouses', params: { search: 'New York', style: 'penthouse' } },
        { label: 'Dubai · Under $20M', params: { search: 'Dubai', maxPrice: '20000000' } },
        { label: 'USA · For Rent', params: { search: 'USA', category: 'rent' } },
    ];

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
        >
            {/* Hero Section */}
            <section className="relative h-auto min-h-[700px] sm:min-h-screen flex items-start sm:items-center justify-center overflow-hidden pb-24 sm:pb-0">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            'url(/home/hero-bg.png)',
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-br from-slate-950/80 via-slate-950/60 to-slate-950/40" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-brand-primary/20 border border-brand-primary/30 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm tracking-wider uppercase">
                            ✦ Premium Real Estate
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-8">
                            Find Your{' '}
                            <span className="text-brand-primary-dark">
                                Dream Home
                            </span>
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 lg:mb-12 leading-relaxed font-light px-2 sm:px-0">
                            Discover exceptional properties in the most sought-after locations. From luxury
                            penthouses to cozy family homes — your perfect space awaits.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button href="/properties" size="lg" variant="primary" className="w-full sm:w-auto dark:bg-white dark:text-brand-primary">
                                Explore Properties
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Button>
                            <Button href="/contact" size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 transition-colors">
                                Contact an Agent
                            </Button>
                        </div>
                    </motion.div>

                    {/* Search bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-8 sm:mt-14 w-full max-w-4xl mx-auto"
                    >
                        <form
                            onSubmit={handleSearch}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-2.5 sm:p-3 shadow-2xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-3 items-stretch">
                                <div className="md:col-span-4 flex items-center gap-3 px-3.5 sm:px-4 rounded-xl bg-white/5 border border-white/10 min-h-[46px] sm:min-h-[50px] shadow-sm">
                                    <svg className="w-5 h-5 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        value={locationQuery}
                                        onChange={(e) => setLocationQuery(e.target.value)}
                                        placeholder="Location (city, neighborhood, region)"
                                        aria-label="Search by location"
                                        className="flex-1 bg-transparent text-white placeholder-slate-300 text-xs sm:text-sm outline-none py-2.5 sm:py-3"
                                    />
                                </div>

                                <div className="md:col-span-3 flex items-center gap-3 px-3.5 sm:px-4 rounded-xl bg-white/5 border border-white/10 min-h-[46px] sm:min-h-[50px] shadow-sm">
                                    <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <select
                                        value={budgetRange}
                                        onChange={(e) => setBudgetRange(e.target.value as typeof budgetRange)}
                                        aria-label="Filter by budget range"
                                        className="flex-1 h-full min-h-[46px] sm:min-h-[50px] bg-transparent text-white text-xs sm:text-sm outline-none py-2.5 sm:py-3"
                                    >
                                        <option value="any" className="text-slate-900">Any Budget</option>
                                        <option value="0-5000000" className="text-slate-900">Under $5M</option>
                                        <option value="5000000-10000000" className="text-slate-900">$5M – $10M</option>
                                        <option value="10000000-20000000" className="text-slate-900">$10M – $20M</option>
                                        <option value="20000000+" className="text-slate-900">$20M+</option>
                                    </select>
                                </div>

                                <div className="md:col-span-3 flex items-center gap-3 px-3.5 sm:px-4 rounded-xl bg-white/5 border border-white/10 min-h-[46px] sm:min-h-[50px] shadow-sm">
                                    <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <select
                                        value={propertyStyle}
                                        onChange={(e) => setPropertyStyle(e.target.value as typeof propertyStyle)}
                                        aria-label="Filter by property type"
                                        className="flex-1 h-full min-h-[46px] sm:min-h-[50px] bg-transparent text-white text-xs sm:text-sm outline-none py-2.5 sm:py-3"
                                    >
                                        <option value="all" className="text-slate-900">All Types</option>
                                        <option value="villa" className="text-slate-900">Villa</option>
                                        <option value="penthouse" className="text-slate-900">Penthouse</option>
                                        <option value="loft" className="text-slate-900">Loft</option>
                                        <option value="chalet" className="text-slate-900">Chalet</option>
                                        <option value="mansion" className="text-slate-900">Mansion</option>
                                    </select>
                                </div>

                                <div className="md:col-span-2 min-h-[46px] sm:min-h-[50px]">
                                    <button
                                        type="submit"
                                        className="w-full h-full flex items-center justify-center gap-2 bg-brand-primary dark:bg-white text-white dark:text-brand-primary rounded-xl px-4 py-3 sm:py-0 font-bold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <span className="md:hidden">Search</span>
                                        <span className="hidden md:inline">Go</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2 justify-center px-1 border-t border-white/10 pt-3 sm:pt-4">
                                <span className="text-[9px] sm:text-[10px] text-white/70 uppercase tracking-widest block w-full mb-0.5 sm:mb-1 text-center font-bold">Curated Searches</span>
                                {popularSearches.map((s) => (
                                    <button
                                        key={s.label}
                                        type="button"
                                        onClick={() => {
                                            const params = new URLSearchParams(s.params);
                                            navigate(`/properties?${params.toString()}`);
                                        }}
                                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </form>
                    </motion.div>
                </div>


                {/* Scroll indicator */}
                <motion.div
                    className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-1.5 opacity-60">
                        <div className="w-1 h-1.5 bg-white rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="bg-white dark:bg-slate-950 section-padding border-y border-slate-200 dark:border-slate-900 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { label: 'Homes Sold', value: '1,250+' },
                            { label: 'Trusted Agents', value: `${agents.length}+` },
                            { label: 'Avg Days on Market', value: '18' },
                            { label: 'Active Listings', value: `${stats.totalProperties}+` },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">
                                    {stat.value}
                                </div>
                                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="section-padding bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                            Our Collection
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 mb-4">
                            Featured Properties
                        </h2>
                        <div className="w-12 h-1 bg-brand-primary mx-auto mb-6" />
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                            Explore our curated selection of premium properties across the country's most
                            desirable locations.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featured.map((property, i) => (
                            <PropertyCard key={property.id} property={property} index={i} />
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Button href="/properties" variant="outline" size="lg">
                            Explore All Units
                        </Button>
                    </div>
                </div>
            </section>

            {/* Curated Selection Section */}
            <section className="section-padding bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                                Highly Recommended
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 leading-tight">
                                Curated Selection
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl font-light leading-relaxed">
                                Discover our hand-picked properties chosen for their exceptional value and premium locations.
                            </p>
                        </motion.div>

                        <div className="flex items-center gap-3">
                            <Button href="/properties" variant="outline" size="md">
                                View All
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {curatedSelection.slice(0, 3).map((property, i) => (
                            <PropertyCard key={property.id} property={property} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section - Premium Editorial Redesign */}
            <section id="about" className="section-padding bg-white dark:bg-slate-950 overflow-hidden relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 dark:bg-slate-900/50 -z-10 translate-x-1/2 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-brand-primary/5 -z-10 -translate-x-1/2 rounded-full blur-3xl opacity-50" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">

                        {/* Left Content Column */}
                        <div className="lg:col-span-6 xl:col-span-5 order-1">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-6">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                                    <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-widest">
                                        Established 2010
                                    </span>
                                </div>

                                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-white mb-6 lg:mb-8 leading-[1.1] tracking-tight">
                                    Crafting <br className="hidden xl:block" />
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-primary-dark">
                                        Exceptional
                                    </span> <br className="hidden xl:block" />
                                    Lifestyles
                                </h2>

                                <div className="space-y-4 lg:space-y-6 mb-8 lg:mb-10 max-w-2xl">
                                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed font-light">
                                        AuraProperty isn't just a real estate agency; we are architects of aspiration. For over a decade, we've specialized in connecting the world's most discerning individuals with extraordinary living spaces.
                                    </p>
                                    <p className="text-slate-500 dark:text-slate-500 leading-relaxed font-light text-sm sm:text-base">
                                        Our philosophy is rooted in the belief that a home is more than just a destination—it's a canvas for your life's most meaningful moments. We combine data-driven market intelligence with a deeply personal service approach.
                                    </p>
                                </div>

                                {/* Features grid within About */}
                                <div className="grid grid-cols-2 gap-6 lg:gap-8 mb-10 lg:mb-12">
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">$4.2B+</div>
                                        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Global Sales</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1">98%</div>
                                        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Client Retention</div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 lg:gap-6 items-center">
                                    <Button href="/about" variant="primary" size="lg" className="px-8 lg:px-10">
                                        Discover Our Story
                                    </Button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Visual Column - Layered Image Composition */}
                        <div className="lg:col-span-6 xl:col-span-7 order-2 relative h-[400px] sm:h-[500px] lg:h-[550px] xl:h-[650px] mt-10 lg:mt-0">
                            {/* Main large image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="absolute top-0 right-0 w-[90%] lg:w-4/5 h-[90%] lg:h-4/5 rounded-3xl overflow-hidden shadow-2xl z-10"
                            >
                                <img
                                    src="/home/about-image.webp"
                                    alt="Modern Architectural Marvel"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent" />
                            </motion.div>

                            {/* Secondary overlapping image */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                                className="absolute bottom-4 lg:bottom-4 left-0 w-2/5 lg:w-1/2 h-2/5 lg:h-2/3 rounded-3xl overflow-hidden shadow-2xl border-[3px] lg:border-4 border-white dark:border-slate-950 z-20"
                            >
                                <img
                                    src="/home/about-image-2.webp"
                                    alt="Interior Design Detail"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Glassmorphism Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="absolute top-1/2 -right-4 lg:-right-6 xl:-right-10 translate-y-[-50%] z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 dark:border-slate-800/50 max-w-[150px] sm:max-w-[220px]"
                            >
                                <div className="flex items-center gap-1 text-brand-primary mb-2 sm:mb-3">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <svg key={s} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-slate-900 dark:text-white italic text-[11px] sm:text-base mb-3 sm:mb-4 leading-relaxed font-medium">
                                    "The most reliable luxury partner we've ever worked with."
                                </p>
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-200 overflow-hidden">
                                        <img src="/home/founder-avatar.webp" alt="Reviewer" />
                                    </div>
                                    <div className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500">James Chen</div>
                                </div>
                            </motion.div>

                            {/* Experience Circle */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute -bottom-10 -right-10 w-40 h-40 border border-slate-200/50 dark:border-slate-800/50 rounded-full flex items-center justify-center -z-10 hidden lg:flex"
                            >
                                <div className="absolute inset-2 border border-brand-primary/20 rounded-full" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Neighborhoods / Cities */}
            <section className="py-18 lg:py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                                Explore Areas
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 leading-tight">
                                Featured Neighborhoods & Cities
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl font-light leading-relaxed">
                                Hand-picked destinations with the most in-demand listings right now.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                        >
                            <Button href="/properties" variant="outline" size="md" className="group">
                                Browse All Properties
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Desktop/Tablet Grid */}
                    <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((city, i) => (
                            <motion.button
                                key={city.name}
                                type="button"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -8 }}
                                onClick={() => navigate(`/properties?search=${encodeURIComponent(city.name)}`)}
                                className="group relative h-72 rounded-[2rem] overflow-hidden text-left shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-500"
                            >
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent group-hover:from-slate-950 group-hover:via-slate-950/40 transition-all duration-500" />

                                <div className="absolute top-6 left-6">
                                    <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                                            {city.count} Listings
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 right-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                                            <div className="h-0.5 w-0 group-hover:w-full bg-brand-primary transition-all duration-500 rounded-full" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-lg shadow-brand-primary/20">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Mobile Embla Carousel */}
                    <div className="sm:hidden -mx-4 [contain:paint]">
                        <div className="overflow-hidden py-6" ref={emblaRef}>
                            <div className="flex [backface-visibility:hidden] [will-change:transform] touch-pan-y">
                                {destinations.map((city) => (
                                    <div key={city.name} className="flex-[0_0_100%] min-w-0 px-4 [backface-visibility:hidden]">
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/properties?search=${encodeURIComponent(city.name)}`)}
                                            className="relative w-full h-80 rounded-3xl overflow-hidden text-left shadow-lg border border-white/5"
                                        >
                                            <img
                                                src={city.image}
                                                alt={city.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                                            <div className="absolute top-5 left-5">
                                                <span className="px-3 py-1 bg-brand-primary/90 text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                                    {city.count} Homes
                                                </span>
                                            </div>

                                            <div className="absolute bottom-6 left-6 right-6">
                                                <h3 className="text-xl font-bold text-white mb-2">{city.name}</h3>
                                                <div className="flex items-center gap-2 text-white/70 text-[11px] font-medium uppercase tracking-wider">
                                                    <span>Explore Properties</span>
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <CarouselDots api={emblaApi} itemsCount={destinations.length} />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-18 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                            Our Packages
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 mb-6">
                            Choose Your Plan
                        </h2>

                        {/* Toggle */}
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <span className={`text-sm font-medium ${!isYearly ? 'text-brand-primary dark:text-brand-primary-dark' : 'text-slate-500'}`}>Monthly</span>
                            <button
                                onClick={() => setIsYearly(!isYearly)}
                                aria-label={`Switch to ${isYearly ? 'monthly' : 'yearly'} billing`}
                                className="relative w-14 h-7 bg-slate-200 dark:bg-slate-800 rounded-full p-1 transition-colors"
                            >
                                <motion.div
                                    className="w-5 h-5 bg-brand-primary rounded-full"
                                    animate={{ x: isYearly ? 28 : 0 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            </button>
                            <span className={`text-sm font-medium ${isYearly ? 'text-brand-primary dark:text-brand-primary-dark' : 'text-slate-500'}`}>
                                Yearly <span className="text-[10px] bg-brand-primary/10 dark:bg-brand-primary-dark/15 text-brand-primary dark:text-brand-primary-dark px-2 py-0.5 rounded-full ml-1 whitespace-nowrap">Save 20%</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Desktop/Tablet Grid */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'Starter',
                                monthlyPrice: 29,
                                yearlyPrice: 278,
                                features: ['3 Properties', 'Basic Analytics', 'Standard Support', 'Mobile App Access'],
                                isPopular: false
                            },
                            {
                                name: 'Professional',
                                monthlyPrice: 79,
                                yearlyPrice: 758,
                                features: ['Unlimited Properties', 'Advanced Analytics', 'Priority Support', 'Custom Branding', 'Lead Generation'],
                                isPopular: true
                            },
                            {
                                name: 'Agency',
                                monthlyPrice: 149,
                                yearlyPrice: 1430,
                                features: ['Multiple Team Members', 'API Access', 'White-labeling', 'Dedicated Manager', 'Market Insights'],
                                isPopular: false
                            }
                        ].map((plan, i) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`relative p-8 rounded-3xl border ${plan.isPopular
                                    ? 'border-brand-primary dark:border-brand-primary-dark bg-slate-50 dark:bg-slate-900/50 shadow-xl'
                                    : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950'
                                    }`}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    </span>
                                    <span className="text-slate-500 text-sm">/{isYearly ? 'year' : 'mo'}</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-light">
                                            <svg className="w-5 h-5 text-brand-primary dark:text-brand-primary-dark shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    href="/contact"
                                    variant={plan.isPopular ? 'primary' : 'outline'}
                                    className="w-full justify-center"
                                >
                                    Get Started
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Packages Carousel */}
                    <div className="md:hidden -mx-4 [contain:paint]">
                        <div className="overflow-hidden py-6" ref={pkgRef}>
                            <div className="flex [backface-visibility:hidden] [will-change:transform] touch-pan-y">
                                {[
                                    {
                                        name: 'Starter',
                                        monthlyPrice: 29,
                                        yearlyPrice: 278,
                                        features: ['3 Properties', 'Basic Analytics', 'Standard Support', 'Mobile App Access'],
                                        isPopular: false
                                    },
                                    {
                                        name: 'Professional',
                                        monthlyPrice: 79,
                                        yearlyPrice: 758,
                                        features: ['Unlimited Properties', 'Advanced Analytics', 'Priority Support', 'Custom Branding', 'Lead Generation'],
                                        isPopular: true
                                    },
                                    {
                                        name: 'Agency',
                                        monthlyPrice: 149,
                                        yearlyPrice: 1430,
                                        features: ['Multiple Team Members', 'API Access', 'White-labeling', 'Dedicated Manager', 'Market Insights'],
                                        isPopular: false
                                    }
                                ].map((plan) => (
                                    <div key={plan.name} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-4 [backface-visibility:hidden]">
                                        <div className={`relative p-8 rounded-3xl border h-full ${plan.isPopular
                                            ? 'border-brand-primary dark:border-brand-primary-dark bg-slate-50 dark:bg-slate-900/50 shadow-xl'
                                            : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950'
                                            }`}>
                                            {plan.isPopular && (
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                                                    Most Popular
                                                </div>
                                            )}
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                                            <div className="mb-6">
                                                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                                </span>
                                                <span className="text-slate-500 text-sm">/{isYearly ? 'year' : 'mo'}</span>
                                            </div>
                                            <ul className="space-y-4 mb-8">
                                                {plan.features.map((feature) => (
                                                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-light">
                                                        <svg className="w-5 h-5 text-brand-primary dark:text-brand-primary-dark shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button
                                                href="/contact"
                                                variant={plan.isPopular ? 'primary' : 'outline'}
                                                className="w-full justify-center"
                                            >
                                                Get Started
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Pagination Dots */}
                        <CarouselDots api={pkgApi} itemsCount={3} />
                    </div>
                </div>
            </section>

            {/* Premium Villas Section */}
            <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                                Exclusive Living
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 leading-tight">
                                Luxury Villa Collection
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg font-light leading-relaxed">
                                Our most prestigious estates, offering ultimate privacy and world-class architecture.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Button href="/properties?type=villa" variant="primary" size="md">
                                View All Villas
                            </Button>
                        </motion.div>
                    </div>

                    {/* Desktop/Tablet Grid */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {villas.map((villa, i) => (
                            <motion.div
                                key={villa.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group cursor-pointer"
                                onClick={() => navigate(`/property/${villa.id}`)}
                            >
                                <div className="relative overflow-hidden rounded-3xl aspect-4/5 shadow-xl">
                                    <img
                                        src={villa.image}
                                        alt={villa.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                                    {/* Villa Badge */}
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-1.5 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                            Villa
                                        </span>
                                    </div>

                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-2">
                                            {villa.location}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-primary-dark transition-colors">
                                            {villa.title}
                                        </h3>
                                        <div className="flex items-center gap-6 text-white/90 text-sm font-light">
                                            <div className="flex items-center gap-2">
                                                <span className="text-brand-primary-dark font-bold">{villa.beds}</span> Beds
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-brand-primary-dark font-bold">{villa.baths}</span> Baths
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-brand-primary-dark font-bold">{villa.sqft}</span> sqft
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                                            <div className="text-xl font-bold text-white">
                                                {villa.price}
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-brand-primary group-hover:border-brand-primary transition-all">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Villas Carousel */}
                    <div className="md:hidden -mx-4 [contain:paint]">
                        <div className="overflow-hidden py-6" ref={villaRef}>
                            <div className="flex [backface-visibility:hidden] [will-change:transform] touch-pan-y">
                                {villas.map((villa) => (
                                    <div key={villa.id} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-4 [backface-visibility:hidden]">
                                        <div
                                            className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-xl"
                                            onClick={() => navigate(`/property/${villa.id}`)}
                                        >
                                            <img
                                                src={villa.image}
                                                alt={villa.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                                            <div className="absolute top-5 left-5">
                                                <span className="px-3 py-1 bg-brand-primary text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                                    Villa
                                                </span>
                                            </div>

                                            <div className="absolute bottom-8 left-8 right-8">
                                                <div className="text-white/80 text-[10px] font-semibold uppercase tracking-wider mb-1">
                                                    {villa.location}
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-3">
                                                    {villa.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-white/90 text-[11px] font-light">
                                                    <div><span className="text-brand-primary-dark font-bold">{villa.beds}</span> Beds</div>
                                                    <div><span className="text-brand-primary-dark font-bold">{villa.baths}</span> Baths</div>
                                                    <div><span className="text-brand-primary-dark font-bold">{villa.sqft}</span> sqft</div>
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                                                    <div className="text-lg font-bold text-white">{villa.price}</div>
                                                    <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Pagination Dots */}
                        <CarouselDots api={villaApi} itemsCount={villas.length} />
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                            Simple Process
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 mb-4">
                            How It Works
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
                            Everything you need to discover, tour, and secure a property — without the clutter.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Search & Filter',
                                desc: 'Use location, budget, and property type to find your ideal match in seconds.',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Tour & Decide',
                                desc: 'Review photos, amenities, and details — then connect with an agent when ready.',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V6m0 8v2m10-4a10 10 0 11-20 0 10 10 0 0120 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Close Confidently',
                                desc: 'Get guidance through viewings, offers, and paperwork with full transparency.',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                        ].map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 p-8"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 dark:bg-brand-primary-dark/15 text-brand-primary dark:text-brand-primary-dark flex items-center justify-center mb-6">
                                    {step.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-14">
                        <Button href="/properties" variant="primary" size="lg">
                            Start Searching
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                            Client Stories
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 mb-6">
                            What Our Residents Say
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
                            Hear from the families and professionals who found their perfect space with AuraProperty.
                        </p>
                    </motion.div>

                    {/* Marquee Container */}
                    {/* Desktop Marquee Style */}
                    <div className="hidden sm:block relative mt-16 overflow-hidden">
                        {/* Side Fades - Absolute Gradients for Premium Feel */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-linear-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-linear-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />

                        <motion.div
                            className="flex gap-6 sm:gap-8 w-max px-4"
                            initial={{ x: 0 }}
                            animate={{ x: '-50%' }}
                            transition={{
                                duration: 35,
                                ease: 'linear',
                                repeat: Infinity
                            }}
                            whileHover={{
                                transition: { duration: 1000 }
                            }}
                        >
                            {[...testimonials, ...testimonials].map((testimonial, i) => (
                                <div
                                    key={`${testimonial.id}-${i}`}
                                    className="w-[300px] sm:w-[400px] bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-start text-left shrink-0 transition-all duration-300 hover:border-brand-primary/30 hover:shadow-xl hover:shadow-brand-primary/5"
                                >
                                    <div className="flex gap-1 mb-5">
                                        {[...Array(testimonial.rating)].map((_, idx) => (
                                            <svg key={idx} className="w-4 h-4 text-brand-primary dark:text-brand-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6 italic text-sm sm:text-base">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="relative">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-10 h-10 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-slate-100 dark:border-slate-800"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">{testimonial.name}</h3>
                                            <p className="text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-widest mt-0.5">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Mobile Snap Carousel Style */}
                    <div className="sm:hidden -mx-4 mt-8 [contain:paint]">
                        <div className="overflow-hidden py-6" ref={testiRef}>
                            <div className="flex [backface-visibility:hidden] [will-change:transform] touch-pan-y">
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="flex-[0_0_100%] min-w-0 px-4 [backface-visibility:hidden]">
                                        <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-start text-left h-full">
                                            <div className="flex gap-1 mb-5">
                                                {[...Array(testimonial.rating)].map((_, idx) => (
                                                    <svg key={idx} className="w-4 h-4 text-brand-primary dark:text-brand-primary-dark" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-6 italic text-sm">
                                                "{testimonial.content}"
                                            </p>
                                            <div className="flex items-center gap-4 mt-auto">
                                                <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                                                <div>
                                                    <h3 className="text-slate-900 dark:text-white font-bold text-sm">{testimonial.name}</h3>
                                                    <p className="text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-widest">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Pagination Dots */}
                        <CarouselDots api={testiApi} itemsCount={testimonials.length} />
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-18 lg:py-24 bg-white dark:bg-slate-950 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                                Insights & Articles
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-3 leading-tight">
                                Latest from our Blog
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg font-light leading-relaxed">
                                Stay updated with the latest trends, guides, and insights from the world of luxury real estate.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button href="/blog" variant="outline" size="md" className="group">
                                View All Posts
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Desktop/Tablet Grid */}
                    <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentPosts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group cursor-pointer"
                                onClick={() => navigate(`/blog/${post.id}`)}
                            >
                                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                                        <span>{post.date}</span>
                                        <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary-dark transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 pt-4">
                                        <img
                                            src={post.author.image}
                                            alt={post.author.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                            {post.author.name}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Blog Carousel */}
                    <div className="md:hidden -mx-4 [contain:paint]">
                        <div className="overflow-hidden py-6" ref={blogRef}>
                            <div className="flex [backface-visibility:hidden] [will-change:transform] touch-pan-y">
                                {recentPosts.map((post) => (
                                    <div key={post.id} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 px-4 [backface-visibility:hidden]">
                                        <div
                                            className="group cursor-pointer"
                                            onClick={() => navigate(`/blog/${post.id}`)}
                                        >
                                            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-lg">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-wider rounded-full">
                                                        {post.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium font-bold uppercase tracking-widest">
                                                    <span>{post.date}</span>
                                                    <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center gap-3 pt-4">
                                                    <img
                                                        src={post.author.image}
                                                        alt={post.author.name}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                                                        {post.author.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Pagination Dots */}
                        <CarouselDots api={blogApi} itemsCount={recentPosts.length} />
                    </div>
                </div>
            </section>

            {/* Values / Why Us */}
            <section className="py-18 lg:py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 overflow-hidden relative">
                {/* Subtle Decorative Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16 lg:mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.25em]">
                                The Aura Advantage
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 leading-tight">
                                Exceptional Standards
                            </h2>
                            <div className="h-1 w-20 bg-brand-primary mx-auto mt-6 rounded-full" />
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                        {[
                            {
                                title: 'Premium Units',
                                desc: 'Every property is hand-vetted by our experts to ensure the highest standards of quality, design, and architecture.',
                                color: 'bg-blue-500/10 text-blue-600',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Dedicated Support',
                                desc: 'Our experienced agents provide personalized guidance throughout your entire real estate journey, from search to closing.',
                                color: 'bg-brand-primary/10 text-brand-primary',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: 'Seamless Closures',
                                desc: 'We ensure every transaction is transparent, secure, and handled with the highest degree of professionalism.',
                                color: 'bg-emerald-500/10 text-emerald-600',
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04C5.38 7.551 5 9.208 5 11c0 5.185 2.813 9.712 7 11.162 4.187-1.45 7-5.977 7-11.162 0-1.792-.38-3.449-1.016-5.016z" />
                                    </svg>
                                )
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex flex-col items-center text-center"
                            >
                                <div className={`w-16 h-16 rounded-[2rem] ${item.color} flex items-center justify-center mb-8 border border-white/5 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-primary dark:group-hover:text-brand-primary-dark transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 sm:py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/50">
                {/* Visual Interest Backgrounds */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/[0.02] dark:bg-brand-primary/[0.05] skew-x-12 translate-x-1/4 -z-10" />
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 blur-[120px] rounded-full -z-10" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-600/5 blur-[120px] rounded-full -z-10" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 sm:p-16 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group"
                    >
                        {/* Inner group hover effect */}
                        <div className="absolute inset-0 bg-brand-primary/[0.01] dark:bg-brand-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                Start Your <span className="text-brand-primary">Real Estate</span> Journey
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-lg mx-auto font-light leading-relaxed">
                                Connect with our premier agents and find the property that perfectly defines your unique lifestyle.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    href="/properties"
                                    variant="primary"
                                    size="lg"
                                    className="px-10 rounded-2xl shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Get Started
                                </Button>
                                <Button
                                    href="/contact"
                                    variant="outline"
                                    size="lg"
                                    className="px-10 rounded-2xl bg-white dark:bg-transparent border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                                >
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;

