import { motion } from 'framer-motion';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus, Camera, MapPin, DollarSign, Info,
    Home as HomeIcon, Ruler, BedDouble, Bath,
    ParkingCircle, Calendar, Layers, Activity,
    Save, ArrowLeft, Upload, CheckCircle2
} from 'lucide-react';
import Button from '@/components/ui/Button';

type Status = 'For Sale' | 'For Rent';
type Tag = 'Sale' | 'Rent';

const AddProperty = () => {
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        agentId: '',
        title: '',
        location: '',
        region: '',
        status: '' as Status | '',
        lat: '',
        lng: '',
        price: '',
        image: '',
        gallery: '',
        beds: '',
        baths: '',
        rating: '',
        description: '',
        features: '',
        amenities: '',
        yearBuilt: '',
        parking: '',
        lotSize: '',
        sqft: '',
        tag: '' as Tag | '',
        type: '',
    });

    const update = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        const payload = {
            id: Date.now(),
            agentId: form.agentId ? Number(form.agentId) : undefined,
            title: form.title.trim(),
            location: form.location.trim(),
            region: form.region.trim() || undefined,
            status: (form.status || undefined) as Status | undefined,
            coordinates:
                form.lat && form.lng
                    ? {
                        lat: Number(form.lat),
                        lng: Number(form.lng),
                    }
                    : undefined,
            price: form.price.trim(),
            image: form.image.trim(),
            gallery: form.gallery
                .split(',')
                .map((g) => g.trim())
                .filter(Boolean),
            beds: Number(form.beds || 0),
            baths: Number(form.baths || 0),
            rating: form.rating ? Number(form.rating) : undefined,
            description: form.description.trim() || undefined,
            features: form.features
                .split(',')
                .map((f) => f.trim())
                .filter(Boolean),
            amenities: form.amenities
                .split(',')
                .map((a) => a.trim())
                .filter(Boolean),
            yearBuilt: form.yearBuilt.trim() || undefined,
            parking: form.parking.trim() || undefined,
            lotSize: form.lotSize.trim() || undefined,
            sqft: form.sqft.trim(),
            tag: (form.tag || 'Sale') as Tag,
            type: form.type.trim(),
        };

        console.log('New property payload:', payload);

        // Simulating submission delay
        setTimeout(() => {
            navigate('/properties');
        }, 2000);
    };

    const inputClasses = 'w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 placeholder:text-slate-400';
    const labelClasses = 'block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1';
    const sectionClasses = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group';

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12"
                >
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 mb-4">
                            <Plus size={14} className="text-brand-primary" />
                            <span className="text-brand-primary dark:text-brand-primary-dark text-[10px] font-bold uppercase tracking-widest">
                                New Listing
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Add <span className="text-brand-primary">Property</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl font-light leading-relaxed">
                            Bring your exclusive properties to the forefront of AuraProperty's elite collection.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="outline"
                            className="rounded-xl px-6 group"
                        >
                            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back
                        </Button>
                    </div>
                </motion.div>

                <form onSubmit={onSubmit} className="space-y-8">

                    {/* Basic Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={sectionClasses}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl -z-10 group-hover:bg-brand-primary/10 transition-colors" />

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                <Info size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Basic Information</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-light">Core details of your property listing.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={labelClasses}>Property Title</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                        <HomeIcon size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => update('title', e.target.value)}
                                        required
                                        placeholder="Elegant Beverly Hills Manor"
                                        className={`${inputClasses} pl-12`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Property Type</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                        <Layers size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.type}
                                        onChange={(e) => update('type', e.target.value)}
                                        required
                                        placeholder="Villa, Penthouse, Mansion..."
                                        className={`${inputClasses} pl-12`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Listing Status</label>
                                <select
                                    value={form.status}
                                    onChange={(e) => update('status', e.target.value as Status | '')}
                                    className={inputClasses}
                                    required
                                >
                                    <option value="" disabled className="dark:bg-slate-900">Select Status</option>
                                    <option value="For Sale" className="dark:bg-slate-900">For Sale</option>
                                    <option value="For Rent" className="dark:bg-slate-900">For Rent</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Listing Tag</label>
                                <select
                                    value={form.tag}
                                    onChange={(e) => update('tag', e.target.value as Tag | '')}
                                    className={inputClasses}
                                    required
                                >
                                    <option value="" disabled className="dark:bg-slate-900">Select Tag</option>
                                    <option value="Sale" className="dark:bg-slate-900">Sale</option>
                                    <option value="Rent" className="dark:bg-slate-900">Rent</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Location and Mapping */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={sectionClasses}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Location Details</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-light">Where is this masterpiece located?</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <label className={labelClasses}>Full Address</label>
                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={(e) => update('location', e.target.value)}
                                    required
                                    placeholder="123 Luxury Ave, Beverly Hills, CA 90210"
                                    className={inputClasses}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Region</label>
                                <input
                                    type="text"
                                    value={form.region}
                                    onChange={(e) => update('region', e.target.value)}
                                    placeholder="California, USA"
                                    className={inputClasses}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className={labelClasses}>Latitude</label>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        value={form.lat}
                                        onChange={(e) => update('lat', e.target.value)}
                                        placeholder="34.0259"
                                        className={inputClasses}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClasses}>Longitude</label>
                                    <input
                                        type="number"
                                        step="0.0001"
                                        value={form.lng}
                                        onChange={(e) => update('lng', e.target.value)}
                                        placeholder="-118.7798"
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pricing and Specification */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={sectionClasses}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                <DollarSign size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Price & Specifications</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-light">Set the value and structural details.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className={labelClasses}>Price Presentation</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 hover:text-brand-primary transition-colors">
                                        <DollarSign size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.price}
                                        onChange={(e) => update('price', e.target.value)}
                                        required
                                        placeholder="$12,500,000"
                                        className={`${inputClasses} pl-12`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Square Footage</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                        <Ruler size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.sqft}
                                        onChange={(e) => update('sqft', e.target.value)}
                                        required
                                        placeholder="8,500"
                                        className={`${inputClasses} pl-12`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Year Built</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                        <Calendar size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.yearBuilt}
                                        onChange={(e) => update('yearBuilt', e.target.value)}
                                        placeholder="2022"
                                        className={`${inputClasses} pl-12`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Bedrooms</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                        <BedDouble size={16} />
                                    </div>
                                    <input
                                        type="number"
                                        min={0}
                                        value={form.beds}
                                        onChange={(e) => update('beds', e.target.value)}
                                        required
                                        placeholder="5"
                                        className={`${inputClasses} pl-12`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Bathrooms</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                        <Bath size={16} />
                                    </div>
                                    <input
                                        type="number"
                                        min={0}
                                        value={form.baths}
                                        onChange={(e) => update('baths', e.target.value)}
                                        required
                                        placeholder="6"
                                        className={`${inputClasses} pl-12`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Parking</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                        <ParkingCircle size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        value={form.parking}
                                        onChange={(e) => update('parking', e.target.value)}
                                        placeholder="4-car garage"
                                        className={`${inputClasses} pl-12`}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={sectionClasses}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                <Camera size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Visual Content</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-light">High-quality imagery is essential.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className={labelClasses}>Main Cover Image URL</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                                        <Upload size={16} />
                                    </div>
                                    <input
                                        type="url"
                                        value={form.image}
                                        onChange={(e) => update('image', e.target.value)}
                                        required
                                        placeholder="https://images.unsplash.com/..."
                                        className={`${inputClasses} pl-12`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className={labelClasses}>Gallery Image URLs (Comma Separated)</label>
                                <textarea
                                    rows={3}
                                    value={form.gallery}
                                    onChange={(e) => update('gallery', e.target.value)}
                                    placeholder="https://image-1.jpg, https://image-2.jpg..."
                                    className={`${inputClasses} resize-none`}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Narrative and Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={sectionClasses}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                <Activity size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Narrative & Amenities</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 font-light">Tell the story of this luxury estate.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className={labelClasses}>Property Description</label>
                                <textarea
                                    rows={5}
                                    value={form.description}
                                    onChange={(e) => update('description', e.target.value)}
                                    placeholder="Describe the unique characteristics, architectural style, and lifestyle offered..."
                                    className={`${inputClasses} resize-none`}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={labelClasses}>Key Features (Comma Separated)</label>
                                    <textarea
                                        rows={3}
                                        value={form.features}
                                        onChange={(e) => update('features', e.target.value)}
                                        placeholder="Infinity Pool, Smart Home, Private Gym..."
                                        className={`${inputClasses} resize-none`}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={labelClasses}>Premier Amenities (Comma Separated)</label>
                                    <textarea
                                        rows={3}
                                        value={form.amenities}
                                        onChange={(e) => update('amenities', e.target.value)}
                                        placeholder="24/7 Security, Spa, Wine Cellar..."
                                        className={`${inputClasses} resize-none`}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Submission */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        {submitted && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-green-700 dark:text-green-400">Success!</h3>
                                    <p className="text-sm text-green-600 dark:text-green-500/80 font-light">Your property has been captured and is being integrated into our exclusive listings.</p>
                                </div>
                            </motion.div>
                        )}

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full sm:w-auto px-12 py-5 rounded-2xl shadow-2xl shadow-brand-primary/20 text-base flex items-center justify-center gap-2 group"
                                disabled={submitted}
                            >
                                <Save size={20} className="group-hover:scale-110 transition-transform" />
                                {submitted ? 'Publishing...' : 'Publish Property'}
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                onClick={() => navigate(-1)}
                                className="w-full sm:w-auto px-12 py-5 rounded-2xl border-slate-200 dark:border-slate-700 text-base"
                            >
                                Cancel listing
                            </Button>
                        </div>

                        <p className="text-center text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400 dark:text-slate-600 mt-4">
                            ✦ Defined by Excellence ✦
                        </p>
                    </motion.div>

                </form>
            </div>
        </div>
    );
};

export default AddProperty;

