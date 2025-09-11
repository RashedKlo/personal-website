import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import { Outlet, useNavigate } from 'react-router-dom';
import PageTransition from '../Animation/PageTransition';

// Navigation links data
const navigationLinks = [
    { name: "Home", path: "/home" },
    { name: "Resume", path: "/resume" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/work" },
    { name: "Contact", path: "/contact" }
];
const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
};
// Animation variants
const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    }
};

const logoVariants = {
    initial: { opacity: 0, x: -30 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

const mobileMenuVariants = {
    initial: {
        opacity: 0,
        scale: 0.95,
        y: -20
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
            staggerChildren: 0.05
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: -20,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

// Stair Transition Component
const StairTransition = ({ isVisible }) => {
    const stairVariants = {
        initial: { scaleY: 1 },
        animate: {
            scaleY: 0,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 pointer-events-none flex">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-b from-blue-500 to-indigo-600"
                            style={{ transformOrigin: 'bottom' }}
                            variants={stairVariants}
                            initial="initial"
                            animate="animate"
                            transition={{
                                delay: i * 0.08,
                                duration: 0.6,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
};







// Modern Desktop Navigation Link
const ModernNavLink = ({ link, isActive, onClick, index }) => {
    return (
        <motion.div
            className="relative group"
            variants={navItemVariants}
            custom={index}
        >
            <motion.button
                onClick={() => onClick(link.path)}
                className={`
          relative px-6 py-3 text-sm font-medium transition-all duration-500 rounded-full overflow-hidden
          ${isActive
                        ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30'
                        : 'text-slate-300 hover:text-white'
                    }
        `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                layout
            >
                <span className="relative z-10 flex items-center gap-2">
                    {link.name}
                    {isActive && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    )}
                </span>

                {/* Hover background for inactive links */}
                {!isActive && (
                    <motion.div
                        className="absolute inset-0 bg-slate-800/60 backdrop-blur-sm rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                )}

                {/* Active background glow */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-full blur-xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}
            </motion.button>
        </motion.div>
    );
};

// Premium CTA Button
const PremiumCTAButton = ({ onClick }) => (
    <motion.div
        variants={navItemVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        <motion.button
            onClick={onClick}
            className="relative px-8 py-3 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-full overflow-hidden group shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-500"
        >
            <span className="relative z-10 flex items-center gap-2">
                Let's Talk
                <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <FiArrowUpRight size={14} />
                </motion.div>
            </span>

            {/* Animated gradient overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
            />

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.button>
    </motion.div>
);

// Enhanced Desktop Navigation
const EnhancedDesktopNavigation = ({ activeLink, onLinkClick, onCTAClick }) => (
    <motion.div
        className="hidden lg:flex items-center"
        variants={headerVariants}
    >
        {/* Navigation Container with Glass Effect */}
        <motion.nav
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/40 backdrop-blur-xl rounded-full border border-slate-700/30 shadow-2xl shadow-slate-900/20"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            {navigationLinks.map((link, index) => (
                <ModernNavLink
                    key={link.name}
                    link={link}
                    isActive={activeLink === link.path}
                    onClick={onLinkClick}
                    index={index}
                />
            ))}
        </motion.nav>

        {/* CTA Button with spacing */}
        <motion.div
            className="ml-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
        >
            <PremiumCTAButton onClick={onCTAClick} />
        </motion.div>
    </motion.div>
);

// Mobile Toggle Button
const MobileToggle = ({ isOpen, onToggle }) => (
    <motion.button
        onClick={onToggle}
        className="lg:hidden w-12 h-12 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/30 transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={navItemVariants}
    >
        <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
        >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </motion.div>
    </motion.button>
);

// Mobile Navigation Menu
const MobileNavigation = ({ isOpen, activeLink, onLinkClick, onCTAClick, onClose }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                {/* Backdrop */}
                <motion.div
                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 lg:hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                {/* Mobile Menu */}
                <motion.div
                    className="fixed top-24 right-4 left-4 bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl z-50 lg:hidden overflow-hidden"
                    variants={mobileMenuVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <div className="p-6">
                        {/* Navigation Links */}
                        <nav className="space-y-2">
                            {navigationLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    variants={navItemVariants}
                                    custom={index}
                                >
                                    <motion.button
                                        onClick={() => {
                                            onLinkClick(link.path);
                                            onClose();
                                        }}
                                        className={`
                      w-full text-left px-6 py-4 rounded-xl text-base font-medium transition-all duration-300 flex items-center justify-between group
                      ${activeLink === link.path
                                                ? 'bg-gradient-to-r from-blue-500/20 to-indigo-600/20 text-blue-400 border border-blue-500/30'
                                                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                                            }
                    `}
                                        whileHover={{ x: 6 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span>{link.name}</span>
                                        {activeLink === link.path && (
                                            <motion.div
                                                className="w-2 h-2 bg-blue-400 rounded-full"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ duration: 0.2, delay: 0.1 }}
                                            />
                                        )}
                                    </motion.button>
                                </motion.div>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <motion.div
                            className="mt-8 pt-6 border-t border-slate-700/50"
                            variants={navItemVariants}
                        >
                            <motion.button
                                onClick={() => {
                                    onCTAClick();
                                    onClose();
                                }}
                                className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 group"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Let's Talk
                                <motion.div
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <FiArrowUpRight size={16} />
                                </motion.div>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

// Main Header Component
const Header = () => {
    const [activeLink, setActiveLink] = useState('/home');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showPageTransition, setShowPageTransition] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const nav = useNavigate();
    // Handle link navigation with page transition
    const handleLinkClick = (path) => {
        nav(path);

        if (path !== activeLink) {
            setShowPageTransition(true);

            // Simulate page transition
            const timer = setTimeout(() => {

                setActiveLink(path);
                setShowPageTransition(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    };

    // Handle CTA click
    const handleCTAClick = () => {
        handleLinkClick('/contact');
    };

    // Close mobile menu on escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMobileMenuOpen]);

    return (

        < div className='bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'>
            <motion.header
                className={`
            fixed top-0 left-0 right-0 z-30 transition-all duration-700
            ${isScrolled
                        ? 'bg-slate-900/80 backdrop-blur-2xl border-b border-slate-700/30 shadow-xl shadow-slate-900/10'
                        : 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
                    }
          `}
                variants={headerVariants}
                initial="initial"
                animate="animate"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-18 lg:h-22">
                        {/* Logo */}
                        {/* Welcome Line */}
                        <motion.div
                            variants={logoVariants}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex items-center justify-center lg:justify-start gap-3"
                        >
                            <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-blue-400 to-transparent" />
                            <span className="text-blue-400 font-medium tracking-wider uppercase text-xs sm:text-sm">Welcome</span>
                        </motion.div>

                        {/* Enhanced Desktop Navigation */}
                        <EnhancedDesktopNavigation
                            activeLink={activeLink}
                            onLinkClick={handleLinkClick}
                            onCTAClick={handleCTAClick}
                        />

                        {/* Mobile Toggle */}
                        <MobileToggle
                            isOpen={isMobileMenuOpen}
                            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </div>
                </div>
            </motion.header>

            {/* Mobile Navigation */}
            <MobileNavigation
                isOpen={isMobileMenuOpen}
                activeLink={activeLink}
                onLinkClick={handleLinkClick}
                onCTAClick={handleCTAClick}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Spacer for fixed header */}
            <div className="h-18 lg:h-22" />

            <PageTransition isVisible={showPageTransition} />

        </div >
    );
};

export default Header;