import { memo } from "react";
import { motion } from 'framer-motion'
const FormInput = memo(({ type = "text", placeholder, className = "", fadeInUp, ...props }) => (
    <motion.input
        variants={fadeInUp}
        type={type}
        placeholder={placeholder}
        className={`w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 
                   focus:border-cyan-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/30
                   hover:border-white/20 transition-all duration-300 backdrop-blur-sm ${className}`}
        {...props}
    />
));
export default FormInput;