import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Phone, Mail, Shield, Layout, Plus, ExternalLink, TrendingUp, Users, MessageSquare, CheckCircle, Clock, Building, DollarSign, Calendar, ArrowUpRight, User, Diamond, Award, CreditCard } from 'lucide-react';
import Button from '@/components/ui/Button';
import PropertyCard from '@/components/cards/PropertyCard';
import { useFeaturedProperties } from '@/utilities/useProperties';

const STATIC_USER = {
  id: 'luxe-user-id',
  name: 'Sarah Anderson',
  email: 'sarah.anderson@auraproperty.com',
  createdAt: new Date('2024-01-12').toISOString(),
  profile: {
    location: 'Beverly Hills, CA',
    phone: '+1 (555) 832-1920',
    bio: 'Senior Consultant with over 12 years of experience in luxury real estate. Specializing in high-end residential properties and portfolio management for elite clients.',
    avatarUrl: '/profile/profile-image.webp',
  },
};

const INQUIRIES = [
  {
    id: 1,
    date: '2026-03-01',
    clientName: 'Jonathan Wickers',
    clientType: 'Private inquiry',
    type: 'New Lead',
    status: 'Open',
    email: 'j.wickers@example.com',
    phone: '+1 (555) 123-4567',
    property: 'Modern Glass Villa',
    budget: '$8,000,000 - $9,000,000',
    message: 'I am very interested in viewing the Modern Glass Villa in Malibu. I\'m looking for a primary residence and this fits my criteria perfectly. Please let me know when we can schedule a tour.',
    timeframe: 'Next 2 weeks',
    source: 'Website Direct'
  },
  {
    id: 2,
    date: '2026-02-18',
    clientName: 'Global Tech Solutions',
    clientType: 'Corporate buyer',
    type: 'Inquiry',
    status: 'Closed',
    email: 'realestate@globaltech.com',
    phone: '+1 (555) 987-6543',
    property: 'Skyline Penthouse',
    budget: '$12,000,000',
    message: 'We are expanding our executive housing portfolio in New York. The Skyline Penthouse is of particular interest for our CEO\'s residence.',
    timeframe: 'Closed',
    source: 'LinkedIn Business'
  },
  {
    id: 3,
    date: '2026-02-05',
    clientName: 'Elena Rodriguez',
    clientType: 'Referral',
    type: 'Lead',
    status: 'Archived',
    email: 'elena.rod@example.com',
    phone: '+1 (555) 456-7890',
    property: 'Coastal Retreat',
    budget: '$4,000,000',
    message: 'My colleague Sarah recommended your services. I\'m interested in the Coastal Retreat in Santorini for use as a vacation home.',
    timeframe: '3-6 Months',
    source: 'Referral'
  }
];

const CURRENT_PLAN = {
  name: 'Elite Signature',
  tier: 'Diamond Status',
  price: '$1,299',
  status: 'Active',
  expiryDate: 'Feb 20, 2027',
  features: [
    'Professional photography suite',
    'Drone videography & 3D tours',
    'Featured homepage placement',
    'Global MLS syndication',
    'Dedicated Account Manager',
    'AI-Powered Lead Insights'
  ]
};

const Profile = () => {
  const navigate = useNavigate();
  const { properties: portfolioProperties } = useFeaturedProperties(3);
  const [editing, setEditing] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<typeof INQUIRIES[0] | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // User state for the local "editing" experience
  const [userForm, setUserForm] = useState({
    name: STATIC_USER.name,
    email: STATIC_USER.email,
    location: STATIC_USER.profile.location,
    phone: STATIC_USER.profile.phone,
    bio: STATIC_USER.profile.bio,
    avatarUrl: STATIC_USER.profile.avatarUrl
  });

  const joinedDate = useMemo(() => {
    const d = new Date(STATIC_USER.createdAt);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, []);

  const completionStats = useMemo(() => {
    const fields = [
      { key: 'name', weight: 1 },
      { key: 'email', weight: 1 },
      { key: 'location', weight: 1 },
      { key: 'phone', weight: 1 },
      { key: 'bio', weight: 1 },
      { key: 'avatarUrl', weight: 1 }
    ];

    const filled = fields.filter(f => userForm[f.key as keyof typeof userForm]?.trim() !== '').length;
    const percentage = Math.round((filled / fields.length) * 100);

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return { percentage, radius, circumference, offset };
  }, [userForm]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (showInquiryModal || editing) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // If Lenis is being used globally, we might need a way to stop it.
      // Usually data-lenis-prevent on the modal content is enough.
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [showInquiryModal, editing]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-widest">
                Member Dashboard
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Personal <span className="text-brand-primary">Portal</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl font-light leading-relaxed">
              View your account overview, portfolio performance, and keep your professional profile up to date.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href="/properties" variant="outline" className="rounded-xl px-6">
              Browse Listings
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="primary"
              className="rounded-xl px-6 shadow-lg shadow-brand-primary/20"
            >
              Log Out
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-12 xl:col-span-4 space-y-8"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl -z-10 group-hover:bg-brand-primary/10 transition-colors" />

              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="relative group shrink-0">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Progress Circle SVG */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r={completionStats.radius}
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-slate-100 dark:text-slate-800"
                      />
                      <motion.circle
                        initial={{ strokeDashoffset: completionStats.circumference }}
                        animate={{ strokeDashoffset: completionStats.offset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="50%"
                        cy="50%"
                        r={completionStats.radius}
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={completionStats.circumference}
                        strokeLinecap="round"
                        className="text-brand-primary"
                      />
                    </svg>

                    <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white dark:ring-slate-900 shadow-xl z-10 transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={userForm.avatarUrl}
                        alt={userForm.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Percentage Badge */}
                    <div className="absolute -top-1 -right-1 bg-brand-primary text-white font-black text-[9px] w-9 h-9 rounded-full flex flex-col items-center justify-center border-4 border-white dark:border-slate-900 z-20 shadow-lg">
                      <span>{completionStats.percentage}%</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-lg z-20 group-hover:scale-110 transition-transform">
                    <Shield size={14} fill="currentColor" />
                  </div>
                </div>
                <div className="text-center min-w-0">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">
                    {userForm.name}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-light">
                    {userForm.email}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mt-2">
                    Joined {joinedDate}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-[10px] font-bold uppercase tracking-widest border border-brand-primary/10">
                  Elite Member
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  Portfolio Client
                </span>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">Contact Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 min-w-0">
                      <MapPin size={16} className="text-brand-primary shrink-0" />
                      <span>{userForm.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 min-w-0">
                      <Mail size={16} className="text-brand-primary shrink-0" />
                      <a href={`mailto:${userForm.email}`} className="hover:text-brand-primary transition-colors underline-offset-4 hover:underline">{userForm.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 min-w-0">
                      <Phone size={16} className="text-brand-primary shrink-0" />
                      <a href={`tel:${userForm.phone}`} className="hover:text-brand-primary transition-colors">{userForm.phone}</a>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white">Bio</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed italic">
                    "{userForm.bio}"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 px-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl text-xs font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => navigate('/add-property')}
                    className="flex-1 px-6 py-3 bg-brand-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Add Property
                  </button>
                </div>
              </div>
            </div>

            {/* Social/Verification Status */}
            <div className="bg-slate-900 dark:bg-brand-primary p-1 rounded-[2.5rem] shadow-2xl">
              <div className="bg-white dark:bg-slate-900 rounded-[2.3rem] p-8 border border-white/10">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-6">Security & Status</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: 'Verified Email', icon: <Mail size={14} />, color: 'text-green-500' },
                    { label: 'Active Dashboard', icon: <Layout size={14} />, color: 'text-brand-primary' },
                    { label: 'Secure Access', icon: <Shield size={14} />, color: 'text-blue-500' }
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className={item.color}>{item.icon}</div>
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{item.label}</span>
                      </div>
                      <CheckCircle size={14} className="text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Performance and Portfolio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-12 xl:col-span-8 space-y-12"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Active Listings', value: '3', icon: <Layout size={20} /> },
                { label: 'Total Inquiries', value: '27', icon: <MessageSquare size={20} /> },
                { label: 'New Leads', value: '5', icon: <Users size={20} /> },
                { label: 'Success Rate', value: '72%', icon: <TrendingUp size={20} /> }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm group hover:scale-105 transition-transform"
                >
                  <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    {stat.icon}
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Membership Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative overflow-hidden group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 p-8 md:p-10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] -mr-32 -mt-32 rounded-full group-hover:bg-brand-primary/10 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-primary/5 blur-[60px] -ml-24 -mb-24 rounded-full group-hover:bg-brand-primary/10 transition-all duration-700" />

              <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:items-center">
                <div className="lg:flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary">
                      <Diamond size={18} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">Subscription Status</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 italic">
                    {CURRENT_PLAN.name}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 flex items-center gap-2">
                    <Award size={14} className="text-amber-500" />
                    {CURRENT_PLAN.tier} — Your membership is currently <span className="text-green-500 font-bold">{CURRENT_PLAN.status}</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CURRENT_PLAN.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary scale-100 group-hover/item:scale-125 transition-transform" />
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium uppercase tracking-widest">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:w-72 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                  <div className="mb-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Annual Billing</p>
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-3xl font-bold text-slate-900 dark:text-white">{CURRENT_PLAN.price}</h4>
                      <span className="text-xs text-slate-400">/year</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Clock size={12} /> Expiry
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{CURRENT_PLAN.expiryDate}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <CreditCard size={12} /> Auto-renew
                      </span>
                      <span className="text-xs font-bold text-green-500">Enabled</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-brand-primary text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    Manage Billing
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Property Portfolio */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  Property Portfolio
                  <span className="text-xs bg-brand-primary text-white px-2 py-0.5 rounded-full">3</span>
                </h2>
                <Button href="/properties" variant="outline" size="sm" className="rounded-xl">
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioProperties.map((prop, i) => (
                  <PropertyCard key={prop.id} property={prop} index={i} />
                ))}
                {/* Add New Property Card Call to Action */}
                <motion.div
                  whileHover={{ y: -5 }}
                  onClick={() => navigate('/add-property')}
                  className="bg-slate-100/50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 min-h-[300px] group transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                    <Plus size={32} />
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-6 uppercase tracking-widest">List New Property</p>
                  <p className="text-xs text-slate-500 text-center mt-2 max-w-[200px]">Expand your luxury collection today.</p>
                </motion.div>
              </div>
            </div>

            {/* Recent Activity / Inquiries */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Inquiries & Leads</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Date</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Client Info</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Type</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {INQUIRIES.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-8 py-5 text-sm font-medium text-slate-600 dark:text-slate-400">{item.date}</td>
                        <td className="px-8 py-5">
                          <div className="text-sm font-bold text-slate-900 dark:text-white">{item.clientName}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest">{item.clientType}</div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.type}</span>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${item.status === 'Open' ? 'bg-green-100 text-green-600' :
                            item.status === 'Closed' ? 'bg-slate-100 text-slate-600' :
                              'bg-slate-100 text-slate-400'
                            }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <button
                            onClick={() => {
                              setSelectedInquiry(item);
                              setShowInquiryModal(true);
                            }}
                            className="p-2 hover:text-brand-primary dark:hover:text-brand-primary-dark transition-colors"
                          >
                            <ExternalLink size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inquiry Detail Modal */}
            <AnimatePresence>
              {showInquiryModal && selectedInquiry && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 sticky-overlay">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                    onClick={() => setShowInquiryModal(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] md:max-h-[85vh]"
                  >
                    <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Inquiry Details</h2>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary mt-1">Reference ID: LUX-{selectedInquiry.id}00X</p>
                      </div>
                      <button onClick={() => setShowInquiryModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                        <X size={24} />
                      </button>
                    </div>

                    <div data-lenis-prevent className="p-6 sm:p-8 space-y-6 sm:space-y-8 overflow-y-auto custom-scrollbar flex-1">
                      {/* Client Section */}
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                          <User size={28} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{selectedInquiry.clientName}</h3>
                          <p className="text-xs text-slate-500 uppercase tracking-widest">{selectedInquiry.clientType}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <a href={`mailto:${selectedInquiry.email}`} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-brand-primary transition-all group">
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                            <Mail size={14} />
                          </div>
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">{selectedInquiry.email}</span>
                        </a>
                        <a href={`tel:${selectedInquiry.phone}`} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-brand-primary transition-all group">
                          <div className="p-2 rounded-xl bg-white dark:bg-slate-900 text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors">
                            <Phone size={14} />
                          </div>
                          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{selectedInquiry.phone}</span>
                        </a>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</p>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-brand-primary" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{selectedInquiry.status}</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Property</p>
                          <div className="flex items-center gap-2">
                            <Building size={14} className="text-brand-primary" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{selectedInquiry.property}</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Budget</p>
                          <div className="flex items-center gap-2">
                            <DollarSign size={14} className="text-brand-primary" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{selectedInquiry.budget}</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Timeframe</p>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-brand-primary" />
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{selectedInquiry.timeframe}</span>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-3 pb-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          <MessageSquare size={12} />
                          Inquiry Message
                        </p>
                        <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light italic">
                          "{selectedInquiry.message}"
                        </div>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 shrink-0">
                      <button className="flex-1 px-8 py-4 bg-brand-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 order-1 sm:order-1">
                        Respond Now
                        <ArrowUpRight size={14} />
                      </button>
                      <button
                        onClick={() => setShowInquiryModal(false)}
                        className="px-8 py-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl text-xs font-bold uppercase tracking-widest border border-slate-100 dark:border-slate-800 hover:bg-slate-100 transition-all order-2 sm:order-2"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {editing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
              onClick={() => setEditing(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Refine Your Profile</h2>
                <button onClick={() => setEditing(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} data-lenis-prevent className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                    <input
                      value={userForm.name}
                      onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Headquarters</label>
                    <input
                      value={userForm.location}
                      onChange={(e) => setUserForm({ ...userForm, location: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Contact Phone</label>
                    <input
                      value={userForm.phone}
                      onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Avatar Image URL</label>
                    <input
                      value={userForm.avatarUrl}
                      onChange={(e) => setUserForm({ ...userForm, avatarUrl: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Professional Bio</label>
                  <textarea
                    value={userForm.bio}
                    onChange={(e) => setUserForm({ ...userForm, bio: e.target.value })}
                    rows={4}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl px-5 py-4 outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm resize-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex-1 px-8 py-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl text-xs font-bold uppercase tracking-widest border border-slate-100 dark:border-slate-800 hover:bg-slate-100 transition-all order-2 sm:order-1"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 bg-brand-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all order-1 sm:order-2"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;

