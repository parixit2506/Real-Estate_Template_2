import { useMemo } from 'react';
import blog from '@/StaticData/blog';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: {
        name: string;
        image: string;
    };
    date: string;
    readTime: string;
    image: string;
}

const posts: BlogPost[] = blog as BlogPost[];

export const useBlogPosts = (categoryFilter = 'all') => {
    const filtered = useMemo(() => {
        return categoryFilter === 'all'
            ? posts
            : posts.filter(p => p.category === categoryFilter);
    }, [categoryFilter]);

    return { posts: filtered };
};

export const useBlogPost = (id: string) => {
    const post = useMemo(() => posts.find(p => p.id === id) ?? null, [id]);
    return { post };
};

export const useRecentPosts = (limit = 3) => {
    const recent = useMemo(() => posts.slice(0, limit), [limit]);
    return { posts: recent };
};


