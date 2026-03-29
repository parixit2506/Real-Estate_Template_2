import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { optimizeUnsplashUrl } from '@/utilities/imageOptimizer';

interface PropertyGalleryProps {
    image: string;
    title: string;
    gallery?: string[];
}

const PropertyGallery = ({ image, title, gallery = [] }: PropertyGalleryProps) => {
    const allImages = useMemo(() => Array.from(new Set([image, ...gallery])), [image, gallery]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const [mainLoaded, setMainLoaded] = useState(false);

    // Preload next image logic
    useEffect(() => {
        const nextIndex = (activeIndex + 1) % allImages.length;
        const img = new Image();
        img.src = optimizeUnsplashUrl(allImages[nextIndex], 1200);
    }, [activeIndex, allImages]);

    useEffect(() => {
        if (lightboxOpen) {
            closeButtonRef.current?.focus();
        }
    }, [lightboxOpen]);

    useEffect(() => {
        if (!lightboxOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                setLightboxOpen(false);
                return;
            }

            if (allImages.length > 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                e.preventDefault();
                setActiveIndex((prev) => {
                    const next = e.key === 'ArrowLeft'
                        ? (prev - 1 + allImages.length) % allImages.length
                        : (prev + 1) % allImages.length;
                    return next;
                });
                return;
            }

            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                setZoom(z => Math.min(4, Math.round((z + 0.25) * 100) / 100));
                return;
            }

            if (e.key === '-' || e.key === '_') {
                e.preventDefault();
                setZoom(z => Math.max(1, Math.round((z - 0.25) * 100) / 100));
                return;
            }

            if (e.key === '0') {
                e.preventDefault();
                setZoom(1);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [allImages.length, lightboxOpen]);

    return (
        <div className="space-y-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl cursor-pointer group bg-slate-100 dark:bg-slate-900"
                onClick={() => { setLightboxOpen(true); setZoom(1); }}
            >
                {!mainLoaded && (
                    <div className="absolute inset-0 z-10 bg-slate-200/70 dark:bg-slate-800/60 animate-pulse flex items-center justify-center">
                        <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                    </div>
                )}
                <img
                    src={optimizeUnsplashUrl(allImages[activeIndex], 1200)}
                    alt={title}
                    loading="eager"
                    onLoad={() => setMainLoaded(true)}
                    className={`w-full h-80 md:h-[550px] object-cover transition-all duration-700 group-hover:scale-105 ${mainLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                    </motion.div>
                </div>
                <div className="absolute bottom-6 right-6">
                    <span className="px-4 py-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-xl border border-white/10">
                        {activeIndex + 1} / {allImages.length} • Expand
                    </span>
                </div>
            </motion.div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {allImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all bg-slate-100 dark:bg-slate-900 ${activeIndex === idx ? 'border-brand-primary scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                            aria-label={`View image ${idx + 1} of ${allImages.length}`}
                        >
                            <img
                                src={optimizeUnsplashUrl(img, 200, 60)}
                                alt={`${title} ${idx}`}
                                loading="lazy"
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4 md:p-12"
                        onClick={() => setLightboxOpen(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${title} image viewer`}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl w-full h-full flex items-center justify-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                                    <span className="px-3 py-1.5 bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        {activeIndex + 1} / {allImages.length}
                                    </span>
                                    <span className="hidden sm:inline-flex px-3 py-1.5 bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        Zoom {Math.round(zoom * 100)}%
                                    </span>
                                </div>

                                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setZoom(z => Math.max(1, Math.round((z - 0.25) * 100) / 100))}
                                        className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                                        aria-label="Zoom out"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setZoom(z => Math.min(4, Math.round((z + 0.25) * 100) / 100))}
                                        className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                                        aria-label="Zoom in"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setZoom(1)}
                                        className="hidden sm:flex w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center text-white transition-colors"
                                        aria-label="Reset zoom"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v6h6M20 20v-6h-6" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
                                    <img
                                        src={optimizeUnsplashUrl(allImages[activeIndex], 1600)}
                                        alt={title}
                                        className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl select-none"
                                        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                                        onDoubleClick={() => setZoom(z => (z === 1 ? 2 : 1))}
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            {/* Navigation inside lightbox */}
                            {allImages.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setActiveIndex((activeIndex - 1 + allImages.length) % allImages.length)}
                                        className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                                        aria-label="Previous image"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setActiveIndex((activeIndex + 1) % allImages.length)}
                                        className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                                        aria-label="Next image"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </motion.div>

                        <button
                            onClick={() => setLightboxOpen(false)}
                            ref={closeButtonRef}
                            className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                            aria-label="Close image viewer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PropertyGallery;

