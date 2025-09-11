import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Tooltip from "./ToolTip";
import { memo, useMemo } from "react";
import { motion, useReducedMotion } from 'framer-motion'

const ProjectNavigation = memo(({ onPrev, onNext, className = "" }) => {
    const prefersReducedMotion = useReducedMotion();

    // Memoize animation props to prevent recreation
    const animationProps = useMemo(() => ({
        whileHover: { scale: prefersReducedMotion ? 1 : 1.05 },
        whileTap: { scale: prefersReducedMotion ? 1 : 0.95 }
    }), [prefersReducedMotion]);

    // Memoize common button classes
    const buttonBaseClasses = useMemo(() =>
        "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 " +
        "flex items-center justify-center text-white hover:bg-white/20 hover:border-white/30 " +
        "transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-400/50"
        , []);

    return (
        <div className={`flex gap-2 ${className}`}>
            <Tooltip content="Previous ">
                <motion.button
                    onClick={onPrev}
                    {...animationProps}
                    className={buttonBaseClasses}
                    aria-label="Previous "
                >
                    <BsChevronLeft className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform duration-200" />
                </motion.button>
            </Tooltip>

            <Tooltip content="Next ">
                <motion.button
                    onClick={onNext}
                    {...animationProps}
                    className={buttonBaseClasses}
                    aria-label="Next "
                >
                    <BsChevronRight className="text-base sm:text-lg group-hover:translate-x-0.5 transition-transform duration-200" />
                </motion.button>
            </Tooltip>
        </div>
    );
});

ProjectNavigation.displayName = 'ProjectNavigation';
export default ProjectNavigation;