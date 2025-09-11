import { memo } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";
import { motion } from 'framer-motion'
const SOCIAL_LINKS = [
    {
        icon: FiGithub,
        href: "https://github.com",
        label: "GitHub",
        className: "bg-slate-700/50 hover:bg-slate-600/60 text-slate-300 hover:text-white border-slate-600/50 hover:border-slate-500"
    },
    {
        icon: FiLinkedin,
        href: "https://linkedin.com",
        label: "LinkedIn",
        className: "bg-blue-600/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 border-blue-500/30 hover:border-blue-400/50"
    },
    {
        icon: FiTwitter,
        href: "https://twitter.com",
        label: "X (Twitter)",
        className: "bg-sky-600/20 hover:bg-sky-500/30 text-sky-400 hover:text-sky-300 border-sky-500/30 hover:border-sky-400/50"
    },
    {
        icon: FiYoutube,
        href: "https://youtube.com",
        label: "YouTube",
        className: "bg-red-600/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border-red-500/30 hover:border-red-400/50"
    }
];
const SocialLinks = memo(({ className = "", ANIMATION_VARIANTS }) => (
    <div className={`flex items-center gap-3 ${className}`}>
        {SOCIAL_LINKS.map((social, i) => (
            <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-xl border backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${social.className}`}
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
            >
                <social.icon size={16} />
            </motion.a>
        ))}
    </div>
));
export default SocialLinks;