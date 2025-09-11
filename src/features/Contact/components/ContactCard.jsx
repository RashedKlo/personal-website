import { memo } from "react";
import { motion } from 'framer-motion'
const ContactCard = memo(({ item, index, fadeInUp }) => {
    const Icon = item.icon;

    return (
        <motion.a
            href={item.href}
            variants={fadeInUp}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl 
                      border border-white/10 rounded-3xl hover:border-cyan-400/50 transition-all duration-500
                      hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden"
        >
            {/* Animated background gradient */}
            <div className="absolute  bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 
                           group-hover:from-cyan-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 
                           transition-all duration-700 rounded-3xl" />

            <div className="relative z-10 flex items-center space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 
                               rounded-2xl flex items-center justify-center group-hover:scale-110 
                               transition-transform duration-300 shadow-lg">
                    <Icon className="text-white text-xl" />
                </div>
                <div className="flex-1">
                    <p className="text-gray-400 text-sm font-medium mb-1">{item.label}</p>
                    <p className="text-white text-lg font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                        {item.value}
                    </p>
                </div>
            </div>
        </motion.a>
    );
});
export default ContactCard;