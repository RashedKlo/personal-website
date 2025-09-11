import { memo, useMemo } from "react";
import { motion, useReducedMotion } from 'framer-motion'

const TechStack = memo(({ stack, projectId }) => {
    const prefersReducedMotion = useReducedMotion();

    // Memoize animation variants based on reduced motion preference
    const itemVariants = useMemo(() => {
        if (prefersReducedMotion) {
            return {
                initial: { opacity: 1, y: 0 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0 }
            };
        }

        return {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
        };
    }, [prefersReducedMotion]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
            {stack.map((tech, index) => (
                <motion.span
                    key={`${projectId}-${tech}-${index}`}
                    {...itemVariants}
                    transition={{
                        delay: prefersReducedMotion ? 0 : index * 0.05,
                        duration: prefersReducedMotion ? 0 : 0.3
                    }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm text-slate-200 text-xs sm:text-sm 
                       rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 
                       transition-all duration-200 text-center"
                >
                    {tech}
                </motion.span>
            ))}
        </div>
    );
});

TechStack.displayName = 'TechStack';
export default TechStack;