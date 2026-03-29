import { useMemo } from 'react';
import faqsSource from '@/StaticData/faqs';

export interface FAQ {
    id: string;
    category: string;
    question: string;
    answer: string;
}

const faqsData = faqsSource as FAQ[];

export const useFAQs = (categoryFilter: string = 'all', searchQuery: string = '') => {
    const faqs = useMemo(() => {
        return faqsData.filter(faq => {
            const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [categoryFilter, searchQuery]);

    const categories = useMemo(() => {
        const cats = faqsData.map(faq => faq.category);
        return ['all', ...new Set(cats)];
    }, []);

    return { faqs, categories };
};


