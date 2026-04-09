import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Property } from '@/StaticData/property';

interface PropertyCardProps {
    property: Property;
    index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300"
        >
            <Link to={`/property/${property.id}`} className="block">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3]">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
                    )}
                    <motion.img
                        srcSet={`${property.image.replace('.webp', '-thumb.webp')} 512w, ${property.image} 1024w`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        alt={property.title}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                        <span
                            className={`px-2.5 py-1 text-[10px] font-bold rounded flex items-center justify-center uppercase tracking-wider ${property.status.toLowerCase().includes('sale')
                                ? 'bg-brand-primary text-white'
                                : 'bg-slate-800 text-white'
                                }`}
                        >
                            {property.status}
                        </span>
                        {property.featured && (
                            <span className="px-2.5 py-1 text-[10px] font-bold rounded flex items-center justify-center uppercase tracking-wider bg-white/90 text-slate-900 backdrop-blur-sm">
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Price badge */}
                    <div className="absolute bottom-3 right-3">
                        <span className="px-3 py-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-brand-primary dark:text-brand-primary-dark text-sm font-bold rounded-lg shadow-sm">
                            {property.price}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="text-slate-900 dark:text-white font-bold text-base leading-snug mb-1.5 group-hover:text-brand-primary dark:group-hover:text-brand-primary-dark transition-colors line-clamp-2">
                        {property.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-sm mb-4 font-medium">
                        <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="truncate">{property.location}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs font-medium uppercase tracking-tight">
                            <span className="text-slate-900 dark:text-slate-100 font-bold">{property.beds}</span> Bed
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs font-medium uppercase tracking-tight">
                            <span className="text-slate-900 dark:text-slate-100 font-bold">{property.baths}</span> Bath
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs font-medium uppercase tracking-tight ml-auto">
                            <span className="text-slate-900 dark:text-slate-100 font-bold">{property.sqft}</span> SQFT
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default PropertyCard;

