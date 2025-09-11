import { domAnimation, LazyMotion, useInView, motion } from "framer-motion";
import React, { Suspense, memo, useRef, useCallback, useMemo } from "react";

const StatusBadge = React.lazy(() => import("./StatusBadge"));
const WorkBadge = React.lazy(() => import("./WorkBadge"));
const FloatingParticles = React.lazy(() => import("./FloatingParticles"));

// Memoized background orbs
const BackgroundOrbs = memo(() => (
    <>
        <motion.div
            className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-xl"
            animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
            }}
        />
        <motion.div
            className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-tl from-emerald-500/15 to-cyan-500/10 rounded-full blur-lg"
            animate={{
                scale: [1, 0.9, 1],
                rotate: [360, 180, 0]
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    </>
));

// Memoized corner decorations
const CornerDecorations = memo(({ isInView }) => (
    <>
        <motion.div
            className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-blue-400/50 rounded-tl-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
        />
        <motion.div
            className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-purple-400/50 rounded-br-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
        />
    </>
));

// Optimized photo frame component
const PhotoFrame = memo(({ isInView }) => {
    const handleImageLoad = useCallback(() => {
        // Optional: Handle image load events
    }, []);

    const handleImageError = useCallback(() => {
        console.warn('Profile image failed to load');
    }, []);

    return (
        <motion.div
            className="relative w-full h-full p-2 rounded-3xl overflow-hidden"
            whileHover={{ y: -8, rotateY: 5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Inner gradient border */}
            <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-emerald-500/40 p-[2px]">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-900/90 backdrop-blur-sm relative">
                    <motion.img
                        src="/path-to-your-image.jpg" // Replace with actual image path
                        sizes="(max-width: 640px) 236px, (max-width: 1024px) 288px, 320px"
                        className="w-full h-full object-cover filter contrast-110 saturate-110"
                        alt="Rashed Klo - Frontend Developer"
                        loading="lazy"
                        decoding="async"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                    />

                    {/* Subtle overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent"
                        whileHover={{ opacity: 0.5 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Glow effect - only visible on hover */}
            <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-xl"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            />
        </motion.div>
    );
});

// Badge loading skeleton
const BadgeSkeleton = memo(({ className }) => (
    <div className={`animate-pulse bg-slate-600/30 rounded-full ${className}`}></div>
));

const ProfilePhoto = memo(({ ANIMATION_VARIANTS }) => {
    const ref = useRef();
    const isInView = useInView(ref, {
        once: true,
        margin: "-100px",
        amount: 0.3 // Trigger when 30% is visible
    });

    // Memoize transition values
    const scaleTransition = useMemo(() => ({
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
    }), []);

    return (
        <div ref={ref} className="relative w-full max-w-sm mx-auto lg:max-w-md">
            <LazyMotion features={domAnimation}>
                <motion.div
                    variants={ANIMATION_VARIANTS.scaleIn}
                    initial="initial"
                    animate={isInView ? "animate" : "initial"}
                    transition={scaleTransition}
                    className="relative"
                >
                    {/* Floating background orbs - only render when in view */}
                    {isInView && <BackgroundOrbs />}

                    {/* Main photo container */}
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
                        {/* Glassmorphism backdrop */}
                        <motion.div
                            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        />

                        <PhotoFrame isInView={isInView} />

                        {/* Floating elements - only render when in view */}
                        {isInView && <FloatingParticles />}

                        {/* Modern badges with enhanced styling */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
                            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                        >
                            <Suspense fallback={<BadgeSkeleton className="absolute top-3 right-3 w-20 h-8" />}>
                                <StatusBadge isInView={isInView} />
                            </Suspense>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 10, y: 10 }}
                            animate={isInView ? { opacity: 1, scale: 1, x: 0, y: 0 } : { opacity: 0 }}
                            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                        >
                            <Suspense fallback={<BadgeSkeleton className="absolute -bottom-3 -right-3 w-24 h-8" />}>
                                <WorkBadge isInView={isInView} />
                            </Suspense>
                        </motion.div>

                        {/* Decorative corner elements */}
                        <CornerDecorations isInView={isInView} />
                    </div>

                    {/* Reflection effect */}
                    <motion.div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-sm"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    />
                </motion.div>
            </LazyMotion>
        </div>
    );
});

// Set display names for debugging
ProfilePhoto.displayName = 'ProfilePhoto';
FloatingParticles.displayName = 'FloatingParticles';
BackgroundOrbs.displayName = 'BackgroundOrbs';
CornerDecorations.displayName = 'CornerDecorations';
PhotoFrame.displayName = 'PhotoFrame';
BadgeSkeleton.displayName = 'BadgeSkeleton';

export default ProfilePhoto;