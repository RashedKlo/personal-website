import { motion } from 'framer-motion';
import React, { Suspense, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BsArrowDownRight,
    BsCode,
    BsWindow,
    BsServer,
    BsGear,
} from 'react-icons/bs';

// Lazy loaded components
const ServiceCard = React.lazy(() => import('../features/Services/components/ServiceCard'));

// Loading skeletons
const ServiceCardSkeleton = memo(() => (
    <div className="group relative flex flex-col justify-between bg-slate-900/30 backdrop-blur-md rounded-2xl p-8 
                   border border-white/10 overflow-hidden shadow-md animate-pulse">

        {/* Header Section: Number and Action Icon */}
        <div className="flex justify-between items-start mb-8">
            <div className="w-16 h-20 bg-slate-700/30 rounded-lg"></div>
            <div className="w-12 h-12 rounded-full bg-slate-700/30"></div>
        </div>

        {/* Content Section: Icon, Title, and Description */}
        <div className="space-y-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-xl bg-slate-700/30"></div>

            {/* Title */}
            <div className="space-y-2">
                <div className="h-8 bg-slate-700/30 rounded-lg w-3/4"></div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <div className="h-4 bg-slate-700/30 rounded w-full"></div>
                <div className="h-4 bg-slate-700/30 rounded w-5/6"></div>
                <div className="h-4 bg-slate-700/30 rounded w-4/5"></div>
            </div>
        </div>

        {/* Decorative Bottom Border */}
        <div className="relative mt-8">
            <div className="h-px bg-slate-700/20"></div>
        </div>
    </div>
));

const ServicesGridSkeleton = memo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((index) => (
            <ServiceCardSkeleton key={index} />
        ))}
    </div>
));

const MainLoadingSkeleton = memo(() => (
    <section className="min-h-screen w-full flex flex-col justify-center py-20 px-4 md:px-8 bg-slate-900">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.4)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Header Skeleton */}
            <div className="text-center mb-16 animate-pulse">
                <div className="space-y-4 mb-6">
                    <div className="h-12 md:h-16 lg:h-20 bg-slate-700/30 rounded-lg w-2/3 mx-auto"></div>
                </div>
                <div className="space-y-2 max-w-3xl mx-auto">
                    <div className="h-6 bg-slate-700/30 rounded w-full"></div>
                    <div className="h-6 bg-slate-700/30 rounded w-4/5 mx-auto"></div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <ServicesGridSkeleton />

            {/* CTA Skeleton */}
            <div className="text-center mt-20 animate-pulse">
                <div className="w-48 h-12 bg-slate-700/30 rounded-full mx-auto"></div>
            </div>
        </div>
    </section>
));

// Memoized background component
const BackgroundElements = memo(() => (
    <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.4)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

        {/* Floating Particles */}
        <motion.div
            className="absolute top-20 left-10 sm:left-20 w-1 h-1 sm:w-2 sm:h-2 bg-blue-400 rounded-full"
            animate={{ y: [-10, 10, -10], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
            className="absolute top-1/3 right-10 sm:right-20 w-1 h-1 bg-indigo-400 rounded-full"
            animate={{ y: [10, -10, 10], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
    </>
));

// Memoized header component
const ServicesHeader = memo(() => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: -30 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: "easeOut" }
            }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center mb-16"
    >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Services</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Professional solutions tailored to elevate your digital presence and drive business growth.
        </p>
    </motion.div>
));

// Memoized CTA component
const CTASection = memo(() => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/contact');
    };

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" }
                }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mt-20"
        >
            <motion.button
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white font-semibold rounded-full shadow-lg transition-all duration-300 
                       hover:shadow-xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-500/50 
                       hover:brightness-110"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={handleGetStarted}
            >
                <span className="mr-3">Get Started Today</span>
                <BsArrowDownRight className="text-lg" />
            </motion.button>
        </motion.div>
    );
});

const ServicesPage = memo(() => {
    // Memoize services data to prevent recreation
    const services = useMemo(() => [
        {
            num: "01",
            title: "Full Stack Development",
            description: "Building comprehensive web applications using React.js, ASP.NET Core, and SQL Server with modern architecture.",
            to: "/work?project=1",
            icon: BsCode,
            color: "from-blue-500 to-indigo-600"
        },
        {
            num: "02",
            title: "Desktop Applications",
            description: "Developing robust desktop solutions using .NET Framework and C# with secure database integration.",
            to: "/work?project=4",
            icon: BsWindow,
            color: "from-purple-500 to-pink-600"
        },
        {
            num: "03",
            title: "Database Management",
            description: "Creating efficient database systems with SQL Server for secure data storage and retrieval.",
            to: "/work?project=3",
            icon: BsServer,
            color: "from-green-500 to-emerald-600"
        },
        {
            num: "04",
            title: "API Development",
            description: "Building scalable RESTful APIs using ASP.NET Core for seamless frontend-backend communication.",
            to: "/work?project=2",
            icon: BsGear,
            color: "from-orange-500 to-red-600"
        }
    ], []);

    // Memoize animation variants
    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2,
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    }), []);

    return (
        <Suspense fallback={<MainLoadingSkeleton />}>
            <section className="min-h-screen w-full flex flex-col justify-center py-20 px-4 md:px-8 bg-slate-900 font-sans antialiased">
                <BackgroundElements />

                <div className="max-w-7xl mx-auto w-full relative z-10">
                    <ServicesHeader />

                    {/* Services Grid with individual card loading */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {services.map((service) => (
                            <ServiceCard service={service} />

                        ))}
                    </motion.div>

                    <CTASection />
                </div>
            </section>
        </Suspense>
    );
});

// Set display names for debugging
ServicesPage.displayName = 'ServicesPage';
ServiceCardSkeleton.displayName = 'ServiceCardSkeleton';
ServicesGridSkeleton.displayName = 'ServicesGridSkeleton';
MainLoadingSkeleton.displayName = 'MainLoadingSkeleton';
BackgroundElements.displayName = 'BackgroundElements';
ServicesHeader.displayName = 'ServicesHeader';
CTASection.displayName = 'CTASection';

export default ServicesPage;