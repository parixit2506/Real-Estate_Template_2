import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import FrontendLayout from '@/layouts/FrontendLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Main Pages
import Home from '@/views/MainPages/Home';
import Listings from '@/views/MainPages/Listings';
import PropertyDetails from '@/views/MainPages/PropertyDetails';

// Auth Pages
import Login from '@/views/AuthPages/Login';
import Signup from '@/views/AuthPages/Signup';

// Blog Pages
import Blog from '@/views/BlogPages/Blog';
import BlogDetails from '@/views/BlogPages/BlogDetails';

// Misc Pages
import About from '@/views/MiscPages/About';
import Contact from '@/views/MiscPages/Contact';
import Agents from '@/views/MiscPages/Agents';
import FAQ from '@/views/MiscPages/FAQ';
import Profile from '@/views/MiscPages/Profile';
import AddProperty from '@/views/MiscPages/AddProperty';

const AppRouter = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Frontend Layout - Main Pages */}
                <Route element={<FrontendLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/properties" element={<Listings />} />
                    <Route path="/property/:id" element={<PropertyDetails />} />
                    <Route path="/add-property" element={<AddProperty />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/agents" element={<Agents />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetails />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Auth Layout - Auth Pages */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default AppRouter;
