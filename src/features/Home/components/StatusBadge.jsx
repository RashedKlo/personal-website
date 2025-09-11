import { memo } from "react";
import { motion } from 'framer-motion'
const StatusBadge = memo(({ isInView }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="absolute top-3 right-3 flex items-center gap-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 px-2.5 py-1.5 rounded-full"
    >
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full">
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-full bg-green-400 rounded-full"
            />
        </div>
        <span className="text-xs text-green-200 font-medium">Available</span>
    </motion.div>
));
export default StatusBadge;