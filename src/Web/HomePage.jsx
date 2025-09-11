import { LazyMotion, domAnimation, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { Suspense, memo, useMemo } from "react";
import { FiDownload } from 'react-icons/fi';

// Lazy loaded components with better loading states
const TypeWriter = React.lazy(() => import("../features/Home/Components/TypeWriter"));
const Button = React.lazy(() => import("../features/Home/Components/Button"));
const ContactInfo = React.lazy(() => import("../features/Home/components/ContactInfo"));
const SocialLinks = React.lazy(() => import("../features/Home/components/SocialLinks"));
const ProfilePhoto = React.lazy(() => import("../features/Home/components/ProfilePhoto"));
const StatsSection = React.lazy(() => import("../features/Home/components/StatsSection"));
const BackgroundElements = React.lazy(() => import("../features/Home/components/BackgroundElements"));

// Memoized animation variants to prevent recreation
const ANIMATION_VARIANTS = {
    fadeInUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 }
    },
    fadeInLeft: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 }
    },
    fadeInRight: {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 }
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 }
    }
};

// Enhanced loading component
const LoadingSpinner = memo(() => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin animate-reverse" style={{ animationDuration: '0.8s' }}></div>
        </div>
    </div>
));

// Component loading skeletons
const ComponentSkeleton = memo(({ className = "", height = "h-6" }) => (
    <div className={`animate-pulse bg-slate-700/30 rounded-lg ${height} ${className}`}></div>
));

const ProfileSkeleton = memo(() => (
    <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
        <div className="absolute inset-0 rounded-3xl bg-slate-700/20 animate-pulse">
            <div className="w-full h-full p-2 rounded-3xl">
                <div className="w-full h-full rounded-2xl bg-slate-600/30"></div>
            </div>
        </div>
    </div>
));

// Memoized content sections
const ContentSection = memo(() => {
    const nav = useNavigate();

    return (
        <motion.div
            className="order-2 lg:order-1 space-y-6 sm:space-y-8 text-center lg:text-left"
            variants={ANIMATION_VARIANTS.fadeInLeft}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8 }}
        >
            <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <span className="text-slate-200 block mb-2">I'm</span>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    Rashed Klo
                </span>
            </motion.h1>

            <motion.div
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Suspense fallback={<ComponentSkeleton className="w-64 mx-auto lg:mx-0" height="h-8" />}>
                    <TypeWriter className="text-base sm:text-lg lg:text-xl" />
                </Suspense>
            </motion.div>

            <motion.p
                className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed tracking-wide space-y-2"
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 1.0 }}
            >
                I build scalable and high-performance applications
                <span className="block">using modern web and desktop technologies.</span>
            </motion.p>

            <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6, delay: 1.2 }}
            >
                <Suspense fallback={<ComponentSkeleton className="w-44 h-12" />}>
                    <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                        <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <FiDownload size={16} />
                        </motion.div>
                        Download Resume
                    </Button>
                </Suspense>
                <Suspense fallback={<ComponentSkeleton className="w-36 h-12" />}>
                    <Button onClick={() => nav("/work")} variant="outline" size="lg" className="w-full sm:w-auto">
                        View My Work
                    </Button>
                </Suspense>
            </motion.div>

            <Suspense fallback={<ComponentSkeleton className="w-full" height="h-12" />}>
                <ContactInfo ANIMATION_VARIANTS={ANIMATION_VARIANTS} />
            </Suspense>

            <Suspense fallback={<ComponentSkeleton className="w-48 mx-auto lg:mx-0" height="h-10" />}>
                <SocialLinks className="justify-center lg:justify-start" ANIMATION_VARIANTS={ANIMATION_VARIANTS} />
            </Suspense>
        </motion.div>
    );
});

const PhotoSection = memo(() => (
    <motion.div
        className="order-1 lg:order-2 flex justify-center"
        variants={ANIMATION_VARIANTS.fadeInRight}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, delay: 0.3 }}
    >
        <Suspense fallback={<ProfileSkeleton />}>
            <ProfilePhoto ANIMATION_VARIANTS={ANIMATION_VARIANTS} />
        </Suspense>
    </motion.div>
));

const HomePage = memo(() => {
    // Memoize variants to prevent recreation
    const animationVariants = useMemo(() => ANIMATION_VARIANTS, []);

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white relative overflow-hidden">
                <Suspense fallback={<div className="absolute inset-0 bg-slate-900/50"></div>}>
                    <BackgroundElements />
                </Suspense>

                <main className="relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-8rem)]">
                            <LazyMotion features={domAnimation}>
                                <ContentSection />
                                <PhotoSection />
                            </LazyMotion>
                        </div>

                        <Suspense fallback={
                            <div className="py-12 lg:py-16">
                                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                        {[1, 2, 3, 4].map(i => (
                                            <ComponentSkeleton key={i} className="p-6 rounded-2xl" height="h-32" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }>
                            <StatsSection ANIMATION_VARIANTS={animationVariants} />
                        </Suspense>
                    </div>
                </main>
            </div>
        </Suspense>
    );
});

HomePage.displayName = 'HomePage';
ContentSection.displayName = 'ContentSection';
PhotoSection.displayName = 'PhotoSection';
LoadingSpinner.displayName = 'LoadingSpinner';
ComponentSkeleton.displayName = 'ComponentSkeleton';
ProfileSkeleton.displayName = 'ProfileSkeleton';

export default HomePage;