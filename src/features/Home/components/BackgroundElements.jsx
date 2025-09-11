import { memo } from "react";
import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

// Static background elements that don't need frequent updates
const StaticBackground = memo(() => (
    <>
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.4)_100%)]" />

        {/* Grid pattern */}
        <div
            className="absolute inset-0 opacity-40"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(148,163,184,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(148,163,184,0.02) 1px, transparent 1px)
                `,
                backgroundSize: '72px 72px'
            }}
        />
    </>
));

const BackgroundElements = memo(() => (
    <>
        <StaticBackground />
        <FloatingParticles />
    </>
));

// Set display names for debugging
BackgroundElements.displayName = 'BackgroundElements';
StaticBackground.displayName = 'StaticBackground';
FloatingParticles.displayName = 'FloatingParticles';

export default BackgroundElements;