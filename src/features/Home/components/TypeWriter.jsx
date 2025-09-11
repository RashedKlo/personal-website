import { memo, useMemo } from "react";
import { motion } from 'framer-motion';
import useTypewriter from "../hooks/useTypeWriter";

// Optimized typewriter hook with better performance


// Memoized cursor component
const Cursor = memo(({ color }) => (
    <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        }}
        className="ml-1"
        style={{ color }}
    >
        |
    </motion.span>
));

const TypeWriter = memo(({ className = "" }) => {
    // Memoize configuration to prevent recreation
    const TYPEWRITER_CONFIG = useMemo(() => ({
        texts: [
            "Full-Stack Developer",
            ".NET & C# Engineer",
            "React.js Frontend Specialist",
            "SQL Server Expert"
        ],
        speed: 80,
        deleteSpeed: 60,
        pause: 2000,
        colors: ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4"]
    }), []);

    const { displayText, currentColor } = useTypewriter(TYPEWRITER_CONFIG);

    return (
        <div className={`font-semibold ${className}`}>
            <span style={{ color: currentColor }}>{displayText}</span>
            <Cursor color={currentColor} />
        </div>
    );
});

// Set display names for debugging
TypeWriter.displayName = 'TypeWriter';
Cursor.displayName = 'Cursor';

export default TypeWriter;