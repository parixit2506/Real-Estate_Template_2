import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '@/components/cards/PropertyCard';
import { useProperties, type PropertyFilters } from '@/utilities/useProperties';
import type { PropertyType } from '@/StaticData/property';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const STYLE_TYPES = ['villa', 'penthouse', 'loft', 'mansion', 'chalet'] as const;

const normalizeCategory = (raw: string | null | undefined): PropertyType => {
    if (!raw) return 'all';
    const v = raw.toLowerCase();
    if (v === 'sale' || v === 'rent' || v === 'all') return v;
    return 'all';
};

const normalizeStyle = (raw: string | null | undefined): string => {
    if (!raw) return 'all';
    const v = raw.toLowerCase().trim();
    if (v === 'all') return 'all';
    if ((STYLE_TYPES as readonly string[]).includes(v)) {
        return v.charAt(0).toUpperCase() + v.slice(1);
    }
    return 'all';
};

const normalizeNumberParam = (raw: string | null | undefined): number | undefined => {
    if (!raw) return undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
};

const Listings = () => {
    const [searchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Query params (new + backward compatible)
    // Preferred: category, style, search, minPrice, maxPrice
    // Legacy: type (used as either category OR style in older links)
    const legacyType = searchParams.get('type');

    const categoryFromNew = normalizeCategory(searchParams.get('category'));
    const styleFromNew = normalizeStyle(searchParams.get('style'));
    const initialSearch = searchParams.get('search') || '';
    const initialMinPrice = normalizeNumberParam(searchParams.get('minPrice'));
    const initialMaxPrice = normalizeNumberParam(searchParams.get('maxPrice'));

    const legacyAsCategory = normalizeCategory(legacyType);
    const legacyAsStyle = normalizeStyle(legacyType);

    const initialCategory = categoryFromNew !== 'all' ? categoryFromNew : legacyAsCategory;
    const initialStyle = styleFromNew !== 'all' ? styleFromNew : legacyAsStyle;

    // Filter States
    const [filters, setFilters] = useState<PropertyFilters>({
        category: initialCategory,
        type: initialStyle,
        search: initialSearch,
        beds: 'any',
        baths: 'any',
        minPrice: initialMinPrice,
        maxPrice: initialMaxPrice,
        sortBy: 'newest'
    });

    // Sync from URL
    useEffect(() => {
        const legacy = searchParams.get('type');
        const q = searchParams.get('search') || '';
        const category = normalizeCategory(searchParams.get('category')) !== 'all'
            ? normalizeCategory(searchParams.get('category'))
            : normalizeCategory(legacy);
        const style = normalizeStyle(searchParams.get('style')) !== 'all'
            ? normalizeStyle(searchParams.get('style'))
            : normalizeStyle(legacy);
        const minPrice = normalizeNumberParam(searchParams.get('minPrice'));
        const maxPrice = normalizeNumberParam(searchParams.get('maxPrice'));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFilters(prev => ({
            ...prev,
            category,
            type: style,
            search: q,
            minPrice,
            maxPrice
        }));
    }, [searchParams]);

    const { properties, total } = useProperties(filters);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateFilter = (key: keyof PropertyFilters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const propertyTypes = ['all', 'Villa', 'Penthouse', 'Loft', 'Chalet', 'Mansion'];

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
                            Estate Collection
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-2 mb-4 tracking-tight">
                            Premier Properties
                        </h1>
                        <p className="text-slate-400 max-w-xl font-light">
                            Explore our definitive collection of luxury properties available for acquisition and lease.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Search & Filter Bar */}
            <div className="sticky top-20 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-center justify-between">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            {/* Category Select */}
                            <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl shrink-0">
                                {['all', 'sale', 'rent'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => updateFilter('category', cat)}
                                        className={`px-3 sm:px-4 py-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${filters.category === cat
                                            ? 'bg-white dark:bg-slate-800 text-brand-primary dark:text-brand-primary-dark shadow-sm'
                                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                    >
                                        {cat === 'all' ? 'All' : cat === 'sale' ? 'For Sale' : 'For Rent'}
                                    </button>
                                ))}
                            </div>

                            {/* Property Type Select */}
                            <select
                                value={filters.type}
                                onChange={(e) => updateFilter('type', e.target.value)}
                                className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl outline-none border-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-brand-primary-dark/30 min-w-[140px]"
                            >
                                {propertyTypes.map(pt => (
                                    <option key={pt} value={pt}>{pt === 'all' ? 'Property Type' : pt}</option>
                                ))}
                            </select>

                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shrink-0 ${isFilterOpen ? 'bg-brand-primary text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                <span className="hidden sm:inline">Filters</span>
                                <span className="sm:hidden">Filter</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3 w-full lg:max-w-md">
                            {/* Search */}
                            <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 rounded-xl px-4 py-2.5 flex-1 group focus-within:ring-1 focus-within:ring-brand-primary dark:focus-within:ring-brand-primary-dark/30 transition-all">
                                <svg className="w-4 h-4 text-slate-400 shrink-0 group-focus-within:text-brand-primary dark:group-focus-within:text-brand-primary-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    value={filters.search}
                                    onChange={e => updateFilter('search', e.target.value)}
                                    placeholder="Search location, title..."
                                    className="bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none flex-1 font-medium"
                                />
                            </div>

                            {/* Sort */}
                            <select
                                value={filters.sortBy}
                                onChange={(e) => updateFilter('sortBy', e.target.value)}
                                className="hidden sm:block bg-white dark:bg-slate-950 text-slate-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-3 sm:px-4 py-2.5 rounded-xl outline-none border border-slate-200 dark:border-slate-800"
                            >
                                <option value="newest">Sort: Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>

                    {/* Advanced Filters Panel */}
                    <AnimatePresence>
                        {isFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 mt-6 pb-4 border-t border-slate-100 dark:border-slate-800">
                                    {/* Beds */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Min Bedrooms</label>
                                        <div className="flex gap-2">
                                            {['any', 1, 2, 3, 4, 5].map(n => (
                                                <button
                                                    key={n}
                                                    onClick={() => updateFilter('beds', n)}
                                                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${filters.beds === n ? 'bg-brand-primary border-brand-primary text-white' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-primary dark:hover:border-brand-primary-dark'}`}
                                                >
                                                    {n === 'any' ? 'Any' : `${n}+`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Baths */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Min Bathrooms</label>
                                        <div className="flex gap-2">
                                            {['any', 1, 2, 3, 4].map(n => (
                                                <button
                                                    key={n}
                                                    onClick={() => updateFilter('baths', n)}
                                                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${filters.baths === n ? 'bg-brand-primary border-brand-primary text-white' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-primary dark:hover:border-brand-primary-dark'}`}
                                                >
                                                    {n === 'any' ? 'Any' : `${n}+`}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div className="sm:col-span-2 lg:col-span-2 space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Range (USD)</label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={filters.minPrice || ''}
                                                onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                                                className="w-full bg-slate-100 dark:bg-slate-900 text-xs font-medium p-2.5 rounded-xl outline-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-brand-primary-dark/30"
                                            />
                                            <span className="text-slate-300">—</span>
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={filters.maxPrice || ''}
                                                onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                                                className="w-full bg-slate-100 dark:bg-slate-900 text-xs font-medium p-2.5 rounded-xl outline-none focus:ring-1 focus:ring-brand-primary dark:focus:ring-brand-primary-dark/30"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Results Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-900 pb-4">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                        Showing <span className="text-slate-900 dark:text-white">{total}</span> Result{total !== 1 && 's'}
                    </p>
                    <button
                        onClick={() => setFilters({
                            category: 'all',
                            type: 'all',
                            search: '',
                            beds: 'any',
                            baths: 'any',
                            minPrice: undefined,
                            maxPrice: undefined,
                            sortBy: 'newest'
                        })}
                        className="text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-widest hover:underline"
                    >
                        Clear All
                    </button>
                </div>

                {properties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {properties.map((property, i) => (
                            <PropertyCard key={property.id} property={property} index={i} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32"
                    >
                        <div className="text-5xl mb-6 opacity-20">🏰</div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                            No matching properties found
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto font-light leading-relaxed">
                            Try widening your budget, switching the category, or clearing filters to see the full collection.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => setFilters({
                                    category: 'all',
                                    type: 'all',
                                    search: '',
                                    beds: 'any',
                                    baths: 'any',
                                    minPrice: undefined,
                                    maxPrice: undefined,
                                    sortBy: 'newest'
                                })}
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-95 transition-opacity"
                            >
                                Clear filters
                            </button>
                            <a
                                href="/properties"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                            >
                                Browse all
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Listings;

