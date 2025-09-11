import { domAnimation, useInView, motion, LazyMotion } from "framer-motion";
import React, { memo, useRef, useMemo } from "react";
import { FiCalendar, FiCheckCircle, FiLayers, FiTrendingUp } from "react-icons/fi";
const StatsCard = React.lazy(() => import("./StatsCard"));

const StatsSection = memo(({ ANIMATION_VARIANTS }) => {
    const ref = useRef();
    const isInView = useInView(ref, {
        once: true,
        margin: "-50px",
        amount: 0.2 // Trigger when 20% is visible
    });

    // Memoize stats data to prevent recreation
    const STATS_DATA = useMemo(() => [
        {
            num: 3,
            suffix: "+",
            text: "Years Coding Experience",
            icon: FiCalendar,
            className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
        },
        {
            num: 12,
            suffix: "+",
            text: "Projects Built",
            icon: FiCheckCircle,
            className: "text-blue-400 bg-blue-400/10 border-blue-400/20"
        },
        {
            num: 6,
            suffix: "+",
            text: "Technologies Mastered",
            icon: FiLayers,
            className: "text-purple-400 bg-purple-400/10 border-purple-400/20"
        },
        {
            num: 100,
            suffix: "%",
            text: "Commitment to Clean Code",
            icon: FiTrendingUp,
            className: "text-orange-400 bg-orange-400/10 border-orange-400/20"
        }
    ], []);

    // Memoize section transition
    const sectionTransition = useMemo(() => ({
        duration: 0.6
    }), []);

    return (
        <LazyMotion features={domAnimation}>
            <motion.section
                ref={ref}
                className="py-12 lg:py-16"
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                transition={sectionTransition}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {STATS_DATA.map((stat, i) => (
                            <StatsCard
                                key={`${stat.text}-${i}`}
                                stat={stat}
                                index={i}
                                isInView={isInView}
                                ANIMATION_VARIANTS={ANIMATION_VARIANTS}
                            />
                        ))}
                    </div>
                </div>
            </motion.section>
        </LazyMotion>
    );
});

// Set display names for debugging
StatsSection.displayName = 'StatsSection';
StatsCard.displayName = 'StatsCard';

export default StatsSection;