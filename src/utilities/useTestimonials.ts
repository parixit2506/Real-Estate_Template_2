import { useMemo } from 'react';
import testimonialsSource from '@/StaticData/testimonials';

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    image: string;
    content: string;
    rating: number;
}

const testimonialsData: Testimonial[] = testimonialsSource as Testimonial[];

export const useTestimonials = (limit?: number) => {
    const data = useMemo(() => {
        return limit ? testimonialsData.slice(0, limit) : testimonialsData;
    }, [limit]);

    return { testimonials: data, total: data.length };
};


