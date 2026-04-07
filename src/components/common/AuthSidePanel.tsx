import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import signupBg from '../../assets/signup-bg.png';

const AuthSidePanel = () => {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 border-r border-slate-200 dark:border-slate-800">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: `url(${signupBg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/90 via-brand-primary/40 to-transparent" />
            </div>

            {/* Floating Back Button */}
            <Link
                to="/"
                className="absolute top-8 left-8 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full glass-badge hover:bg-white/20 transition-all group overflow-hidden"
            >
                <div>
                    <ArrowLeft className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white tracking-wide">Back to Home</span>
            </Link>

            <div className="relative z-10 flex flex-col justify-center p-16 h-full text-white">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
                            Build Your <br />
                            <span className="text-white/60">Digital Legacy</span>
                        </h2>
                        <p className="text-xl text-white/70 font-light max-w-sm leading-relaxed italic">
                            "The best time to buy real estate was yesterday. The second best time is now."
                        </p>
                    </div>

                    <div className="flex items-center gap-6 pt-8 border-t border-white/10">
                        {[
                            { label: 'Active Listings', value: '12K+' },
                            { label: 'Verified Agents', value: '450+' },
                            { label: 'Global Cities', value: '28' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-xs font-medium text-white/50 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthSidePanel;
