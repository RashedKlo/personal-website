import { AnimatePresence, useReducedMotion } from "framer-motion";
import { memo, useMemo, useState, useCallback } from "react";
import { motion } from 'framer-motion'

const Tooltip = memo(({ children, content, position = "top" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Memoize event handlers to prevent recreation
    const showTooltip = useCallback(() => setIsVisible(true), []);
    const hideTooltip = useCallback(() => setIsVisible(false), []);

    // Memoize tooltip variants based on position and motion preference
    const tooltipVariants = useMemo(() => ({
        hidden: {
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.8,
            y: position === "top" ? (prefersReducedMotion ? 0 : 10) : (prefersReducedMotion ? 0 : -10)
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: position === "top" ? -10 : 10,
            transition: { duration: prefersReducedMotion ? 0.1 : 0.2 }
        },
    }), [position, prefersReducedMotion]);

    // Memoize positioning classes with proper responsive behavior
    const positionClasses = useMemo(() => {
        const baseClasses = "absolute z-50 px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-white bg-slate-900/95 backdrop-blur-md rounded-md sm:rounded-lg shadow-xl border border-white/20 pointer-events-none";

        if (position === "top") {
            return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 mb-1 sm:mb-2 max-w-[200px] sm:max-w-none whitespace-nowrap`;
        } else {
            return `${baseClasses} top-full left-1/2 -translate-x-1/2 mt-1 sm:mt-2 max-w-[200px] sm:max-w-none whitespace-nowrap`;
        }
    }, [position]);

    // Memoize arrow classes with proper positioning
    const arrowClasses = useMemo(() => {
        const baseArrowClasses = "absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-900/95 rotate-45 border border-white/20";

        if (position === "top") {
            return `${baseArrowClasses} top-full -mt-0.5 sm:-mt-1 border-t-0 border-l-0`;
        } else {
            return `${baseArrowClasses} bottom-full -mb-0.5 sm:-mb-1 border-b-0 border-r-0`;
        }
    }, [position]);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        variants={tooltipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className={positionClasses}
                    >
                        <span className="block text-center break-words">{content}</span>
                        <div className={arrowClasses} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

Tooltip.displayName = 'Tooltip';
export default Tooltip;