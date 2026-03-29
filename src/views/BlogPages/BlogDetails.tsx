import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlogPost, useRecentPosts } from '@/utilities/useBlog';
import Button from '@/components/ui/Button';

const BlogDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { post } = useBlogPost(id || '');
    const { posts: recentPosts } = useRecentPosts(2);

    if (!post) {
        return (
            <div className="pt-32 pb-24 text-center">
                <h1 className="text-2xl font-bold">Post not found</h1>
                <Button href="/blog" className="mt-6">Back to Blog</Button>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-950 min-h-screen">
            {/* Post Hero */}
            <div className="relative h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[400px] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/40" />
                <div className="absolute inset-0 flex items-center justify-center pt-20">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="px-4 py-1.5 bg-brand-primary text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-4 sm:mb-6 inline-block">
                                {post.category}
                            </span>
                            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight px-2 sm:px-0">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-3 text-white/90">
                                <div className="flex items-center gap-3">
                                    <img src={post.author.image} alt={post.author.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/20" />
                                    <span className="text-xs sm:text-sm font-medium">{post.author.name}</span>
                                </div>
                                <span className="hidden sm:block w-px h-4 bg-white/20" />
                                <span className="text-[11px] sm:text-sm font-medium">{post.date}</span>
                                <span className="hidden sm:block w-px h-4 bg-white/20" />
                                <span className="text-[11px] sm:text-sm font-medium">{post.readTime}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20">
                    {/* Main Article */}
                    <article className="lg:col-span-8">
                        <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:font-light prose-p:text-slate-600 dark:prose-p:text-slate-400">
                            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-10 first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-brand-primary dark:first-letter:text-brand-primary-dark">
                                {post.content}
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">Strategic Developments</h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                As we look toward the next decade, the integration of intelligent systems within high-end residential architecture isn't just a luxury—it's a fundamental shift in how we perceive the role of our living spaces. Owners are increasingly demanding environments that are not only beautiful but also intuitive, adaptive, and highly personalized.
                            </p>
                            <blockquote className="border-l-4 border-brand-primary dark:border-brand-primary-dark pl-6 sm:pl-8 my-10 sm:my-12 italic text-xl sm:text-2xl font-light text-slate-900 dark:text-white leading-relaxed">
                                "The most successful properties of the future will be those that prioritize the human experience above all else, blending digital intelligence with physical comfort."
                            </blockquote>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                Furthermore, the emphasis on sustainability has transcended traditional green building certifications. We are seeing a move toward 'regenerative' properties—units that contribute back to their ecosystems through advanced energy harvesting and closed-loop waste management systems.
                            </p>
                        </div>

                        {/* Social Share & Tags */}
                        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 pr-2">Share:</span>
                                {['Twitter', 'LinkedIn', 'Facebook'].map(social => (
                                    <button key={social} className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-colors">
                                        {social}
                                    </button>
                                ))}
                            </div>
                            <Button href="/blog" variant="outline" size="sm" className="w-full sm:w-auto text-[10px] uppercase tracking-widest">
                                Back to all Articles
                            </Button>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 flex flex-col gap-10 sm:gap-12 lg:sticky lg:top-28 h-fit">
                        {/* Author Card */}
                        <div className="bg-slate-50 dark:bg-slate-900/40 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-primary dark:text-brand-primary-dark mb-6">Article Author</h3>
                            <div className="flex items-center gap-4 mb-5">
                                <img src={post.author.image} alt={post.author.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-md" />
                                <div>
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{post.author.name}</h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Senior Market Analyst</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                Specialist in high-yield residential investment strategies and luxury market dynamics with over 12 years of experience.
                            </p>
                        </div>

                        {/* Recent Posts */}
                        <div className="px-2 lg:px-0">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-6">More Articles</h3>
                            <div className="space-y-6 sm:space-y-8">
                                {recentPosts.filter(p => p.id !== post.id).map(rPost => (
                                    <Link key={rPost.id} to={`/blog/${rPost.id}`} className="group flex gap-4 items-center">
                                        <div className="w-20 h-16 sm:h-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                                            <img src={rPost.image} alt={rPost.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary-dark transition-colors leading-snug line-clamp-2 mb-1">
                                                {rPost.title}
                                            </h4>
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                                {rPost.date}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-brand-primary p-8 rounded-3xl relative overflow-hidden shadow-xl shadow-brand-primary/10">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Join Our Newsletter</h3>
                                <p className="text-white/80 text-sm font-light leading-relaxed mb-6">
                                    Get the latest luxury listings and market insights delivered to your inbox.
                                </p>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 outline-none text-sm focus:ring-2 focus:ring-white/20 transition-all"
                                    />
                                    <button className="w-full py-3.5 bg-white text-brand-primary font-bold text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 active:scale-[0.98] transition-all shadow-lg active:shadow-inner">
                                        Subscribe Now
                                    </button>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2" />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;

