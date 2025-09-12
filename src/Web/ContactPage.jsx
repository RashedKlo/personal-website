import React, { Suspense, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

// Optimized lazy loading with preloading and error handling
const ContactCard = React.lazy(() =>
    Promise.all([
        import("../features/Contact/components/ContactCard"),
        new Promise(resolve => setTimeout(resolve, 0)) // Prevent blocking
    ]).then(([module]) => module).catch(() => ({
        default: () => <div className="text-gray-500 text-sm">Component unavailable</div>
    }))
);

const ContactForm = React.lazy(() =>
    Promise.all([
        import("../features/Contact/components/ContactForm"),
        new Promise(resolve => setTimeout(resolve, 0))
    ]).then(([module]) => module).catch(() => ({
        default: () => <div className="text-gray-500 text-sm">Form unavailable</div>
    }))
);

// Constants moved outside component to prevent recreation
const CONTACT_DATA = [
    {
        icon: FaEnvelope,
        label: "Email",
        value: "rashed.klo.dev@gmail.com",
        href: "mailto:rashed.klo.dev@gmail.com",
    },
    {
        icon: FaPhoneAlt,
        label: "Phone",
        value: "+963 947 841 958",
        href: "https://wa.me/963947841958",
    },
    {
        icon: FaMapMarkerAlt,
        label: "Location",
        value: "Aleppo, Syria",
        href: "https://maps.google.com/?q=Aleppo,Syria",
    }
];

// Optimized animation variants
const animations = {
    fadeInUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        }
    },
    stagger: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    }
};

// Optimized skeleton components
const FormSkeleton = memo(() => (
    <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-white/10">
        <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-6 bg-gray-700/60 rounded"></div>
                <div className="h-8 bg-gray-700/60 rounded w-48"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-14 bg-gray-700/40 rounded-2xl"></div>
                <div className="h-14 bg-gray-700/40 rounded-2xl"></div>
            </div>
            <div className="h-14 bg-gray-700/40 rounded-2xl"></div>
            <div className="h-14 bg-gray-700/40 rounded-2xl"></div>
            <div className="h-14 bg-gray-700/40 rounded-2xl"></div>
            <div className="h-32 bg-gray-700/40 rounded-2xl"></div>
            <div className="h-14 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl"></div>
        </div>
    </div>
));

const CardSkeleton = memo(() => (
    <div className="animate-pulse">
        <div className="p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl">
            <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-gray-700/60 rounded-2xl"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700/60 rounded w-20"></div>
                    <div className="h-6 bg-gray-700/60 rounded w-32"></div>
                </div>
            </div>
        </div>
    </div>
));

// Preloader hook with intersection observer
const usePreloader = () => {
    const preloadComponents = useCallback(() => {
        // Preload components in idle time
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                import("../features/Contact/components/ContactCard");
                import("../features/Contact/components/ContactForm");
            });
        } else {
            setTimeout(() => {
                import("../features/Contact/components/ContactCard");
                import("../features/Contact/components/ContactForm");
            }, 100);
        }
    }, []);

    return preloadComponents;
};

// Memoized header component
const Header = memo(() => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-20"
    >
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                  bg-clip-text text-transparent mb-6 tracking-tight">
            Get In Touch
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Let's start a conversation about your next project.
        </p>
    </motion.div>
));

// Memoized contact info
const ContactInfo = memo(() => (
    <motion.div variants={animations.fadeInUp} className="mb-12">
        <h3 className="text-3xl font-bold text-white mb-4">
            Let's Connect
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed">
            We're here to help bring your ideas to life. Reach out through any of these channels
            and we'll get back to you within 24 hours.
        </p>
    </motion.div>
));

// Memoized response promise
const ResponsePromise = memo(() => (
    <motion.div
        variants={animations.fadeInUp}
        className="mt-12 p-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 
              backdrop-blur-xl rounded-3xl border border-cyan-400/20"
    >
        <h4 className="text-xl font-semibold text-white mb-3">Quick Response</h4>
        <p className="text-gray-300">
            We typically respond to all inquiries within 2-4 hours during business hours.
            For urgent matters, please call us directly.
        </p>
    </motion.div>
));

// Main component
export default function ContactPage() {
    const preloadComponents = usePreloader();

    // Memoize contact cards to prevent unnecessary re-renders
    const contactCards = useMemo(() =>
        CONTACT_DATA.map((item, index) => (
            <Suspense key={item.label} fallback={<CardSkeleton />}>
                <ContactCard
                    fadeInUp={animations.fadeInUp}
                    item={item}
                    index={index}
                />
            </Suspense>
        )), []
    );

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden"
            onMouseEnter={preloadComponents}
            onTouchStart={preloadComponents} // For mobile
        >
            <div className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
                <Header />

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Form with proper Suspense */}
                    <Suspense fallback={<FormSkeleton />}>
                        <ContactForm
                            fadeInUp={animations.fadeInUp}
                            stagger={animations.stagger}
                        />
                    </Suspense>

                    {/* Contact Information */}
                    <motion.div
                        variants={animations.stagger}
                        initial="hidden"
                        animate="visible"
                        className="order-1 lg:order-2 space-y-6"
                    >
                        <ContactInfo />
                        {contactCards}
                        <ResponsePromise />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}