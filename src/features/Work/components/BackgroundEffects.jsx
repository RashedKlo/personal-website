import { memo, useMemo } from "react";
import { motion, useReducedMotion } from 'framer-motion'

const BackgroundEffects = memo(() => {
    const prefersReducedMotion = useReducedMotion();

    // Memoize animation variants based on user preference
    const animationVariants = useMemo(() => {
        if (prefersReducedMotion) {
            return {
                blob1: { scale: 1, opacity: 0.3 },
                blob2: { scale: 1, opacity: 0.2 },
                blob3: { rotate: 0, scale: 1 }
            };
        }

        return {
            blob1: {
                animate: {
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                },
                transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            },
            blob2: {
                animate: {
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4]
                },
                transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
            },
            blob3: {
                animate: {
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                },
                transition: { duration: 15, repeat: Infinity, ease: "linear" }
            }
        };
    }, [prefersReducedMotion]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Static background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.4)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

            {/* Animated blobs - conditionally rendered based on motion preference */}
            {prefersReducedMotion ? (
                <>
                    <div
                        className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
                        style={{ transform: 'scale(1)', opacity: 0.3 }}
                    />
                    <div
                        className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
                        style={{ transform: 'scale(1)', opacity: 0.2 }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
                        style={{ transform: 'translate(-50%, -50%) scale(1)' }}
                    />
                </>
            ) : (
                <>
                    <motion.div
                        className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
                        {...animationVariants.blob1}
                    />
                    <motion.div
                        className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
                        {...animationVariants.blob2}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
                        {...animationVariants.blob3}
                    />
                </>
            )}
        </div>
    );
});

BackgroundEffects.displayName = 'BackgroundEffects';
export default BackgroundEffects;