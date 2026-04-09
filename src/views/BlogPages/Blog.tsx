import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlogPosts } from '@/utilities/useBlog';
import Button from '@/components/ui/Button';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const { posts } = useBlogPosts(activeCategory);

    const navigate = useNavigate();

    const categories = ['all', 'Market Trends', 'Interior Design', 'Lifestyle'];

    return (
        <div className="pt-28 pb-16 md:pt-36 md:pb-24 bg-white dark:bg-slate-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-brand-primary dark:text-brand-primary-dark text-xs font-bold uppercase tracking-[0.2em]">
                        Insights & Articles
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-3 mb-6">
                        The AuraProperty Blog
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light text-lg">
                        Expert perspectives on luxury real estate, market analysis, and premium lifestyle design.
                    </p>
                </motion.div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${activeCategory === cat
                                ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105'
                                : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 hover:border-brand-primary hover:text-brand-primary dark:hover:border-brand-primary-dark dark:hover:text-brand-primary-dark'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => navigate(`/blog/${post.id}`)}
                        >
                            <div className="relative aspect-4/3 rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 px-2">
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    <span>{post.date}</span>
                                    <span className="w-1.5 h-1.5 bg-brand-primary dark:bg-brand-primary-dark rounded-full" />
                                    <span>{post.readTime}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary-dark transition-colors leading-tight line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed line-clamp-3 text-sm">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-900">
                                    <img
                                        src={post.author.image}
                                        alt={post.author.name}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-50 dark:border-slate-800"
                                    />
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">{post.author.name}</p>
                                        <p className="text-[10px] text-brand-primary dark:text-brand-primary-dark font-medium uppercase tracking-tighter">Verified Author</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500">No articles found in this category.</p>
                        <Button onClick={() => setActiveCategory('all')} variant="outline" className="mt-6">
                            View All Posts
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;

