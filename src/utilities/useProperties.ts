import { useMemo } from 'react';
import propertiesSource from '@/StaticData/property';
import type { Property, PropertyType } from '@/StaticData/property';

const properties: Property[] = propertiesSource as Property[];

export interface PropertyFilters {
    category?: PropertyType;
    type?: string;
    search?: string;
    beds?: number | 'any';
    baths?: number | 'any';
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'newest' | 'price-low' | 'price-high' | 'rating';
}

export const useProperties = (filters: PropertyFilters = {}) => {
    const {
        category = 'all',
        type = 'all',
        search = '',
        beds = 'any',
        baths = 'any',
        minPrice,
        maxPrice,
        sortBy = 'newest'
    } = filters;

    const filtered = useMemo(() => {
        let result = [...properties];

        // Filter by Category (Sale/Rent)
        if (category !== 'all') {
            result = result.filter(p => p.status.toLowerCase().includes(category.toLowerCase()));
        }

        // Filter by Property Style Type (Villa, Penthouse, etc)
        if (type !== 'all') {
            result = result.filter(p => p.type.toLowerCase() === type.toLowerCase());
        }

        // Filter by Search Query
        if (search) {
            const query = search.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.location.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.region.toLowerCase().includes(query)
            );
        }

        // Filter by Beds
        if (beds !== 'any') {
            result = result.filter(p => p.beds >= Number(beds));
        }

        // Filter by Baths
        if (baths !== 'any') {
            result = result.filter(p => p.baths >= Number(baths));
        }

        // Filter by Price Range
        if (minPrice !== undefined || maxPrice !== undefined) {
            result = result.filter(p => {
                const numericPrice = Number(p.price.replace(/[^0-9]/g, ''));
                if (minPrice !== undefined && numericPrice < minPrice) return false;
                if (maxPrice !== undefined && numericPrice > maxPrice) return false;
                return true;
            });
        }

        // Sorting
        result.sort((a, b) => {
            if (sortBy === 'price-low') {
                return Number(a.price.replace(/[^0-9]/g, '')) - Number(b.price.replace(/[^0-9]/g, ''));
            }
            if (sortBy === 'price-high') {
                return Number(b.price.replace(/[^0-9]/g, '')) - Number(a.price.replace(/[^0-9]/g, ''));
            }
            if (sortBy === 'rating') {
                return b.rating - a.rating;
            }
            return Number(b.id) - Number(a.id); // Newest by ID assumption
        });

        return result;
    }, [category, type, search, beds, baths, minPrice, maxPrice, sortBy]);

    return { properties: filtered, total: filtered.length };
};

export const useProperty = (id: string | number) => {
    const property = useMemo(() => properties.find(p => String(p.id) === String(id)) ?? null, [id]);
    return { property };
};

export const useFeaturedProperties = (limit?: number) => {
    const featured = useMemo(() => {
        const filtered = properties.filter(p => p.featured);
        return limit ? filtered.slice(0, limit) : filtered;
    }, [limit]);
    return { properties: featured };
};

export const usePropertyStats = () => {
    return {
        totalProperties: properties.length,
        forSale: properties.filter(p => p.status.toLowerCase().includes('sale')).length,
        forRent: properties.filter(p => p.status.toLowerCase().includes('rent')).length,
    };
};

export const useVillas = (limit?: number) => {
    const villas = useMemo(() => {
        const filtered = properties.filter(p => p.type.toLowerCase() === 'villa');
        return limit ? filtered.slice(0, limit) : filtered;
    }, [limit]);
    return { properties: villas };
};

export const useDestinations = (limit = 4) => {
    const destinations = useMemo(() => {
        const cityMap: Record<string, { name: string; count: number; image: string }> = {};

        properties.forEach(p => {
            const city = p.location.split(',')[0].trim();
            if (!cityMap[city]) {
                cityMap[city] = {
                    name: city,
                    count: 0,
                    image: p.image // Use the first property image as representative
                };
            }
            cityMap[city].count++;
        });

        return Object.values(cityMap)
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }, [limit]);

    return { destinations };
};


