import { memo, useMemo } from "react";
import { motion } from 'framer-motion'
const TabButton = memo(({ active, value, onClick, children, icon: Icon }) => {
    const buttonClass = useMemo(() =>
        `group flex items-center justify-center xl:justify-start gap-3 py-3 px-4 xl:px-6 rounded-xl transition-all duration-300 whitespace-nowrap text-sm xl:text-base font-medium ${active
            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
            : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
        }`,
        [active]
    );

    const iconClass = useMemo(() =>
        `text-lg transition-transform duration-300 ${active ? "" : "group-hover:scale-110"}`,
        [active]
    );

    const handleClick = useMemo(() => () => onClick(value), [onClick, value]);

    return (
        <motion.button
            onClick={handleClick}
            className={buttonClass}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Icon className={iconClass} />
            <span className="hidden sm:inline xl:inline">{children}</span>
        </motion.button>
    );
});
export default TabButton;