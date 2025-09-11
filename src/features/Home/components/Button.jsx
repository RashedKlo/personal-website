import { memo } from "react";
import { motion } from 'framer-motion'
const Button = memo(({ variant = "primary", size = "default", className = "", onClick, children, ...props }) => {
    const variants = {
        primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
        outline: "border-2 border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/5 backdrop-blur-sm"
    };

    const sizes = {
        lg: "h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base",
        default: "h-10 sm:h-12 px-4 sm:px-6 text-sm"
    };

    return (
        <motion.button
            className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 relative overflow-hidden group ${variants[variant]} ${sizes[size]} ${className}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            {...props}
            onClick={onClick}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.button>
    );
});
export default Button;