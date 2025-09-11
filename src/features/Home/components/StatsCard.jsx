import { memo, useMemo } from "react";
import useCountAnimation from "../hooks/useCountAnimation";
import { motion } from 'framer-motion'
const StatsCard = memo(({ stat, index, isInView, ANIMATION_VARIANTS }) => {
    const count = useCountAnimation(stat.num, isInView);

    const cardVariants = useMemo(() => ({
        ...ANIMATION_VARIANTS.fadeInUp,
        whileHover: { y: -4, scale: 1.02 }
    }), [ANIMATION_VARIANTS]);

    return (
        <motion.div
            className={`text-center p-4 sm:p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${stat.className} hover:border-opacity-40`}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover="whileHover"
        >
            <div className={`flex justify-center mb-3 ${stat.className.split(' ')[0]}`}>
                <stat.icon size={24} />
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">
                {count}
                <span className={stat.className.split(' ')[0]}>{stat.suffix}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">{stat.text}</p>
        </motion.div>
    );
});
export default StatsCard;