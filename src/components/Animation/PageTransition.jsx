import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import { Outlet } from 'react-router-dom';

const StairTransition = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 pointer-events-none">
                    {/* Modern sliding panels */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute h-full bg-gradient-to-br from-slate-900 via-gray-900 to-black"
                            style={{
                                width: `${100 / 6}%`,
                                left: `${(100 / 6) * i}%`,
                            }}
                            initial={{ y: "100%" }}
                            animate={{
                                y: "0%",
                                transition: {
                                    delay: i * 0.05,
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1]
                                }
                            }}
                            exit={{
                                y: "-100%",
                                transition: {
                                    delay: i * 0.05,
                                    duration: 0.5,
                                    ease: [0.22, 1, 0.36, 1]
                                }
                            }}
                        />
                    ))}

                    {/* Modern geometric overlay */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: { delay: 0.2, duration: 0.3 }
                        }}
                        exit={{
                            opacity: 0,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {/* Central geometric shape */}
                        <motion.div
                            className="relative"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{
                                scale: 1,
                                rotate: 0,
                                transition: { delay: 0.3, duration: 0.6, ease: "backOut" }
                            }}
                            exit={{
                                scale: 0,
                                rotate: 180,
                                transition: { duration: 0.3 }
                            }}
                        >
                            {/* Outer ring */}
                            <div className="w-24 h-24 border-2 border-white/20 rounded-full flex items-center justify-center">
                                {/* Inner hexagon */}
                                <div
                                    className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center"
                                    style={{
                                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                    }}
                                >
                                    <div className="w-6 h-6 bg-white/80 rounded-sm"></div>
                                </div>
                            </div>

                            {/* Orbiting dots */}
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-white/60 rounded-full"
                                    style={{
                                        top: '50%',
                                        left: '50%',
                                        transformOrigin: '0 0',
                                    }}
                                    animate={{
                                        rotate: 360,
                                        x: 40 * Math.cos((i * Math.PI) / 2),
                                        y: 40 * Math.sin((i * Math.PI) / 2),
                                    }}
                                    transition={{
                                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                        x: { duration: 0 },
                                        y: { duration: 0 }
                                    }}
                                />
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Modern particle system */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(15)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white/30 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                    y: -30,
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: 0.5 + i * 0.05,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

const PageTransition = ({ isVisible }) => {




    return (
        <div className="min-h-screen bg-gray-100 relative overflow-hidden">
            {/* Main overlay transition */}
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{
                        opacity: 0,
                        transition: { delay: 1, duration: 0.4, ease: easeInOut },
                    }}
                    className="h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black top-0 fixed pointer-events-none z-40"
                />
            </AnimatePresence>

            {/* Stair transition component */}
            <StairTransition isVisible={isVisible} />
            <Outlet />

        </div>
    );
};

export default PageTransition;