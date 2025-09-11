import { memo, useMemo } from "react";
import { motion } from 'framer-motion'
const InfoCard = memo(({ item, index }) => {
    const { icon: Icon, field, value, color } = item;

    const animationProps = useMemo(() => ({
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.1 }
    }), [index]);

    return (
        <motion.div
            {...animationProps}
            className="group p-4 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
        >
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Icon className={`text-xl ${color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div>
                    <p className="text-slate-400 text-sm font-medium">{field}</p>
                    <p className="text-white font-semibold">{value}</p>
                </div>
            </div>
        </motion.div>
    );
});
export default InfoCard;
