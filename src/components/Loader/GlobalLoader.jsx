import { useState, useEffect, useMemo, memo, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Constants to prevent recreation
const MESSAGES = [
    "Loading...",
    "Preparing experience...",
    "Almost ready...",
    "Just a moment..."
];

const PROGRESS_INCREMENT = 12;
const PROGRESS_INTERVAL = 120;
const MESSAGE_INTERVAL = 1500;

// Memoized static components
const GridPattern = memo(() => (
    <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
));

const BackgroundGradient = memo(() => (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
));

// Optimized animated orb component
const AnimatedOrb = memo(({ className, delay = 0, prefersReducedMotion }) => (
    <motion.div
        animate={prefersReducedMotion ? {} : {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
        }}
        transition={prefersReducedMotion ? {} : {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay
        }}
        className={className}
    />
));

// Progress bar component
const ProgressBar = memo(({ progress, prefersReducedMotion }) => (
    <div className="mb-6 mx-auto max-w-xs">
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {!prefersReducedMotion && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            )}
        </div>

        <div className="text-center mt-2 text-slate-400 text-sm font-mono">
            {Math.floor(progress)}%
        </div>
    </div>
));

// Loading dots component  
const LoadingDots = memo(({ prefersReducedMotion }) => (
    <div className="flex justify-center gap-1 mt-6">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 1, 0.3]
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                }}
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
            />
        ))}
    </div>
));

// Logo component
const LoadingLogo = memo(({ prefersReducedMotion }) => (
    <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-8">
        {/* Outer rotating ring */}
        <motion.div
            animate={prefersReducedMotion ? {} : { rotate: 360 }}
            transition={prefersReducedMotion ? {} : {
                duration: 4,
                repeat: Infinity,
                ease: "linear"
            }}
            className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
            style={{
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)',
                padding: '2px'
            }}
        >
            <div className="w-full h-full rounded-full bg-slate-900" />
        </motion.div>

        {/* Center content */}
        <div className="absolute inset-2 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
            <motion.div
                animate={prefersReducedMotion ? {} : {
                    scale: [1, 1.05, 1],
                }}
                transition={prefersReducedMotion ? {} : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="text-white text-xl sm:text-2xl"
            >
                🚀
            </motion.div>
        </div>

        {/* Pulse ring */}
        {!prefersReducedMotion && (
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 0, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                }}
                className="absolute inset-0 rounded-full border-2 border-blue-400"
            />
        )}
    </div>
));

// Main component with performance optimizations
const GlobalLoader = memo(({ isVisible = true, message = "Loading..." }) => {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    // Use refs to avoid stale closures
    const progressRef = useRef(0);
    const isVisibleRef = useRef(isVisible);

    useEffect(() => {
        isVisibleRef.current = isVisible;
        progressRef.current = progress;
    });

    // Optimized progress simulation
    useEffect(() => {
        if (!isVisible) {
            setProgress(0);
            return;
        }

        const interval = setInterval(() => {
            if (!isVisibleRef.current) return;

            setProgress(prev => {
                const newProgress = prev + Math.random() * PROGRESS_INCREMENT + 2;
                progressRef.current = Math.min(newProgress, 100);

                if (progressRef.current >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return progressRef.current;
            });
        }, PROGRESS_INTERVAL);

        return () => clearInterval(interval);
    }, [isVisible]);

    // Optimized message cycling
    useEffect(() => {
        if (!isVisible) {
            setMessageIndex(0);
            return;
        }

        const interval = setInterval(() => {
            if (!isVisibleRef.current) return;
            setMessageIndex(prev => (prev + 1) % MESSAGES.length);
        }, MESSAGE_INTERVAL);

        return () => clearInterval(interval);
    }, [isVisible]);

    // Memoized animation variants
    const variants = useMemo(() => ({
        container: {
            initial: { opacity: 0 },
            animate: {
                opacity: 1,
                transition: { duration: prefersReducedMotion ? 0.1 : 0.2 }
            },
            exit: {
                opacity: 0,
                transition: { duration: prefersReducedMotion ? 0.1 : 0.3 }
            }
        }
    }), [prefersReducedMotion]);

    // Memoized current message
    const currentMessage = useMemo(() =>
        message !== "Loading..." ? message : MESSAGES[messageIndex],
        [message, messageIndex]
    );

    if (!isVisible) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                variants={variants.container}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <BackgroundGradient />

                {/* Background effects - only if motion is enabled */}
                {!prefersReducedMotion && (
                    <div className="absolute inset-0 overflow-hidden">
                        <AnimatedOrb
                            className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl"
                            prefersReducedMotion={prefersReducedMotion}
                        />
                        <AnimatedOrb
                            className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
                            delay={1}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                        <AnimatedOrb
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
                            delay={0.5}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    </div>
                )}

                <GridPattern />

                {/* Main content */}
                <div className="relative z-10 text-center px-6 max-w-sm mx-auto">
                    <LoadingLogo prefersReducedMotion={prefersReducedMotion} />

                    <ProgressBar
                        progress={progress}
                        prefersReducedMotion={prefersReducedMotion}
                    />

                    {/* Loading text with simple transition */}
                    <motion.div
                        key={currentMessage}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-white font-semibold text-lg sm:text-xl mb-2"
                    >
                        {currentMessage}
                    </motion.div>

                    <p className="text-slate-400 text-sm sm:text-base">
                        Crafting an amazing experience just for you
                    </p>

                    <LoadingDots prefersReducedMotion={prefersReducedMotion} />
                </div>
            </motion.div>
        </AnimatePresence>
    );
});

GlobalLoader.displayName = 'GlobalLoader';

export default GlobalLoader;