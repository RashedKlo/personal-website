import { memo, useMemo } from "react";
import { motion } from 'framer-motion'
// Optimized floating particles with reduced complexity
const FloatingParticles = memo(() => {
    // Memoize particle configurations to prevent recreation
    const particleConfigs = useMemo(() => [
        {
            className: "absolute top-20 left-10 sm:left-20 w-1 h-1 sm:w-2 sm:h-2 bg-blue-400 rounded-full",
            animate: { y: [-10, 10, -10], opacity: [0.3, 1, 0.3] },
            transition: { duration: 4, repeat: Infinity }
        },
        {
            className: "absolute top-1/3 right-10 sm:right-20 w-1 h-1 bg-indigo-400 rounded-full",
            animate: { y: [10, -10, 10], opacity: [0.5, 1, 0.5] },
            transition: { duration: 6, repeat: Infinity, delay: 2 }
        }
    ], []);

    return (
        <>
            {particleConfigs.map((particle, index) => (
                <motion.div
                    key={index}
                    className={particle.className}
                    animate={particle.animate}
                    transition={particle.transition}
                />
            ))}
        </>
    );
});
export default FloatingParticles;