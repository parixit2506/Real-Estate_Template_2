import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { Mail, Lock, Eye, EyeOff, Chrome, Github } from 'lucide-react';
import AuthSidePanel from '@/components/common/AuthSidePanel';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }
            await login(email, password);
            navigate('/profile');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-bg-main-dark overflow-hidden selection:bg-brand-primary/10">
            {/* Split Screen - Image Side */}
            <AuthSidePanel />

            {/* Split Screen - Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-slate-50 dark:bg-bg-main-dark relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md"
                >
                    <motion.div variants={itemVariants} className="mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">Enter your details to access your premier portal</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm py-4 px-4 rounded-xl flex items-center gap-3 font-medium"
                                >
                                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-[11px] font-bold md:font-extrabold uppercase tracking-[0.2em] text-slate-500 ml-1 block">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all dark:text-white dark:focus:border-brand-primary-dark"
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-2">
                            <label className="text-[11px] font-bold md:font-extrabold uppercase tracking-[0.2em] text-slate-500 ml-1 block">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all dark:text-white dark:focus:border-brand-primary-dark"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-brand-primary transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center justify-between py-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer sr-only" id="remember" />
                                    <div className="w-5 h-5 border-2 border-slate-300 dark:border-slate-700 rounded-md peer-checked:border-brand-primary peer-checked:bg-brand-primary transition-all" />
                                    <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 left-[3px] top-[3px] pointer-events-none transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm font-bold text-brand-primary dark:text-brand-primary-dark hover:text-brand-primary/80 transition-colors"
                                onClick={() => setError('Password reset isn’t available in this demo.')}
                            >
                                Forgot Password?
                            </button>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full py-4 rounded-2xl shadow-xl shadow-brand-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-transform text-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-3 justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Authenticating...
                                    </span>
                                ) : 'Sign In'}
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-50 dark:bg-bg-main-dark px-4 text-slate-500 font-bold tracking-widest">Or continue with</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all font-bold text-slate-700 dark:text-slate-300">
                                <Chrome className="w-5 h-5 text-red-500" />
                                <span className="text-sm">Google</span>
                            </button>
                            <button type="button" className="flex items-center justify-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-3.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all font-bold text-slate-700 dark:text-slate-300">
                                <Github className="w-5 h-5" />
                                <span className="text-sm">GitHub</span>
                            </button>
                        </motion.div>
                    </form>

                    <motion.div variants={itemVariants} className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
                        <p className="text-slate-600 dark:text-slate-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-bold text-brand-primary dark:text-brand-primary-dark hover:underline decoration-2 underline-offset-8">
                                Create Account
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;

