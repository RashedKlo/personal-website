import { memo } from "react";
import { motion } from 'framer-motion'
const WorkBadge = memo(({ isInView }) => (
    <motion.div
        initial={{ opacity: 0, x: 15, y: 15 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-2 rounded-xl shadow-lg shadow-blue-500/30"
    >
        <span className="text-xs font-semibold">Open to Work</span>
    </motion.div>
));
export default WorkBadge;