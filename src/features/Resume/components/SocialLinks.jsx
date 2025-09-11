import { memo, useMemo } from "react";
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
const SocialLinks = memo(({ className = "" }) => {
    // Memoize social links data
    const SOCIAL_LINKS = useMemo(() => [
        { href: "#", icon: FaGithub, label: "GitHub", color: "hover:text-white" },
        { href: "#", icon: FaLinkedin, label: "LinkedIn", color: "hover:text-blue-400" },
        { href: "#", icon: FaEnvelope, label: "Email", color: "hover:text-emerald-400" }
    ], []);

    return (
        <div className={`flex gap-4 ${className}`}>
            {SOCIAL_LINKS.map(({ href, icon: Icon, label, color }) => (
                <motion.a
                    key={label}
                    href={href}
                    className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 ${color} transition-all duration-300`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                >
                    <Icon className="text-xl" />
                </motion.a>
            ))}
        </div>
    );
});
export default SocialLinks;