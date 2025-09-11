import { useReducedMotion, motion } from "framer-motion";
import { memo, useMemo } from "react";
import Tooltip from "./ToolTip";

const ActionButton = memo(({ href, icon: Icon, tooltip, variant = "primary", ...props }) => {
    const prefersReducedMotion = useReducedMotion();

    // Memoize variants to prevent recreation on every render
    const variants = useMemo(() => ({
        primary: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/30",
        secondary: "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 hover:shadow-xl hover:shadow-slate-500/30"
    }), []);

    // Memoize animation props to prevent recreation
    const animationProps = useMemo(() => ({
        whileHover: {
            scale: prefersReducedMotion ? 1 : 1.05,
            rotate: prefersReducedMotion ? 0 : (variant === "primary" ? 8 : -8)
        },
        whileTap: { scale: prefersReducedMotion ? 1 : 0.95 }
    }), [prefersReducedMotion, variant]);

    return (
        <Tooltip content={tooltip}>
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...animationProps}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white 
                   shadow-lg transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-400/50 
                   ${variants[variant]}`}
                {...props}
            >
                <Icon className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-200" />
            </motion.a>
        </Tooltip>
    );
});

ActionButton.displayName = 'ActionButton';
export default ActionButton;