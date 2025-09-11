import { memo, useMemo } from "react";
import { motion } from 'framer-motion'
const EducationCard = memo(({ item, index, ANIMATION_VARIANTS }) => {
    const animationProps = useMemo(() => ({
        variants: ANIMATION_VARIANTS.card,
        initial: "hidden",
        animate: "visible",
        transition: { delay: index * 0.1, duration: 0.5 }
    }), [ANIMATION_VARIANTS.card, index]);

    return (
        <motion.div
            {...animationProps}
            className="group relative p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-white text-xl font-bold mb-1 group-hover:text-purple-300 transition-colors">
                            {item.degree}
                        </h3>
                        <p className="text-purple-400 font-medium">{item.institution}</p>
                    </div>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm font-medium rounded-full border border-cyan-500/30 ">
                        {item.duration}
                    </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
            </div>
        </motion.div>
    );
});
export default EducationCard;
