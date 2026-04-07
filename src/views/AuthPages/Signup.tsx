import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { Mail, Lock, User, Building, Eye, EyeOff, Chrome, Github, CheckCircle2 } from 'lucide-react';
import AuthSidePanel from '@/components/common/AuthSidePanel';

const Signup = () => {
    const [userType, setUserType] = useState<'guest' | 'vendor'>('guest');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/profile');
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!name || !email || !password || !confirmPassword) {
                throw new Error('Please fill in all fields');
            }
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            await register(name, email, password);
            navigate('/profile');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Unable to create account');
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 }
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
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-20 bg-white dark:bg-bg-main-dark relative overflow-y-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-lg"
                >
                    <motion.div variants={itemVariants} className="mb-8">
                        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Create Account</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Join 50,000+ others finding their dream spaces.</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Role Selector Upgrade */}
                        <motion.div variants={itemVariants} className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 text-center block">Account Focus</label>
                            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setUserType('guest')}
                                    className={`relative py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${userType === 'guest' ? 'bg-white dark:bg-slate-800 text-brand-primary dark:text-brand-primary-dark shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                                >
                                    <User className="w-4 h-4" />
                                    <span>Guest</span>
                                    {userType === 'guest' && <motion.div layoutId="dot" className="w-1.5 h-1.5 bg-brand-primary dark:bg-brand-primary-dark rounded-full" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserType('vendor')}
                                    className={`relative py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${userType === 'vendor' ? 'bg-white dark:bg-slate-800 text-brand-primary dark:text-brand-primary-dark shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'}`}
                                >
                                    <Building className="w-4 h-4" />
                                    <span>Vendors</span>
                                    {userType === 'vendor' && <motion.div layoutId="dot" className="w-1.5 h-1.5 bg-brand-primary dark:bg-brand-primary-dark rounded-full" />}
                                </button>
                            </div>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm py-3.5 px-4 rounded-xl flex items-center gap-3 font-semibold"
                                >
                                    <div className="w-1.5 h-6 bg-red-500 rounded-full" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div variants={itemVariants} className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                                    {userType === 'guest' ? 'Display Name' : 'Vendor Name'}
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                        {userType === 'guest' ? <User className="w-4.5 h-4.5" /> : <Building className="w-4.5 h-4.5" />}
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={userType === 'guest' ? 'John Doe' : 'Elevate Realty'}
                                        className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all dark:text-white"
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                        <Mail className="w-4.5 h-4.5" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="hello@example.com"
                                        className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all dark:text-white"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div variants={itemVariants} className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Secure Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                        <Lock className="w-4.5 h-4.5" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-11 py-3.5 outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all dark:text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-brand-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 ml-1">Confirm Identity</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-primary transition-colors">
                                        <CheckCircle2 className="w-4.5 h-4.5" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:ring-4 focus:ring-brand-primary/5 focus:border-brand-primary transition-all dark:text-white"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <motion.div variants={itemVariants} className="py-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary" required />
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                                    I agree to the <a href="#" className="text-brand-primary font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-brand-primary font-bold hover:underline">Privacy Policy</a>.
                                </span>
                            </label>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-2">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full py-4 rounded-xl shadow-xl shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-all font-bold text-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3 justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Creating Account...
                                    </div>
                                ) : userType === 'guest' ? 'Join Community' : 'Join as Vendor'}
                            </Button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
                                <span className="bg-white dark:bg-bg-main-dark px-4 text-slate-400">Quick Join</span>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-sm font-bold text-slate-700 dark:text-slate-300">
                                <Chrome className="w-4 h-4 text-red-500" />
                                Google
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-sm font-bold text-slate-700 dark:text-slate-300">
                                <Github className="w-4 h-4" />
                                GitHub
                            </button>
                        </div>
                    </form>

                    <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Already part of our network?{' '}
                            <Link to="/login" className="font-bold text-brand-primary hover:text-brand-primary/80 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;


