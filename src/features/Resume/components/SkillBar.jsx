import { memo, useMemo } from "react";
import { motion } from 'framer-motion'
const SkillBar = memo(({ skill, index }) => {
    const { name, level, color, icon: Icon } = skill;
    const animationProps = useMemo(() => ({
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: index * 0.1 }
    }), [index]);

    const progressBarAnimation = useMemo(() => ({
        initial: { width: 0 },
        animate: { width: `${level}%` },
        transition: { duration: 1.5, delay: index * 0.1, ease: "easeOut" }
    }), [level, index]);

    return (
        <motion.div
            {...animationProps}
            className="group p-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
        >
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${color} bg-opacity-10`}>
                        <Icon className={`text-lg bg-gradient-to-r ${color} bg-clip-text text-transparent`} />
                    </div>
                    <span className="text-white font-semibold">{name}</span>
                </div>
                <span className="text-slate-400 text-sm font-medium">{level}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
                <motion.div
                    className={`bg-gradient-to-r ${color} h-2 rounded-full`}
                    {...progressBarAnimation}
                />
            </div>
        </motion.div>
    );
});
export default SkillBar;