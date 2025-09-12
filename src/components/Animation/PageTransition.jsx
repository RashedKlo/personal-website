import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';

// Constants to prevent recreation
const PANEL_COUNT = 6;
const PARTICLE_COUNT = 15;
const ORBIT_DOTS = 4;

// Memoized animation variants
const ANIMATION_VARIANTS = {
    panel: {
        initial: { y: "100%" },
        animate: (i) => ({
            y: "0%",
            transition: {
                delay: i * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        }),
        exit: (i) => ({
            y: "-100%",
            transition: {
                delay: i * 0.05,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    },
    overlay: {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { delay: 0.2, duration: 0.3 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 }
        }
    },
    geometric: {
        initial: { scale: 0, rotate: -180 },
        animate: {
            scale: 1,
            rotate: 0,
            transition: { delay: 0.3, duration: 0.6, ease: "backOut" }
        },
        exit: {
            scale: 0,
            rotate: 180,
            transition: { duration: 0.3 }
        }
    },
    particle: (i) => ({
        initial: { opacity: 0, scale: 0 },
        animate: {
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: -30,
        },
        transition: {
            duration: 1.5,
            delay: 0.5 + i * 0.05,
            ease: "easeOut"
        }
    }),
    mainOverlay: {
        initial: { opacity: 1 },
        animate: {
            opacity: 0,
            transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
        }
    }
};

// Memoized components
const SlidingPanel = React.memo(({ index }) => {
    const panelStyle = useMemo(() => ({
        width: `${100 / PANEL_COUNT}%`,
        left: `${(100 / PANEL_COUNT) * index}%`,
    }), [index]);

    return (
        <motion.div
            className="absolute h-full bg-gradient-to-br from-slate-900 via-gray-900 to-black"
            style={panelStyle}
            custom={index}
            variants={ANIMATION_VARIANTS.panel}
            initial="initial"
            animate="animate"
            exit="exit"
        />
    );
});

const OrbitingDot = React.memo(({ index }) => {
    const position = useMemo(() => ({
        x: 40 * Math.cos((index * Math.PI) / 2),
        y: 40 * Math.sin((index * Math.PI) / 2),
    }), [index]);

    return (
        <motion.div
            className="absolute w-2 h-2 bg-white/60 rounded-full"
            style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
            }}
            animate={{
                rotate: 360,
                x: position.x,
                y: position.y,
            }}
            transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                x: { duration: 0 },
                y: { duration: 0 }
            }}
        />
    );
});

const FloatingParticle = React.memo(({ index }) => {
    const position = useMemo(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
    }), [index]);

    return (
        <motion.div
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={position}
            custom={index}
            variants={ANIMATION_VARIANTS.particle}
            initial="initial"
            animate="animate"
        />
    );
});

const GeometricOverlay = React.memo(() => (
    <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={ANIMATION_VARIANTS.overlay}
        initial="initial"
        animate="animate"
        exit="exit"
    >
        <motion.div
            className="relative"
            variants={ANIMATION_VARIANTS.geometric}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {/* Outer ring */}
            <div className="w-24 h-24 border-2 border-white/20 rounded-full flex items-center justify-center">
                {/* Inner hexagon */}
                <div
                    className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                >
                    <div className="w-6 h-6 bg-white/80 rounded-sm"></div>
                </div>
            </div>

            {/* Orbiting dots */}
            {Array.from({ length: ORBIT_DOTS }, (_, i) => (
                <OrbitingDot key={i} index={i} />
            ))}
        </motion.div>
    </motion.div>
));

const ParticleSystem = React.memo(() => (
    <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
            <FloatingParticle key={i} index={i} />
        ))}
    </div>
));

const StairTransition = React.memo(({ isVisible }) => (
    <AnimatePresence>
        {isVisible && (
            <div className="fixed inset-0 z-50 pointer-events-none">
                {/* Sliding panels */}
                {Array.from({ length: PANEL_COUNT }, (_, i) => (
                    <SlidingPanel key={i} index={i} />
                ))}

                {/* Geometric overlay */}
                <GeometricOverlay />

                {/* Particle system */}
                <ParticleSystem />
            </div>
        )}
    </AnimatePresence>
));

const PageTransition = React.memo(({ isVisible }) => (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
        {/* Main overlay transition */}
        <AnimatePresence>
            <motion.div
                variants={ANIMATION_VARIANTS.mainOverlay}
                initial="initial"
                animate="animate"
                className="h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black top-0 fixed pointer-events-none z-40"
            />
        </AnimatePresence>

        {/* Stair transition component */}
        <StairTransition isVisible={isVisible} />

        <Outlet />
    </div>
));

export default PageTransition;