import { memo, useMemo } from "react";
import { motion } from 'framer-motion';
import { BsArrowDownRight } from "react-icons/bs";
import { Link } from "react-router-dom";

// Memoized hover animation component
const AnimatedActionIcon = memo(() => (
    <motion.div
        className="w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-sm border border-white/10 
                   group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-indigo-600 
                   transition-all duration-500 flex justify-center items-center shadow-md 
                   group-hover:shadow-lg group-hover:shadow-blue-500/20"
        whileHover={{ rotate: 90, scale: 1.1 }}
        transition={{ duration: 0.3 }}
    >
        <BsArrowDownRight className="text-slate-300 group-hover:text-white text-xl 
                                     transition-colors duration-300" />
    </motion.div>
));

// Memoized service icon component
const ServiceIcon = memo(({ IconComponent, color }) => (
    <motion.div
        className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${color} text-white shadow-md 
                    group-hover:shadow-lg group-hover:shadow-blue-500/20 mb-6`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
    >
        <IconComponent className="text-2xl" />
    </motion.div>
));

const ServiceCard = memo(({ service }) => {
    const IconComponent = service.icon;

    // Memoize motion variants to prevent recreation
    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.37, 0, 0.63, 1]
            }
        }
    }), []);

    // Memoize hover animations
    const hoverAnimation = useMemo(() => ({
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2), 0 0 15px rgba(59, 130, 246, 0.15)"
    }), []);

    return (
        <motion.div
            variants={itemVariants}
            className="group relative flex flex-col justify-between bg-slate-900/30 backdrop-blur-md rounded-2xl p-8 
                       border border-white/10 overflow-hidden transition-all duration-500 
                       shadow-md hover:shadow-xl hover:shadow-blue-500/10"
            whileHover={hoverAnimation}
            whileTap={{ scale: 0.98 }}
        >
            <Link to={service.to} className="absolute inset-0 z-20" aria-label={`Learn more about ${service.title}`} />

            {/* Gradient overlay for subtle glow on hover */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 
                           group-hover:opacity-20 transition-opacity duration-500 rounded-2xl mix-blend-overlay`}
                aria-hidden="true"
            />

            <div className="relative z-10">
                {/* Header Section: Number and Action Icon */}
                <div className="flex justify-between items-start mb-8">
                    <span className={`text-6xl lg:text-7xl font-extrabold text-slate-700/50 group-hover:text-transparent 
                                     group-hover:bg-clip-text group-hover:bg-gradient-to-r ${service.color} 
                                     transition-all duration-500 select-none`}>
                        {service.num}
                    </span>
                    <AnimatedActionIcon />
                </div>

                {/* Content Section: Icon, Title, and Description */}
                <ServiceIcon IconComponent={IconComponent} color={service.color} />

                <h3 className={`text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-transparent 
                               group-hover:bg-clip-text group-hover:bg-gradient-to-r ${service.color} 
                               transition-colors duration-300`}>
                    {service.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm lg:text-base">
                    {service.description}
                </p>
            </div>

            {/* Decorative Bottom Border with gradient glow */}
            <div className="relative mt-8">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                group-hover:via-blue-500/50 transition-all duration-500" />
            </div>
        </motion.div>
    );
});

// Set display names for debugging
ServiceCard.displayName = 'ServiceCard';
AnimatedActionIcon.displayName = 'AnimatedActionIcon';
ServiceIcon.displayName = 'ServiceIcon';

export default ServiceCard;